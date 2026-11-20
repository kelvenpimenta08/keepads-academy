-- Cursos livres ------------------------------------------------------------------------
-- Rodar uma vez no SQL Editor do projeto keepads-academy. Pode rodar de novo sem problema.
-- (As mesmas funções estão em seguranca.sql, simulado.sql e pomodoro.sql; este arquivo só reaplica as que mudaram.)
-- 1) Ids de flashcards e partes práticas podem ter o prefixo do curso (ex.: ca-a1-c01), para não colidir entre cursos.
-- 2) O simulado de curso livre (id "livre-...") fica aberto desde o começo.
-- 3) Flashcards de curso livre não contam para a ofensiva do ranking.

create or replace function public.academy_validar_revisao()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  new.reviewed_at := now();
  if new.card_id !~ ('^([a-z]{2,4}-)?a' || new.aula || '-c[0-9]{2}$') then
    raise exception 'Flashcard inválido.';
  end if;
  -- Ninguém responde dois cards em menos de 0,7 segundo (virar e avaliar já leva mais que isso)
  if exists (select 1 from public.academy_review_log l
             where l.user_id = new.user_id and l.reviewed_at > now() - interval '700 milliseconds') then
    raise exception 'Calma: responda um card de cada vez.';
  end if;
  return new;
end;
$$;

create or replace function public.academy_validar_card()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  limite numeric;
begin
  if new.card_id !~ ('^([a-z]{2,4}-)?a' || new.aula || '-c[0-9]{2}$') then
    raise exception 'Flashcard inválido.';
  end if;
  new.last_review := now();
  if tg_op = 'INSERT' then
    -- Primeira resposta: no máximo 4 dias ("Fácil"). O app grava com upsert: se o card já existe,
    -- quem confere é o gatilho de UPDATE, que roda logo depois.
    if new.interval_days > 4 and not exists (
      select 1 from public.academy_card_states c where c.user_id = new.user_id and c.card_id = new.card_id
    ) then raise exception 'Intervalo inválido para um card novo.'; end if;
  elsif new.interval_days > greatest(old.interval_days, 6) then
    -- Para crescer além de 6 dias o card precisa estar vencido, e cresce no máximo o que o "Fácil" daria
    limite := ceil(old.interval_days * (old.ease + 0.15) * 1.3) + 1;
    if old.due > now() + interval '12 hours' or new.interval_days > limite then
      raise exception 'Este card ainda não está na hora de revisar.';
    end if;
  end if;
  if new.due > now() + make_interval(days => new.interval_days + 1) then
    raise exception 'Data de revisão inválida.';
  end if;
  return new;
end;
$$;

create or replace function public.academy_validar_pratica()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.task_id !~ ('^([a-z]{2,4}-)?a' || new.aula || '-p[0-9]{1,2}$') then
    raise exception 'Parte prática inválida.';
  end if;
  if new.done then
    new.done_at := case when tg_op = 'UPDATE' and old.done then old.done_at else now() end;
  else
    new.done_at := null;
  end if;
  new.relato := left(new.relato, 2000);
  return new;
end;
$$;

create or replace function public.academy_validar_simulado()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  primeira timestamptz;
  dias int;
