-- Relatório de estudo e ranking de foco -----------------------------------------
-- Rodar uma vez no SQL Editor do projeto keepads-academy (depois do pomodoro.sql). Pode rodar de novo.

-- Quanto cada pessoa estudou entre p_inicio e p_fim, em todas as mentorias:
--   pomodoros e minutos de foco (pomodoros concluídos no período);
--   cards revisados e tempo estimado nos cards: o intervalo entre um card e o próximo
--   (até 5 minutos; acima disso é uma sessão nova e o card conta 30 segundos);
--   segundos_extra = tempo nos cards fora de um pomodoro (para somar ao foco sem contar duas vezes);
--   dias = dias diferentes com pomodoro ou revisão.
-- A mesma conta é feita no app (estudoNoPeriodo, em js/app.js) para o relatório pessoal.
create or replace function public.academy_foco(p_inicio timestamptz, p_fim timestamptz)
returns table (user_id uuid, nome text, pomodoros int, minutos_foco int, cards int,
  segundos_cards int, segundos_extra int, dias int)
language sql stable security definer set search_path = public
as $$
  with
  pom as (
    select p.user_id, p.minutos, p.concluido_em
    from public.academy_pomodoros p
    where p.concluido_em >= p_inicio and p.concluido_em < p_fim
  ),
  pom_soma as (
    select p.user_id, count(*)::int as n, sum(p.minutos)::int as m from pom p group by 1
  ),
  rev as (
    select l.user_id, l.reviewed_at,
      l.reviewed_at - lag(l.reviewed_at) over (partition by l.user_id order by l.reviewed_at) as gap
    from public.academy_review_log l
    where l.reviewed_at >= p_inicio and l.reviewed_at < p_fim
  ),
  rev_t as (
    select r.user_id, r.reviewed_at,
      case when r.gap is not null and r.gap <= interval '5 minutes' then extract(epoch from r.gap) else 30 end as s,
      exists (
        select 1 from public.academy_pomodoros p
        where p.user_id = r.user_id and r.reviewed_at between p.iniciado_em and p.concluido_em
      ) as no_foco
    from rev r
  ),
  rev_soma as (
    select t.user_id, count(*)::int as n, round(sum(t.s))::int as s,
      round(coalesce(sum(t.s) filter (where not t.no_foco), 0))::int as extra
    from rev_t t group by 1
  ),
  dias as (
    select x.user_id, count(distinct x.dia)::int as n from (
      select p.user_id, (p.concluido_em at time zone 'America/Sao_Paulo')::date as dia from pom p
      union
      select r.user_id, (r.reviewed_at at time zone 'America/Sao_Paulo')::date from rev r
    ) x group by 1
  )
  select pr.id, pr.nome,
    coalesce(ps.n, 0), coalesce(ps.m, 0), coalesce(rs.n, 0), coalesce(rs.s, 0), coalesce(rs.extra, 0), coalesce(d.n, 0)
  from public.academy_profiles pr
  left join pom_soma ps on ps.user_id = pr.id
  left join rev_soma rs on rs.user_id = pr.id
  left join dias d on d.user_id = pr.id;
$$;

revoke execute on function public.academy_foco(timestamptz, timestamptz) from public, anon;
grant execute on function public.academy_foco(timestamptz, timestamptz) to authenticated;
