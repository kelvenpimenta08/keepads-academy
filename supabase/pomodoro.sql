-- Pomodoro (blocos de foco de 30 minutos) ------------------------------------
-- Rodar uma vez no SQL Editor do projeto keepads-academy. Pode rodar de novo sem problema.
-- Depois rode também o supabase/temporada.sql, que passa a exigir o pomodoro na meta do dia.

create table if not exists public.academy_pomodoros (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  minutos smallint not null check (minutos between 30 and 120),
  iniciado_em timestamptz not null,
  concluido_em timestamptz not null default now()
);
create index if not exists academy_pomodoros_user_idx on public.academy_pomodoros (user_id, concluido_em);

-- Tipo do pomodoro e dispersão:
--   estudo   = dentro da plataforma (resumo, áudio, flashcards, provas); o tempo fora da aba conta como disperso;
--   execucao = executando a parte prática em outras ferramentas; o tempo fora não é medido.
-- fora_segundos e saidas são medidos pelo navegador durante o pomodoro de estudo.
alter table public.academy_pomodoros add column if not exists tipo text not null default 'estudo';
alter table public.academy_pomodoros add column if not exists fora_segundos int not null default 0;
alter table public.academy_pomodoros add column if not exists saidas int not null default 0;
alter table public.academy_pomodoros drop constraint if exists academy_pomodoros_tipo_chk;
alter table public.academy_pomodoros add constraint academy_pomodoros_tipo_chk check (tipo in ('estudo', 'execucao'));

-- O horário de conclusão é sempre o do servidor, e o pomodoro só vale se os minutos
-- realmente passaram desde o início (com 1 minuto de tolerância).
create or replace function public.academy_validar_pomodoro()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  new.concluido_em := now();
  if new.iniciado_em > now() - make_interval(mins => new.minutos) + interval '1 minute' then
    raise exception 'Pomodoro incompleto: o tempo de foco ainda não terminou.';
  end if;
  if new.iniciado_em < now() - interval '1 day' then
    raise exception 'Pomodoro antigo demais para ser registrado.';
  end if;
  -- Tempo fora nunca passa da duração do pomodoro; no de execução ele não é medido
  if new.tipo = 'execucao' then
    new.fora_segundos := 0; new.saidas := 0;
  end if;
  new.fora_segundos := least(greatest(coalesce(new.fora_segundos, 0), 0), new.minutos * 60);
  new.saidas := least(greatest(coalesce(new.saidas, 0), 0), 500);
  return new;
end;
$$;

drop trigger if exists academy_pomodoros_validar on public.academy_pomodoros;
create trigger academy_pomodoros_validar
  before insert on public.academy_pomodoros
  for each row execute function public.academy_validar_pomodoro();

alter table public.academy_pomodoros enable row level security;
drop policy if exists "academy pomodoros: ler" on public.academy_pomodoros;
create policy "academy pomodoros: ler" on public.academy_pomodoros for select to authenticated
  using (user_id = auth.uid() or public.academy_is_admin());
drop policy if exists "academy pomodoros: inserir" on public.academy_pomodoros;
create policy "academy pomodoros: inserir" on public.academy_pomodoros for insert to authenticated
  with check (user_id = auth.uid());
revoke all on public.academy_pomodoros from anon;
revoke update, delete on public.academy_pomodoros from authenticated;
grant select, insert on public.academy_pomodoros to authenticated;

-- Ranking: a ofensiva agora exige, no mesmo dia, p_meta flashcards E pelo menos 1 pomodoro sem dispersão.
create or replace function public.academy_ranking(p_curso text, p_versao int, p_meta int)
returns table (user_id uuid, nome text, provas_feitas int, media numeric, ofensiva int)
language sql stable security definer set search_path = public
as $$
  with revisoes as (
    select l.user_id, (l.reviewed_at at time zone 'America/Sao_Paulo')::date as dia
    from public.academy_review_log l
    group by 1, 2
    having count(*) >= p_meta
  ),
  -- Pomodoro de estudo com 5 min ou mais fora da plataforma (disperso) não conta
  -- (mesmo número de ACADEMY_REGRAS.limiteForaMinutos, no content/curso.js)
  focos as (
    select distinct p.user_id, (p.concluido_em at time zone 'America/Sao_Paulo')::date as dia
    from public.academy_pomodoros p
    where p.tipo = 'execucao' or p.fora_segundos < 300
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
    group by q.user_id, q.aula, q.tipo
  ),
  participantes as (
    select distinct l.user_id from public.academy_review_log l where l.curso = p_curso
    union
    select distinct q.user_id from public.academy_quiz_attempts q where q.curso = p_curso
  )
  select p.id, p.nome, count(pr.nota)::int, round(avg(pr.nota), 1), coalesce(max(a.ofensiva), 0)::int
  from participantes pa
  join public.academy_profiles p on p.id = pa.user_id
  left join provas pr on pr.user_id = p.id
  left join atual a on a.user_id = p.id
  group by p.id, p.nome;
$$;

revoke execute on function public.academy_ranking(text, int, int) from public, anon;
grant execute on function public.academy_ranking(text, int, int) to authenticated;
