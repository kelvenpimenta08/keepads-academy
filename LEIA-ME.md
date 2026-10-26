# Keepads Academy

**No ar em:** https://kelvenpimenta08.github.io/keepads-academy/
**Código:** github.com/kelvenpimenta08/keepads-academy (público)
**Banco:** Supabase, projeto `keepads-academy` (conta keepadsperformance@gmail.com), separado dos outros sistemas da agência.

> Ao atualizar qualquer arquivo no GitHub, aumente o número `?v=` em todas as linhas do `index.html` (ex.: de `?v=2` para `?v=3`). Assim o navegador da equipe baixa a versão nova na hora.

Sistema de estudo da mentoria: revisão espaçada no estilo Anki, partes práticas com "Executei", prova teórica, prova prática, nota por aula, certificado e painel da equipe.

- **Site:** arquivos estáticos (HTML, CSS, JS), hospedados no GitHub Pages.
- **Login e progresso:** Supabase (e-mail e senha; cada pessoa vê só o próprio progresso e o administrador vê o de todos).

## Como funciona a nota

| Componente | Peso |
|---|---|
| Prova teórica (vale a melhor tentativa) | 40% |
| Prova prática (libera depois de marcar todas as partes práticas) | 40% |
| Partes práticas marcadas como "Executei" | 20% |

Aprovado na aula com nota **70 ou mais**, tendo feito as duas provas. O certificado libera com as 6 aulas aprovadas. Pesos e nota mínima ficam em `content/curso.js`.

**Liberação das provas:** as duas provas de uma aula só abrem depois de uma semana de flashcards: todos os cards vistos, 7 dias desde a primeira revisão e revisões em pelo menos 4 dias diferentes. As regras ficam em `liberarProva`, no `content/curso.js`. O administrador consegue liberar só para si, para testar.

**Uma tentativa por prova:** depois de enviar, a pessoa só refaz a prova 30 dias depois, e vale a melhor nota. O banco garante essa regra com o trigger `academy_quiz_refazer`.

**Ofensiva e ranking:** a ofensiva conta os dias seguidos com pelo menos 5 flashcards revisados (`ACADEMY_REGRAS.metaDiaria`, no `content/curso.js`). Cada mentoria tem um ranking pela média das provas, calculado pela função `academy_ranking` no Supabase.

**Versão das provas:** `versaoProvas` no `content/curso.js`. Se as perguntas forem trocadas, aumente esse número: as tentativas antigas deixam de contar na nota.

Os flashcards não entram na nota: são a ferramenta de memorização. Depois de ver a resposta, a pessoa marca Errei, Difícil, Bom ou Fácil, e o card volta em 10 minutos, 1 dia, 3 dias, ~1 semana, ~3 semanas, e assim por diante.

---

## Passo 1: criar o projeto no Supabase (2 minutos, gratuito)

