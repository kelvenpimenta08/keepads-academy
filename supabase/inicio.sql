-- Início da contagem da competição --------------------------------------------------
-- Rodar no SQL Editor do projeto keepads-academy ANTES de pomodoro.sql, temporada.sql e relatorio.sql.
-- Pode rodar de novo sem problema.
--
-- Tudo o que foi feito antes deste momento não pontua para ninguém: placar da Temporada,
-- ofensiva do ranking e ranking de foco começam do zero aqui. O estudo antigo continua
-- valendo para a agenda dos flashcards e para o relatório pessoal.
-- Para mudar: update public.academy_config set valor = '2026-11-04 00:00:00-03' where chave = 'inicio_contagem';
-- (A tabela academy_config é criada pelo supabase/seguranca.sql.)
insert into public.academy_config (chave, valor) values ('inicio_contagem', '2026-11-04 00:00:00-03')
  on conflict (chave) do update set valor = excluded.valor;

create or replace function public.academy_inicio_contagem()
returns timestamptz
language sql stable security definer set search_path = public
as $$
  select coalesce((select valor::timestamptz from public.academy_config where chave = 'inicio_contagem'), '-infinity'::timestamptz);
$$;
revoke execute on function public.academy_inicio_contagem() from public, anon;
grant execute on function public.academy_inicio_contagem() to authenticated;