begin
  new.created_at := now();
  perform pg_advisory_xact_lock(hashtext('simulado' || new.user_id::text || new.curso || new.aula));
  if new.total < 5 or new.total > 30 or new.acertos < 0 or new.acertos > new.total then
    raise exception 'Resultado do simulado inválido.';
  end if;
  new.nota := round(new.acertos * 100.0 / new.total, 2);
  -- Ninguém faz um simulado inteiro em menos de 3 minutos
  if exists (
    select 1 from public.academy_simulados s
    where s.user_id = new.user_id and s.curso = new.curso and s.aula = new.aula
      and s.created_at > now() - interval '3 minutes'
  ) then
    raise exception 'Você acabou de fazer um simulado desta aula. Leia as explicações e tente de novo em alguns minutos.';
  end if;
  -- Mesma liberação da prova: uma semana estudando os flashcards da aula, em 4 dias diferentes.
  -- Curso livre (id "livre-..."): o simulado é o treino da aula e fica aberto desde o começo.
  if not public.academy_is_admin() and new.curso not like 'livre-%' then
    select min(l.reviewed_at), count(distinct (l.reviewed_at at time zone 'America/Sao_Paulo')::date)
      into primeira, dias
    from public.academy_review_log l
    where l.user_id = new.user_id and l.curso = new.curso and l.aula = new.aula;
    if primeira is null or primeira > now() - interval '7 days' or dias < 4 then
      raise exception 'O simulado desta aula libera junto com a prova: estude os flashcards por uma semana, em pelo menos 4 dias.';
    end if;
  end if;
  return new;
end;
$$;

create or replace function public.academy_ranking(p_curso text, p_versao int, p_meta int)
returns table (user_id uuid, nome text, provas_feitas int, media numeric, ofensiva int)
language sql stable security definer set search_path = public
as $$
  -- Só conta o que foi feito depois do início da competição (supabase/inicio.sql)
  with revisoes as (
    select l.user_id, (l.reviewed_at at time zone 'America/Sao_Paulo')::date as dia
    from public.academy_review_log l
    where l.reviewed_at >= public.academy_inicio_contagem()
      and l.curso not like 'livre-%'   -- curso livre (fora do campeonato) não conta para a ofensiva
    group by 1, 2
    having count(*) >= p_meta
  ),
  -- Pomodoro de estudo com 5 min ou mais fora da plataforma (disperso) não conta
  -- (mesmo número de ACADEMY_REGRAS.limiteForaMinutos, no content/curso.js)
  focos as (
    select distinct p.user_id, (p.concluido_em at time zone 'America/Sao_Paulo')::date as dia
    from public.academy_pomodoros p
    where p.tipo in ('estudo', 'execucao')   -- foco livre não conta
      and (p.tipo = 'execucao' or p.fora_segundos < 300) and p.concluido_em >= public.academy_inicio_contagem()
  ),
  dias as (
    select r.user_id, r.dia from revisoes r join focos f on f.user_id = r.user_id and f.dia = r.dia
  ),
  grupos as (
    select d.user_id, d.dia, d.dia - (row_number() over (partition by d.user_id order by d.dia))::int as grupo
    from dias d
  ),
  sequencias as (
    select g.user_id, max(g.dia) as fim, count(*)::int as tamanho
    from grupos g group by g.user_id, g.grupo
  ),
  atual as (
    select s.user_id, max(s.tamanho) as ofensiva from sequencias s
    where s.fim >= (now() at time zone 'America/Sao_Paulo')::date - 1
    group by s.user_id
  ),
  provas as (
    select q.user_id, q.aula, q.tipo, max(q.nota) as nota
    from public.academy_quiz_attempts q
    where q.curso = p_curso and q.respostas ->> '_versao' = p_versao::text
      and q.created_at >= public.academy_inicio_contagem()
    group by q.user_id, q.aula, q.tipo
  ),
  participantes as (
    select distinct l.user_id from public.academy_review_log l
    where l.curso = p_curso and l.reviewed_at >= public.academy_inicio_contagem()
    union
    select distinct q.user_id from public.academy_quiz_attempts q
    where q.curso = p_curso and q.created_at >= public.academy_inicio_contagem()
  )
  select p.id, p.nome, count(pr.nota)::int, round(avg(pr.nota), 1), coalesce(max(a.ofensiva), 0)::int
  from participantes pa
  join public.academy_profiles p on p.id = pa.user_id
  left join provas pr on pr.user_id = p.id
  left join atual a on a.user_id = p.id
  where public.academy_membro()   -- só quem é da equipe vê o ranking (supabase/seguranca.sql)
  group by p.id, p.nome;
$$;
