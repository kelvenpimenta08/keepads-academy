-- Segurança da competição e do cadastro --------------------------------------------
-- Rodar uma vez no SQL Editor do projeto keepads-academy, depois de todos os outros arquivos.
-- Pode rodar de novo sem problema.
--
-- O site é público, então tudo o que vale ponto é conferido aqui no banco, não só no app:
--   * cadastro só com o código de convite (o líder manda no grupo da equipe);
--   * horários (revisão, parte prática, prova) são sempre os do servidor, nunca os do navegador;
--   * só valem flashcards e partes práticas que existem nas aulas (ids no formato a1-c01 / a1-p1);
--   * a agenda do flashcard só cresce no ritmo do algoritmo (não dá para "dominar" um card na hora);
--   * prova: nota conferida, uma tentativa a cada 30 dias e só depois da semana de flashcards;
--   * pomodoro: o início é registrado pelo servidor, então não dá para registrar um pomodoro sem esperar.
-- O tempo fora da plataforma (dispersão) é medido pelo navegador e serve só como acompanhamento.

-- Configurações privadas (ninguém lê pelo app) ---------------------------------------
create table if not exists public.academy_config (
  chave text primary key,
  valor text not null
);
alter table public.academy_config enable row level security;
revoke all on public.academy_config from anon, authenticated;
-- Código de convite do cadastro: NÃO fica neste arquivo (o repositório é público).
-- Grave direto no SQL Editor do Supabase, trocando o texto entre aspas:
--   insert into public.academy_config (chave, valor) values ('convite', 'SEU-CODIGO')
--     on conflict (chave) do update set valor = excluded.valor;
-- Sem o código gravado, ninguém consegue criar conta nova (quem já tem conta continua entrando).

-- O app confere o código antes de criar a conta (para mostrar o erro na hora)
create or replace function public.academy_convite_ok(p_codigo text)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.academy_config where chave = 'convite' and upper(trim(valor)) = upper(trim(coalesce(p_codigo, ''))));
$$;
revoke execute on function public.academy_convite_ok(text) from public;
grant execute on function public.academy_convite_ok(text) to anon, authenticated;

-- Perfil: só nasce com o convite certo, ninguém vira admin sozinho, nome com limite.
-- (Para promover alguém: update public.academy_profiles set is_admin = true where email = 'email@da.pessoa';)
create or replace function public.academy_preparar_perfil()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if not public.academy_convite_ok(auth.jwt() -> 'user_metadata' ->> 'convite') then
    raise exception 'Código de convite inválido. Peça o código para a liderança e crie a conta de novo.';
  end if;
  new.email := lower(coalesce(auth.jwt() ->> 'email', new.email));
  new.is_admin := false;
  new.nome := left(trim(coalesce(new.nome, '')), 80);
  return new;
end;
$$;

create or replace function public.academy_limitar_nome()
returns trigger
language plpgsql set search_path = public
as $$
begin
  new.nome := left(trim(coalesce(new.nome, '')), 80);
  return new;
end;
$$;
drop trigger if exists academy_profiles_nome on public.academy_profiles;
create trigger academy_profiles_nome before update on public.academy_profiles
  for each row execute function public.academy_limitar_nome();

revoke execute on function public.academy_is_admin() from public, anon;
grant execute on function public.academy_is_admin() to authenticated;

-- Só quem tem perfil (entrou com convite) participa: usado pelos rankings e pelo relatório
create or replace function public.academy_membro()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.academy_profiles where id = auth.uid());
$$;
revoke execute on function public.academy_membro() from public, anon;
grant execute on function public.academy_membro() to authenticated;

-- Flashcards: histórico com horário do servidor, card válido e sem rajada -------------------
create or replace function public.academy_validar_revisao()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  new.reviewed_at := now();
  if new.card_id !~ ('^(ds-)?a' || new.aula || '-c[0-9]{2}$') then
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
drop trigger if exists academy_review_validar on public.academy_review_log;
create trigger academy_review_validar before insert on public.academy_review_log
  for each row execute function public.academy_validar_revisao();

-- Agenda do card: horário do servidor e intervalo crescendo no ritmo do algoritmo (js/srs.js)
create or replace function public.academy_validar_card()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  limite numeric;
begin
  if new.card_id !~ ('^(ds-)?a' || new.aula || '-c[0-9]{2}$') then
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
drop trigger if exists academy_cards_validar on public.academy_card_states;
create trigger academy_cards_validar before insert or update on public.academy_card_states
  for each row execute function public.academy_validar_card();

-- Partes práticas: só as que existem na aula, horário do servidor e relato com limite -------
create or replace function public.academy_validar_pratica()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.task_id !~ ('^(ds-)?a' || new.aula || '-p[0-9]{1,2}$') then
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
drop trigger if exists academy_praticas_validar on public.academy_practice_checks;
create trigger academy_praticas_validar before insert or update on public.academy_practice_checks
  for each row execute function public.academy_validar_pratica();

