-- Feedback para quem travou ------------------------------------------------------
-- Rodar uma vez no SQL Editor do projeto keepads-academy. Pode rodar de novo sem problema.
-- Quando a pessoa fica dias sem estudar (ou com uma aula parada), o app pergunta
-- "O que impediu o próximo passo?" e grava a resposta aqui. Só a própria pessoa e os
-- administradores (liderança e psicóloga) leem.

create table if not exists public.academy_travas (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  motivo text not null check (motivo in ('tempo', 'comecar', 'entender', 'utilidade', 'terminar', 'receio')),
  situacao text not null check (situacao in ('parado', 'aula')),  -- dias sem estudar ou aula parada
  dias_parado int not null default 0 check (dias_parado between 0 and 3650),
  curso text,
  aula int,
  marco text check (length(marco) <= 300),                       -- "Comecei e não terminei": o próximo marco
  prazo date,
  created_at timestamptz not null default now()
);
create index if not exists academy_travas_user_idx on public.academy_travas (user_id, created_at);

alter table public.academy_travas enable row level security;
drop policy if exists "academy travas: ler" on public.academy_travas;
create policy "academy travas: ler" on public.academy_travas for select to authenticated
  using (user_id = auth.uid() or public.academy_is_admin());
drop policy if exists "academy travas: inserir" on public.academy_travas;
create policy "academy travas: inserir" on public.academy_travas for insert to authenticated
  with check (user_id = auth.uid());
revoke all on public.academy_travas from anon;
revoke update, delete on public.academy_travas from authenticated;
grant select, insert on public.academy_travas to authenticated;
