-- Simulado (treino para a prova) ------------------------------------------------
-- Rodar uma vez no SQL Editor do projeto keepads-academy. Pode rodar de novo sem problema.
-- Depois rode o supabase/temporada.sql, que dá o bônus de XP do simulado.
--
-- O simulado libera junto com a prova teórica da aula e pode ser refeito à vontade.
-- As perguntas são outras (content/simulados/), para não entregar a prova.
-- A nota do simulado não entra na nota da aula nem no ranking. Só vale um bônus pequeno
-- de XP na temporada: uma vez por aula, ao fazer 3 simulados em dias diferentes.

create table if not exists public.academy_simulados (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  curso text not null,
  aula int not null,
  acertos int not null,
  total int not null,
  nota numeric not null,
  created_at timestamptz not null default now()
);
create index if not exists academy_simulados_user_idx on public.academy_simulados (user_id, curso, aula, created_at);

-- Horário do servidor, nota conferida, prova liberada e um intervalo mínimo entre simulados
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
  -- Mesma liberação da prova: uma semana estudando os flashcards da aula, em 4 dias diferentes
  if not public.academy_is_admin() then
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

drop trigger if exists academy_simulados_validar on public.academy_simulados;
create trigger academy_simulados_validar before insert on public.academy_simulados
  for each row execute function public.academy_validar_simulado();

alter table public.academy_simulados enable row level security;
drop policy if exists "academy simulados: ler" on public.academy_simulados;
create policy "academy simulados: ler" on public.academy_simulados for select to authenticated
  using (user_id = auth.uid() or public.academy_is_admin());
drop policy if exists "academy simulados: inserir" on public.academy_simulados;
create policy "academy simulados: inserir" on public.academy_simulados for insert to authenticated
  with check (user_id = auth.uid() and public.academy_membro());
revoke all on public.academy_simulados from anon;
revoke update, delete on public.academy_simulados from authenticated;
grant select, insert on public.academy_simulados to authenticated;
