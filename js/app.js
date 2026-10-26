(function () {
  "use strict";

  const CFG = window.APP_CONFIG || {};
  const CURSO = window.CURSO;
  const AULAS = window.AULAS;
  const SRS = window.SRS;

  const configurado = /^https:\/\/.+\.supabase\.co\/?$/.test(CFG.SUPABASE_URL || "") &&
    !!CFG.SUPABASE_KEY && !CFG.SUPABASE_KEY.startsWith("COLE");
  const sb = configurado ? window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY) : null;
  const app = document.getElementById("app");

  // Tabelas do Academy no Supabase (prefixo academy_ para não misturar com outros sistemas)
  const T = {
    perfis: "academy_profiles",
    cards: "academy_card_states",
    log: "academy_review_log",
    praticas: "academy_practice_checks",
    provas: "academy_quiz_attempts"
  };

  // Estado da sessão no navegador
  const S = {
    session: null,
    perfil: null,
    dados: null,          // progresso do usuário logado
    recuperacao: false,   // veio do link "esqueci a senha"
    revisao: null,        // sessão de flashcards em andamento
    prova: null           // prova em andamento
  };

  // ---------- utilidades ----------

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function dois(n) { return String(n).padStart(2, "0"); }

  function embaralhar(lista) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function toast(msg, tipo) {
    const el = document.createElement("div");
    el.className = "toast " + (tipo || "ok");
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.classList.add("sai"); }, 2600);
    setTimeout(function () { el.remove(); }, 3100);
  }

  function traduzErro(e) {
    const m = (e && e.message) || String(e);
    if (/Invalid login credentials/i.test(m)) return "E-mail ou senha incorretos.";
    if (/Email not confirmed/i.test(m)) return "Confirme seu e-mail pelo link que enviamos antes de entrar.";
    if (/User already registered/i.test(m)) return "Esse e-mail já tem conta. Use a aba Entrar.";
    if (/Password should be at least/i.test(m)) return "A senha precisa ter pelo menos 6 caracteres.";
    if (/rate limit/i.test(m)) return "Muitas tentativas seguidas. Espere alguns minutos e tente de novo.";
    if (/Failed to fetch|NetworkError/i.test(m)) return "Sem conexão com o servidor. Verifique a internet.";
    return m;
  }

  function dataBR(d) {
    const x = new Date(d);
    return dois(x.getDate()) + "/" + dois(x.getMonth() + 1) + "/" + x.getFullYear();
  }

  function urlBase() { return location.origin + location.pathname; }

  // ---------- dados ----------

  function montarDados(cards, checks, provas) {
    const d = { cards: {}, checks: {}, provas: provas || [] };
    (cards || []).forEach(function (c) { d.cards[c.card_id] = c; });
    (checks || []).forEach(function (c) { d.checks[c.aula + ":" + c.task_id] = c; });
    return d;
  }

  async function carregarPerfil() {
    const u = S.session.user;
    let r = await sb.from(T.perfis).select("*").eq("id", u.id).maybeSingle();
    if (r.error) throw r.error;
    if (!r.data) {
      // Primeiro acesso ao Academy: cria o perfil com o nome informado no cadastro
      const nome = (u.user_metadata && u.user_metadata.nome) || "";
      const ins = await sb.from(T.perfis).insert({ id: u.id, nome: nome, email: u.email });
      if (ins.error) throw ins.error;
      r = await sb.from(T.perfis).select("*").eq("id", u.id).maybeSingle();
      if (r.error) throw r.error;
    }
    S.perfil = r.data || { id: u.id, nome: "", is_admin: false };
  }

  async function carregarDados() {
    const uid = S.session.user.id;
    const res = await Promise.all([
      sb.from(T.cards).select("*").eq("user_id", uid),
      sb.from(T.praticas).select("*").eq("user_id", uid),
      sb.from(T.provas).select("aula,tipo,nota,acertos,total,created_at").eq("user_id", uid).order("created_at", { ascending: false })
    ]);
    res.forEach(function (r) { if (r.error) throw r.error; });
    S.dados = montarDados(res[0].data, res[1].data, res[2].data);
  }

  function resumoAula(n, dados) {
    const aula = AULAS[n];
    if (!aula) return null;
    const P = CURSO.pesos;
    function melhor(tipo) {
      const xs = dados.provas.filter(function (p) { return p.aula === n && p.tipo === tipo; });
      return xs.length ? Math.max.apply(null, xs.map(function (p) { return Number(p.nota); })) : null;
    }
    const teorica = melhor("teorica");
    const pratica = melhor("pratica");
    const feitas = aula.pratica.filter(function (t) {
      const c = dados.checks[n + ":" + t.id];
      return c && c.done;
    }).length;
    const checklist = Math.round(feitas / aula.pratica.length * 100);
    const nota = Math.round((teorica || 0) * P.teorica + (pratica || 0) * P.pratica + checklist * P.checklist);
    const agora = new Date();
    let novos = 0, vencidos = 0, dominados = 0;
    aula.flashcards.forEach(function (c) {
      const st = dados.cards[c.id];
      if (!st) novos++;
      else {
        if (new Date(st.due) <= agora) vencidos++;
        if (Number(st.interval_days) >= 7) dominados++;
      }
    });
    return {
      teorica: teorica, pratica: pratica, checklist: checklist,
      feitas: feitas, totalTarefas: aula.pratica.length,
      nota: nota,
      aprovado: teorica !== null && pratica !== null && nota >= CURSO.notaMinima,
      novos: novos, vencidos: vencidos, dominados: dominados, totalCards: aula.flashcards.length
    };
  }

  function proximaRevisao(n) {
    const datas = AULAS[n].flashcards
      .map(function (c) { return S.dados.cards[c.id]; })
      .filter(Boolean)
      .map(function (s) { return new Date(s.due); });
    if (!datas.length) return null;
    return new Date(Math.min.apply(null, datas));
  }

  // ---------- layout ----------

  function marca() {
    return '<span class="logo">keep<b>ads</b></span><span class="logo-sub">Academy</span>';
  }

  function layout(conteudo) {
    const nome = (S.perfil && S.perfil.nome) || (S.session && S.session.user.email) || "";
    app.innerHTML =
      '<header class="topo"><div class="topo-in">' +
      '<a href="#/" class="marca">' + marca() + "</a>" +
      '<nav class="menu">' +
      '<a href="#/">Aulas</a>' +
      '<a href="#/certificado">Certificado</a>' +
      (S.perfil && S.perfil.is_admin ? '<a href="#/equipe">Equipe</a>' : "") +
      '<a href="#/perfil" class="menu-perfil">' + esc(nome.split(" ")[0]) + "</a>" +
      "</nav></div></header>" +
      '<main class="conteudo">' + conteudo + "</main>";
  }

  function barra(pct, classe) {
    return '<div class="barra ' + (classe || "") + '"><span style="width:' + Math.max(0, Math.min(100, pct)) + '%"></span></div>';
  }

  function chipStatus(r) {
    if (!r) return '<span class="chip chip-cinza">Em breve</span>';
    if (r.aprovado) return '<span class="chip chip-ok">Aprovada</span>';
    const comecou = r.novos < r.totalCards || r.feitas > 0 || r.teorica !== null;
    return comecou ? '<span class="chip chip-aviso">Em andamento</span>' : '<span class="chip chip-cinza">Não iniciada</span>';
  }

  // ---------- telas: configuração e login ----------

  function telaConfig() {
    app.innerHTML =
      '<div class="auth"><div class="auth-card">' +
      '<div class="auth-marca">' + marca() + "</div>" +
      "<h1>Falta conectar o banco de dados</h1>" +
      '<p class="muted">Abra o arquivo <code>js/config.js</code> e cole a URL e a chave <b>anon</b> do projeto do Supabase. O passo a passo completo está no <code>LEIA-ME.md</code>.</p>' +
      "</div></div>";
  }

  function telaLogin(modo, aviso) {
    modo = modo || "entrar";
    const abas =
      '<div class="abas-auth">' +
      '<button data-modo="entrar" class="' + (modo === "entrar" ? "ativo" : "") + '">Entrar</button>' +
      '<button data-modo="criar" class="' + (modo === "criar" ? "ativo" : "") + '">Criar conta</button>' +
      "</div>";
    let form;
    if (modo === "criar") {
      form =
        '<label>Nome completo<input name="nome" required autocomplete="name" placeholder="Como vai sair no certificado"></label>' +
        '<label>E-mail<input name="email" type="email" required autocomplete="email"></label>' +
        '<label>Senha<input name="senha" type="password" required minlength="6" autocomplete="new-password" placeholder="Mínimo de 6 caracteres"></label>' +
        '<button class="btn btn-primario btn-largo" type="submit">Criar conta</button>';
    } else if (modo === "esqueci") {
      form =
        '<p class="muted">Digite seu e-mail. Vamos mandar um link para você criar uma senha nova.</p>' +
        '<label>E-mail<input name="email" type="email" required autocomplete="email"></label>' +
        '<button class="btn btn-primario btn-largo" type="submit">Enviar link</button>' +
        '<button type="button" class="link" data-modo="entrar">Voltar para o login</button>';
    } else {
      form =
        '<label>E-mail<input name="email" type="email" required autocomplete="email"></label>' +
        '<label>Senha<input name="senha" type="password" required autocomplete="current-password"></label>' +
        '<button class="btn btn-primario btn-largo" type="submit">Entrar</button>' +
        '<button type="button" class="link" data-modo="esqueci">Esqueci minha senha</button>' +
        '<p class="muted pequeno centro">Já usa o sistema interno da Keepads com e-mail e senha? Entre com os mesmos dados.</p>';
    }

    app.innerHTML =
      '<div class="auth">' +
      '<section class="auth-hero"><div class="auth-marca">' + marca() + "</div>" +
      "<h1>" + esc(CURSO.titulo) + "</h1>" +
      "<p>Revisão espaçada no estilo Anki, provas teóricas e práticas e certificação da equipe Keepads.</p></section>" +
      '<section class="auth-card">' + (modo === "esqueci" ? "<h2>Recuperar senha</h2>" : abas) +
      (aviso ? '<div class="aviso">' + esc(aviso) + "</div>" : "") +
      '<form id="form-auth">' + form + '<div class="erro" id="erro-auth"></div></form>' +
      "</section></div>";

    app.querySelectorAll("[data-modo]").forEach(function (b) {
      b.addEventListener("click", function () { telaLogin(b.dataset.modo); });
    });

    document.getElementById("form-auth").addEventListener("submit", async function (ev) {
      ev.preventDefault();
      const f = new FormData(ev.target);
      const botao = ev.target.querySelector("button[type=submit]");
      const erro = document.getElementById("erro-auth");
      erro.textContent = "";
      botao.disabled = true;
      try {
        if (modo === "criar") {
          const r = await sb.auth.signUp({
            email: f.get("email"),
            password: f.get("senha"),
            options: { data: { nome: String(f.get("nome")).trim() }, emailRedirectTo: urlBase() }
          });
          if (r.error) throw r.error;
          if (!r.data.session) telaLogin("entrar", "Conta criada! Confirme seu e-mail pelo link que enviamos e depois entre aqui.");
        } else if (modo === "esqueci") {
          const r = await sb.auth.resetPasswordForEmail(f.get("email"), { redirectTo: urlBase() });
          if (r.error) throw r.error;
          telaLogin("entrar", "Se o e-mail tiver conta, o link para criar uma senha nova já está na sua caixa de entrada.");
        } else {
          const r = await sb.auth.signInWithPassword({ email: f.get("email"), password: f.get("senha") });
          if (r.error) throw r.error;
        }
      } catch (e) {
        erro.textContent = traduzErro(e);
        botao.disabled = false;
      }
    });
  }

  function telaNovaSenha() {
    app.innerHTML =
      '<div class="auth"><section class="auth-card">' +
      '<div class="auth-marca">' + marca() + "</div><h2>Crie sua senha nova</h2>" +
      '<form id="form-senha"><label>Nova senha<input name="senha" type="password" minlength="6" required autocomplete="new-password"></label>' +
      '<button class="btn btn-primario btn-largo" type="submit">Salvar senha</button><div class="erro" id="erro-senha"></div></form>' +
      "</section></div>";
    document.getElementById("form-senha").addEventListener("submit", async function (ev) {
      ev.preventDefault();
      const r = await sb.auth.updateUser({ password: new FormData(ev.target).get("senha") });
      if (r.error) { document.getElementById("erro-senha").textContent = traduzErro(r.error); return; }
      S.recuperacao = false;
      toast("Senha atualizada.");
      location.hash = "#/";
      rotear();
    });
  }

  // ---------- tela inicial ----------

  function telaInicio() {
    const aulas = CURSO.aulas.map(function (a) {
      return { info: a, r: a.disponivel && AULAS[a.numero] ? resumoAula(a.numero, S.dados) : null };
    });
    const aprovadas = aulas.filter(function (x) { return x.r && x.r.aprovado; }).length;
    const paraHoje = aulas.reduce(function (s, x) { return s + (x.r ? x.r.vencidos + x.r.novos : 0); }, 0);
    const primeiroNome = ((S.perfil && S.perfil.nome) || "").split(" ")[0];

    const cards = aulas.map(function (x) {
      const a = x.info, r = x.r;
      if (!r) {
        return '<article class="aula-card bloqueada"><div class="aula-num">Aula ' + dois(a.numero) + "</div>" +
          "<h3>" + esc(a.titulo) + "</h3>" + chipStatus(null) +
          '<p class="muted">O conteúdo entra aqui assim que a aula acontecer.</p></article>';
      }
      const revisar = r.vencidos + r.novos;
      return '<article class="aula-card"><div class="aula-topo"><div class="aula-num">Aula ' + dois(a.numero) + "</div>" + chipStatus(r) + "</div>" +
        "<h3>" + esc(a.titulo) + "</h3>" +
        '<div class="aula-nota"><b>' + r.nota + '</b><span>/100</span></div>' +
        '<ul class="aula-metricas">' +
        "<li><span>Flashcards dominados</span><b>" + r.dominados + "/" + r.totalCards + "</b>" + barra(r.dominados / r.totalCards * 100) + "</li>" +
        "<li><span>Partes práticas executadas</span><b>" + r.feitas + "/" + r.totalTarefas + "</b>" + barra(r.checklist) + "</li>" +
        "<li><span>Prova teórica</span><b>" + (r.teorica === null ? "—" : Math.round(r.teorica)) + "</b>" + barra(r.teorica || 0) + "</li>" +
        "<li><span>Prova prática</span><b>" + (r.pratica === null ? "—" : Math.round(r.pratica)) + "</b>" + barra(r.pratica || 0) + "</li>" +
        "</ul>" +
        '<div class="aula-acoes">' +
        (revisar ? '<a class="btn btn-primario" href="#/aula/' + a.numero + '/revisao">Revisar agora (' + revisar + ")</a>" : '<span class="ok-hoje">Revisão em dia</span>') +
        '<a class="btn btn-secundario" href="#/aula/' + a.numero + '/pratica">Abrir aula</a>' +
        "</div></article>";
    }).join("");

    layout(
      '<section class="hero"><div>' +
      '<p class="hero-kicker">' + esc(CURSO.subtitulo) + "</p>" +
      "<h1>Olá" + (primeiroNome ? ", " + esc(primeiroNome) : "") + "!</h1>" +
      "<p>" + (paraHoje ? "Você tem <b>" + paraHoje + " flashcards</b> para revisar hoje." : "Nenhum flashcard pendente hoje. Bom trabalho!") + "</p></div>" +
      '<div class="hero-stats"><div><b>' + aprovadas + "/" + CURSO.aulas.length + "</b><span>aulas aprovadas</span></div>" +
      "<div><b>" + CURSO.notaMinima + "</b><span>nota mínima</span></div></div></section>" +
      '<section class="grade-aulas">' + cards + "</section>" +
      '<section class="metodo"><h2>Como estudar para fixar de verdade</h2><ol>' +
      "<li><b>Faça a parte prática antes de reler.</b> Execute cada tarefa e marque “Executei”.</li>" +
      "<li><b>Responda em voz alta antes de virar o card.</b> Lembrar sem olhar é o que fixa.</li>" +
      "<li><b>Seja honesto no botão.</b> Errei, Difícil, Bom ou Fácil: o sistema agenda a próxima revisão sozinho.</li>" +
      "<li><b>Volte todo dia por 10 minutos.</b> Os cards reaparecem no intervalo certo (1 dia, 3 dias, 1 semana, 1 mês…).</li>" +
      "<li><b>Aplique em 48 horas</b> em um cliente real. O que vira uso não precisa ser decorado.</li>" +
      "</ol></section>"
    );
  }

  // ---------- tela da aula ----------

  const ABAS = [
    ["revisao", "Revisão"],
    ["pratica", "Partes práticas"],
    ["teorica", "Prova teórica"],
    ["prova-pratica", "Prova prática"],
    ["nota", "Nota"]
  ];

  function telaAula(n, aba) {
    const aula = AULAS[n];
    const info = CURSO.aulas.find(function (a) { return a.numero === n; });
    if (!aula || !info || !info.disponivel) { location.hash = "#/"; return; }
    if (S.revisao && (S.revisao.aula !== n || aba !== "revisao")) S.revisao = null;
    const tipoProva = aba === "teorica" ? "teorica" : aba === "prova-pratica" ? "pratica" : null;
    if (S.prova && (S.prova.aula !== n || S.prova.tipo !== tipoProva)) S.prova = null;

    const r = resumoAula(n, S.dados);
    const abas = ABAS.map(function (x) {
      return '<a href="#/aula/' + n + "/" + x[0] + '" class="' + (x[0] === aba ? "ativo" : "") + '">' + x[1] + "</a>";
    }).join("");

    let corpo;
    if (aba === "pratica") corpo = corpoPratica(n, aula, r);
    else if (aba === "teorica") corpo = corpoProva(n, "teorica", r);
    else if (aba === "prova-pratica") corpo = corpoProva(n, "pratica", r);
    else if (aba === "nota") corpo = corpoNota(n, r);
    else corpo = corpoRevisao(n, aula, r);

    layout(
      '<a href="#/" class="voltar">← Todas as aulas</a>' +
      '<header class="aula-cabeca"><div><div class="aula-num">Aula ' + dois(n) + "</div><h1>" + esc(aula.titulo) + "</h1>" +
      '<p class="muted">' + esc(aula.resumo) + "</p></div>" +
      '<div class="aula-cabeca-nota"><b>' + r.nota + "</b><span>nota atual</span>" + chipStatus(r) + "</div></header>" +
      '<nav class="abas">' + abas + "</nav>" +
      '<section id="corpo-aula">' + corpo + "</section>"
    );
    ligarAula(n, aba);
  }

  function ligarAula(n, aba) {
    // Durante a revisão, o card fica no topo da tela (no celular o cabeçalho empurra ele para baixo)
    const blocoRevisao = document.querySelector(".revisao");
    if (blocoRevisao) blocoRevisao.scrollIntoView({ block: "start" });
    if (aba === "revisao") ligarRevisao(n);
    else if (aba === "pratica") ligarPratica(n);
    else if (aba === "teorica") ligarProva(n, "teorica");
    else if (aba === "prova-pratica") ligarProva(n, "pratica");
  }

  // ----- revisão (flashcards) -----

  function corpoRevisao(n, aula, r) {
    const rv = S.revisao;
    if (rv && rv.fim) {
      const prox = proximaRevisao(n);
      return '<div class="painel centro"><h2>Sessão concluída!</h2>' +
        "<p>Você revisou <b>" + rv.feitos + "</b> card(s)" + (rv.livre ? " no modo livre" : "") + ".</p>" +
        (prox && !rv.livre ? '<p class="muted">Próxima revisão: <b>' + dataBR(prox) + "</b>. Volte nesse dia para manter a memória.</p>" : "") +
        '<div class="linha-botoes"><button class="btn btn-secundario" id="rv-sair">Voltar ao resumo</button></div></div>';
    }
    if (rv) {
      const id = rv.fila[0];
      const card = aula.flashcards.find(function (c) { return c.id === id; });
      const estado = S.dados.cards[id];
      const pct = rv.total ? rv.feitos / rv.total * 100 : 0;
      const botoes = [[1, "Errei"], [2, "Difícil"], [3, "Bom"], [4, "Fácil"]].map(function (b) {
        const prazo = rv.livre ? (b[0] === 1 ? "de novo" : "ok") : SRS.rotulo(estado, b[0]);
        return '<button class="nota-btn nota-' + b[0] + '" data-nota="' + b[0] + '"><b>' + b[1] + "</b><span>" + prazo + "</span><kbd>" + b[0] + "</kbd></button>";
      }).join("");
      return '<div class="revisao">' +
        '<div class="revisao-topo"><span>' + (rv.livre ? "Revisão livre (não altera a agenda)" : "Revisão de hoje") + "</span>" +
        "<span>" + rv.feitos + " de " + rv.total + "</span></div>" + barra(pct) +
        '<article class="flashcard' + (rv.virado ? " virado" : "") + '">' +
        '<div class="fc-rotulo">Pergunta</div><div class="fc-texto">' + esc(card.pergunta) + "</div>" +
        (rv.virado
          ? '<div class="fc-divisor"></div><div class="fc-rotulo">Resposta</div><div class="fc-texto fc-resposta">' + esc(card.resposta) + "</div>"
          : '<p class="fc-dica">Responda em voz alta antes de virar o card.</p>') +
        "</article>" +
        (rv.virado
          ? '<div class="notas">' + botoes + "</div>"
          : '<button class="btn btn-primario btn-largo" id="rv-virar">Mostrar resposta <kbd>espaço</kbd></button>') +
        '<button class="link" id="rv-sair">Encerrar sessão</button></div>';
    }

    const pendentes = r.vencidos + r.novos;
    const prox = proximaRevisao(n);
    return '<div class="painel">' +
      '<div class="stats-revisao">' +
      "<div><b>" + r.novos + "</b><span>novos</span></div>" +
      "<div><b>" + r.vencidos + "</b><span>para revisar</span></div>" +
      "<div><b>" + r.dominados + "</b><span>dominados (7+ dias)</span></div>" +
      "<div><b>" + r.totalCards + "</b><span>total</span></div></div>" +
      (pendentes
        ? '<button class="btn btn-primario btn-largo" id="rv-iniciar">Começar revisão (' + pendentes + " cards)</button>"
        : '<p class="centro">Tudo em dia! ' + (prox ? "Próxima revisão em <b>" + dataBR(prox) + "</b>." : "") + "</p>") +
      '<button class="btn btn-secundario btn-largo" id="rv-livre">Revisão livre: todos os ' + r.totalCards + " cards, sem mexer na agenda</button>" +
      '<p class="muted pequeno">Como funciona: depois de ver a resposta, avalie de 1 a 4. Errou, o card volta em 10 minutos. Acertou, ele some e reaparece cada vez mais espaçado (1 dia, 3 dias, ~1 semana, ~3 semanas…). É o mesmo princípio do Anki.</p>' +
      "</div>";
  }

  function iniciarRevisao(n, livre) {
    const aula = AULAS[n];
    const agora = new Date();
    let ids;
    if (livre) ids = embaralhar(aula.flashcards.map(function (c) { return c.id; }));
    else {
      const vencidos = aula.flashcards.filter(function (c) { const s = S.dados.cards[c.id]; return s && new Date(s.due) <= agora; })
        .sort(function (a, b) { return new Date(S.dados.cards[a.id].due) - new Date(S.dados.cards[b.id].due); })
        .map(function (c) { return c.id; });
      const novos = aula.flashcards.filter(function (c) { return !S.dados.cards[c.id]; }).map(function (c) { return c.id; });
      ids = vencidos.concat(novos);
    }
    S.revisao = { aula: n, fila: ids, total: ids.length, feitos: 0, virado: false, livre: livre, fim: ids.length === 0 };
    telaAula(n, "revisao");
  }

  async function avaliar(n, nota) {
    const rv = S.revisao;
    if (!rv || !rv.virado || rv.salvando) return;
    const id = rv.fila[0];
    if (!rv.livre) {
      rv.salvando = true;
      const novo = SRS.proximo(S.dados.cards[id], nota);
      const linha = Object.assign({ user_id: S.session.user.id, card_id: id, aula: n }, novo);
      const r1 = await sb.from(T.cards).upsert(linha);
      rv.salvando = false;
      if (r1.error) { toast("Não consegui salvar: " + traduzErro(r1.error), "erro"); return; }
      S.dados.cards[id] = linha;
      sb.from(T.log).insert({ user_id: S.session.user.id, card_id: id, aula: n, nota: nota }).then(function () {});
    }
    rv.fila.shift();
    if (nota === 1) rv.fila.push(id); // errou: volta no fim da fila desta sessão
    else rv.feitos += 1;
    rv.virado = false;
    if (!rv.fila.length) rv.fim = true;
    telaAula(n, "revisao");
  }

  function ligarRevisao(n) {
    const q = function (id) { return document.getElementById(id); };
    if (q("rv-iniciar")) q("rv-iniciar").onclick = function () { iniciarRevisao(n, false); };
    if (q("rv-livre")) q("rv-livre").onclick = function () { iniciarRevisao(n, true); };
    if (q("rv-virar")) q("rv-virar").onclick = function () { S.revisao.virado = true; telaAula(n, "revisao"); };
    if (q("rv-sair")) q("rv-sair").onclick = function () { S.revisao = null; telaAula(n, "revisao"); };
    document.querySelectorAll("[data-nota]").forEach(function (b) {
      b.onclick = function () { avaliar(n, Number(b.dataset.nota)); };
    });
  }

  document.addEventListener("keydown", function (ev) {
    const rv = S.revisao;
    if (!rv || rv.fim || ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA") return;
    if (!rv.virado && (ev.code === "Space" || ev.key === "Enter")) {
      ev.preventDefault();
      rv.virado = true;
      telaAula(rv.aula, "revisao");
    } else if (rv.virado && /^[1-4]$/.test(ev.key)) {
      avaliar(rv.aula, Number(ev.key));
    }
  });

  // ----- partes práticas (checklist) -----

  function corpoPratica(n, aula, r) {
    const itens = aula.pratica.map(function (t, i) {
      const c = S.dados.checks[n + ":" + t.id];
      const feito = !!(c && c.done);
      return '<li class="tarefa' + (feito ? " feita" : "") + '">' +
        '<label class="tarefa-check"><input type="checkbox" data-tarefa="' + t.id + '"' + (feito ? " checked" : "") + "><span>Executei</span></label>" +
        '<div class="tarefa-texto"><div class="tarefa-num">Prática ' + (i + 1) + "</div><h3>" + esc(t.titulo) + "</h3><p>" + esc(t.descricao) + "</p>" +
        (feito && c.done_at ? '<p class="muted pequeno">Marcado em ' + dataBR(c.done_at) + "</p>" : "") +
        "</div></li>";
    }).join("");
    const todas = r.feitas === r.totalTarefas;
    return '<div class="painel">' +
      '<div class="linha-progresso"><span><b>' + r.feitas + "</b> de " + r.totalTarefas + " partes práticas executadas</span>" + barra(r.checklist) + "</div>" +
      '<p class="muted">Estas são as partes práticas citadas na aula. Marque “Executei” só depois de fazer de verdade. Com tudo marcado, a prova prática é liberada.</p>' +
      '<ul class="tarefas">' + itens + "</ul>" +
      (todas ? '<a class="btn btn-primario btn-largo" href="#/aula/' + n + '/prova-pratica">Fazer a prova prática</a>' : "") +
      "</div>";
  }

  function ligarPratica(n) {
    document.querySelectorAll("[data-tarefa]").forEach(function (cb) {
      cb.onchange = async function () {
        cb.disabled = true;
        const linha = {
          user_id: S.session.user.id, aula: n, task_id: cb.dataset.tarefa,
          done: cb.checked, done_at: cb.checked ? new Date().toISOString() : null
        };
        const r = await sb.from(T.praticas).upsert(linha);
        if (r.error) { cb.checked = !cb.checked; cb.disabled = false; toast("Não consegui salvar: " + traduzErro(r.error), "erro"); return; }
        S.dados.checks[n + ":" + linha.task_id] = linha;
        telaAula(n, "pratica");
      };
    });
  }

  // ----- provas (teórica e prática) -----

  function questoesDa(n, tipo) {
    const aula = AULAS[n];
    if (tipo === "teorica") return aula.prova_teorica;
    return aula.pratica.reduce(function (acc, t) { return acc.concat(t.perguntas || []); }, []);
  }

  function corpoProva(n, tipo, r) {
    const nomeProva = tipo === "teorica" ? "Prova teórica" : "Prova prática";
    if (tipo === "pratica" && r.feitas < r.totalTarefas) {
      return '<div class="painel centro"><h2>Prova prática bloqueada</h2>' +
        "<p>Execute e marque todas as partes práticas primeiro (" + r.feitas + " de " + r.totalTarefas + " feitas).</p>" +
        '<a class="btn btn-primario" href="#/aula/' + n + '/pratica">Ir para as partes práticas</a></div>';
    }
    const p = S.prova;
    if (p && p.resultado) {
      const lista = p.questoes.map(function (q, i) {
        const marcada = p.respostas[q.id];
        const acertou = marcada === q.correta;
        return '<li class="corr ' + (acertou ? "certo" : "errado") + '"><div class="corr-q"><b>' + (i + 1) + ".</b> " + esc(q.pergunta) + "</div>" +
          (acertou ? "" : '<div class="corr-sua">Sua resposta: ' + esc(q.opcoesOrig[marcada]) + "</div>") +
          '<div class="corr-certa">Correta: ' + esc(q.opcoesOrig[q.correta]) + "</div>" +
          '<div class="corr-exp">' + esc(q.explicacao) + "</div></li>";
      }).join("");
      const ok = p.resultado.nota >= CURSO.notaMinima;
      return '<div class="painel"><div class="resultado ' + (ok ? "ok" : "baixo") + '"><b>' + Math.round(p.resultado.nota) + "</b><span>" +
        p.resultado.acertos + " de " + p.resultado.total + " acertos</span><p>" +
        (ok ? "Mandou bem! Revise as que errou abaixo." : "Ainda abaixo de " + CURSO.notaMinima + ". Revise as explicações e os flashcards e tente de novo.") + "</p></div>" +
        '<ol class="correcao">' + lista + "</ol>" +
        '<div class="linha-botoes"><button class="btn btn-primario" id="pv-iniciar">Fazer de novo</button><a class="btn btn-secundario" href="#/aula/' + n + '/nota">Ver nota da aula</a></div></div>';
    }
    if (p) {
      const respondidas = Object.keys(p.respostas).length;
      const qs = p.questoes.map(function (q, i) {
        const ops = q.ordem.map(function (oi) {
          return '<label class="opcao"><input type="radio" name="' + q.id + '" value="' + oi + '"' + (p.respostas[q.id] === oi ? " checked" : "") + "><span>" + esc(q.opcoesOrig[oi]) + "</span></label>";
        }).join("");
        return '<li class="questao"><div class="questao-q"><b>' + (i + 1) + ".</b> " + esc(q.pergunta) + "</div>" + ops + "</li>";
      }).join("");
      return '<div class="painel"><h2>' + nomeProva + "</h2>" +
        '<ol class="questoes">' + qs + "</ol>" +
        '<div class="rodape-prova"><span id="pv-contagem">' + respondidas + " de " + p.questoes.length + ' respondidas</span>' +
        '<button class="btn btn-primario" id="pv-enviar"' + (respondidas < p.questoes.length ? " disabled" : "") + ">Enviar respostas</button></div></div>";
    }
    const tentativas = S.dados.provas.filter(function (x) { return x.aula === n && x.tipo === tipo; });
    const melhor = tipo === "teorica" ? r.teorica : r.pratica;
    const total = questoesDa(n, tipo).length;
    return '<div class="painel centro"><h2>' + nomeProva + "</h2>" +
      "<p>" + total + " questões de múltipla escolha" + (tipo === "pratica" ? " sobre a execução das partes práticas" : " sobre os conceitos da aula") + ". A ordem muda a cada tentativa e vale a sua melhor nota.</p>" +
      (tentativas.length
        ? '<p class="muted">Melhor nota: <b>' + Math.round(melhor) + "</b> · Tentativas: " + tentativas.length + " · Última: " + dataBR(tentativas[0].created_at) + "</p>"
        : '<p class="muted">Você ainda não fez esta prova.</p>') +
      '<button class="btn btn-primario" id="pv-iniciar">' + (tentativas.length ? "Fazer de novo" : "Começar prova") + "</button></div>";
  }

  function iniciarProva(n, tipo) {
    S.prova = {
      aula: n, tipo: tipo, respostas: {}, resultado: null,
      questoes: embaralhar(questoesDa(n, tipo)).map(function (q) {
        return {
          id: q.id, pergunta: q.pergunta, explicacao: q.explicacao, correta: q.correta,
          opcoesOrig: q.opcoes, ordem: embaralhar(q.opcoes.map(function (_, i) { return i; }))
        };
      })
    };
  }

  function ligarProva(n, tipo) {
    const aba = tipo === "teorica" ? "teorica" : "prova-pratica";
    const ini = document.getElementById("pv-iniciar");
    if (ini) ini.onclick = function () { iniciarProva(n, tipo); telaAula(n, aba); window.scrollTo(0, 0); };

    document.querySelectorAll(".questoes input[type=radio]").forEach(function (rd) {
      rd.onchange = function () {
        S.prova.respostas[rd.name] = Number(rd.value);
        const feitas = Object.keys(S.prova.respostas).length;
        document.getElementById("pv-contagem").textContent = feitas + " de " + S.prova.questoes.length + " respondidas";
        document.getElementById("pv-enviar").disabled = feitas < S.prova.questoes.length;
      };
    });

    const env = document.getElementById("pv-enviar");
    if (env) env.onclick = async function () {
      const p = S.prova;
      env.disabled = true;
      const acertos = p.questoes.filter(function (q) { return p.respostas[q.id] === q.correta; }).length;
      const nota = Math.round(acertos / p.questoes.length * 10000) / 100;
      const linha = { user_id: S.session.user.id, aula: n, tipo: tipo, acertos: acertos, total: p.questoes.length, nota: nota, respostas: p.respostas };
      const r = await sb.from(T.provas).insert(linha).select("aula,tipo,nota,acertos,total,created_at").single();
      if (r.error) { env.disabled = false; toast("Não consegui salvar a prova: " + traduzErro(r.error), "erro"); return; }
      S.dados.provas.unshift(r.data);
      p.resultado = { acertos: acertos, total: p.questoes.length, nota: nota };
      telaAula(n, aba);
      window.scrollTo(0, 0);
    };
  }

  // ----- nota da aula -----

  function corpoNota(n, r) {
    const P = CURSO.pesos;
    function linha(nome, valor, peso, link) {
      const v = valor === null ? "—" : Math.round(valor);
      return "<tr><td>" + nome + "</td><td>" + Math.round(peso * 100) + "%</td><td><b>" + v + '</b></td><td>' + barra(valor || 0) + "</td><td>" +
        (link ? '<a href="' + link + '">Abrir</a>' : "") + "</td></tr>";
    }
    const falta = [];
    if (r.teorica === null) falta.push("fazer a prova teórica");
    if (r.feitas < r.totalTarefas) falta.push("executar e marcar todas as partes práticas");
    if (r.pratica === null) falta.push("fazer a prova prática");
    if (!falta.length && !r.aprovado) falta.push("subir a nota refazendo as provas (vale a melhor)");
    return '<div class="painel">' +
      '<div class="resultado ' + (r.aprovado ? "ok" : "baixo") + '"><b>' + r.nota + "</b><span>" +
      (r.aprovado ? "Aula aprovada" : "Nota mínima: " + CURSO.notaMinima) + "</span></div>" +
      '<table class="tabela"><thead><tr><th>Componente</th><th>Peso</th><th>Nota</th><th></th><th></th></tr></thead><tbody>' +
      linha("Prova teórica", r.teorica, P.teorica, "#/aula/" + n + "/teorica") +
      linha("Prova prática", r.pratica, P.pratica, "#/aula/" + n + "/prova-pratica") +
      linha("Partes práticas executadas", r.checklist, P.checklist, "#/aula/" + n + "/pratica") +
      "</tbody></table>" +
      (falta.length ? '<p class="muted">Para ser aprovado nesta aula falta: ' + falta.join("; ") + ".</p>" : "") +
      '<p class="muted pequeno">Os flashcards não entram na nota: eles são a ferramenta para você chegar bem nas provas e não esquecer depois.</p></div>';
  }

  // ---------- certificado ----------

  function telaCertificado(modelo) {
    const situacao = CURSO.aulas.map(function (a) {
      const r = a.disponivel && AULAS[a.numero] ? resumoAula(a.numero, S.dados) : null;
      return { a: a, r: r };
    });
    const completo = situacao.every(function (x) { return x.r && x.r.aprovado; });
    const nome = (S.perfil && S.perfil.nome) || S.session.user.email;

    if (completo || (modelo && S.perfil && S.perfil.is_admin)) {
      const notas = situacao.map(function (x) { return x.r ? x.r.nota : 0; });
      const media = Math.round(notas.reduce(function (s, v) { return s + v; }, 0) / notas.length);
      const codigo = S.session.user.id.replace(/-/g, "").slice(0, 10).toUpperCase();
      layout(
        '<div class="sem-imprimir linha-botoes"><a href="#/" class="voltar">← Voltar</a><button class="btn btn-primario" onclick="window.print()">Imprimir / salvar em PDF</button></div>' +
        (completo ? "" : '<div class="aviso sem-imprimir">Modelo de visualização (somente administradores). O certificado real só libera com as 6 aulas aprovadas.</div>') +
        '<article class="certificado"><div class="cert-borda">' +
        '<div class="cert-marca">' + marca() + "</div>" +
        '<p class="cert-kicker">Certificado de conclusão</p>' +
        "<p>Certificamos que</p><h1>" + esc(nome) + "</h1>" +
        "<p>concluiu o programa de estudos interno da Keepads referente à<br><b>" + esc(CURSO.titulo) + "</b>,<br>com aprovação nas " + CURSO.aulas.length + " aulas e média final <b>" + media + "</b>.</p>" +
        '<div class="cert-aulas">' + situacao.map(function (x) {
          return "<span>Aula " + dois(x.a.numero) + " · <b>" + (x.r ? x.r.nota : "—") + "</b></span>";
        }).join("") + "</div>" +
        '<div class="cert-rodape"><div><b>' + dataBR(new Date()) + "</b><span>Data de emissão</span></div>" +
        "<div><b>" + codigo + "</b><span>Código do aluno</span></div></div>" +
        "</div></article>"
      );
      return;
    }

    const itens = situacao.map(function (x) {
      return "<li><span>Aula " + dois(x.a.numero) + " · " + esc(x.a.titulo) + "</span>" + chipStatus(x.r) + "</li>";
    }).join("");
    layout(
      '<div class="painel centro"><h1>Certificado</h1>' +
      "<p>O certificado libera quando as " + CURSO.aulas.length + " aulas estiverem aprovadas (nota " + CURSO.notaMinima + " ou mais em cada uma).</p>" +
      '<ul class="lista-cert">' + itens + "</ul>" +
      (S.perfil && S.perfil.is_admin ? '<a class="btn btn-secundario" href="#/certificado/modelo">Ver modelo do certificado</a>' : "") +
      "</div>"
    );
  }

  // ---------- equipe (admin) ----------

  async function telaEquipe() {
    if (!S.perfil || !S.perfil.is_admin) { location.hash = "#/"; return; }
    layout('<div class="painel centro"><p>Carregando a equipe…</p></div>');
    const res = await Promise.all([
      sb.from(T.perfis).select("id,nome,email,created_at").order("nome"),
      sb.from(T.cards).select("user_id,card_id,aula,interval_days,due"),
      sb.from(T.praticas).select("user_id,aula,task_id,done"),
      sb.from(T.provas).select("user_id,aula,tipo,nota,created_at")
    ]);
    const falhou = res.find(function (r) { return r.error; });
    if (falhou) { layout('<div class="painel"><p class="erro">' + esc(traduzErro(falhou.error)) + "</p></div>"); return; }

    const disponiveis = CURSO.aulas.filter(function (a) { return a.disponivel && AULAS[a.numero]; });
    const linhas = res[0].data.map(function (p) {
      const dados = montarDados(
        res[1].data.filter(function (x) { return x.user_id === p.id; }),
        res[2].data.filter(function (x) { return x.user_id === p.id; }),
        res[3].data.filter(function (x) { return x.user_id === p.id; })
      );
      const resumos = disponiveis.map(function (a) { return resumoAula(a.numero, dados); });
      const aprovadas = resumos.filter(function (r) { return r.aprovado; }).length;
      const ultima = dados.provas.concat([]).map(function (x) { return new Date(x.created_at); });
      return { p: p, resumos: resumos, aprovadas: aprovadas, ultima: ultima.length ? new Date(Math.max.apply(null, ultima)) : null };
    }).sort(function (a, b) { return b.aprovadas - a.aprovadas || (b.resumos[0] ? b.resumos[0].nota : 0) - (a.resumos[0] ? a.resumos[0].nota : 0); });

    const cab = disponiveis.map(function (a) { return "<th>Aula " + dois(a.numero) + "</th>"; }).join("");
    const corpo = linhas.map(function (l) {
      return "<tr><td><b>" + esc(l.p.nome || "(sem nome)") + '</b><div class="muted pequeno">' + esc(l.p.email || "") + "</div></td>" +
        l.resumos.map(function (r) {
          return "<td><b>" + r.nota + "</b> " + chipStatus(r) + '<div class="muted pequeno">' + r.dominados + "/" + r.totalCards + " cards · " + r.feitas + "/" + r.totalTarefas + " práticas</div></td>";
        }).join("") +
        "<td><b>" + l.aprovadas + "/" + CURSO.aulas.length + "</b></td>" +
        "<td>" + (l.ultima ? dataBR(l.ultima) : "—") + "</td></tr>";
    }).join("");

    layout(
      '<h1>Equipe</h1><p class="muted">Progresso de todo mundo que criou conta. ' + linhas.length + " pessoa(s).</p>" +
      '<div class="tabela-rolagem"><table class="tabela"><thead><tr><th>Pessoa</th>' + cab + "<th>Aprovadas</th><th>Última prova</th></tr></thead><tbody>" + corpo + "</tbody></table></div>"
    );
  }

  // ---------- perfil ----------

  function telaPerfil() {
    layout(
      '<div class="painel estreito"><h1>Meu perfil</h1>' +
      '<form id="form-perfil"><label>Nome completo (sai no certificado)<input name="nome" required value="' + esc(S.perfil.nome) + '"></label>' +
      '<label>E-mail<input value="' + esc(S.session.user.email) + '" disabled></label>' +
      '<button class="btn btn-primario" type="submit">Salvar</button></form>' +
      '<hr><button class="btn btn-secundario" id="sair">Sair da conta</button></div>'
    );
    document.getElementById("form-perfil").onsubmit = async function (ev) {
      ev.preventDefault();
      const nome = String(new FormData(ev.target).get("nome")).trim();
      const r = await sb.from(T.perfis).update({ nome: nome }).eq("id", S.session.user.id);
      if (r.error) { toast(traduzErro(r.error), "erro"); return; }
      S.perfil.nome = nome;
      toast("Nome atualizado.");
      telaPerfil();
    };
    document.getElementById("sair").onclick = async function () {
      await sb.auth.signOut();
      location.hash = "#/";
    };
  }

  // ---------- roteador ----------

  async function rotear() {
    if (!configurado) return telaConfig();
    if (S.recuperacao) return telaNovaSenha();
    if (!S.session) return telaLogin();
    try {
      if (!S.perfil || !S.dados) {
        app.innerHTML = '<div class="carregando">Carregando…</div>';
        await carregarPerfil();
        await carregarDados();
      }
      const partes = location.hash.replace(/^#\/?/, "").split("/");
      switch (partes[0]) {
        case "": return telaInicio();
        case "aula": return telaAula(Number(partes[1]), partes[2] || "revisao");
        case "certificado": return telaCertificado(partes[1] === "modelo");
        case "equipe": return telaEquipe();
        case "perfil": return telaPerfil();
        default: location.hash = "#/";
      }
    } catch (e) {
      app.innerHTML = '<div class="auth"><section class="auth-card"><h2>Algo deu errado</h2><p class="erro">' + esc(traduzErro(e)) +
        '</p><button class="btn btn-primario" onclick="location.reload()">Tentar de novo</button></section></div>';
    }
  }

  async function iniciar() {
    if (!configurado) return rotear();
    const r = await sb.auth.getSession();
    S.session = r.data.session;
    sb.auth.onAuthStateChange(function (evento, session) {
      const trocouUsuario = (session ? session.user.id : null) !== (S.session ? S.session.user.id : null);
      S.session = session;
      if (evento === "PASSWORD_RECOVERY") { S.recuperacao = true; rotear(); return; }
      if (trocouUsuario) {
        S.perfil = null; S.dados = null; S.revisao = null; S.prova = null;
        setTimeout(rotear, 0);
      }
    });
    window.addEventListener("hashchange", rotear);
    rotear();
  }

  iniciar();
})();
