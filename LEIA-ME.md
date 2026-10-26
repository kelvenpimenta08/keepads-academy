# Keepads Academy

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
update public.profiles set is_admin = true where email = 'email-da-pessoa@exemplo.com';
```

---

## Como adicionar as próximas aulas

1. Copie `content/aula-01.js` para `content/aula-02.js` e troque:
   - `window.AULAS[1]` por `window.AULAS[2]` e `numero: 1` por `numero: 2`;
   - todos os ids `a1-...` por `a2-...` (**nunca reaproveite ids**: o progresso é salvo por id);
   - o conteúdo (flashcards, prova teórica e partes práticas com as perguntas).
   Dica: peça ao Claude: *"Leia a transcrição da Aula 02 e gere o content/aula-02.js no mesmo formato da aula-01.js."*
2. Em `index.html`, tire o comentário da linha `<script src="content/aula-02.js"></script>`.
3. Em `content/curso.js`, troque o título da aula 2 e mude `disponivel` para `true`.
4. Suba os arquivos alterados no GitHub (**Add file → Upload files**, por cima dos antigos).

Depois que a equipe começar a estudar, evite mudar o texto de um card a ponto de mudar o sentido dele. Correções pequenas não têm problema.

## Estrutura

```
index.html          página única
css/style.css       identidade visual Keepads
js/config.js        URL e chave pública do Supabase
js/srs.js           algoritmo de revisão espaçada (estilo Anki / SM-2)
js/app.js           telas, login, provas, nota, certificado, equipe
content/curso.js    lista das 6 aulas, pesos e nota mínima
content/aula-01.js  flashcards, prova teórica, partes práticas da Aula 01
supabase/schema.sql tabelas e regras de segurança
```

## Limitação conhecida

A correção das provas acontece no navegador. Para um treinamento interno isso basta, mas alguém com conhecimento técnico conseguiria gravar uma nota falsa direto pela API. Se o certificado passar a valer fora da empresa, o próximo passo é mover a correção para uma função no Supabase.
