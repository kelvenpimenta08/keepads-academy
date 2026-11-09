-- Acessos da equipe (só administradores veem) -------------------------------------
-- Rodar uma vez no SQL Editor do projeto keepads-academy. Pode rodar de novo sem problema.
--
-- 1) Cada vez que alguém abre o Academy (ou volta para a aba), o app anota o acesso,
--    no máximo um a cada 10 minutos por pessoa, com o tipo de aparelho.
-- 2) A tela "Acessos" do administrador junta esses acessos com tudo o que a pessoa fez
--    (flashcards, pomodoros, práticas, provas, simulados) e monta as sessões de uso:
--    de que horas a que horas cada pessoa usou o sistema em cada dia.

create table if not exists public.academy_acessos (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  em timestamptz not null default now(),
  dispositivo text
);
create index if not exists academy_acessos_user_idx on public.academy_acessos (user_id, em);
alter table public.academy_acessos enable row level security;
-- Ninguém lê nem grava direto: só pelas funções abaixo
revoke all on public.academy_acessos from anon, authenticated;

-- Anota o acesso de quem está logado (ignora se já anotou nos últimos 10 minutos)
create or replace function public.academy_registrar_acesso(p_dispositivo text default null)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if not public.academy_membro() then return; end if;
  if exists (select 1 from public.academy_acessos
             where user_id = auth.uid() and em > now() - interval '10 minutes') then
    return;
  end if;
  insert into public.academy_acessos (user_id, dispositivo)
  values (auth.uid(), case when p_dispositivo in ('celular', 'computador', 'app') then p_dispositivo end);
end;
$$;
revoke execute on function public.academy_registrar_acesso(text) from public, anon;
grant execute on function public.academy_registrar_acesso(text) to authenticated;

-- Sessões de uso da equipe entre p_inicio e p_fim. Uma sessão é uma sequência de atividades
-- com no máximo 40 minutos de intervalo entre uma e outra. Só administradores recebem dados.
create or replace function public.academy_sessoes_equipe(p_inicio timestamptz, p_fim timestamptz)
returns table (
  user_id uuid, inicio timestamptz, fim timestamptz,
  cards int, pomodoros int, praticas int, provas int, simulados int, aberturas int, dispositivo text)
language sql stable security definer set search_path = public
as $$
  with ev as (
    select l.user_id, l.reviewed_at as t, 'card'::text as k, null::text as disp from public.academy_review_log l
      where l.reviewed_at >= p_inicio and l.reviewed_at < p_fim
    union all select p.user_id, p.iniciado_em, 'pomo_ini', null from public.academy_pomodoros p
      where p.iniciado_em >= p_inicio and p.iniciado_em < p_fim
    union all select p.user_id, p.concluido_em, 'pomo', null from public.academy_pomodoros p
      where p.concluido_em >= p_inicio and p.concluido_em < p_fim
    union all select i.user_id, i.iniciado_em, 'pomo_ini', null from public.academy_pomodoro_inicios i
      where i.iniciado_em >= p_inicio and i.iniciado_em < p_fim
    union all select c.user_id, c.done_at, 'pratica', null from public.academy_practice_checks c
      where c.done and c.done_at >= p_inicio and c.done_at < p_fim
    union all select q.user_id, q.created_at, 'prova', null from public.academy_quiz_attempts q
      where q.created_at >= p_inicio and q.created_at < p_fim
    union all select s.user_id, s.created_at, 'simulado', null from public.academy_simulados s
      where s.created_at >= p_inicio and s.created_at < p_fim
    union all select tr.user_id, tr.created_at, 'trava', null from public.academy_travas tr
      where tr.created_at >= p_inicio and tr.created_at < p_fim
    union all select a.user_id, a.em, 'acesso', a.dispositivo from public.academy_acessos a
      where a.em >= p_inicio and a.em < p_fim
  ),
  marcado as (
    -- 40 minutos: um pomodoro de execução (30 min fora da plataforma) não parte a sessão em duas
    select ev.*, case when ev.t - lag(ev.t) over (partition by ev.user_id order by ev.t) > interval '40 minutes' then 1 else 0 end as nova
    from ev
  ),
  grupos as (
    select m.*, sum(m.nova) over (partition by m.user_id order by m.t) as g from marcado m
  )
  select g.user_id, min(g.t), max(g.t),
    (count(*) filter (where g.k = 'card'))::int,
    (count(*) filter (where g.k = 'pomo'))::int,
    (count(*) filter (where g.k = 'pratica'))::int,
    (count(*) filter (where g.k = 'prova'))::int,
    (count(*) filter (where g.k = 'simulado'))::int,
    (count(*) filter (where g.k = 'acesso'))::int,
    (array_agg(g.disp order by g.t desc) filter (where g.disp is not null))[1]
  from grupos g
  where public.academy_is_admin()
  group by g.user_id, g.g
  order by 2;
$$;
revoke execute on function public.academy_sessoes_equipe(timestamptz, timestamptz) from public, anon;
grant execute on function public.academy_sessoes_equipe(timestamptz, timestamptz) to authenticated;

-- Última vez que cada pessoa usou o sistema (qualquer atividade ou acesso). Só para administradores.
create or replace function public.academy_ultimo_uso()
returns table (user_id uuid, ultimo timestamptz)
language sql stable security definer set search_path = public
as $$
  select p.id, greatest(
    (select max(l.reviewed_at) from public.academy_review_log l where l.user_id = p.id),
    (select max(x.concluido_em) from public.academy_pomodoros x where x.user_id = p.id),
    (select max(c.done_at) from public.academy_practice_checks c where c.user_id = p.id and c.done),
    (select max(q.created_at) from public.academy_quiz_attempts q where q.user_id = p.id),
    (select max(s.created_at) from public.academy_simulados s where s.user_id = p.id),
    (select max(a.em) from public.academy_acessos a where a.user_id = p.id))
  from public.academy_profiles p
  where public.academy_is_admin();
$$;
revoke execute on function public.academy_ultimo_uso() from public, anon;
grant execute on function public.academy_ultimo_uso() to authenticated;
