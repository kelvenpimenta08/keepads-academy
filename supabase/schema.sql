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

-- A primeira pessoa que entrar no Academy vira administradora. Para promover outra depois:
-- update public.academy_profiles set is_admin = true where email = 'email-da-pessoa@exemplo.com';
