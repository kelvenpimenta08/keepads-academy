-- Temporadas (competição de 90 dias) ------------------------------------------
-- Rodar uma vez no SQL Editor do projeto keepads-academy. Pode rodar de novo sem problema.

-- A revisão livre vale metade do XP: o log passa a guardar se a revisão foi livre.
alter table public.academy_review_log add column if not exists livre boolean not null default false;
-- Toda parte prática marcada na temporada precisa de um relato curto do que foi feito.
alter table public.academy_practice_checks add column if not exists relato text;

-- Placar de uma temporada: XP de cada pessoa entre p_inicio e p_fim (datas de Brasília).
-- Os pontos vêm do app (TEMPORADA_PONTOS em content/curso.js) em p_regras, e
-- p_praticas traz quantas partes práticas cada aula tem, ex.: {"1": 9, "2": 9}.
-- Todos os perfis aparecem no placar, mesmo quem ainda não pontuou.
create or replace function public.academy_temporada(
  p_curso text, p_inicio date, p_fim date, p_versao int, p_regras jsonb, p_praticas jsonb)
returns table (
  user_id uuid, nome text, is_admin boolean,
  xp_total numeric, xp_semana numeric, xp_reta_final numeric,
  xp_revisao numeric, xp_meta numeric, xp_ofensiva numeric, xp_dominados numeric,
  xp_praticas numeric, xp_provas numeric, xp_aulas numeric,
  revisoes int, dias_meta int, ofensiva_max int, dominados int, praticas int,
  provas_feitas int, media_provas numeric, max_nota numeric, aulas_aprovadas int)