1. Entre em [supabase.com/dashboard](https://supabase.com/dashboard), organização **KeepAds - Softaware Revisão** → **New project**.
2. Nome: `keepads-academy`. Região: **South America (São Paulo)**. Crie uma senha forte para o banco e guarde-a.
3. Quando terminar de criar, avise o Claude: ele roda o `supabase/schema.sql` e preenche o `js/config.js` para você.
   *(Se preferir fazer sozinho: em **SQL Editor**, cole todo o conteúdo de `supabase/schema.sql` e clique em **Run**. Depois copie **Project URL** e a chave **anon / publishable** de **Project Settings → API** para o `js/config.js`.)*

## Passo 2: subir para o GitHub Pages (sem precisar de terminal)

1. Em [github.com/new](https://github.com/new), crie um repositório chamado `keepads-academy`.
   O GitHub Pages gratuito exige repositório **público**. O código e as perguntas ficam visíveis, mas o progresso e as notas de cada pessoa ficam protegidos no Supabase.
2. Na página do repositório: **Add file → Upload files**, arraste **todo o conteúdo** da pasta `keepads-academy` (index.html, css, js, content, supabase, .nojekyll, LEIA-ME.md) e clique em **Commit changes**.
3. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** → **Save**.
4. Em 1 ou 2 minutos o site fica no ar em `https://SEU-USUARIO.github.io/keepads-academy/`.

## Passo 3: configurar o login no Supabase

Em **Authentication → URL Configuration**:
- **Site URL:** `https://SEU-USUARIO.github.io/keepads-academy/`
- **Redirect URLs:** adicione a mesma URL.

Assim os links de confirmação de e-mail e de "esqueci a senha" voltam para o site.

> **Atenção ao limite de e-mails:** o e-mail padrão do Supabase no plano gratuito manda pouquíssimos e-mails por hora. Para cadastrar a equipe toda de uma vez, você pode:
> - desligar a confirmação em **Authentication → Sign In / Providers → Email → Confirm email** (mais simples para uso interno); ou
> - configurar um SMTP próprio em **Authentication → Emails → SMTP Settings**.

## Passo 4: virar administrador

A **primeira conta criada** no site vira administradora automaticamente. Por isso, crie a sua antes de mandar o link para a equipe. O menu **Equipe** aparece com o progresso de todos, junto com o modelo do certificado.

Para promover outra pessoa a administradora depois, rode no **SQL Editor** do Supabase:
```sql
update public.academy_profiles set is_admin = true where email = 'email-da-pessoa@exemplo.com';
```

---

## Vários cursos e mentorias

Depois do login, a pessoa escolhe a mentoria ou o curso. Cada curso tem as próprias aulas, provas, nota, certificado e painel de equipe. O progresso fica separado por curso no banco (coluna `curso`).

Os cursos ficam em `content/curso.js`, na lista `window.CURSOS`. Hoje são dois:
- `adriano-ia-trafego`: Mentoria Agentes de IA para Tráfego Pago (Adriano Gianini)
- `di-santana-growth-commerce`: Mentoria Growth Commerce (Di Santana), ainda sem aulas

**Para criar um curso novo:** copie um bloco da lista, dê um `id` novo (sem espaço nem acento), preencha título, mentor e descrição. Se quiser uma capa, coloque a imagem na pasta `img/` e o caminho em `imagem`. Sem imagem, a capa mostra as iniciais do mentor.

## Como adicionar aulas

1. Crie o arquivo da aula, no mesmo formato de `content/aula-01.js`, registrando em `window.AULAS["id-do-curso"][numero]`.
   - **Os ids precisam ser únicos entre todos os cursos.** Use um prefixo do curso, por exemplo `a2-...` para a Aula 2 do Adriano e `ds-a1-...` para a Aula 1 da Di Santana. Nunca reaproveite um id: o progresso é salvo por ele.
   - Dica: peça ao Claude: *"Leia a transcrição da Aula 02 do Adriano e gere o arquivo da aula no mesmo formato da aula-01.js."*
2. Em `index.html`, acrescente a linha `<script src="content/NOME-DO-ARQUIVO.js?v=..."></script>`.
3. Em `content/curso.js`, no curso certo, troque o título da aula e mude `disponivel` para `true` (ou acrescente a aula na lista `aulas`).
4. Suba os arquivos alterados no GitHub (**Add file → Upload files**, por cima dos antigos) e aumente o `?v=` do `index.html`.

Depois que a equipe começar a estudar, evite mudar o texto de um card a ponto de mudar o sentido dele. Correções pequenas não têm problema.

## Estrutura

```
index.html          página única
css/style.css       identidade visual Keepads
js/config.js        URL e chave pública do Supabase
js/srs.js           algoritmo de revisão espaçada (estilo Anki / SM-2)
js/app.js           telas, login, provas, nota, certificado, equipe
content/curso.js    cursos/mentorias, aulas de cada um, pesos, nota mínima e regras das provas
content/aula-01.js  Aula 01 da mentoria do Adriano: flashcards, prova teórica e partes práticas
supabase/schema.sql tabelas e regras de segurança
```

## Limitação conhecida

A correção das provas acontece no navegador. Para um treinamento interno isso basta, mas alguém com conhecimento técnico conseguiria gravar uma nota falsa direto pela API. Se o certificado passar a valer fora da empresa, o próximo passo é mover a correção para uma função no Supabase.
