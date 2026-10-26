-- Keepads Academy: banco de dados (Supabase / Postgres)
-- Projeto próprio no Supabase (keepads-academy), separado dos outros sistemas da agência.
-- Cada pessoa só lê e grava o próprio progresso. Administradores do Academy leem o de todos.

-- Perfis --------------------------------------------------------------------
create table public.academy_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null default '',
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.academy_profiles enable row level security;

create or replace function public.academy_is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce((select is_admin from public.academy_profiles where id = auth.uid()), false);
$$;

-- O perfil é criado pelo próprio app no primeiro login.
-- O e-mail vem do token de login e a primeira pessoa a entrar vira administradora.
create or replace function public.academy_preparar_perfil()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  new.email := lower(coalesce(auth.jwt() ->> 'email', new.email));
  new.is_admin := not exists (select 1 from public.academy_profiles where is_admin);
  return new;
end;
$$;

create trigger academy_profiles_preparar
  before insert on public.academy_profiles
  for each row execute function public.academy_preparar_perfil();

create policy "academy perfil: ler o proprio ou admin" on public.academy_profiles
  for select to authenticated using (id = auth.uid() or public.academy_is_admin());
create policy "academy perfil: criar o proprio" on public.academy_profiles
  for insert to authenticated with check (id = auth.uid());
create policy "academy perfil: editar o proprio" on public.academy_profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Ninguém consegue se promover a admin pelo app: só id, nome e e-mail entram, e só o nome muda.
revoke all on public.academy_profiles from anon, authenticated;
grant select on public.academy_profiles to authenticated;
grant insert (id, nome, email) on public.academy_profiles to authenticated;
grant update (nome) on public.academy_profiles to authenticated;

-- Estado de cada flashcard (revisão espaçada) ------------------------------
create table public.academy_card_states (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  card_id text not null,
  aula smallint not null,
  ease real not null default 2.5,
  interval_days integer not null default 0,
  reps integer not null default 0,
  lapses integer not null default 0,
  due timestamptz not null default now(),
  last_review timestamptz,
  primary key (user_id, card_id)
);

-- Histórico de respostas dos flashcards
create table public.academy_review_log (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  card_id text not null,
  aula smallint not null,
  nota smallint not null check (nota between 1 and 4),
  reviewed_at timestamptz not null default now()
);
create index academy_review_log_user_idx on public.academy_review_log (user_id);

-- Partes práticas marcadas como "Executei"
create table public.academy_practice_checks (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  aula smallint not null,
  task_id text not null,
  done boolean not null default false,
  done_at timestamptz,
  primary key (user_id, aula, task_id)
);

-- Tentativas das provas teórica e prática
create table public.academy_quiz_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  aula smallint not null,
  tipo text not null check (tipo in ('teorica', 'pratica')),
  acertos integer not null,
  total integer not null,
  nota numeric(5, 2) not null check (nota between 0 and 100),
  respostas jsonb,
  created_at timestamptz not null default now()
);
create index academy_quiz_attempts_user_idx on public.academy_quiz_attempts (user_id);

-- Regras de acesso (RLS) ----------------------------------------------------
alter table public.academy_card_states enable row level security;
alter table public.academy_review_log enable row level security;
alter table public.academy_practice_checks enable row level security;
alter table public.academy_quiz_attempts enable row level security;

create policy "academy cards: ler" on public.academy_card_states for select to authenticated
  using (user_id = auth.uid() or public.academy_is_admin());
create policy "academy cards: inserir" on public.academy_card_states for insert to authenticated
  with check (user_id = auth.uid());
create policy "academy cards: atualizar" on public.academy_card_states for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "academy log: ler" on public.academy_review_log for select to authenticated
  using (user_id = auth.uid() or public.academy_is_admin());
create policy "academy log: inserir" on public.academy_review_log for insert to authenticated
  with check (user_id = auth.uid());

create policy "academy praticas: ler" on public.academy_practice_checks for select to authenticated
  using (user_id = auth.uid() or public.academy_is_admin());
create policy "academy praticas: inserir" on public.academy_practice_checks for insert to authenticated
  with check (user_id = auth.uid());
create policy "academy praticas: atualizar" on public.academy_practice_checks for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "academy provas: ler" on public.academy_quiz_attempts for select to authenticated
  using (user_id = auth.uid() or public.academy_is_admin());
create policy "academy provas: inserir" on public.academy_quiz_attempts for insert to authenticated
  with check (user_id = auth.uid());

revoke all on public.academy_card_states, public.academy_review_log,
  public.academy_practice_checks, public.academy_quiz_attempts from anon;
revoke delete on public.academy_card_states, public.academy_review_log,
  public.academy_practice_checks, public.academy_quiz_attempts from authenticated;
revoke execute on function public.academy_is_admin() from anon;

-- Vários cursos: cada registro guarda de qual curso/mentoria ele é
alter table public.academy_card_states add column if not exists curso text not null default 'adriano-ia-trafego';
alter table public.academy_review_log add column if not exists curso text not null default 'adriano-ia-trafego';
alter table public.academy_practice_checks add column if not exists curso text not null default 'adriano-ia-trafego';
alter table public.academy_quiz_attempts add column if not exists curso text not null default 'adriano-ia-trafego';

-- Prova: uma tentativa a cada 30 dias (por pessoa, curso, aula, tipo e versão da prova)
create or replace function public.academy_bloquear_refazer()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if exists (
    select 1 from public.academy_quiz_attempts q
    where q.user_id = new.user_id and q.curso = new.curso and q.aula = new.aula and q.tipo = new.tipo
      and coalesce(q.respostas ->> '_versao', '') = coalesce(new.respostas ->> '_versao', '')
      and q.created_at > now() - interval '30 days'
  ) then
    raise exception 'Você já fez esta prova. A próxima tentativa libera 30 dias depois da anterior.';
  end if;
  return new;
end;
$$;

create trigger academy_quiz_refazer
  before insert on public.academy_quiz_attempts
  for each row execute function public.academy_bloquear_refazer();

-- Ranking de uma mentoria: melhor nota de cada prova (da versão atual) e ofensiva de cada pessoa.
-- Ofensiva = dias seguidos (horário de Brasília) com pelo menos p_meta flashcards revisados, em qualquer curso.
-- Participa do ranking quem já estudou ou fez prova naquela mentoria.
create or replace function public.academy_ranking(p_curso text, p_versao int, p_meta int)
returns table (user_id uuid, nome text, provas_feitas int, media numeric, ofensiva int)
language sql stable security definer set search_path = public
as $$
  with dias as (
    select l.user_id, (l.reviewed_at at time zone 'America/Sao_Paulo')::date as dia
    from public.academy_review_log l
    group by 1, 2
    having count(*) >= p_meta
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

-- A primeira pessoa que entrar no Academy vira administradora. Para promover outra depois:
-- update public.academy_profiles set is_admin = true where email = 'email-da-pessoa@exemplo.com';