language sql stable security definer set search_path = public
as $$
  with
  cfg as (
    select
      p_inicio as ini, p_fim as fim,
      (now() at time zone 'America/Sao_Paulo')::date as hoje,
      coalesce((p_regras ->> 'revisao')::numeric, 1) as r_rev,
      coalesce((p_regras ->> 'limiteDia')::numeric, 40) as r_lim,
      coalesce((p_regras ->> 'livre')::numeric, 0.5) as r_livre,
      coalesce((p_regras ->> 'meta')::numeric, 5) as r_meta,
      coalesce((p_regras ->> 'metaDiaria')::int, 5) as r_meta_dia,
      coalesce((p_regras ->> 'dominado')::numeric, 3) as r_dom,
      coalesce((p_regras ->> 'pratica')::numeric, 15) as r_prat,
      coalesce((p_regras ->> 'prova')::numeric, 2) as r_prova,
      coalesce((p_regras ->> 'aula')::numeric, 50) as r_aula,
      coalesce((p_regras ->> 'notaMinima')::numeric, 70) as r_min,
      coalesce((p_regras -> 'pesos' ->> 'teorica')::numeric, 0.4) as w_t,
      coalesce((p_regras -> 'pesos' ->> 'pratica')::numeric, 0.4) as w_p,
      coalesce((p_regras -> 'pesos' ->> 'checklist')::numeric, 0.2) as w_c
  ),
  -- Flashcards: XP por dia, com limite diário; a revisão livre vale menos
  dia_rev as (
    select l.user_id, (l.reviewed_at at time zone 'America/Sao_Paulo')::date as dia,
      count(*) filter (where not l.livre) as normais,
      count(*) filter (where l.livre) as livres,
      count(*) as total
    from public.academy_review_log l cross join cfg
    where l.curso = p_curso
      and (l.reviewed_at at time zone 'America/Sao_Paulo')::date between cfg.ini and cfg.fim
    group by 1, 2
  ),
  ev_rev as (
    select d.user_id, d.dia, 'revisao'::text as tipo,
      least(cfg.r_lim, (d.normais + d.livres * cfg.r_livre) * cfg.r_rev) as xp
    from dia_rev d cross join cfg
  ),
  -- Meta do dia e ofensiva (dias seguidos batendo a meta, dentro da temporada)
  dias_meta as (
    select d.user_id, d.dia from dia_rev d cross join cfg where d.total >= cfg.r_meta_dia
  ),
  ev_meta as (
    select m.user_id, m.dia, 'meta'::text as tipo, cfg.r_meta as xp from dias_meta m cross join cfg
  ),
  seq as (
    select m.user_id, m.dia, m.dia - (row_number() over (partition by m.user_id order by m.dia))::int as grupo
    from dias_meta m
  ),
  seq_pos as (
    select s.user_id, s.dia, row_number() over (partition by s.user_id, s.grupo order by s.dia)::int as pos
    from seq s
  ),
  ev_ofensiva as (
    select sp.user_id, sp.dia, 'ofensiva'::text as tipo, (p_regras -> 'ofensiva' ->> sp.pos::text)::numeric as xp
    from seq_pos sp
    where (p_regras -> 'ofensiva') ? sp.pos::text
  ),
  ofensiva_max as (
    select sp.user_id, max(sp.pos)::int as dias from seq_pos sp group by sp.user_id
  ),
  -- Cards dominados (memória de 7 dias ou mais) cuja última revisão foi na temporada
  ev_dom as (
    select c.user_id, (c.last_review at time zone 'America/Sao_Paulo')::date as dia, 'dominado'::text as tipo, cfg.r_dom as xp
    from public.academy_card_states c cross join cfg
    where c.curso = p_curso and c.interval_days >= 7
      and (c.last_review at time zone 'America/Sao_Paulo')::date between cfg.ini and cfg.fim
  ),
  -- Partes práticas marcadas na temporada, com relato
  ev_prat as (
    select p.user_id, (p.done_at at time zone 'America/Sao_Paulo')::date as dia, 'pratica'::text as tipo, cfg.r_prat as xp
    from public.academy_practice_checks p cross join cfg
    where p.curso = p_curso and p.done and length(trim(coalesce(p.relato, ''))) > 0
      and (p.done_at at time zone 'America/Sao_Paulo')::date between cfg.ini and cfg.fim
  ),
  -- Provas: melhor nota de cada prova feita na temporada (versão atual)
  provas_temp as (
    select distinct on (q.user_id, q.aula, q.tipo) q.user_id, q.aula, q.tipo, q.nota, q.created_at
    from public.academy_quiz_attempts q cross join cfg
    where q.curso = p_curso and q.respostas ->> '_versao' = p_versao::text
      and (q.created_at at time zone 'America/Sao_Paulo')::date between cfg.ini and cfg.fim
    order by q.user_id, q.aula, q.tipo, q.nota desc, q.created_at
  ),
  ev_prova as (
    select pt.user_id, (pt.created_at at time zone 'America/Sao_Paulo')::date as dia, 'prova'::text as tipo, pt.nota * cfg.r_prova as xp
    from provas_temp pt cross join cfg
  ),
  -- Aula aprovada (mesma conta do app: provas + partes práticas, nota mínima), quando aprovada na temporada
  melhores as (
    select q.user_id, q.aula,
      max(q.nota) filter (where q.tipo = 'teorica') as teorica,
      max(q.nota) filter (where q.tipo = 'pratica') as pratica,
      max(q.created_at) as quando
    from public.academy_quiz_attempts q
    where q.curso = p_curso and q.respostas ->> '_versao' = p_versao::text
    group by 1, 2
  ),
  feitas as (
    select p.user_id, p.aula, count(*) as n
    from public.academy_practice_checks p where p.curso = p_curso and p.done group by 1, 2
  ),
  aprovadas as (
    select m.user_id, m.aula, m.quando
    from melhores m
    cross join cfg
    left join feitas f on f.user_id = m.user_id and f.aula = m.aula
    where m.teorica is not null and m.pratica is not null
      and coalesce((p_praticas ->> m.aula::text)::numeric, 0) > 0
      and round(m.teorica * cfg.w_t + m.pratica * cfg.w_p
        + round(coalesce(f.n, 0) / (p_praticas ->> m.aula::text)::numeric * 100) * cfg.w_c) >= cfg.r_min
  ),
  ev_aula as (
    select a.user_id, (a.quando at time zone 'America/Sao_Paulo')::date as dia, 'aula'::text as tipo, cfg.r_aula as xp
    from aprovadas a cross join cfg
    where (a.quando at time zone 'America/Sao_Paulo')::date between cfg.ini and cfg.fim
  ),
  eventos as (
    select * from ev_rev
    union all select * from ev_meta
    union all select * from ev_ofensiva
    union all select * from ev_dom
    union all select * from ev_prat
    union all select * from ev_prova
    union all select * from ev_aula
  ),
  soma as (
    select e.user_id,
      sum(e.xp) as total,
      coalesce(sum(e.xp) filter (where e.dia >= date_trunc('week', cfg.hoje)::date), 0) as semana,
      coalesce(sum(e.xp) filter (where e.dia > cfg.fim - 30), 0) as reta,
      coalesce(sum(e.xp) filter (where e.tipo = 'revisao'), 0) as x_rev,
      coalesce(sum(e.xp) filter (where e.tipo = 'meta'), 0) as x_meta,
      coalesce(sum(e.xp) filter (where e.tipo = 'ofensiva'), 0) as x_of,
      coalesce(sum(e.xp) filter (where e.tipo = 'dominado'), 0) as x_dom,
      coalesce(sum(e.xp) filter (where e.tipo = 'pratica'), 0) as x_prat,
      coalesce(sum(e.xp) filter (where e.tipo = 'prova'), 0) as x_prova,
      coalesce(sum(e.xp) filter (where e.tipo = 'aula'), 0) as x_aula,
      (count(*) filter (where e.tipo = 'meta'))::int as n_meta,
      (count(*) filter (where e.tipo = 'dominado'))::int as n_dom,
      (count(*) filter (where e.tipo = 'pratica'))::int as n_prat,
      (count(*) filter (where e.tipo = 'aula'))::int as n_aula
    from eventos e cross join cfg
    group by e.user_id
  ),
  revs as (
    select d.user_id, sum(d.total)::int as n from dia_rev d group by d.user_id
  ),
  provas_resumo as (
    select pt.user_id, count(*)::int as n, round(avg(pt.nota), 1) as media, max(pt.nota) as maxima
    from provas_temp pt group by pt.user_id
  )
  select pr.id, pr.nome, pr.is_admin,
    round(coalesce(s.total, 0)), round(coalesce(s.semana, 0)), round(coalesce(s.reta, 0)),
    round(coalesce(s.x_rev, 0)), coalesce(s.x_meta, 0), coalesce(s.x_of, 0), coalesce(s.x_dom, 0),
    coalesce(s.x_prat, 0), round(coalesce(s.x_prova, 0)), coalesce(s.x_aula, 0),
    coalesce(r.n, 0), coalesce(s.n_meta, 0), coalesce(o.dias, 0), coalesce(s.n_dom, 0), coalesce(s.n_prat, 0),
    coalesce(pv.n, 0), pv.media, pv.maxima, coalesce(s.n_aula, 0)
  from public.academy_profiles pr
  left join soma s on s.user_id = pr.id
  left join revs r on r.user_id = pr.id
  left join ofensiva_max o on o.user_id = pr.id
  left join provas_resumo pv on pv.user_id = pr.id;
$$;

revoke execute on function public.academy_temporada(text, date, date, int, jsonb, jsonb) from public, anon;
grant execute on function public.academy_temporada(text, date, date, int, jsonb, jsonb) to authenticated;