-- Provas: horário do servidor, nota conferida, 30 dias entre tentativas e semana de flashcards ---
create or replace function public.academy_bloquear_refazer()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  primeira timestamptz;
  dias int;
begin
  new.created_at := now();
  -- Duas abas enviando ao mesmo tempo não passam juntas pela regra dos 30 dias
  perform pg_advisory_xact_lock(hashtext(new.user_id::text || new.curso || new.aula || new.tipo));
  if new.total < 1 or new.total > 100 or new.acertos < 0 or new.acertos > new.total
     or abs(new.nota - round(new.acertos * 100.0 / new.total, 2)) > 0.01 then
    raise exception 'Resultado da prova inválido.';
  end if;
  if exists (
    select 1 from public.academy_quiz_attempts q
    where q.user_id = new.user_id and q.curso = new.curso and q.aula = new.aula and q.tipo = new.tipo
      and coalesce(q.respostas ->> '_versao', '') = coalesce(new.respostas ->> '_versao', '')
      and q.created_at > now() - interval '30 days'
  ) then
    raise exception 'Você já fez esta prova. A próxima tentativa libera 30 dias depois da anterior.';
  end if;
  -- A prova libera depois de uma semana estudando os flashcards da aula (em 4 dias diferentes).
  -- Administradores podem testar as provas sem esperar.
  if not public.academy_is_admin() then
    select min(l.reviewed_at), count(distinct (l.reviewed_at at time zone 'America/Sao_Paulo')::date)
      into primeira, dias
    from public.academy_review_log l
    where l.user_id = new.user_id and l.curso = new.curso and l.aula = new.aula;
    if primeira is null or primeira > now() - interval '7 days' or dias < 4 then
      raise exception 'A prova desta aula ainda não liberou: estude os flashcards por uma semana, em pelo menos 4 dias.';
    end if;
  end if;
  return new;
end;
$$;

-- Pomodoro com início registrado pelo servidor -----------------------------------------
create table if not exists public.academy_pomodoro_inicios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  iniciado_em timestamptz not null default now(),
  usado boolean not null default false
);
create index if not exists academy_pomodoro_inicios_user_idx on public.academy_pomodoro_inicios (user_id, iniciado_em);
alter table public.academy_pomodoro_inicios enable row level security;
revoke all on public.academy_pomodoro_inicios from anon, authenticated;

-- Começar: o servidor anota a hora e devolve um id
create or replace function public.academy_iniciar_pomodoro()
returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  novo uuid;
begin
  if not public.academy_membro() then raise exception 'Entre com a sua conta da equipe.'; end if;
  -- Limpa inícios abandonados (mais de 1 dia) desta pessoa
  delete from public.academy_pomodoro_inicios where user_id = auth.uid() and iniciado_em < now() - interval '1 day';
  insert into public.academy_pomodoro_inicios (user_id) values (auth.uid()) returning id into novo;
  return novo;
end;
$$;
revoke execute on function public.academy_iniciar_pomodoro() from public, anon;
grant execute on function public.academy_iniciar_pomodoro() to authenticated;

-- Concluir: só vale se o tempo passou de verdade desde o início anotado pelo servidor
create or replace function public.academy_concluir_pomodoro(p_inicio uuid, p_minutos int, p_tipo text, p_fora int, p_saidas int)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  ini timestamptz;
begin
  select i.iniciado_em into ini from public.academy_pomodoro_inicios i
  where i.id = p_inicio and i.user_id = auth.uid() and not i.usado
  for update;
  if ini is null then raise exception 'Pomodoro não encontrado (ou já registrado).'; end if;
  if p_minutos is null or p_minutos < 30 or p_minutos > 120 then raise exception 'Duração inválida.'; end if;
  if ini > now() - make_interval(mins => p_minutos) + interval '1 minute' then
    raise exception 'Pomodoro incompleto: o tempo de foco ainda não terminou.';
  end if;
  update public.academy_pomodoro_inicios set usado = true where id = p_inicio;
  insert into public.academy_pomodoros (user_id, minutos, iniciado_em, tipo, fora_segundos, saidas)
  values (auth.uid(), p_minutos, ini, case when p_tipo = 'execucao' then 'execucao' else 'estudo' end,
          coalesce(p_fora, 0), coalesce(p_saidas, 0));
end;
$$;
revoke execute on function public.academy_concluir_pomodoro(uuid, int, text, int, int) from public, anon;
grant execute on function public.academy_concluir_pomodoro(uuid, int, text, int, int) to authenticated;

-- A partir de agora pomodoro só entra pela função acima
revoke insert on public.academy_pomodoros from authenticated;
