(function () {
  "use strict";

  const CFG = window.APP_CONFIG || {};
  const CURSOS = window.CURSOS || [];
  const TODAS_AULAS = window.AULAS || {};
  const SRS = window.SRS;
  const REGRAS = window.ACADEMY_REGRAS || { metaDiaria: 5, refazerProvaDias: 30 };
  const DIA = 86400000;

  // Curso (mentoria) aberto no momento e as aulas dele
  let CURSO = null;
  let AULAS = {};

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
    provas: "academy_quiz_attempts",
    pomodoros: "academy_pomodoros"
  };

  // Estado da sessão no navegador
  const S = {
    session: null,
    perfil: null,
    bruto: null,          // todo o progresso do usuário logado, de todos os cursos
    porCurso: {},         // progresso organizado por curso (montado sob demanda)
    dados: null,          // progresso do curso aberto
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

  // Só contam as tentativas da versão atual das provas (as antigas eram mais fáceis)
  function provaValida(p) { return Number(p.versao) === CURSO.versaoProvas; }

  function montarDados(cards, checks, provas, log) {
    const d = { cards: {}, checks: {}, provas: (provas || []).filter(provaValida), log: log || [] };
    (cards || []).forEach(function (c) { d.cards[c.card_id] = c; });
    (checks || []).forEach(function (c) { d.checks[c.aula + ":" + c.task_id] = c; });
    return d;
  }

  function diaLocal(d) {
    const x = new Date(d);
    return x.getFullYear() + "-" + dois(x.getMonth() + 1) + "-" + dois(x.getDate());
  }

  // Regra para liberar as provas: uma semana estudando os flashcards da aula
  function liberacaoProva(n, dados, r) {
    const regra = CURSO.liberarProva;
    const log = dados.log.filter(function (l) { return l.aula === n; });
    const primeira = log.length ? new Date(Math.min.apply(null, log.map(function (l) { return new Date(l.reviewed_at); }))) : null;
    const diasDesde = primeira ? Math.floor((Date.now() - primeira.getTime()) / 86400000) : 0;
    const dias = {};
    log.forEach(function (l) { dias[diaLocal(l.reviewed_at)] = true; });
    const diasDistintos = Object.keys(dias).length;
    const vistos = r.totalCards - r.novos;
    const itens = [
      { feito: !regra.todosOsCards || r.novos === 0, texto: "Ver todos os flashcards pelo menos uma vez", progresso: vistos + " de " + r.totalCards },
      { feito: diasDesde >= regra.diasDesdeInicio, texto: "Estudar há pelo menos " + regra.diasDesdeInicio + " dias", progresso: primeira ? diasDesde + " de " + regra.diasDesdeInicio + " dias" : "ainda não começou" },
      { feito: diasDistintos >= regra.diasDeRevisao, texto: "Revisar em pelo menos " + regra.diasDeRevisao + " dias diferentes", progresso: diasDistintos + " de " + regra.diasDeRevisao + " dias" }
    ];
    const libera = primeira ? new Date(primeira.getTime() + regra.diasDesdeInicio * 86400000) : null;
    return { ok: itens.every(function (i) { return i.feito; }), itens: itens, liberaEm: libera };
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
      sb.from(T.provas).select("curso,aula,tipo,nota,acertos,total,created_at,versao:respostas->_versao").eq("user_id", uid).order("created_at", { ascending: false }),
      sb.from(T.log).select("curso,aula,reviewed_at").eq("user_id", uid),
      sb.from(T.pomodoros).select("minutos,iniciado_em,concluido_em,tipo,fora_segundos,saidas").eq("user_id", uid)
    ]);
    res.forEach(function (r) { if (r.error) throw r.error; });
    S.bruto = { cards: res[0].data, checks: res[1].data, provas: res[2].data, log: res[3].data, pomodoros: res[4].data };
    S.porCurso = {};
    S.dados = CURSO ? dadosDoCurso(CURSO) : null;
  }

  // ---------- cursos ----------

  function doCurso(c) { return function (x) { return x.curso === c.id; }; }

  // Progresso de um curso, montado a partir de tudo o que foi carregado (fica em cache)
  function dadosDoCurso(c) {
    if (!S.porCurso[c.id]) {
      S.porCurso[c.id] = comCurso(c, function () {
        return montarDados(
          S.bruto.cards.filter(doCurso(c)), S.bruto.checks.filter(doCurso(c)),
          S.bruto.provas.filter(doCurso(c)), S.bruto.log.filter(doCurso(c))
        );
      });
    }
    return S.porCurso[c.id];
  }

  // Executa algo como se o curso "c" estivesse aberto (usado na tela de escolha de cursos)
  function comCurso(c, fn) {
    const antes = [CURSO, AULAS];
    CURSO = c; AULAS = TODAS_AULAS[c.id] || {};
    try { return fn(); } finally { CURSO = antes[0]; AULAS = antes[1]; }
  }

  function usarCurso(id) {
    const c = CURSOS.find(function (x) { return x.id === id; });
    if (!c) return false;
    if (CURSO !== c) {
      CURSO = c;
      AULAS = TODAS_AULAS[c.id] || {};
      S.revisao = null; S.prova = null; S.provaAdmin = null;
    }
    S.dados = dadosDoCurso(c);
    try { localStorage.setItem("academy-ultimo-curso", c.id); } catch (e) {}
    return true;
  }

  // Curso usado pelos links do menu: o aberto, senão o último visitado, senão o primeiro com aulas.
  function cursoDoMenu() {
    if (CURSO) return CURSO;
    let ultimo = null;
    try { ultimo = localStorage.getItem("academy-ultimo-curso"); } catch (e) {}
    return CURSOS.find(function (c) { return c.id === ultimo; }) ||
      CURSOS.find(function (c) { return c.aulas.some(function (a) { return a.disponivel; }); }) ||
      CURSOS[0];
  }

  // Endereço dentro do curso aberto, ex.: rota("aula/1/revisao") -> "#/c/adriano-ia-trafego/aula/1/revisao"
  function rota(caminho) { return "#/c/" + (CURSO || cursoDoMenu()).id + (caminho ? "/" + caminho : ""); }

  // ---------- ofensiva (estilo Duolingo) ----------
  // Um dia conta quando a pessoa faz pelo menos 1 pomodoro E revisa pelo menos REGRAS.metaDiaria
  // flashcards, de qualquer aula ou curso. O ranking e a temporada usam a mesma regra no banco.
  function calcularOfensiva() {
    const porDia = {}, focoPorDia = {};
    ((S.bruto && S.bruto.log) || []).forEach(function (l) {
      const d = diaLocal(l.reviewed_at);
      porDia[d] = (porDia[d] || 0) + 1;
    });
    ((S.bruto && S.bruto.pomodoros) || []).forEach(function (p) {
      const d = diaLocal(p.concluido_em);
      focoPorDia[d] = (focoPorDia[d] || 0) + 1;
    });
    const meta = REGRAS.metaDiaria;
    const bateu = function (data) { const d = diaLocal(data); return (porDia[d] || 0) >= meta && (focoPorDia[d] || 0) >= 1; };
    const chaveHoje = diaLocal(new Date());
    const hoje = porDia[chaveHoje] || 0;
    const pomodorosHoje = focoPorDia[chaveHoje] || 0;
    const batidaHoje = hoje >= meta && pomodorosHoje >= 1;
    // A sequência vale até ontem: se hoje ainda não bateu a meta, ela não está perdida
    let cursor = new Date(batidaHoje ? Date.now() : Date.now() - DIA);
    let dias = 0;
    while (bateu(cursor)) { dias++; cursor = new Date(cursor.getTime() - DIA); }
    const semana = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * DIA);
      semana.push({ data: d, feito: bateu(d), hoje: i === 0 });
    }
    return { dias: dias, hoje: hoje, meta: meta, pomodorosHoje: pomodorosHoje, batidaHoje: batidaHoje, semana: semana };
  }

  function blocoOfensiva() {
    const o = calcularOfensiva();
    const letras = ["D", "S", "T", "Q", "Q", "S", "S"];
    const bolinhas = o.semana.map(function (d) {
      return '<span class="dia' + (d.feito ? " feito" : "") + (d.hoje ? " hoje" : "") + '"><i>' + (d.feito ? "🔥" : "") + "</i>" + letras[d.data.getDay()] + "</span>";
    }).join("");
    return '<section class="ofensiva">' +
      '<div class="ofensiva-numero"><span class="ofensiva-fogo' + (o.dias > 0 ? " acesa" : "") + '">🔥</span><div><b>' + o.dias + "</b><span>" + (o.dias === 1 ? "dia" : "dias") + " de ofensiva</span></div></div>" +
      '<div class="ofensiva-semana">' + bolinhas + "</div>" +
      '<div class="ofensiva-meta">' + (o.batidaHoje
        ? "<p>Meta de hoje batida: <b>" + o.pomodorosHoje + " pomodoro" + (o.pomodorosHoje > 1 ? "s" : "") + "</b> e <b>" + o.hoje + " flashcards</b>. Volte amanhã para manter a ofensiva.</p>"
        : "<p>Para " + (o.dias ? "manter" : "começar") + " a ofensiva hoje, faça as duas coisas:</p>" +
          '<ul class="ofensiva-checklist">' +
          '<li class="' + (o.pomodorosHoje >= 1 ? "ok" : "") + '">' + (o.pomodorosHoje >= 1 ? "✅" : "🍅") + " 1 pomodoro de " + REGRAS.pomodoroMinutos + " min <small>(" + o.pomodorosHoje + "/1)</small>" +
          (o.pomodorosHoje >= 1 ? "" : ' <button class="link link-inline" data-pomodoro-abrir>começar agora</button>') + "</li>" +
          '<li class="' + (o.hoje >= o.meta ? "ok" : "") + '">' + (o.hoje >= o.meta ? "✅" : "🧠") + " " + o.meta + " flashcards revisados <small>(" + Math.min(o.hoje, o.meta) + "/" + o.meta + ")</small></li></ul>") +
      "</div></section>";
  }

  function aulasDisponiveis(c) {
    return c.aulas.filter(function (a) { return a.disponivel && (TODAS_AULAS[c.id] || {})[a.numero]; });
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

  // Logo oficial Keep Ads: versão "escuro" (ads cinza claro) para fundo preto, "claro" (ads preto) para fundo branco
  function marca(fundo) {
    const logos = CFG.LOGOS || {};
    const src = fundo === "claro" ? logos.claro : logos.escuro;
    return '<span class="logo-img" role="img" aria-label="Keep Ads" style="background-image:url(\'' + encodeURI(src || "") + '\')"></span>' +
      '<span class="logo-sub">Academy</span>';
  }

  function layout(conteudo) {
    const nome = (S.perfil && S.perfil.nome) || (S.session && S.session.user.email) || "";
    const ofensiva = S.bruto ? calcularOfensiva().dias : 0;
    app.innerHTML =
      '<header class="topo"><div class="topo-in">' +
      '<a href="#/" class="marca">' + marca("escuro") + "</a>" +
      '<nav class="menu">' +
      (TEMPORADAS.length ? '<a href="#/temporada" class="menu-temporada">🏆 Temporada</a>' : "") +
      '<a href="#/">Mentorias</a>' +
      (cursoDoMenu()
        ? '<a href="' + rota("") + '">Aulas</a>' +
          '<a href="' + rota("ranking") + '">Ranking</a>' +
          '<a href="' + rota("certificado") + '">Certificado</a>' +
          (S.perfil && S.perfil.is_admin ? '<a href="' + rota("equipe") + '">Equipe</a>' : "")
        : "") +
      '<a href="#/relatorio">Relatório</a>' +
      '<a href="#/como-funciona">Como funciona</a>' +
      (S.bruto ? '<button class="pomodoro-chip" id="pomo-chip" title="Pomodoro: ' + REGRAS.pomodoroMinutos + ' minutos de foco">🍅 <span id="pomo-chip-tempo">Foco</span></button>' : "") +
      (S.bruto ? '<a href="#/" class="ofensiva-chip' + (ofensiva > 0 ? " acesa" : "") + '" title="Ofensiva: dias seguidos com 1 pomodoro e ' + REGRAS.metaDiaria + ' flashcards"><span class="fogo">🔥</span> ' + ofensiva + "</a>" : "") +
      '<a href="#/perfil" class="menu-perfil">' + esc(nome.split(" ")[0]) + "</a>" +
      "</nav></div></header>" +
      '<main class="conteudo">' + conteudo + "</main>";
    efeitos();
    pomoAtualizar();
  }

  // ---------- animações (inspiradas nos componentes do 21st.dev) ----------
  // Spotlight Card, Border Beam, Shimmer Button, contador de números e confete.
  // Contador, barras e entrada só rodam quando a tela muda, não a cada clique dentro dela.
  function efeitos() {
    const main = app.querySelector(".conteudo");
    const telaNova = S.ultimaTela !== location.hash;
    S.ultimaTela = location.hash;
    const calmo = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    app.querySelectorAll(".curso-card, .aula-card:not(.bloqueada), .podio-lugar, .premio, .banner-temporada").forEach(function (el) {
      el.classList.add("spot");
      el.addEventListener("pointermove", function (ev) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (ev.clientX - r.left) + "px");
        el.style.setProperty("--my", (ev.clientY - r.top) + "px");
      });
    });
    app.querySelectorAll(".aula-card, .podio-lugar.lugar-1, .certificado, .premio-principal").forEach(function (el) {
      if (!el.classList.contains("aula-card") || el.querySelector(".chip-ok")) el.classList.add("beam");
    });
    const cta = main.querySelector(".btn-primario");
    if (cta) cta.classList.add("brilho");

    const festa = main.querySelector("[data-festa]");
    if (festa && !calmo) confete();
    if (!telaNova || calmo) return;

    main.classList.add("entrar");
    main.querySelectorAll(".hero-stats b, .stats-revisao b, .aula-nota b, .aula-cabeca-nota b, .ofensiva-numero b, .podio-nota, .resultado b").forEach(contar);
    const barras = main.querySelectorAll(".barra span");
    barras.forEach(function (s) { s.dataset.w = s.style.width; s.style.width = "0"; });
    setTimeout(function () {
      barras.forEach(function (s) { s.classList.add("encher"); s.style.width = s.dataset.w; });
    }, 30);
  }

  // Number Ticker: o número do começo do texto sobe de 0 até o valor (ex.: "2/6" anima o 2).
  function contar(el) {
    const m = el.textContent.match(/^(\d+)(.*)$/);
    if (!m || +m[1] === 0) return;
    const alvo = +m[1], resto = m[2], inicio = performance.now(), dur = 700;
    (function passo(t) {
      const k = Math.min(1, (t - inicio) / dur);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3))) + resto;
      if (k < 1) requestAnimationFrame(passo);
    })(inicio);
  }

  // Confetti: mesma biblioteca (canvas-confetti) do componente do 21st.dev, nas cores da Keep Ads.
  function confete() {
    if (!window.confetti) return;
    const cores = ["#00ca9e", "#0d0d0d", "#ffffff", "#f5a524"];
    window.confetti({ particleCount: 90, spread: 75, origin: { y: .65 }, colors: cores });
    setTimeout(function () {
      window.confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: .7 }, colors: cores });
      window.confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: .7 }, colors: cores });
    }, 250);
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
      '<div class="auth-marca">' + marca("claro") + "</div>" +
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
        '<button type="button" class="link" data-modo="esqueci">Esqueci minha senha</button>';
    }

    app.innerHTML =
      '<div class="auth">' +
      '<section class="auth-hero"><div class="auth-marca">' + marca("escuro") + "</div>" +
      "<h1>Estude, execute e conquiste o seu certificado.</h1>" +
      "<p>As mentorias e cursos da Keep Ads em um só lugar: revisão espaçada no estilo Anki, partes práticas, provas e certificação.</p></section>" +
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
      '<div class="auth-marca">' + marca("claro") + "</div><h2>Crie sua senha nova</h2>" +
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

  // ---------- escolha da mentoria / curso ----------

  function iniciais(nome) {
    return String(nome || "").split(" ").filter(Boolean).map(function (p) { return p[0]; }).slice(0, 2).join("").toUpperCase();
  }

  function telaCursos() {
    const primeiroNome = ((S.perfil && S.perfil.nome) || "").split(" ")[0];
    const cards = CURSOS.map(function (c) {
      const disponiveis = aulasDisponiveis(c);
      let status, linha;
      if (!disponiveis.length) {
        status = '<span class="chip chip-cinza">Em breve</span>';
        linha = "Conteúdo em preparação";
      } else {
        const dados = dadosDoCurso(c);
        const resumos = comCurso(c, function () {
          return disponiveis.map(function (a) { return resumoAula(a.numero, dados); });
        });
        const aprovadas = resumos.filter(function (r) { return r.aprovado; }).length;
        const revisar = resumos.reduce(function (s, r) { return s + r.vencidos + r.novos; }, 0);
        const comecou = resumos.some(function (r) { return r.novos < r.totalCards || r.feitas > 0; });
        status = aprovadas === c.aulas.length ? '<span class="chip chip-ok">Concluída</span>'
          : comecou ? '<span class="chip chip-aviso">Em andamento</span>' : '<span class="chip chip-cinza">Não iniciada</span>';
        linha = aprovadas + "/" + c.aulas.length + " aulas aprovadas" + (revisar ? " · <b>" + revisar + " flashcards para hoje</b>" : "");
      }
      const capa = c.imagem
        ? '<div class="curso-capa" style="background-image:url(\'' + encodeURI(c.imagem) + '\')"></div>'
        : '<div class="curso-capa curso-capa-padrao"><span class="curso-iniciais">' + esc(iniciais(c.mentor)) + "</span>" +
          '<span class="curso-capa-tipo">' + esc(c.tipo) + "</span></div>";
      return '<a class="curso-card" href="#/c/' + encodeURIComponent(c.id) + '">' + capa +
        '<div class="curso-info"><div class="curso-topo"><span class="curso-mentor">' + esc(c.mentor) + "</span>" + status + "</div>" +
        "<h2>" + esc(c.titulo) + "</h2>" +
        '<p class="muted">' + esc(c.descricao) + "</p>" +
        '<p class="curso-linha">' + linha + "</p>" +
        '<span class="curso-entrar">Entrar →</span></div></a>';
    }).join("");

    layout(
      '<section class="hero hero-cursos"><div>' +
      '<p class="hero-kicker">keep ads academy</p>' +
      "<h1>Olá" + (primeiroNome ? ", " + esc(primeiroNome) : "") + "! Qual mentoria você vai estudar hoje?</h1>" +
      "<p>Escolha a mentoria ou o curso para ver as aulas, revisar os flashcards, executar as práticas e fazer as provas.</p></div></section>" +
      bannerTemporada() +
      blocoOfensiva() +
      blocoSemana() +
      '<section class="grade-cursos">' + cards + "</section>"
    );
  }

  // ---------- tela inicial do curso ----------

  function telaInicio() {
    const aulas = CURSO.aulas.map(function (a) {
      return { info: a, r: a.disponivel && AULAS[a.numero] ? resumoAula(a.numero, S.dados) : null };
    });
    const aprovadas = aulas.filter(function (x) { return x.r && x.r.aprovado; }).length;
    const paraHoje = aulas.reduce(function (s, x) { return s + (x.r ? x.r.vencidos + x.r.novos : 0); }, 0);
    const primeiroNome = ((S.perfil && S.perfil.nome) || "").split(" ")[0];
    const tranca = aulaLiberada() ? "" : '<span title="Abre com um pomodoro">🍅</span> ';

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
        (function () {
          const lib = liberacaoProva(a.numero, S.dados, r);
          if (lib.ok) return '<p class="aula-aviso ok">Provas liberadas</p>';
          return '<p class="aula-aviso">Provas liberam ' + (lib.liberaEm ? "a partir de " + dataBR(lib.liberaEm) : "depois de uma semana de flashcards") + "</p>";
        })() +
        '<div class="aula-acoes">' +
        (revisar ? '<a class="btn btn-primario" href="' + rota("aula/" + a.numero) + '/revisao">' + tranca + "Revisar agora (" + revisar + ")</a>" : '<span class="ok-hoje">Revisão em dia</span>') +
        '<a class="btn btn-secundario" href="' + rota("aula/" + a.numero) + '/pratica">' + tranca + "Abrir aula</a>" +
        "</div></article>";
    }).join("");

    const semAulas = !CURSO.aulas.length;
    layout(
      '<a href="#/" class="voltar">← Todas as mentorias</a>' +
      '<section class="hero"><div>' +
      '<p class="hero-kicker">' + esc(CURSO.tipo) + " · " + esc(CURSO.mentor) + "</p>" +
      "<h1>" + esc(CURSO.titulo) + "</h1>" +
      "<p>" + (semAulas
        ? "Olá" + (primeiroNome ? ", " + esc(primeiroNome) : "") + "! As aulas desta mentoria ainda vão entrar aqui."
        : (primeiroNome ? esc(primeiroNome) + ", v" : "V") + (paraHoje ? "ocê tem <b>" + paraHoje + " flashcards</b> para revisar hoje." : "ocê não tem flashcards pendentes hoje. Bom trabalho!")) +
      "</p></div>" +
      '<div class="hero-stats"><div><b>' + aprovadas + "/" + CURSO.aulas.length + "</b><span>aulas aprovadas</span></div>" +
      "<div><b>🔥 " + calcularOfensiva().dias + "</b><span>dias de ofensiva</span></div>" +
      "<div><b>" + CURSO.notaMinima + "</b><span>nota mínima</span></div></div></section>" +
      (semAulas
        ? '<section class="painel centro vazio"><h2>Conteúdo em preparação</h2><p class="muted">' + esc(CURSO.descricao) +
          "</p><p>Assim que a primeira aula for liberada, os flashcards, as partes práticas e as provas aparecem aqui.</p></section>"
        : '<section class="grade-aulas">' + cards + "</section>") +
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
    ["resumo", "Resumo"],
    ["mapa", "Mapa mental"],
    ["revisao", "Revisão"],
    ["pratica", "Partes práticas"],
    ["teorica", "Prova teórica"],
    ["prova-pratica", "Prova prática"],
    ["nota", "Nota"]
  ];

  // Resumo e mapa mental só aparecem nas aulas que já têm esse conteúdo (content/resumos/)
  function abasDaAula(aula) {
    return ABAS.filter(function (x) {
      if (x[0] === "resumo") return !!(aula.fases && aula.fases.length);
      if (x[0] === "mapa") return !!(aula.mapa && aula.mapa.ramos);
      return true;
    });
  }

  function telaAula(n, aba) {
    const aula = AULAS[n];
    const info = CURSO.aulas.find(function (a) { return a.numero === n; });
    if (!aula || !info || !info.disponivel) { location.hash = rota(""); return; }
    if (S.revisao && (S.revisao.aula !== n || aba !== "revisao")) S.revisao = null;
    const tipoProva = aba === "teorica" ? "teorica" : aba === "prova-pratica" ? "pratica" : null;
    if (S.prova && (S.prova.aula !== n || S.prova.tipo !== tipoProva)) S.prova = null;

    const r = resumoAula(n, S.dados);
    const abas = abasDaAula(aula).map(function (x) {
      return '<a href="' + rota("aula/" + n + "/" + x[0]) + '" class="' + (x[0] === aba ? "ativo" : "") + '">' + x[1] + "</a>";
    }).join("");

    let corpo;
    if (aba === "resumo" && aula.fases) corpo = corpoResumo(n, aula);
    else if (aba === "mapa" && aula.mapa) corpo = corpoMapa(n, aula);
    else if (aba === "pratica") corpo = corpoPratica(n, aula, r);
    else if (aba === "teorica") corpo = corpoProva(n, "teorica", r);
    else if (aba === "prova-pratica") corpo = corpoProva(n, "pratica", r);
    else if (aba === "nota") corpo = corpoNota(n, r);
    else corpo = corpoRevisao(n, aula, r);

    layout(
      '<a href="' + rota("") + '" class="voltar">← Todas as aulas</a>' +
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
    else if (aba === "mapa") ligarMapa();
    else if (aba === "resumo") ligarResumo(n);
    else if (aba === "pratica") ligarPratica(n);
    else if (aba === "teorica") ligarProva(n, "teorica");
    else if (aba === "prova-pratica") ligarProva(n, "pratica");
  }

  // ----- resumo por hora e mapa mental -----

  function corpoResumo(n, aula) {
    const ordinais = ["1ª", "2ª", "3ª", "4ª"];
    const fases = aula.fases.map(function (f, i) {
      const lista = function (itens) { return "<ul>" + (itens || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; };
      return '<details class="fase"' + (i === 0 ? " open" : "") + ">" +
        '<summary><span class="fase-hora">' + esc(f.rotulo || ((ordinais[i] || (f.hora + "ª")) + " hora")) + "</span>" +
        '<span class="fase-titulo">' + esc(f.titulo) + '</span><span class="fase-tempo">' + esc(f.tempo || "") + "</span></summary>" +
        '<div class="fase-corpo">' +
        (f.ideia ? '<p class="fase-ideia">' + esc(f.ideia) + "</p>" : "") +
        '<div class="fase-colunas">' +
        '<div class="fase-bloco fase-aprender"><h3>📚 O que aprender</h3>' + lista(f.aprender) + "</div>" +
        '<div class="fase-bloco fase-executar"><h3>🛠️ O que executar</h3>' + lista(f.executar) + "</div>" +
        "</div>" +
        (f.frase ? '<blockquote class="fase-frase">“' + esc(f.frase) + "”</blockquote>" : "") +
        (temAudio() ? '<button class="btn btn-secundario btn-ouvir-hora" data-ouvir="' + i + '">🔊 Ouvir esta ' + unidadeFase(f) + "</button>" : "") +
        "</div></details>";
    }).join("");
    const velocidades = ["1", "1.25", "1.5", "1.75"];
    const vel = lerVelocidade();
    const player = temAudio()
      ? '<div class="audio-resumo" id="audio-resumo">' +
        '<button class="btn btn-primario" id="au-tocar">🔊 Ouvir o resumo</button>' +
        '<button class="btn btn-secundario" id="au-pausar" hidden>⏸ Pausar</button>' +
        '<button class="btn btn-secundario" id="au-parar" hidden>■ Parar</button>' +
        '<label class="au-vel">Velocidade <select id="au-vel">' + velocidades.map(function (v) {
          return '<option value="' + v + '"' + (v === vel ? " selected" : "") + ">" + v.replace(".", ",") + "x</option>";
        }).join("") + "</select></label>" +
        '<span class="au-status muted" id="au-status">Ouça no carro, na academia ou com o celular no bolso.</span></div>'
      : "";
    return '<div class="painel resumo-aula">' +
      '<p class="muted">A aula dividida em ' + aula.fases.length + " partes: em cada " + unidadeFase(aula.fases[0]) + ", o que você precisa <b>aprender</b> e o que precisa <b>executar</b>. " +
      "Leia o resumo, passe pelo mapa mental e depois vá para os flashcards: é na revisão que o conteúdo fixa.</p>" +
      player +
      fases +
      '<div class="linha-botoes"><a class="btn btn-secundario" href="' + rota("aula/" + n + "/mapa") + '">Ver o mapa mental</a>' +
      '<a class="btn btn-primario" href="' + rota("aula/" + n + "/revisao") + '">Ir para os flashcards</a></div></div>';
  }

  // ----- áudio do resumo -----
  // Cada hora tem uma faixa MP3 com voz neural (gerada por ferramentas/gerar_audios.py).
  // Se a faixa não existir (aula nova ainda sem áudio), lê com a voz do próprio navegador.

  function temAudio() { return typeof Audio === "function"; }
  function temVozNavegador() { return "speechSynthesis" in window && typeof SpeechSynthesisUtterance === "function"; }

  // Endereço base do site, tirado do próprio app.js (funciona no GitHub Pages e no teste local)
  const BASE_SITE = (function () {
    const s = document.querySelector('script[src*="js/app.js"]');
    return s ? s.src.replace(/js\/app\.js.*$/, "") : "";
  })();

  // Arquivos de áudio: "aula-05-hora-1.mp3"; mentorias com prefixo (CURSO.prefixoArquivos), ex.: "ds-aula-01-hora-1.mp3"
  function urlAudio(n, hora) {
    return BASE_SITE + "audio/resumos/" + (CURSO.prefixoArquivos || "") + "aula-" + dois(n) + "-hora-" + hora + ".mp3";
  }

  // Aulas curtas são divididas em partes (campo "rotulo": "1ª parte"); as de 3 horas, por hora
  function unidadeFase(f) { return f && f.rotulo && /parte/i.test(f.rotulo) ? "parte" : "hora"; }

  function lerVelocidade() {
    try { return localStorage.getItem("academy-audio-vel") || "1"; } catch (e) { return "1"; }
  }

  function pararAudio() {
    const a = S.audio;
    S.audio = null;
    if (a) {
      a.cancelado = true;
      if (a.el) { a.el.pause(); a.el.removeAttribute("src"); }
    }
    try { if (temVozNavegador()) window.speechSynthesis.cancel(); } catch (e) {}
  }

  function minutos(seg) {
    seg = Math.max(0, Math.floor(seg || 0));
    return Math.floor(seg / 60) + ":" + String(seg % 60).padStart(2, "0");
  }

  function textoDaFase(f, i) {
    const ordinal = ["Primeira", "Segunda", "Terceira", "Quarta"][i] || "Próxima";
    const frase = function (t) { t = String(t || "").trim(); return t && !/[.!?:]$/.test(t) ? t + "." : t; };
    return [ordinal + " " + unidadeFase(f) + ": " + frase(f.titulo), frase(f.ideia),
      "O que aprender."].concat((f.aprender || []).map(frase))
      .concat(["O que executar."], (f.executar || []).map(frase))
      .concat(f.frase ? ["Frase da aula: " + frase(f.frase)] : []).join(" ");
  }

  // O Chrome corta falas muito longas: o texto vai em pedaços de até ~220 caracteres, um depois do outro
  function pedacos(texto) {
    const frases = texto.replace(/[“”]/g, "").split(/(?<=[.!?:])\s+/);
    const out = [];
    let atual = "";
    frases.forEach(function (f) {
      if ((atual + " " + f).length > 220 && atual) { out.push(atual); atual = f; }
      else atual = atual ? atual + " " + f : f;
    });
    if (atual) out.push(atual);
    return out;
  }

  function ligarResumo(n) {
    if (!temAudio() || !document.getElementById("au-tocar")) return;
    const aula = AULAS[n];
    const q = function (id) { return document.getElementById(id); };
    const fasesEl = Array.prototype.slice.call(document.querySelectorAll(".fase"));

    function mostrar(estado) {
      q("au-tocar").hidden = estado !== "parado";
      q("au-pausar").hidden = estado === "parado";
      q("au-parar").hidden = estado === "parado";
      q("au-pausar").textContent = estado === "pausado" ? "▶ Continuar" : "⏸ Pausar";
    }

    function marcar(i) {
      fasesEl.forEach(function (el, k) { el.classList.toggle("falando", k === i); });
      if (i !== null && fasesEl[i]) { fasesEl[i].open = true; fasesEl[i].scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    }

    const vel = function () { return Number(q("au-vel").value) || 1; };

    // Toca a partir da hora "inicio" até o fim (ou só ela, se "so" for verdadeiro)
    function tocar(inicio, so) {
      pararAudio();
      const fila = [];
      aula.fases.forEach(function (f, i) { if (i >= inicio && !(so && i !== inicio)) fila.push(i); });
      const estado = { fila: fila, pos: 0, cancelado: false, el: new Audio(), modo: "mp3", fase: null };
      S.audio = estado;
      estado.el.ontimeupdate = function () {
        if (estado.cancelado || estado.modo !== "mp3" || !estado.el.duration) return;
        q("au-status").textContent = "Ouvindo a " + (estado.fase + 1) + "ª " + unidadeFase(aula.fases[estado.fase]) + " · " + minutos(estado.el.currentTime) + " / " + minutos(estado.el.duration);
      };
      estado.el.onended = function () { proximaFase(estado); };
      estado.el.onerror = function () {
        // Sem a faixa MP3 (aula nova ainda sem áudio): lê esta hora com a voz do navegador
        if (!estado.cancelado && estado.modo === "mp3" && estado.el.getAttribute("src")) falarNavegador(estado, estado.fase);
      };
      mostrar("tocando");
      proximaFase(estado);
    }

    function proximaFase(estado) {
      if (estado.cancelado) return;
      if (estado.pos >= estado.fila.length) {
        S.audio = null; mostrar("parado"); marcar(null);
        q("au-status").textContent = "Fim do resumo. Agora é hora dos flashcards.";
        return;
      }
      const i = estado.fila[estado.pos++];
      estado.fase = i;
      estado.modo = "mp3";
      marcar(i);
      q("au-status").textContent = "Ouvindo a " + (i + 1) + "ª " + unidadeFase(aula.fases[i]) + "…";
      estado.el.src = urlAudio(n, aula.fases[i].hora);
      estado.el.defaultPlaybackRate = vel();
      estado.el.playbackRate = vel();
      const p = estado.el.play();
      if (p && p.catch) p.catch(function () {});   // o erro de carregamento é tratado no onerror
    }

    function falarNavegador(estado, i) {
      if (!temVozNavegador()) { proximaFase(estado); return; }
      estado.modo = "voz";
      const partes = pedacos(textoDaFase(aula.fases[i], i));
      const vozes = window.speechSynthesis.getVoices();
      const br = vozes.filter(function (v) { return /pt[-_]BR/i.test(v.lang); });
      const voz = br.find(function (v) { return /natural|online/i.test(v.name); }) || br.find(function (v) { return /google/i.test(v.name); }) || br[0];
      let k = 0;
      (function falar() {
        if (estado.cancelado) return;
        if (k >= partes.length) { proximaFase(estado); return; }
        const u = new SpeechSynthesisUtterance(partes[k++]);
        u.lang = "pt-BR";
        if (voz) u.voice = voz;
        u.rate = vel();
        u.onend = falar;
        u.onerror = function (ev) { if (ev.error !== "interrupted" && ev.error !== "canceled") falar(); };
        window.speechSynthesis.speak(u);
      })();
    }

    q("au-tocar").onclick = function () { tocar(0, false); };
    q("au-parar").onclick = function () {
      pararAudio(); mostrar("parado"); marcar(null);
      q("au-status").textContent = "Áudio parado.";
    };
    q("au-pausar").onclick = function () {
      const a = S.audio;
      if (!a) return;
      if (a.modo === "mp3") {
        if (a.el.paused) { a.el.play(); mostrar("tocando"); }
        else { a.el.pause(); mostrar("pausado"); q("au-status").textContent = "Pausado."; }
      } else {
        const s = window.speechSynthesis;
        if (s.paused) { s.resume(); mostrar("tocando"); }
        else { s.pause(); mostrar("pausado"); q("au-status").textContent = "Pausado."; }
      }
    };
    q("au-vel").onchange = function () {
      try { localStorage.setItem("academy-audio-vel", q("au-vel").value); } catch (e) {}
      // No MP3 a nova velocidade vale na hora, sem deixar a voz fina; na voz do navegador, a partir da próxima frase
      if (S.audio && S.audio.el) { S.audio.el.defaultPlaybackRate = vel(); S.audio.el.playbackRate = vel(); }
    };
    document.querySelectorAll("[data-ouvir]").forEach(function (b) {
      b.onclick = function () { tocar(Number(b.dataset.ouvir), true); };
    });
  }

  function corpoMapa(n, aula) {
    const m = aula.mapa;
    const ramo = function (r, i) {
      // "order" mantém a sequência original dos ramos no celular, onde os dois lados viram uma coluna só
      return '<div class="mapa-ramo" data-cor="' + (i % 6) + '" style="order:' + i + '"><b>' + esc(r.titulo) + "</b><ul>" +
        (r.itens || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    };
    // Mapa de dois lados: metade dos ramos à esquerda e metade à direita do tema central
    const esquerda = [], direita = [];
    m.ramos.forEach(function (r, i) { (i % 2 === 0 ? direita : esquerda).push(ramo(r, i)); });
    return '<div class="painel mapa-painel">' +
      '<p class="muted">Tudo o que a aula ensina numa imagem só. Tente explicar cada ramo em voz alta antes de abrir os flashcards.</p>' +
      '<div class="mapa" id="mapa-mental"><svg class="mapa-linhas" aria-hidden="true"></svg>' +
      '<div class="mapa-lado mapa-esquerda">' + esquerda.join("") + "</div>" +
      '<div class="mapa-centro"><span>Aula ' + dois(n) + "</span><b>" + esc(m.centro) + "</b></div>" +
      '<div class="mapa-lado mapa-direita">' + direita.join("") + "</div></div>" +
      '<div class="linha-botoes"><a class="btn btn-secundario" href="' + rota("aula/" + n + "/resumo") + '">Ler o resumo</a>' +
      '<a class="btn btn-primario" href="' + rota("aula/" + n + "/revisao") + '">Ir para os flashcards</a></div></div>';
  }

  // Desenha as linhas curvas do tema central até cada ramo (só no layout de dois lados)
  function desenharMapa() {
    const mapa = document.getElementById("mapa-mental");
    if (!mapa) return;
    const svg = mapa.querySelector(".mapa-linhas");
    const centro = mapa.querySelector(".mapa-centro");
    const base = mapa.getBoundingClientRect();
    svg.setAttribute("width", base.width);
    svg.setAttribute("height", base.height);
    if (getComputedStyle(mapa).display !== "grid") { svg.innerHTML = ""; return; }
    const c = centro.getBoundingClientRect();
    const cy = c.top + c.height / 2 - base.top;
    svg.innerHTML = Array.prototype.map.call(mapa.querySelectorAll(".mapa-ramo"), function (r) {
      const b = r.getBoundingClientRect();
      const direita = b.left > c.left;
      const x1 = (direita ? c.right : c.left) - base.left;
      const x2 = (direita ? b.left : b.right) - base.left;
      const y2 = b.top + b.height / 2 - base.top;
      const meio = (x1 + x2) / 2;
      return '<path data-cor="' + r.dataset.cor + '" d="M' + x1 + "," + cy + " C" + meio + "," + cy + " " + meio + "," + y2 + " " + x2 + "," + y2 + '"/>';
    }).join("");
  }

  function ligarMapa() {
    desenharMapa();
    setTimeout(desenharMapa, 600);   // depois que as fontes e a animação de entrada terminam
    if (!window.__mapaResize) {
      window.__mapaResize = true;
      window.addEventListener("resize", desenharMapa);
    }
  }

  // ----- revisão (flashcards) -----

  function corpoRevisao(n, aula, r) {
    const rv = S.revisao;
    if (rv && rv.fim) {
      const prox = proximaRevisao(n);
      const festa = rv.feitos > 0 && !rv.festejado;
      rv.festejado = true;
      return '<div class="painel centro"' + (festa ? " data-festa" : "") + "><h2>Sessão concluída!</h2>" +
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
          ? '<p class="notas-dica">Como você se saiu? Dê uma nota honesta para você mesmo: ela não vale ponto, só define quando este card volta. <a href="#/como-funciona">Entenda</a></p>' +
            '<div class="notas">' + botoes + "</div>"
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
      '<button class="btn btn-secundario btn-largo" id="rv-livre">Revisão livre: todos os ' + r.totalCards + " cards, sem mexer na agenda (conta para a ofensiva)</button>" +
      '<p class="muted pequeno">Depois de ver a resposta, você se dá uma nota de 1 a 4 (Errei, Difícil, Bom, Fácil). Errou, o card volta em 10 minutos. Acertou, ele some e reaparece cada vez mais espaçado. É o mesmo princípio do Anki. <a href="#/como-funciona">Veja o guia completo</a>.</p>' +
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
      const linha = Object.assign({ user_id: S.session.user.id, curso: CURSO.id, card_id: id, aula: n }, novo);
      const r1 = await sb.from(T.cards).upsert(linha);
      rv.salvando = false;
      if (r1.error) { toast("Não consegui salvar: " + traduzErro(r1.error), "erro"); return; }
      S.dados.cards[id] = linha;
    }
    // Toda revisão conta para a ofensiva, inclusive a revisão livre (que não mexe na agenda do card)
    const antes = calcularOfensiva();
    sb.from(T.log).insert({ user_id: S.session.user.id, curso: CURSO.id, card_id: id, aula: n, nota: nota, livre: !!rv.livre }).then(function () {});
    const registro = { curso: CURSO.id, aula: n, reviewed_at: new Date().toISOString() };
    S.dados.log.push(registro);
    S.bruto.log.push(registro);
    if (!antes.batidaHoje && calcularOfensiva().batidaHoje) {
      toast("🔥 Meta do dia batida! Ofensiva de " + calcularOfensiva().dias + (calcularOfensiva().dias === 1 ? " dia." : " dias."));
    } else if (antes.hoje + 1 === antes.meta && !antes.pomodorosHoje) {
      toast("✅ " + antes.meta + " flashcards feitos! Falta 1 pomodoro (🍅 no topo) para acender a ofensiva de hoje.");
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
      // Para marcar, a pessoa escreve em uma linha o que fez (vale XP na temporada e o admin consegue conferir)
      return '<li class="tarefa' + (feito ? " feita" : "") + '">' +
        '<label class="tarefa-check"><input type="checkbox" data-tarefa="' + t.id + '"' + (feito ? " checked" : " disabled") + "><span>Executei</span></label>" +
        '<div class="tarefa-texto"><div class="tarefa-num">Prática ' + (i + 1) + "</div><h3>" + esc(t.titulo) + "</h3><p>" + esc(t.descricao) + "</p>" +
        (feito
          ? (c.relato ? '<p class="tarefa-relato-feito">“' + esc(c.relato) + "”</p>" : "") +
            (c.done_at ? '<p class="muted pequeno">Marcado em ' + dataBR(c.done_at) + "</p>" : "")
          : '<input class="tarefa-relato" data-relato="' + t.id + '" maxlength="200" placeholder="Em uma linha: o que você fez? (libera o “Executei”)">') +
        "</div></li>";
    }).join("");
    const todas = r.feitas === r.totalTarefas;
    return '<div class="painel">' +
      '<div class="linha-progresso"><span><b>' + r.feitas + "</b> de " + r.totalTarefas + " partes práticas executadas</span>" + barra(r.checklist) + "</div>" +
      '<p class="muted">Estas são as partes práticas citadas na aula. Marque “Executei” só depois de fazer de verdade. Com tudo marcado e a semana de flashcards cumprida, a prova prática libera.</p>' +
      '<ul class="tarefas">' + itens + "</ul>" +
      (todas ? '<a class="btn btn-primario btn-largo" href="' + rota("aula/" + n) + '/prova-pratica">Fazer a prova prática</a>' : "") +
      "</div>";
  }

  function ligarPratica(n) {
    document.querySelectorAll("[data-relato]").forEach(function (inp) {
      const cb = document.querySelector('[data-tarefa="' + inp.dataset.relato + '"]');
      inp.oninput = function () { cb.disabled = inp.value.trim().length < 10; };
    });
    document.querySelectorAll("[data-tarefa]").forEach(function (cb) {
      cb.onchange = async function () {
        const inp = document.querySelector('[data-relato="' + cb.dataset.tarefa + '"]');
        cb.disabled = true;
        const linha = {
          user_id: S.session.user.id, curso: CURSO.id, aula: n, task_id: cb.dataset.tarefa,
          done: cb.checked, done_at: cb.checked ? new Date().toISOString() : null,
          relato: cb.checked && inp ? inp.value.trim() : null
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
    // Uma tentativa a cada REGRAS.refazerProvaDias dias (o banco também bloqueia)
    const tentativas = S.dados.provas.filter(function (x) { return x.aula === n && x.tipo === tipo; });
    const ultima = tentativas[0];
    const proximaTentativa = ultima ? new Date(new Date(ultima.created_at).getTime() + REGRAS.refazerProvaDias * DIA) : null;
    if (ultima && proximaTentativa > new Date() && !S.prova) {
      const melhorNota = tipo === "teorica" ? r.teorica : r.pratica;
      return '<div class="painel centro"><h2>' + nomeProva + " feita</h2>" +
        '<div class="resultado ' + (melhorNota >= CURSO.notaMinima ? "ok" : "baixo") + '"><b>' + Math.round(melhorNota) + "</b><span>sua nota</span></div>" +
        "<p>Você fez esta prova em <b>" + dataBR(ultima.created_at) + "</b> (" + ultima.acertos + " de " + ultima.total + " acertos). " +
        "A próxima tentativa libera em <b>" + dataBR(proximaTentativa) + "</b>, e aí vale a melhor nota.</p>" +
        '<p class="muted">Até lá, continue revisando os flashcards todo dia: é o que vai subir a sua nota.</p>' +
        '<div class="linha-botoes"><a class="btn btn-primario" href="' + rota("aula/" + n) + '/revisao">Revisar flashcards</a>' +
        '<a class="btn btn-secundario" href="' + rota("ranking") + '">Ver ranking</a></div></div>';
    }
    const lib = liberacaoProva(n, S.dados, r);
    const liberadaAdmin = S.provaAdmin === n && S.perfil && S.perfil.is_admin;
    if (!lib.ok && !liberadaAdmin && !S.prova) {
      const itens = lib.itens.map(function (i) {
        return '<li class="' + (i.feito ? "feito" : "") + '"><span class="req-icone">' + (i.feito ? "✓" : "○") + "</span>" +
          "<div><b>" + esc(i.texto) + '</b><span class="muted pequeno">' + esc(i.progresso) + "</span></div></li>";
      }).join("");
      return '<div class="painel centro"><h2>' + nomeProva + " bloqueada</h2>" +
        "<p>As provas são difíceis de propósito. Elas liberam depois de uma semana estudando os flashcards desta aula.</p>" +
        '<ul class="requisitos">' + itens + "</ul>" +
        (lib.liberaEm ? '<p class="muted">Se você revisar com frequência, a prova libera a partir de <b>' + dataBR(lib.liberaEm) + "</b>.</p>" : "") +
        '<div class="linha-botoes"><a class="btn btn-primario" href="' + rota("aula/" + n) + '/revisao">Ir para os flashcards</a>' +
        '<a class="btn btn-secundario" href="#/como-funciona">Como funciona</a></div>' +
        (S.perfil && S.perfil.is_admin ? '<button class="link" id="pv-admin">Liberar só para mim agora (teste de administrador)</button>' : "") +
        "</div>";
    }
    if (tipo === "pratica" && r.feitas < r.totalTarefas) {
      return '<div class="painel centro"><h2>Prova prática bloqueada</h2>' +
        "<p>Execute e marque todas as partes práticas primeiro (" + r.feitas + " de " + r.totalTarefas + " feitas).</p>" +
        '<a class="btn btn-primario" href="' + rota("aula/" + n) + '/pratica">Ir para as partes práticas</a></div>';
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
      const festa = ok && !p.festejado;
      p.festejado = true;
      return '<div class="painel"' + (festa ? " data-festa" : "") + '><div class="resultado ' + (ok ? "ok" : "baixo") + '"><b>' + Math.round(p.resultado.nota) + "</b><span>" +
        p.resultado.acertos + " de " + p.resultado.total + " acertos</span><p>" +
        (ok ? "Mandou bem! Revise as que errou abaixo." : "Ainda abaixo de " + CURSO.notaMinima + ". Revise as explicações e os flashcards e tente de novo.") + "</p></div>" +
        '<ol class="correcao">' + lista + "</ol>" +
        '<p class="muted centro">Próxima tentativa desta prova a partir de <b>' + dataBR(new Date(Date.now() + REGRAS.refazerProvaDias * DIA)) + "</b>.</p>" +
        '<div class="linha-botoes"><a class="btn btn-primario" href="' + rota("ranking") + '">Ver ranking</a><a class="btn btn-secundario" href="' + rota("aula/" + n) + '/nota">Ver nota da aula</a></div></div>';
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
    const melhor = tipo === "teorica" ? r.teorica : r.pratica;
    const total = questoesDa(n, tipo).length;
    return '<div class="painel centro"><h2>' + nomeProva + "</h2>" +
      "<p>" + total + " questões difíceis de múltipla escolha" + (tipo === "pratica" ? " sobre a execução das partes práticas" : " sobre os conceitos da aula") + ".</p>" +
      '<p class="aviso"><b>Você tem uma tentativa.</b> Depois de enviar, só dá para refazer ' + REGRAS.refazerProvaDias + " dias depois. A nota entra no ranking da mentoria.</p>" +
      (tentativas.length
        ? '<p class="muted">Melhor nota até agora: <b>' + Math.round(melhor) + "</b> · Tentativas: " + tentativas.length + "</p>"
        : "") +
      '<button class="btn btn-primario" id="pv-iniciar">Começar prova</button></div>';
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
    const adm = document.getElementById("pv-admin");
    if (adm) adm.onclick = function () { S.provaAdmin = n; telaAula(n, aba); };

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
      const linha = {
        user_id: S.session.user.id, curso: CURSO.id, aula: n, tipo: tipo, acertos: acertos, total: p.questoes.length, nota: nota,
        respostas: Object.assign({ _versao: CURSO.versaoProvas }, p.respostas)
      };
      const r = await sb.from(T.provas).insert(linha).select("curso,aula,tipo,nota,acertos,total,created_at,versao:respostas->_versao").single();
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
      linha("Prova teórica", r.teorica, P.teorica, rota("aula/" + n) + "/teorica") +
      linha("Prova prática", r.pratica, P.pratica, rota("aula/" + n) + "/prova-pratica") +
      linha("Partes práticas executadas", r.checklist, P.checklist, rota("aula/" + n) + "/pratica") +
      "</tbody></table>" +
      (falta.length ? '<p class="muted">Para ser aprovado nesta aula falta: ' + falta.join("; ") + ".</p>" : "") +
      '<p class="muted pequeno">Os flashcards não entram na nota: eles são a ferramenta para você chegar bem nas provas e não esquecer depois.</p></div>';
  }

  // ---------- como funciona ----------

  function telaComoFunciona() {
    const ref = CURSO || CURSOS[0];   // regras do curso aberto (ou as padrão)
    const R = ref.liberarProva;
    const P = ref.pesos;
    // Exemplo real de agenda de um card respondido sempre com "Bom", calculado pelo próprio algoritmo
    let estado = null;
    const agenda = [];
    for (let i = 0; i < 5; i++) {
      estado = SRS.proximo(estado, 3, new Date(2026, 0, 1));
      agenda.push(SRS.formatarIntervalo(estado.interval_days));
    }

    layout(
      '<article class="guia">' +
      '<p class="hero-kicker">como funciona</p>' +
      "<h1>Como estudar no Keep Ads Academy</h1>" +
      '<p class="guia-lead">Primeiro você escolhe a mentoria ou o curso. Dentro dele, cada aula tem quatro partes: <b>flashcards</b> para memorizar, <b>partes práticas</b> para executar, ' +
      "uma <b>prova teórica</b> e uma <b>prova prática</b>. Os flashcards preparam você; as provas medem se você aprendeu de verdade.</p>" +

      '<section class="guia-bloco"><h2>1. Os flashcards (método Anki)</h2>' +
      "<p>O sistema usa a <b>repetição espaçada</b>, a mesma ideia do Anki, aplicativo famoso para decorar vocabulário de idiomas. " +
      "A gente esquece rápido o que acabou de aprender. Mas cada vez que você <b>se esforça para lembrar</b> antes de ver a resposta, a memória fica mais forte e dura mais. " +
      "Por isso o card volta para você <b>justo quando estaria começando a esquecer</b>, e cada vez mais espaçado.</p>" +
      '<h3>Passo a passo de cada card</h3><ol class="guia-passos">' +
      "<li><b>Leia a pergunta</b> e responda <b>em voz alta</b> ou de cabeça, sem olhar. Esse esforço é o que fixa.</li>" +
      "<li>Clique em <b>Mostrar resposta</b> (ou aperte a barra de espaço).</li>" +
      "<li>Compare com o que você respondeu e <b>dê uma nota para você mesmo</b> em um dos quatro botões. Essa nota não vale ponto: ela só diz ao sistema quando o card deve voltar.</li>" +
      "</ol>" +
      '<div class="guia-botoes">' +
      '<div class="nota-btn nota-1"><b>Errei</b><span>Não lembrei ou lembrei errado. O card volta em 10 minutos, ainda na mesma sessão, e recomeça do zero.</span></div>' +
      '<div class="nota-btn nota-2"><b>Difícil</b><span>Lembrei, mas com muito esforço ou faltando partes. Volta logo, com intervalo menor.</span></div>' +
      '<div class="nota-btn nota-3"><b>Bom</b><span>Lembrei bem, com algum esforço. É a resposta mais comum. O intervalo cresce normalmente.</span></div>' +
      '<div class="nota-btn nota-4"><b>Fácil</b><span>Lembrei na hora, sem esforço. O intervalo cresce bem mais rápido.</span></div>' +
      "</div>" +
      '<p class="muted pequeno">Embaixo de cada botão aparece quando o card vai voltar se você escolher aquela opção. Atalhos: teclas 1, 2, 3 e 4.</p>' +
      "<h3>Quando os cards voltam</h3>" +
      "<p>Um card respondido sempre com <b>Bom</b> volta depois de: <b>" + agenda.join(" → ") + "</b>. " +
      "Se errar em algum momento, ele volta para o começo. Por isso <b>seja honesto</b>: marcar Fácil sem saber só faz você esquecer.</p>" +
      "<h3>O que significa cada número</h3><ul>" +
      "<li><b>Novos:</b> cards que você ainda nunca viu.</li>" +
      "<li><b>Para revisar:</b> cards cujo dia de voltar já chegou. Faça essa revisão todo dia: leva de 5 a 10 minutos.</li>" +
      "<li><b>Dominados:</b> cards que você acertou tantas vezes que só voltam daqui a 7 dias ou mais.</li>" +
      "<li><b>Revisão livre:</b> passa por todos os cards de uma vez, sem mudar a agenda. Bom para a véspera da prova.</li>" +
      "</ul></section>" +

      '<section class="guia-bloco"><h2>2. As partes práticas</h2>' +
      "<p>São as tarefas que o mentor pediu para executar na aula. Marque <b>Executei</b> só depois de fazer de verdade. " +
      "Para liberar o botão, escreva em uma linha <b>o que você fez</b>: esse relato fica salvo e os organizadores podem conferir. " +
      "Elas valem " + Math.round(P.checklist * 100) + "% da nota, e a prova prática pergunta sobre o que acontece quando você executa.</p></section>" +

      '<section class="guia-bloco"><h2>3. As provas</h2>' +
      "<p>As provas são <b>difíceis de propósito</b>: situações reais, com alternativas erradas que parecem certas. " +
      "Só passa quem estudou os flashcards e executou as práticas.</p>" +
      "<p><b>Quando a prova de uma aula libera:</b></p><ul>" +
      (R.todosOsCards ? "<li>você viu todos os flashcards da aula pelo menos uma vez;</li>" : "") +
      "<li>já se passaram <b>" + R.diasDesdeInicio + " dias</b> desde a sua primeira revisão daquela aula;</li>" +
      "<li>você revisou em pelo menos <b>" + R.diasDeRevisao + " dias diferentes</b>;</li>" +
      "<li>para a prova prática, você também marcou todas as partes práticas.</li></ul>" +
      "<p><b>Cada prova tem uma tentativa.</b> Depois de enviar, você vê a explicação de cada questão, e só pode refazer a prova " + REGRAS.refazerProvaDias + " dias depois. Se refizer, vale a <b>melhor nota</b>.</p></section>" +

      '<section class="guia-bloco"><h2>🔥 Ofensiva</h2>' +
      "<p>Igual ao Duolingo: a ofensiva conta quantos <b>dias seguidos</b> você estudou. Um dia só vale quando você faz as <b>duas coisas</b> no mesmo dia:</p>" +
      "<ul><li><b>1 pomodoro de " + REGRAS.pomodoroMinutos + " minutos</b> (o 🍅 no topo da tela);</li>" +
      "<li><b>" + REGRAS.metaDiaria + " flashcards</b> revisados, de qualquer aula ou mentoria (a revisão livre também conta).</li></ul>" +
      "<p>Se você não bateu a meta hoje, a ofensiva ainda não está perdida: ela só zera se você passar um dia inteiro sem cumprir as duas.</p></section>" +
      '<section class="guia-bloco"><h2>🍅 Pomodoro</h2>' +
      "<p>O pomodoro é um bloco de <b>" + REGRAS.pomodoroMinutos + " minutos de foco total</b> em uma coisa só, seguido de " + REGRAS.pausaMinutos + " minutos de pausa. Ajuda quem se distrai fácil a começar, e ajuda quem é focado a não passar do ponto.</p>" +
      "<ul><li>Clique no <b>🍅</b> do topo e em <b>Começar</b>. O tempo continua contando se você trocar de tela ou recarregar a página.</li>" +
      "<li>Antes de começar: celular longe, uma aba aberta e um objetivo claro (ex.: \"revisar os cards da Aula 3\" ou \"executar a parte prática 2\").</li>" +
      "<li>Pode pausar se for interrompido. Se cancelar, ele não conta. Só o pomodoro que chega até o fim é registrado.</li>" +
      "<li>Pode fazer quantos quiser por dia, mas para a ofensiva basta 1.</li></ul></section>" +
      '<section class="guia-bloco"><h2>📊 Relatório de estudo</h2>' +
      "<p>Em <b>Relatório</b> (no menu) você vê quantas horas estudou, quantos pomodoros fez e quantos flashcards revisou nos últimos <b>7 ou 30 dias</b>, dia a dia, comparado ao período anterior. Tem um botão para copiar o resumo e mandar no WhatsApp.</p>" +
      "<p><b>Horas de estudo</b> = os minutos dos pomodoros concluídos + o tempo nos flashcards fora de um pomodoro (sem contar duas vezes). O tempo nos cards é estimado pelo intervalo entre um card e o próximo.</p>" +
      "<p>O <b>Ranking de foco</b> mostra quem fez mais pomodoros. No Ranking de cada mentoria ele aparece com a semana atual e zera toda segunda-feira.</p></section>" +
      '<section class="guia-bloco"><h2>🔒 Aulas só com pomodoro e tempo disperso</h2>' +
      "<p>As aulas (resumo, áudio, flashcards, parte prática e provas) só abrem com um pomodoro rodando. Ao clicar em <b>Revisar agora</b> ou <b>Abrir aula</b> sem pomodoro, você escolhe o tipo e entra na hora:</p>" +
      "<ul><li><b>🎧 Estudo:</b> para estudar dentro da plataforma. Se você sair para outra aba ou programa, o tempo fora é medido. " +
      "Depois de " + REGRAS.alertaForaSegundos + " segundos fora chega um aviso (permita as notificações do navegador), e com " + REGRAS.limiteForaMinutos + " minutos fora, somados, o pomodoro fica marcado como <b>disperso</b>. Ele continua contando para a ofensiva.</li>" +
      "<li><b>🛠️ Execução prática:</b> para executar a parte prática em outras ferramentas (Claude, Gerenciador de Anúncios etc.). O tempo fora não é medido.</li></ul>" +
      "<p>No Relatório aparecem o seu <b>índice de foco</b> (quanto do pomodoro de estudo você ficou na plataforma), o tempo fora, as saídas e o ranking de quem menos se dispersou.</p></section>" +

      '<section class="guia-bloco"><h2>🏆 Ranking</h2>' +
      "<p>Cada mentoria tem o seu ranking, só com as pessoas daquela mentoria. A posição é definida pela <b>média das provas</b> (a melhor nota de cada prova). Em caso de empate, ganha quem fez mais provas e depois quem tem a maior ofensiva. Também tem um ranking separado só das maiores ofensivas.</p>" +
      "<p>O ranking mede <b>quem sabe mais</b> (a nota). A <b>Temporada</b>, logo abaixo, mede <b>quem mais se dedica</b> em um período de 90 dias, e é ela que vale prêmio.</p></section>" +

      blocoTemporadaGuia() +

      '<section class="guia-bloco"><h2>4. Nota e certificado</h2>' +
      '<table class="tabela"><thead><tr><th>Componente</th><th>Peso</th></tr></thead><tbody>' +
      "<tr><td>Prova teórica (melhor tentativa)</td><td>" + Math.round(P.teorica * 100) + "%</td></tr>" +
      "<tr><td>Prova prática (melhor tentativa)</td><td>" + Math.round(P.pratica * 100) + "%</td></tr>" +
      "<tr><td>Partes práticas executadas</td><td>" + Math.round(P.checklist * 100) + "%</td></tr>" +
      "</tbody></table>" +
      "<p>A aula é aprovada com nota <b>" + ref.notaMinima + "</b> ou mais. Com todas as aulas da mentoria aprovadas, o <b>certificado</b> daquela mentoria libera no menu Certificado.</p></section>" +

      '<section class="guia-bloco"><h2>Rotina recomendada</h2><ol class="guia-passos">' +
      "<li><b>No dia da aula:</b> veja todos os cards novos e comece as partes práticas.</li>" +
      "<li><b>Todos os dias:</b> 10 minutos de revisão, só os cards que estão para revisar.</li>" +
      "<li><b>Em até 48 horas:</b> aplique algo da aula num cliente real.</li>" +
      "<li><b>Depois de uma semana:</b> faça a revisão livre e então as duas provas.</li>" +
      "</ol></section>" +
      '<div class="linha-botoes"><a class="btn btn-primario" href="' + (CURSO ? rota("") : "#/") + '">' + (CURSO ? "Voltar para as aulas" : "Ir para as mentorias") + "</a></div>" +
      "</article>"
    );
  }

  // ---------- certificado ----------

  function telaCertificado(modelo) {
    const situacao = CURSO.aulas.map(function (a) {
      const r = a.disponivel && AULAS[a.numero] ? resumoAula(a.numero, S.dados) : null;
      return { a: a, r: r };
    });
    const completo = situacao.length > 0 && situacao.every(function (x) { return x.r && x.r.aprovado; });
    const nome = (S.perfil && S.perfil.nome) || S.session.user.email;

    if (completo || (modelo && S.perfil && S.perfil.is_admin && situacao.length)) {
      const notas = situacao.map(function (x) { return x.r ? x.r.nota : 0; });
      const media = Math.round(notas.reduce(function (s, v) { return s + v; }, 0) / notas.length);
      const codigo = S.session.user.id.replace(/-/g, "").slice(0, 10).toUpperCase();
      layout(
        '<div class="sem-imprimir linha-botoes"><a href="' + rota("") + '" class="voltar">← Voltar</a><button class="btn btn-primario" onclick="window.print()">Imprimir / salvar em PDF</button></div>' +
        (completo ? "" : '<div class="aviso sem-imprimir">Modelo de visualização (somente administradores). O certificado real só libera com as 6 aulas aprovadas.</div>') +
        '<article class="certificado"' + (completo ? " data-festa" : "") + '><div class="cert-borda">' +
        '<div class="cert-marca">' + marca("claro") + "</div>" +
        '<p class="cert-kicker">Certificado de conclusão</p>' +
        "<p>Certificamos que</p><h1>" + esc(nome) + "</h1>" +
        "<p>concluiu o programa de estudos interno da Keep Ads referente à<br><b>" + esc(CURSO.tipo + " " + CURSO.titulo) + "</b>, de " + esc(CURSO.mentor) + ",<br>com aprovação nas " + CURSO.aulas.length + " aulas e média final <b>" + media + "</b>.</p>" +
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
      '<p class="muted">' + esc(CURSO.tipo + " " + CURSO.titulo + " · " + CURSO.mentor) + "</p>" +
      (CURSO.aulas.length
        ? "<p>O certificado libera quando as " + CURSO.aulas.length + " aulas estiverem aprovadas (nota " + CURSO.notaMinima + " ou mais em cada uma).</p>"
        : "<p>As aulas desta mentoria ainda não foram liberadas.</p>") +
      '<ul class="lista-cert">' + itens + "</ul>" +
      (S.perfil && S.perfil.is_admin && CURSO.aulas.length ? '<a class="btn btn-secundario" href="' + rota("certificado/modelo") + '">Ver modelo do certificado</a>' : "") +
      "</div>"
    );
  }

  // ---------- ranking da mentoria ----------

  // ---------- temporada (competição de 90 dias) ----------

  const TEMPORADAS = window.TEMPORADAS || [];
  const PONTOS = window.TEMPORADA_PONTOS || {};
  const NIVEIS = window.TEMPORADA_NIVEIS || [{ nome: "Bronze", xp: 0, icone: "🥉" }];

  function dataLocal(iso) { const p = iso.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function hojeLocal() { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

  // A temporada em andamento, ou a próxima, ou a última que terminou
  function temporadaAtual() {
    const hoje = hojeLocal();
    return TEMPORADAS.find(function (t) { return dataLocal(t.fim) >= hoje; }) || TEMPORADAS[TEMPORADAS.length - 1] || null;
  }

  function situacaoTemporada(t) {
    const hoje = hojeLocal(), ini = dataLocal(t.inicio), fim = dataLocal(t.fim);
    const total = Math.round((fim - ini) / DIA) + 1;
    if (hoje < ini) return { fase: "antes", dias: Math.round((ini - hoje) / DIA), total: total, pct: 0 };
    if (hoje > fim) return { fase: "fim", dias: 0, total: total, pct: 100 };
    const passados = Math.round((hoje - ini) / DIA) + 1;
    return { fase: "andamento", dias: total - passados, dia: passados, total: total, pct: passados / total * 100 };
  }

  function nivelDe(xp) {
    let atual = NIVEIS[0], prox = null;
    NIVEIS.forEach(function (nv, i) { if (xp >= nv.xp) { atual = nv; prox = NIVEIS[i + 1] || null; } });
    return { atual: atual, prox: prox, pct: prox ? (xp - atual.xp) / (prox.xp - atual.xp) * 100 : 100 };
  }

  function selosDe(l, aulasTotal) {
    return [
      { icone: "👣", nome: "Primeiro passo", desc: "Revisar o primeiro flashcard", ok: l.revisoes >= 1 },
      { icone: "📝", nome: "Primeira prova", desc: "Fazer a primeira prova", ok: l.provas_feitas >= 1 },
      { icone: "🔥", nome: "7 dias de fogo", desc: "7 dias seguidos batendo a meta", ok: l.ofensiva_max >= 7 },
      { icone: "☄️", nome: "Mês em chamas", desc: "30 dias seguidos batendo a meta", ok: l.ofensiva_max >= 30 },
      { icone: "🎯", nome: "Gabaritou", desc: "Tirar 100 em uma prova", ok: Number(l.max_nota) >= 100 },
      { icone: "🧠", nome: "Memória de elefante", desc: "50 cards dominados", ok: l.dominados >= 50 },
      { icone: "🛠️", nome: "Mão na massa", desc: "9 partes práticas executadas", ok: l.praticas >= 9 },
      { icone: "🏃", nome: "Maratonista", desc: "500 flashcards revisados", ok: l.revisoes >= 500 },
      { icone: "✅", nome: "Aula aprovada", desc: "Ser aprovado em uma aula", ok: l.aulas_aprovadas >= 1 },
      { icone: "🎓", nome: "Mentoria em dia", desc: "Aprovado em todas as aulas liberadas", ok: aulasTotal > 0 && l.aulas_aprovadas >= aulasTotal }
    ];
  }

  // Tabela de pontos e regras de justiça (usadas na página da Temporada e no Como funciona)
  function tabelaXP(curso) {
    const P = PONTOS, of = P.ofensiva || {};
    return '<table class="tabela"><thead><tr><th>Ação</th><th>XP</th><th>Regra</th></tr></thead><tbody>' +
      "<tr><td>Revisar um flashcard</td><td>" + P.revisao + "</td><td>Até " + P.limiteDia + " XP por dia. A revisão livre vale metade.</td></tr>" +
      "<tr><td>Bater a meta do dia (1 pomodoro + " + REGRAS.metaDiaria + " cards)</td><td>+" + P.meta + "</td><td>Uma vez por dia</td></tr>" +
      "<tr><td>Ofensiva de " + Object.keys(of).join(", ") + " dias</td><td>+" + Object.keys(of).map(function (k) { return of[k]; }).join(", +") + "</td><td>Dias seguidos batendo a meta, dentro da temporada</td></tr>" +
      "<tr><td>Card dominado</td><td>" + P.dominado + "</td><td>Card que você lembra há 7 dias ou mais</td></tr>" +
      "<tr><td>Parte prática executada</td><td>" + P.pratica + "</td><td>Com o relato do que fez. O organizador pode conferir.</td></tr>" +
      "<tr><td>Prova</td><td>nota × " + P.prova + "</td><td>Melhor nota de cada prova feita na temporada (até " + (100 * P.prova) + ")</td></tr>" +
      "<tr><td>Aula aprovada</td><td>+" + P.aula + "</td><td>Nota " + curso.notaMinima + " ou mais na aula</td></tr>" +
      "</tbody></table>";
  }

  function regrasTemporada(t) {
    return '<ul class="regras-lista"><li>Vale só o que é feito na mentoria da temporada, entre ' + dataBR(dataLocal(t.inicio)) + " e " + dataBR(dataLocal(t.fim)) + ". O que foi feito antes não conta: todo mundo larga do zero.</li>" +
      "<li>Empate no placar: ganha quem tiver a maior média nas provas.</li>" +
      "<li>Quem ganha um dos 3 primeiros lugares não concorre a Maior evolução nem a Ofensiva mais longa.</li>" +
      (t.adminsConcorrem ? "" : "<li>Os organizadores aparecem no placar, mas não disputam os prêmios.</li>") +
      "<li>Marcar prática sem ter feito, ou qualquer tentativa de burlar o placar, tira a pessoa da temporada.</li></ul>";
  }

  // Seção "Temporada" da página Como funciona
  function blocoTemporadaGuia() {
    const t = temporadaAtual();
    if (!t) return "";
    const curso = CURSOS.find(function (x) { return x.id === t.curso; }) || CURSOS[0];
    const proximas = TEMPORADAS.filter(function (x) { return x !== t && dataLocal(x.inicio) > dataLocal(t.fim); });
    const total = t.premios.reduce(function (s, p) { return s + (p.valor || 0); }, 0);
    const vazio = { revisoes: 0, provas_feitas: 0, ofensiva_max: 0, max_nota: 0, dominados: 0, praticas: 0, aulas_aprovadas: 0 };
    return '<section class="guia-bloco" id="temporada"><h2>🏆 Temporada: a competição de 90 dias</h2>' +
      "<p>A Temporada é um jogo de <b>90 dias</b> em que toda a equipe disputa quem mais estuda e aprende de verdade. Cada temporada foca em <b>uma mentoria</b>, a que a empresa mais precisa naquele momento, e termina com prêmios para os vencedores.</p>" +
      '<div class="aviso"><b>' + esc(t.nome) + ":</b> " + esc(curso.tipo + " " + curso.titulo) + " (" + esc(curso.mentor) + "), de <b>" + dataBR(dataLocal(t.inicio)) + "</b> a <b>" + dataBR(dataLocal(t.fim)) + "</b>." +
      (total ? " <b>R$ " + total.toLocaleString("pt-BR") + "</b> em prêmios." : "") + "</div>" +
      (proximas.length ? '<p class="muted pequeno">Próximas: ' + proximas.map(function (x) {
        const c = CURSOS.find(function (y) { return y.id === x.curso; });
        return esc(x.nome) + " (" + esc(c ? c.titulo : x.curso) + ", a partir de " + dataBR(dataLocal(x.inicio)) + ")";
      }).join(" · ") + "</p>" : "") +

      "<h3>Como ganhar XP (pontos)</h3>" +
      "<p>Tudo o que você faz na mentoria da temporada vira XP automaticamente: não precisa registrar nada além do que já faz no Academy.</p>" +
      tabelaXP(curso) +
      '<p class="muted pequeno">O peso maior está nas <b>provas</b> e nos <b>cards dominados</b>: ninguém ganha só clicando, ganha quem aprende.</p>' +

      "<h3>Os prêmios</h3><ul>" +
      t.premios.map(function (p) { return "<li>" + p.icone + " <b>" + esc(p.titulo) + "</b>: " + esc(p.regra.charAt(0).toLowerCase() + p.regra.slice(1)) + ". O ganhador escolhe um entre " + p.opcoes.map(esc).join(", ") + ".</li>"; }).join("") +
      "</ul>" +
      "<p><b>Maior evolução</b> e <b>Ofensiva mais longa</b> existem para que qualquer pessoa tenha chance de ganhar, mesmo quem começou atrás: a evolução conta só os últimos 30 dias da temporada.</p>" +

      "<h3>Destaque da semana</h3>" +
      "<p>Além do placar dos 90 dias, existe um placar que <b>zera toda segunda</b>. Quem fizer mais XP de segunda a domingo aparece como destaque da semana. São 13 chances de brilhar ao longo da temporada.</p>" +

      "<h3>Níveis</h3>" +
      "<p>Conforme o seu XP cresce, você sobe de nível: " + NIVEIS.map(function (n) { return n.icone + " <b>" + esc(n.nome) + "</b> (" + n.xp + " XP)"; }).join(" → ") + ".</p>" +

      "<h3>Selos</h3>" +
      '<p>Conquistas que você desbloqueia ao longo da temporada. Ficam coloridos na página da Temporada quando você conquista.</p><div class="selos">' +
      selosDe(vazio, 0).map(function (x) { return '<div class="selo ganho"><i>' + x.icone + "</i><b>" + esc(x.nome) + "</b><span>" + esc(x.desc) + "</span></div>"; }).join("") +
      "</div>" +

      "<h3>Regras de justiça</h3>" + regrasTemporada(t) +

      "<h3>Como subir no placar</h3><ol class=\"guia-passos\">" +
      "<li><b>Estude todo dia, mesmo que pouco.</b> Bater a meta diária rende bônus de ofensiva. Uma maratona num dia só bate no limite de " + PONTOS.limiteDia + " XP.</li>" +
      "<li><b>Seja honesto nas notas dos flashcards.</b> Card dominado de verdade vale XP; marcar Fácil sem saber faz o card voltar e você esquecer.</li>" +
      "<li><b>Execute as partes práticas</b> e escreva o que fez: cada uma vale " + PONTOS.pratica + " XP.</li>" +
      "<li><b>Faça as provas assim que liberarem.</b> Elas são o que mais rende XP (até " + (100 * PONTOS.prova) + " cada), e a aula aprovada ainda dá +" + PONTOS.aula + ".</li>" +
      "</ol>" +
      '<p><a class="btn btn-primario" href="#/temporada">Ver o placar da temporada</a></p></section>';
  }

  // Faixa da temporada na tela de mentorias
  function bannerTemporada() {
    const t = temporadaAtual();
    if (!t) return "";
    const s = situacaoTemporada(t);
    const c = CURSOS.find(function (x) { return x.id === t.curso; });
    const premio = t.premios.reduce(function (soma, p) { return soma + (p.valor || 0); }, 0);
    const quando = s.fase === "antes" ? "começa em <b>" + s.dias + (s.dias === 1 ? " dia" : " dias") + "</b>"
      : s.fase === "andamento" ? "faltam <b>" + s.dias + (s.dias === 1 ? " dia" : " dias") + "</b>" : "encerrada";
    return '<a class="banner-temporada" href="#/temporada"><span class="bt-icone">🏆</span><span class="bt-texto"><b>' + esc(t.nome) + "</b> · " +
      esc(c ? c.titulo : "") + " · " + quando + (premio ? " · R$ " + premio.toLocaleString("pt-BR") + " em prêmios" : "") +
      '</span><span class="bt-ir">Ver placar →</span></a>';
  }

  async function telaTemporada() {
    const t = temporadaAtual();
    if (!t) { layout('<div class="painel"><h2>Temporada</h2><p>Nenhuma temporada cadastrada ainda.</p></div>'); return; }
    const curso = CURSOS.find(function (x) { return x.id === t.curso; });
    const aulasCurso = TODAS_AULAS[curso.id] || {};
    const praticas = {};
    aulasDisponiveis(curso).forEach(function (a) { if (aulasCurso[a.numero]) praticas[a.numero] = aulasCurso[a.numero].pratica.length; });
    const aulasTotal = Object.keys(praticas).length;
    const s = situacaoTemporada(t);

    layout('<div class="painel centro"><p>Carregando a temporada…</p></div>');
    const r = await sb.rpc("academy_temporada", {
      p_curso: curso.id, p_inicio: t.inicio, p_fim: t.fim, p_versao: curso.versaoProvas,
      p_regras: Object.assign({}, PONTOS, { metaDiaria: REGRAS.metaDiaria, notaMinima: curso.notaMinima, pesos: curso.pesos }),
      p_praticas: praticas
    });
    if (r.error) { layout('<div class="painel"><p class="erro">' + esc(traduzErro(r.error)) + "</p></div>"); return; }

    const eu = S.session.user.id;
    const linhas = (r.data || []).map(function (l) {
      return Object.assign({}, l, { xp: Number(l.xp_total) || 0, semana: Number(l.xp_semana) || 0, reta: Number(l.xp_reta_final) || 0,
        concorre: t.adminsConcorrem || !l.is_admin });
    }).sort(function (a, b) { return b.xp - a.xp || (Number(b.media_provas) || 0) - (Number(a.media_provas) || 0) || String(a.nome).localeCompare(b.nome); });
    const concorrentes = linhas.filter(function (l) { return l.concorre; });
    concorrentes.forEach(function (l, i) { l.pos = i + 1; });
    const meu = linhas.find(function (l) { return l.user_id === eu; });

    // Quem lidera cada prêmio agora (Maior evolução e Ofensiva excluem os 3 primeiros)
    const top3 = concorrentes.slice(0, 3).map(function (l) { return l.user_id; });
    const resto = concorrentes.filter(function (l) { return top3.indexOf(l.user_id) < 0; });
    const lider = {
      campeao: concorrentes[0], segundo: concorrentes[1], terceiro: concorrentes[2],
      evolucao: resto.slice().sort(function (a, b) { return b.reta - a.reta; })[0],
      ofensiva: resto.slice().sort(function (a, b) { return b.ofensiva_max - a.ofensiva_max; })[0]
    };
    const pontuou = function (l, id) {
      if (!l) return false;
      if (id === "evolucao") return l.reta > 0;
      if (id === "ofensiva") return l.ofensiva_max > 0;
      return l.xp > 0;
    };

    const quando = s.fase === "antes" ? "Começa em <b>" + s.dias + (s.dias === 1 ? " dia" : " dias") + "</b> · " + dataBR(dataLocal(t.inicio))
      : s.fase === "andamento" ? "Dia <b>" + s.dia + "</b> de " + s.total + " · faltam <b>" + s.dias + "</b> dias"
      : "Temporada encerrada em " + dataBR(dataLocal(t.fim));
    const hero = '<section class="hero hero-temporada"><div>' +
      '<p class="hero-kicker">' + esc(t.nome.toLowerCase()) + " · " + esc((curso.mentor || "").toLowerCase()) + "</p>" +
      "<h1>" + esc(curso.titulo) + "</h1>" +
      "<p>" + quando + " · de " + dataBR(dataLocal(t.inicio)) + " a " + dataBR(dataLocal(t.fim)) + "</p>" +
      barra(s.pct, "barra-temporada") + "</div>" +
      (meu ? (function () {
        const nv = nivelDe(meu.xp);
        return '<div class="hero-stats"><div><b>' + (meu.concorre ? meu.pos + "º" : "—") + "</b><span>" + (meu.concorre ? "sua posição" : "organizador") + "</span></div>" +
          "<div><b>" + meu.xp + "</b><span>XP na temporada</span></div>" +
          "<div><b>" + nv.atual.icone + "</b><span>" + esc(nv.atual.nome) + "</span></div></div>";
      })() : "") +
      "</section>";

    const meuBloco = meu ? (function () {
      const nv = nivelDe(meu.xp);
      const partes = [
        ["Flashcards", meu.xp_revisao, meu.revisoes + " revisados"],
        ["Meta do dia", meu.xp_meta, meu.dias_meta + " dias"],
        ["Bônus de ofensiva", meu.xp_ofensiva, "recorde: " + meu.ofensiva_max + " dias"],
        ["Cards dominados", meu.xp_dominados, meu.dominados + " cards"],
        ["Partes práticas", meu.xp_praticas, meu.praticas + " executadas"],
        ["Provas", meu.xp_provas, meu.provas_feitas + " feitas" + (meu.media_provas !== null ? " · média " + meu.media_provas : "")],
        ["Aulas aprovadas", meu.xp_aulas, meu.aulas_aprovadas + " aulas"]
      ].map(function (p) {
        return "<li><span>" + p[0] + ' <small class="muted">' + p[2] + "</small></span><b>+" + Math.round(Number(p[1]) || 0) + "</b></li>";
      }).join("");
      const selos = selosDe(meu, aulasTotal).map(function (x) {
        return '<div class="selo' + (x.ok ? " ganho" : "") + '" title="' + esc(x.desc) + '"><i>' + x.icone + "</i><b>" + esc(x.nome) + "</b><span>" + esc(x.desc) + "</span></div>";
      }).join("");
      return '<div class="temporada-grade">' +
        '<section class="painel"><h2>Meu XP</h2>' +
        '<div class="nivel"><span class="nivel-icone">' + nv.atual.icone + "</span><div><b>" + esc(nv.atual.nome) + "</b>" +
        (nv.prox ? "<span>" + (nv.prox.xp - meu.xp) + " XP para " + esc(nv.prox.nome) + " " + nv.prox.icone + "</span>" : "<span>Nível máximo</span>") +
        barra(nv.pct) + "</div></div>" +
        '<ul class="xp-lista">' + partes + "</ul>" +
        '<p class="muted pequeno">Nesta semana: <b>' + meu.semana + " XP</b></p></section>" +
        '<section class="painel"><h2>Meus selos</h2><div class="selos">' + selos + "</div></section></div>";
    })() : "";

    const semana = concorrentes.slice().sort(function (a, b) { return b.semana - a.semana; }).filter(function (l) { return l.semana > 0; }).slice(0, 3);
    const blocoSemana = '<section class="painel"><h2>⚡ Destaque da semana</h2>' +
      '<p class="muted">O placar da semana zera toda segunda. Quem fizer mais XP de segunda a domingo ganha o selo de destaque.</p>' +
      (semana.length ? '<ol class="semana-lista">' + semana.map(function (l, i) {
        return "<li" + (l.user_id === eu ? ' class="voce"' : "") + "><span>" + ["🥇", "🥈", "🥉"][i] + " " + esc(l.nome || "Sem nome") + "</span><b>" + l.semana + " XP</b></li>";
      }).join("") + "</ol>" : '<p class="muted">Ninguém pontuou nesta semana ainda. Saia na frente.</p>') + "</section>";

    const premios = t.premios.length ? '<section class="premios">' + t.premios.map(function (p) {
      const l = lider[p.id];
      return '<article class="premio' + (p.id === "campeao" ? " premio-principal" : "") + '"><div class="premio-topo"><span class="premio-icone">' + p.icone + "</span>" +
        "<div><b>" + esc(p.titulo) + "</b><span>" + esc(p.regra) + "</span></div></div>" +
        '<p class="premio-escolha">O ganhador escolhe um:</p><ul>' + p.opcoes.map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ul>" +
        '<p class="premio-lider">' + (s.fase === "antes" ? "Começa a valer em " + dataBR(dataLocal(t.inicio))
          : p.id === "evolucao" && s.fase === "andamento" && s.dias >= 30 ? "Conta os últimos 30 dias da temporada"
          : pontuou(l, p.id) ? (s.fase === "fim" ? "Ganhador: " : "Liderando: ") + "<b>" + esc(l.nome || "Sem nome") + "</b>" : "Ninguém pontuou ainda") + "</p></article>";
    }).join("") + "</section>" : '<div class="painel"><p class="muted">Os prêmios desta temporada serão anunciados antes do início.</p></div>';

    const tabela = '<section class="painel"><h2>Placar geral</h2><div class="tabela-rolagem sem-sombra"><table class="tabela"><thead><tr>' +
      "<th>#</th><th>Nome</th><th>Nível</th><th>XP</th><th>Semana</th><th>Ofensiva</th><th>Provas</th></tr></thead><tbody>" +
      linhas.map(function (l) {
        const nv = nivelDe(l.xp);
        return "<tr" + (l.user_id === eu ? ' class="voce"' : "") + "><td>" + (l.concorre ? l.pos + "º" : "—") + "</td>" +
          "<td>" + esc(l.nome || "Sem nome") + (l.concorre ? "" : ' <span class="chip chip-cinza">organizador</span>') + "</td>" +
          "<td>" + nv.atual.icone + " " + esc(nv.atual.nome) + "</td><td><b>" + l.xp + "</b></td><td>" + l.semana + "</td>" +
          "<td>🔥 " + l.ofensiva_max + "</td><td>" + (l.media_provas !== null ? l.media_provas : "—") + "</td></tr>";
      }).join("") + "</tbody></table></div></section>";

    const regras = '<section class="painel metodo-temporada"><h2>Como ganhar XP</h2>' + tabelaXP(curso) + regrasTemporada(t) +
      '<p class="muted pequeno">Explicação completa em <a href="#/como-funciona">Como funciona</a>.</p></section>';

    layout(hero + meuBloco + premios + '<div class="temporada-grade">' + blocoSemana + tabela + "</div>" + regras);
  }

  async function telaRanking() {
    layout('<div class="painel centro"><p>Carregando o ranking…</p></div>');
    const semana = inicioDaSemana();
    const res = await Promise.all([
      sb.rpc("academy_ranking", { p_curso: CURSO.id, p_versao: CURSO.versaoProvas, p_meta: REGRAS.metaDiaria }),
      carregarFoco(semana, new Date()).then(function (x) { return x; }, function () { return null; })
    ]);
    const r = res[0], foco = res[1];
    if (r.error) { layout('<div class="painel"><p class="erro">' + esc(traduzErro(r.error)) + "</p></div>"); return; }
    const eu = S.session.user.id;
    const totalProvas = aulasDisponiveis(CURSO).length * 2;
    const pessoas = (r.data || []).map(function (p) {
      return { id: p.user_id, nome: p.nome || "(sem nome)", provas: p.provas_feitas, media: p.media === null ? null : Number(p.media), ofensiva: p.ofensiva };
    });

    // Ranking de notas: média das melhores notas de cada prova; empate desempata por provas feitas e ofensiva
    const porNota = pessoas.filter(function (p) { return p.media !== null; }).sort(function (a, b) {
      return b.media - a.media || b.provas - a.provas || b.ofensiva - a.ofensiva;
    });
    const semProva = pessoas.filter(function (p) { return p.media === null; });
    const porOfensiva = pessoas.slice().sort(function (a, b) { return b.ofensiva - a.ofensiva; }).filter(function (p) { return p.ofensiva > 0; }).slice(0, 10);

    const medalhas = ["🥇", "🥈", "🥉"];
    const podio = porNota.slice(0, 3).map(function (p, i) {
      return '<div class="podio-lugar lugar-' + (i + 1) + (p.id === eu ? " voce" : "") + '"><span class="medalha">' + medalhas[i] + "</span>" +
        "<b>" + esc(p.nome.split(" ")[0]) + "</b><span class=\"podio-nota\">" + p.media.toFixed(1).replace(".", ",") + "</span>" +
        '<span class="muted pequeno">🔥 ' + p.ofensiva + "</span></div>";
    }).join("");

    const linhaNota = function (p, i) {
      return '<tr class="' + (p.id === eu ? "voce" : "") + '"><td><b>' + (i + 1) + "º</b></td><td>" + esc(p.nome) + (p.id === eu ? ' <span class="chip chip-ok">você</span>' : "") + "</td>" +
        "<td><b>" + p.media.toFixed(1).replace(".", ",") + "</b></td><td>" + p.provas + "/" + totalProvas + "</td><td>🔥 " + p.ofensiva + "</td></tr>";
    };
    const linhaOfensiva = function (p, i) {
      return '<tr class="' + (p.id === eu ? "voce" : "") + '"><td><b>' + (i + 1) + "º</b></td><td>" + esc(p.nome) + "</td><td><b>🔥 " + p.ofensiva + "</b> " + (p.ofensiva === 1 ? "dia" : "dias") + "</td></tr>";
    };

    layout(
      '<a href="' + rota("") + '" class="voltar">← Voltar para as aulas</a>' +
      '<p class="hero-kicker">ranking</p><h1>' + esc(CURSO.tipo + " " + CURSO.titulo) + "</h1>" +
      '<p class="muted">Só entram aqui as pessoas desta mentoria. A nota é a média das provas feitas, considerando a melhor tentativa de cada prova.</p>' +
      (porNota.length ? '<section class="podio">' + podio + "</section>" : "") +
      '<section class="painel"><h2>Ranking das provas</h2>' +
      (porNota.length
        ? '<div class="tabela-rolagem sem-sombra"><table class="tabela"><thead><tr><th>#</th><th>Pessoa</th><th>Média</th><th>Provas</th><th>Ofensiva</th></tr></thead><tbody>' +
          porNota.map(linhaNota).join("") + "</tbody></table></div>"
        : '<p class="muted">Ninguém fez prova ainda. As provas liberam depois de uma semana de flashcards.</p>') +
      (semProva.length ? '<p class="muted pequeno">Ainda sem prova: ' + semProva.map(function (p) { return esc(p.nome); }).join(", ") + ".</p>" : "") +
      "</section>" +
      '<section class="painel"><h2>🍅 Ranking de foco da semana</h2>' +
      '<p class="muted pequeno">Quem fez mais pomodoros desde segunda-feira (' + dataBR(semana) + "), em todas as mentorias. Zera toda segunda.</p>" +
      (foco ? tabelaFoco(foco, 10) : '<p class="muted">Não consegui carregar o ranking de foco agora.</p>') +
      '<p><a href="#/relatorio">Ver meu relatório de estudo →</a></p></section>' +
      '<section class="painel"><h2>🔥 Maiores ofensivas</h2>' +
      (porOfensiva.length
        ? '<div class="tabela-rolagem sem-sombra"><table class="tabela"><thead><tr><th>#</th><th>Pessoa</th><th>Ofensiva</th></tr></thead><tbody>' +
          porOfensiva.map(linhaOfensiva).join("") + "</tbody></table></div>"
        : '<p class="muted">Ninguém está com ofensiva ativa agora. Faça 1 pomodoro e revise ' + REGRAS.metaDiaria + " flashcards hoje e seja o primeiro.</p>") +
      '<p class="muted pequeno">Ofensiva = dias seguidos com pelo menos 1 pomodoro e ' + REGRAS.metaDiaria + " flashcards revisados, em qualquer mentoria.</p></section>"
    );
  }

  // ---------- equipe (admin) ----------

  async function telaEquipe() {
    if (!S.perfil || !S.perfil.is_admin) { location.hash = "#/"; return; }
    layout('<div class="painel centro"><p>Carregando a equipe…</p></div>');
    const res = await Promise.all([
      sb.from(T.perfis).select("id,nome,email,created_at").order("nome"),
      sb.from(T.cards).select("user_id,card_id,aula,interval_days,due").eq("curso", CURSO.id),
      sb.from(T.praticas).select("user_id,aula,task_id,done").eq("curso", CURSO.id),
      sb.from(T.provas).select("user_id,aula,tipo,nota,created_at,versao:respostas->_versao").eq("curso", CURSO.id)
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
      '<a href="' + rota("") + '" class="voltar">← Voltar para as aulas</a>' +
      "<h1>Equipe</h1><p class=\"muted\">" + esc(CURSO.tipo + " " + CURSO.titulo + " · " + CURSO.mentor) +
      ". Progresso de todo mundo que criou conta: " + linhas.length + " pessoa(s).</p>" +
      (disponiveis.length ? "" : '<p class="aviso">Esta mentoria ainda não tem aulas liberadas.</p>') +
      '<div class="tabela-rolagem"><table class="tabela"><thead><tr><th>Pessoa</th>' + cab + "<th>Aprovadas</th><th>Última prova</th></tr></thead><tbody>" + corpo + "</tbody></table></div>"
    );
  }

  // ---------- relatório de estudo ----------
  // Horas de estudo = minutos de foco dos pomodoros + tempo nos flashcards fora de um pomodoro.
  // O tempo nos cards é estimado pelo intervalo entre um card e o próximo (até 5 min; acima disso
  // é uma sessão nova e o card conta 30 s). O banco faz a mesma conta em academy_foco (supabase/relatorio.sql).
  const PAUSA_SESSAO = 5 * 60000, CARD_SOLTO = 30000;

  function inicioDoDia(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function somarDias(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function inicioDaSemana() { const h = inicioDoDia(new Date()); return somarDias(h, -((h.getDay() + 6) % 7)); }   // segunda-feira

  function tempoTxt(seg) {
    const min = Math.round(seg / 60);
    if (min < 60) return min + " min";
    return Math.floor(min / 60) + "h" + (min % 60 ? dois(min % 60) : "");
  }

  function estudoNoPeriodo(ini, fim) {
    const dentro = function (t) { return t >= ini.getTime() && t < fim.getTime(); };
    const poms = ((S.bruto && S.bruto.pomodoros) || []).filter(function (p) { return dentro(Date.parse(p.concluido_em)); });
    const todos = ((S.bruto && S.bruto.pomodoros) || []).map(function (p) { return [Date.parse(p.iniciado_em), Date.parse(p.concluido_em)]; });
    const revs = ((S.bruto && S.bruto.log) || []).map(function (l) { return Date.parse(l.reviewed_at); }).filter(dentro).sort(function (a, b) { return a - b; });
    const porDia = {};
    const dia = function (t) { const k = diaLocal(new Date(t)); return porDia[k] || (porDia[k] = { foco: 0, extra: 0, cards: 0, pomodoros: 0 }); };
    let minFoco = 0, segCards = 0, segExtra = 0;
    poms.forEach(function (p) { const d = dia(Date.parse(p.concluido_em)); d.foco += p.minutos; d.pomodoros++; minFoco += p.minutos; });
    revs.forEach(function (t, i) {
      const gap = i ? t - revs[i - 1] : Infinity;
      const s = (gap <= PAUSA_SESSAO ? gap : CARD_SOLTO) / 1000;
      const noFoco = todos.some(function (p) { return t >= p[0] && t <= p[1]; });
      const d = dia(t);
      d.cards++;
      segCards += s;
      if (!noFoco) { segExtra += s; d.extra += s; }
    });
    // Dispersão: só nos pomodoros de estudo (no de execução a pessoa trabalha fora da plataforma)
    const estudo = poms.filter(function (p) { return (p.tipo || "estudo") === "estudo"; });
    const foraSeg = estudo.reduce(function (s, p) { return s + (p.fora_segundos || 0); }, 0);
    const minEstudo = estudo.reduce(function (s, p) { return s + p.minutos; }, 0);
    return {
      pomodoros: poms.length, minFoco: minFoco, cards: revs.length, segCards: segCards, segExtra: segExtra,
      segTotal: minFoco * 60 + segExtra, dias: Object.keys(porDia).length, porDia: porDia,
      pomEstudo: estudo.length, pomExecucao: poms.length - estudo.length, foraSeg: foraSeg,
      saidas: estudo.reduce(function (s, p) { return s + (p.saidas || 0); }, 0),
      dispersos: estudo.filter(function (p) { return (p.fora_segundos || 0) >= REGRAS.limiteForaMinutos * 60; }).length,
      indiceFoco: minEstudo ? Math.max(0, Math.round((1 - foraSeg / (minEstudo * 60)) * 100)) : null
    };
  }

  async function carregarFoco(ini, fim) {
    const r = await sb.rpc("academy_foco", { p_inicio: ini.toISOString(), p_fim: fim.toISOString(), p_limite_fora: REGRAS.limiteForaMinutos * 60 });
    if (r.error) throw r.error;
    return (r.data || []).map(function (p) {
      return { id: p.user_id, nome: p.nome || "(sem nome)", pomodoros: p.pomodoros, minFoco: p.minutos_foco, cards: p.cards,
        segCards: p.segundos_cards, segTotal: p.minutos_foco * 60 + p.segundos_extra, dias: p.dias,
        pomEstudo: p.pomodoros_estudo, foraSeg: p.fora_segundos, saidas: p.saidas, dispersos: p.dispersos,
        indiceFoco: p.minutos_estudo ? Math.max(0, Math.round((1 - p.fora_segundos / (p.minutos_estudo * 60)) * 100)) : null };
    }).sort(function (a, b) { return b.pomodoros - a.pomodoros || b.segTotal - a.segTotal || b.cards - a.cards; });
  }

  // Ranking de foco: quem fez mais pomodoros no período (empate: mais horas de estudo)
  function tabelaFoco(pessoas, limite) {
    const eu = S.session.user.id;
    const ativos = pessoas.filter(function (p) { return p.pomodoros || p.cards; });
    const parados = pessoas.filter(function (p) { return !p.pomodoros && !p.cards; });
    const lista = limite ? ativos.slice(0, limite) : ativos;
    const medalhas = ["🥇", "🥈", "🥉"];
    if (!lista.length) return '<p class="muted">Ninguém estudou neste período ainda. Comece um 🍅 e saia na frente.</p>';
    return '<div class="tabela-rolagem sem-sombra"><table class="tabela tabela-foco"><thead><tr><th>#</th><th>Pessoa</th><th>Pomodoros</th><th>Horas de estudo</th><th>Tempo fora</th><th>Cards</th><th>Dias</th></tr></thead><tbody>' +
      lista.map(function (p, i) {
        return '<tr class="' + (p.id === eu ? "voce" : "") + '"><td><b>' + (medalhas[i] || (i + 1) + "º") + "</b></td><td>" + esc(p.nome) +
          (p.id === eu ? ' <span class="chip chip-ok">você</span>' : "") + "</td><td><b>🍅 " + p.pomodoros + "</b></td><td>" + tempoTxt(p.segTotal) +
          "</td><td>" + (p.pomEstudo ? tempoFora(p.foraSeg) : "—") + "</td><td>" + p.cards + "</td><td>" + p.dias + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      (!limite && parados.length ? '<p class="muted pequeno">Ainda sem estudo no período: ' + parados.map(function (p) { return esc(p.nome); }).join(", ") + ".</p>" : "");
  }

  function tempoFora(seg) { return !seg ? "0 min" : seg < 60 ? "menos de 1 min" : tempoTxt(seg); }

  // Ranking de dispersão: índice de foco = parte do tempo dos pomodoros de estudo em que a pessoa ficou na plataforma
  function tabelaDispersao(pessoas) {
    const eu = S.session.user.id;
    const lista = pessoas.filter(function (p) { return p.pomEstudo; }).sort(function (a, b) {
      return b.indiceFoco - a.indiceFoco || a.foraSeg - b.foraSeg || b.pomEstudo - a.pomEstudo;
    });
    if (!lista.length) return '<p class="muted">Ninguém fez pomodoro de estudo neste período ainda.</p>';
    return '<div class="tabela-rolagem sem-sombra"><table class="tabela"><thead><tr><th>#</th><th>Pessoa</th><th>Índice de foco</th><th>Tempo fora</th><th>Saídas</th><th>Pomodoros dispersos</th></tr></thead><tbody>' +
      lista.map(function (p, i) {
        return '<tr class="' + (p.id === eu ? "voce" : "") + '"><td><b>' + (i + 1) + "º</b></td><td>" + esc(p.nome) +
          (p.id === eu ? ' <span class="chip chip-ok">você</span>' : "") + "</td><td><b>🎯 " + p.indiceFoco + "%</b></td><td>" + tempoFora(p.foraSeg) +
          "</td><td>" + p.saidas + "</td><td>" + p.dispersos + " de " + p.pomEstudo + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }

  // Resumo curto dos últimos 7 dias na tela inicial
  function blocoSemana() {
    if (!S.bruto) return "";
    const e = estudoNoPeriodo(somarDias(inicioDoDia(new Date()), -6), new Date());
    return '<a class="semana-resumo" href="#/relatorio">' +
      '<span class="semana-titulo">📊 Seus últimos 7 dias</span>' +
      "<span><b>" + tempoTxt(e.segTotal) + "</b> de estudo</span>" +
      "<span><b>🍅 " + e.pomodoros + "</b> pomodoro" + (e.pomodoros === 1 ? "" : "s") + "</span>" +
      "<span><b>" + e.cards + "</b> cards</span>" +
      '<span class="semana-ver">Ver relatório →</span></a>';
  }

  function variacao(agora, antes) {
    if (!antes && !agora) return "";
    if (!antes) return '<span class="var sobe">novo</span>';
    const p = Math.round((agora - antes) / antes * 100);
    if (p === 0) return '<span class="var">igual</span>';
    return '<span class="var ' + (p > 0 ? "sobe" : "desce") + '">' + (p > 0 ? "▲ +" : "▼ ") + p + "%</span>";
  }

  async function telaRelatorio(param) {
    const dias = param === "30" ? 30 : 7;
    const fim = new Date(), ini = somarDias(inicioDoDia(fim), -(dias - 1));
    const antesIni = somarDias(ini, -dias);
    const e = estudoNoPeriodo(ini, fim), a = estudoNoPeriodo(antesIni, ini);
    const primeiroNome = ((S.perfil && S.perfil.nome) || "").split(" ")[0];

    // Gráfico por dia: minutos de foco (pomodoro) + minutos nos cards fora do pomodoro
    const colunas = [];
    for (let i = 0; i < dias; i++) colunas.push(somarDias(ini, i));
    const maxMin = Math.max(30, Math.max.apply(null, colunas.map(function (d) { const x = e.porDia[diaLocal(d)]; return x ? x.foco + x.extra / 60 : 0; })));
    const semanaCurta = ["D", "S", "T", "Q", "Q", "S", "S"];
    const grafico = colunas.map(function (d, i) {
      const x = e.porDia[diaLocal(d)] || { foco: 0, extra: 0, cards: 0, pomodoros: 0 };
      const hf = x.foco / maxMin * 100, he = x.extra / 60 / maxMin * 100;
      const rotulo = dias === 7 ? semanaCurta[d.getDay()] : (i % 5 === 0 || i === dias - 1 ? d.getDate() : "");
      return '<div class="graf-dia" title="' + dataBR(d) + ": " + x.pomodoros + " pomodoro(s), " + tempoTxt(x.foco * 60 + x.extra) + " de estudo, " + x.cards + ' cards">' +
        '<div class="graf-barra"><span class="graf-cards" style="height:' + he + '%"></span><span class="graf-foco" style="height:' + hf + '%"></span></div>' +
        "<small>" + rotulo + "</small></div>";
    }).join("");

    const periodo = dias === 7 ? "nos últimos 7 dias" : "nos últimos 30 dias";
    const textoResumo = "📊 Meu relatório Keep Ads Academy (" + periodo + ")\n" +
      "⏱️ " + tempoTxt(e.segTotal) + " de estudo\n" +
      "🍅 " + e.pomodoros + " pomodoro" + (e.pomodoros === 1 ? "" : "s") + " (" + tempoTxt(e.minFoco * 60) + " de foco)\n" +
      "🧠 " + e.cards + " flashcards revisados\n" +
      "📅 " + e.dias + " de " + dias + " dias estudando\n" +
      (e.indiceFoco !== null ? "🎯 Índice de foco: " + e.indiceFoco + "% (" + tempoFora(e.foraSeg) + " fora da plataforma)\n" : "") +
      "🔥 Ofensiva atual: " + calcularOfensiva().dias + " dia(s)";

    const frase = !e.segTotal
      ? "Você ainda não estudou " + periodo + ". Que tal começar agora com um 🍅 de " + REGRAS.pomodoroMinutos + " minutos?"
      : (primeiroNome ? esc(primeiroNome) + ", n" : "N") + periodo.slice(1) + " você estudou <b>" + tempoTxt(e.segTotal) + "</b>, fez <b>" + e.pomodoros +
        " pomodoro" + (e.pomodoros === 1 ? "" : "s") + "</b> e revisou <b>" + e.cards + " flashcards</b>, em " + e.dias + " de " + dias + " dias.";

    layout(
      '<p class="hero-kicker">relatório de estudo</p>' +
      '<div class="relatorio-topo"><h1>Seu relatório</h1><div class="abas-auth relatorio-periodo">' +
      '<button data-periodo="7" class="' + (dias === 7 ? "ativo" : "") + '">7 dias</button>' +
      '<button data-periodo="30" class="' + (dias === 30 ? "ativo" : "") + '">30 dias</button></div></div>' +
      '<section class="hero relatorio-hero"><div><p>' + frase + "</p></div>" +
      '<div class="hero-stats">' +
      "<div><b>" + tempoTxt(e.segTotal) + "</b><span>de estudo</span>" + variacao(e.segTotal, a.segTotal) + "</div>" +
      "<div><b>" + e.pomodoros + "</b><span>pomodoros</span>" + variacao(e.pomodoros, a.pomodoros) + "</div>" +
      "<div><b>" + e.cards + "</b><span>flashcards</span>" + variacao(e.cards, a.cards) + "</div>" +
      "<div><b>" + e.dias + "/" + dias + "</b><span>dias estudando</span></div></div></section>" +
      '<div class="relatorio-grade">' +
      '<section class="painel"><h2>Estudo por dia</h2>' +
      '<div class="graf' + (dias === 30 ? " graf-30" : "") + '">' + grafico + "</div>" +
      '<p class="graf-legenda"><span><i class="graf-foco"></i>Foco no pomodoro</span><span><i class="graf-cards"></i>Cards fora do pomodoro</span></p>' +
      '<ul class="relatorio-detalhe">' +
      "<li><span>Tempo de foco (pomodoros)</span><b>" + tempoTxt(e.minFoco * 60) + "</b></li>" +
      "<li><span>Tempo nos flashcards</span><b>" + tempoTxt(e.segCards) + "</b></li>" +
      "<li><span>Média por dia estudado</span><b>" + (e.dias ? tempoTxt(e.segTotal / e.dias) : "—") + "</b></li>" +
      "<li><span>Comparado aos " + dias + " dias anteriores</span><b>" + tempoTxt(a.segTotal) + " antes</b></li></ul>" +
      '<h3 class="relatorio-sub">🎯 Foco nos pomodoros de estudo</h3><ul class="relatorio-detalhe">' +
      "<li><span>Índice de foco (tempo dentro da plataforma)</span><b>" + (e.indiceFoco === null ? "—" : e.indiceFoco + "%") + "</b></li>" +
      "<li><span>Tempo fora da plataforma</span><b>" + tempoFora(e.foraSeg) + (a.pomEstudo ? " <small class=\"muted\">(antes: " + tempoFora(a.foraSeg) + ")</small>" : "") + "</b></li>" +
      "<li><span>Saídas para outras abas ou programas</span><b>" + e.saidas + "</b></li>" +
      "<li><span>Pomodoros dispersos (" + REGRAS.limiteForaMinutos + " min ou mais fora)</span><b>" + e.dispersos + " de " + e.pomEstudo + "</b></li>" +
      "<li><span>Pomodoros de execução prática</span><b>" + e.pomExecucao + "</b></li></ul></section>" +
      '<section class="painel"><h2>Compartilhar</h2><p class="muted pequeno">Seu resumo pronto para mandar no grupo ou para o seu líder.</p>' +
      '<pre class="relatorio-texto" id="rel-texto">' + esc(textoResumo) + "</pre>" +
      '<button class="btn btn-primario btn-largo" id="rel-copiar">Copiar resumo</button></section></div>' +
      '<section class="painel"><h2>🍅 Ranking de foco da equipe</h2><p class="muted pequeno">Quem fez mais pomodoros ' + periodo +
      ", em todas as mentorias. Empate: mais horas de estudo.</p>" +
      '<div id="rel-equipe"><p class="muted">Carregando…</p></div></section>' +
      '<section class="painel"><h2>🎯 Ranking de foco: quem menos se dispersou</h2><p class="muted pequeno">Só pomodoros de estudo ' + periodo +
      ". Índice de foco = parte do tempo do pomodoro em que a pessoa ficou dentro da plataforma. Empate: menos tempo fora.</p>" +
      '<div id="rel-dispersao"><p class="muted">Carregando…</p></div></section>' +
      '<p class="muted pequeno">Como medimos: horas de estudo = minutos dos pomodoros concluídos + tempo nos flashcards fora de um pomodoro. ' +
      "O tempo nos cards é estimado pelo intervalo entre um card e o próximo (uma pausa de mais de 5 minutos conta como sessão nova).</p>"
    );

    app.querySelectorAll("[data-periodo]").forEach(function (b) {
      b.onclick = function () { location.hash = "#/relatorio" + (b.dataset.periodo === "30" ? "/30" : ""); };
    });
    document.getElementById("rel-copiar").onclick = function () {
      const ok = function () { toast("Resumo copiado. É só colar no WhatsApp."); };
      if (navigator.clipboard) navigator.clipboard.writeText(textoResumo).then(ok, function () { toast("Não consegui copiar. Selecione o texto e copie.", "erro"); });
    };
    try {
      const pessoas = await carregarFoco(ini, fim);
      const alvo = document.getElementById("rel-equipe"), alvo2 = document.getElementById("rel-dispersao");
      if (alvo) alvo.innerHTML = tabelaFoco(pessoas);
      if (alvo2) alvo2.innerHTML = tabelaDispersao(pessoas);
    } catch (err) {
      ["rel-equipe", "rel-dispersao"].forEach(function (id) {
        const alvo = document.getElementById(id);
        if (alvo) alvo.innerHTML = '<p class="erro">' + esc(traduzErro(err)) + "</p>";
      });
    }
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

  // ---------- pomodoro ----------
  // Bloco de foco de REGRAS.pomodoroMinutos. O estado fica no localStorage com horários absolutos,
  // então o timer continua certo ao trocar de tela, recarregar ou fechar a aba.
  // Só o pomodoro concluído é gravado no banco (que confere se o tempo passou de verdade).
  const POMO_CHAVE = "academy-pomodoro", POMO_PENDENTES = "academy-pomodoro-pendentes";
  let pomoAberto = false, pomoConfirmar = false, pomoSom = null;

  function lerJSON(chave) { try { return JSON.parse(localStorage.getItem(chave) || "null"); } catch (e) { return null; } }
  function gravarJSON(chave, v) { try { if (v == null) localStorage.removeItem(chave); else localStorage.setItem(chave, JSON.stringify(v)); } catch (e) { /* sem storage */ } }

  function pomoEstado() {
    const e = lerJSON(POMO_CHAVE);
    return e && S.session && e.uid === S.session.user.id ? e : null;
  }
  function pomoRestante(e) { return e.pausadoRestante != null ? e.pausadoRestante : Math.max(0, e.fimEm - Date.now()); }
  function relogio(ms) { const s = Math.ceil(ms / 1000); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }
  function pomodorosHoje() {
    const hoje = diaLocal(new Date());
    return ((S.bruto && S.bruto.pomodoros) || []).filter(function (p) { return diaLocal(p.concluido_em) === hoje; }).length;
  }

  // Bipe curto pelo WebAudio (liberado no clique de começar, porque o navegador exige um gesto)
  function pomoBipe() {
    try {
      pomoSom = pomoSom || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.35, 0.7].forEach(function (t) {
        const o = pomoSom.createOscillator(), g = pomoSom.createGain();
        o.frequency.value = 880; o.connect(g); g.connect(pomoSom.destination);
        g.gain.setValueAtTime(0.0001, pomoSom.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.3, pomoSom.currentTime + t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, pomoSom.currentTime + t + 0.25);
        o.start(pomoSom.currentTime + t); o.stop(pomoSom.currentTime + t + 0.3);
      });
    } catch (e) { /* sem áudio */ }
  }

  // tipo "estudo": dentro da plataforma, o tempo fora da aba conta como disperso;
  // tipo "execucao": parte prática em outras ferramentas, o tempo fora não é medido.
  function pomoComecar(fase, tipo) {
    const min = fase === "pausa" ? REGRAS.pausaMinutos : REGRAS.pomodoroMinutos;
    try { pomoSom = pomoSom || new (window.AudioContext || window.webkitAudioContext)(); if (pomoSom.resume) pomoSom.resume(); } catch (e) { /* sem áudio */ }
    // Pede permissão de notificação no clique, para avisar quando a pessoa sair da plataforma
    if (fase === "foco" && tipo !== "execucao" && window.Notification && Notification.permission === "default") {
      try { Notification.requestPermission(); } catch (e) { /* navegador sem suporte */ }
    }
    gravarJSON(POMO_CHAVE, { uid: S.session.user.id, fase: fase, tipo: fase === "foco" ? (tipo || "estudo") : null, minutos: min,
      inicio: Date.now(), fimEm: Date.now() + min * 60000, pausadoRestante: null, foraMs: 0, saidas: 0, saiuEm: null });
    pomoConfirmar = false;
    pomoAtualizar();
  }

  async function pomoSalvar(item) {
    const r = await sb.from(T.pomodoros).insert({ minutos: item.minutos, iniciado_em: item.iniciado_em,
      tipo: item.tipo || "estudo", fora_segundos: item.fora_segundos || 0, saidas: item.saidas || 0 });
    if (r.error) throw r.error;
    S.bruto.pomodoros.push({ minutos: item.minutos, iniciado_em: item.iniciado_em, concluido_em: new Date().toISOString(),
      tipo: item.tipo || "estudo", fora_segundos: item.fora_segundos || 0, saidas: item.saidas || 0 });
  }

  // ---------- dispersão: tempo fora da plataforma durante o pomodoro de estudo ----------
  // Conta como fora quando a aba fica escondida ou a janela perde o foco (outra aba, outro programa).
  // Saídas de menos de 10 segundos (ex.: clicar na barra de endereço) não contam.
  const SAIDA_MINIMA = 10000;
  let pomoAlertas = [];

  function pomoVigiado(e) { return e && e.fase === "foco" && e.tipo !== "execucao" && e.pausadoRestante == null; }
  function pomoForaAgora() { return document.hidden || !document.hasFocus(); }

  // Fecha uma saída em aberto e soma o tempo (no máximo até o fim do pomodoro)
  function pomoFecharSaida(e, agora) {
    if (!e || !e.saiuEm) return;
    const ms = Math.max(0, Math.min(agora, e.fimEm) - e.saiuEm);
    if (ms >= SAIDA_MINIMA) { e.foraMs = (e.foraMs || 0) + ms; e.saidas = (e.saidas || 0) + 1; }
    e.saiuEm = null;
    return ms;
  }

  function pomoNotificar(titulo, texto) {
    pomoBipe();
    try {
      if (window.Notification && Notification.permission === "granted") {
        const n = new Notification(titulo, { body: texto, tag: "academy-pomodoro" });
        n.onclick = function () { window.focus(); n.close(); };
      }
    } catch (e) { /* sem notificação */ }
  }

  function pomoVigiar() {
    const e = pomoEstado();
    if (!pomoVigiado(e)) return;
    const fora = pomoForaAgora();
    if (fora && !e.saiuEm) {
      e.saiuEm = Date.now();
      gravarJSON(POMO_CHAVE, e);
      const limite = REGRAS.limiteForaMinutos * 60000;
      const jaFora = e.foraMs || 0;
      pomoAlertas.forEach(clearTimeout);
      pomoAlertas = [
        setTimeout(function () {
          const x = pomoEstado();
          if (pomoVigiado(x) && x.saiuEm) pomoNotificar("🍅 Seu pomodoro está rolando", "Você saiu da Keep Ads Academy há " + Math.round((Date.now() - x.saiuEm) / 1000) + " segundos. Volte para o foco!");
        }, REGRAS.alertaForaSegundos * 1000)
      ];
      if (jaFora < limite) {
        pomoAlertas.push(setTimeout(function () {
          const x = pomoEstado();
          if (pomoVigiado(x) && x.saiuEm) pomoNotificar("⚠️ " + REGRAS.limiteForaMinutos + " minutos fora da plataforma", "Este pomodoro vai ficar marcado como disperso no seu relatório.");
        }, limite - jaFora));
      }
    } else if (!fora && e.saiuEm) {
      pomoAlertas.forEach(clearTimeout);
      pomoAlertas = [];
      const ms = pomoFecharSaida(e, Date.now());
      gravarJSON(POMO_CHAVE, e);
      if (ms >= SAIDA_MINIMA) {
        const total = e.foraMs;
        toast("👀 Você ficou " + tempoTxt(ms / 1000).replace("0 min", "menos de 1 min") + " fora da plataforma. Neste pomodoro: " + tempoTxt(total / 1000) +
          (total >= REGRAS.limiteForaMinutos * 60000 ? " (pomodoro disperso)." : "."), total >= REGRAS.limiteForaMinutos * 60000 ? "erro" : "ok");
      }
    }
  }
  document.addEventListener("visibilitychange", pomoVigiar);
  window.addEventListener("blur", function () { setTimeout(pomoVigiar, 50); });
  window.addEventListener("focus", pomoVigiar);

  // Grava os pomodoros que terminaram sem internet (ou com a aba fechada) assim que der
  async function pomoEnviarPendentes() {
    if (!S.session || !S.bruto) return;
    const todos = lerJSON(POMO_PENDENTES) || [];
    const meus = todos.filter(function (p) { return p.uid === S.session.user.id; });
    if (!meus.length) return;
    const sobra = todos.filter(function (p) { return p.uid !== S.session.user.id; });
    for (const p of meus) {
      try { await pomoSalvar(p); }
      catch (e) {
        // Mais de 1 dia ou recusado pelo banco: descarta; erro de rede: tenta de novo depois
        if (!/incompleto|antigo/i.test(e.message || "") && Date.now() - Date.parse(p.iniciado_em) < DIA) sobra.push(p);
      }
    }
    gravarJSON(POMO_PENDENTES, sobra.length ? sobra : null);
    pomoAtualizarOfensiva();
  }

  async function pomoConcluir(e) {
    pomoFecharSaida(e, e.fimEm);
    pomoAlertas.forEach(clearTimeout);
    pomoAlertas = [];
    const foraSeg = e.tipo === "execucao" ? 0 : Math.round((e.foraMs || 0) / 1000);
    gravarJSON(POMO_CHAVE, { uid: e.uid, fase: "feito", tipo: e.tipo, foraSeg: foraSeg, saidas: e.saidas || 0 });
    pomoAberto = true;
    pomoNotificar("🍅 Pomodoro concluído!", "Hora da pausa de " + REGRAS.pausaMinutos + " minutos.");
    const item = { uid: e.uid, minutos: e.minutos, iniciado_em: new Date(e.inicio).toISOString(),
      tipo: e.tipo || "estudo", fora_segundos: foraSeg, saidas: e.tipo === "execucao" ? 0 : (e.saidas || 0) };
    try {
      await pomoSalvar(item);
      const o = calcularOfensiva();
      const disperso = foraSeg >= REGRAS.limiteForaMinutos * 60;
      toast((disperso ? "Pomodoro concluído, mas disperso: " + tempoTxt(foraSeg) + " fora da plataforma. " : "Pomodoro concluído! ") +
        (o.batidaHoje ? "Ofensiva do dia garantida 🔥" : "Agora revise " + Math.max(0, o.meta - o.hoje) + " flashcards para acender a ofensiva."), disperso ? "erro" : "ok");
      if (!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) confete();
    } catch (err) {
      const fila = lerJSON(POMO_PENDENTES) || [];
      fila.push(item);
      gravarJSON(POMO_PENDENTES, fila);
      toast("Pomodoro concluído, mas não consegui salvar agora. Vou tentar de novo sozinho.", "erro");
    }
    pomoAtualizarOfensiva();
    pomoAtualizar();
  }

  // Atualiza o 🔥 do topo e o bloco da ofensiva sem redesenhar a tela (não atrapalha uma revisão em andamento)
  function pomoAtualizarOfensiva() {
    if (!S.bruto) return;
    const o = calcularOfensiva();
    const chip = document.querySelector(".ofensiva-chip");
    if (chip) {
      chip.classList.toggle("acesa", o.dias > 0);
      chip.innerHTML = '<span class="fogo">🔥</span> ' + o.dias;
    }
    const bloco = document.querySelector(".ofensiva");
    if (bloco) bloco.outerHTML = blocoOfensiva();
  }

  function botoesPomodoro(secundario) {
    return '<div class="pomo-tipos">' +
      '<button class="btn ' + (secundario ? "btn-secundario" : "btn-primario") + '" data-pomo="foco"><span>🎧 Estudo</span><small>resumo, áudio, cards e provas · fique na plataforma</small></button>' +
      '<button class="btn btn-secundario" data-pomo="foco-exec"><span>🛠️ Execução prática</span><small>fazer a parte prática em outras ferramentas</small></button></div>';
  }

  function pomoPainelHTML(e) {
    const hoje = pomodorosHoje();
    const contagem = '<p class="pomo-hoje">Hoje: <b>' + hoje + "</b> pomodoro" + (hoje === 1 ? "" : "s") + " concluído" + (hoje === 1 ? "" : "s") +
      (hoje ? " ✅" : " · a ofensiva do dia pede pelo menos 1") + "</p>";
    let corpo;
    if (!e) {
      corpo = '<p class="pomo-texto">' + REGRAS.pomodoroMinutos + " minutos de foco em uma coisa só: celular longe, uma aba aberta, sem responder mensagem. " +
        "No fim, " + REGRAS.pausaMinutos + " minutos de pausa.</p>" + contagem + botoesPomodoro();
    } else if (e.fase === "feito") {
      const disperso = e.foraSeg >= REGRAS.limiteForaMinutos * 60;
      corpo = '<div class="pomo-feito">🍅</div><p class="pomo-texto"><b>Pomodoro concluído!</b> Levante, beba água e descanse a cabeça antes do próximo.</p>' +
        (e.tipo !== "execucao" && e.foraSeg != null
          ? '<p class="pomo-fora' + (disperso ? " disperso" : "") + '">' + (e.foraSeg < 10 ? "🎯 Sem sair da plataforma. Foco total!" :
            "👀 " + tempoTxt(e.foraSeg).replace(/^0 min$/, "menos de 1 min") + " fora da plataforma em " + e.saidas + " saída" + (e.saidas === 1 ? "" : "s") + (disperso ? " · pomodoro disperso" : "")) + "</p>"
          : "") + contagem +
        '<div class="pomo-acoes"><button class="btn btn-primario" data-pomo="pausa">Pausa de ' + REGRAS.pausaMinutos + " min</button></div>" +
        '<p class="pomo-hoje pomo-ou">ou comece o próximo:</p>' + botoesPomodoro(true);
    } else {
      const rest = pomoRestante(e), total = e.minutos * 60000;
      const pct = Math.round((1 - rest / total) * 100);
      const pausado = e.pausadoRestante != null;
      corpo = '<div class="pomo-anel' + (e.fase === "pausa" ? " pausa" : "") + '" style="--p:' + pct + '"><div><b id="pomo-tempo">' + relogio(rest) + "</b><span>" +
        (e.fase === "pausa" ? "pausa" : pausado ? "pausado" : "foco") + "</span></div></div>" +
        (e.fase === "pausa"
          ? '<p class="pomo-texto">Descanse longe da tela. O próximo pomodoro começa quando você quiser.</p>' +
            '<div class="pomo-acoes"><button class="btn btn-secundario" data-pomo="pular">Pular pausa</button></div>'
          : (e.tipo === "execucao"
              ? '<p class="pomo-texto">🛠️ <b>Execução prática.</b> Pode usar outras ferramentas à vontade; o tempo fora não conta como dispersão.</p>'
              : '<p class="pomo-texto">🎧 <b>Estudo.</b> Fique na plataforma: sair para outra aba ou programa conta como tempo disperso.</p>' +
                '<p class="pomo-fora' + ((e.foraMs || 0) >= REGRAS.limiteForaMinutos * 60000 ? " disperso" : "") + '">Fora da plataforma: <b>' +
                ((e.foraMs || 0) < 60000 ? ((e.foraMs || 0) ? "menos de 1 min" : "0 min") : tempoTxt(e.foraMs / 1000)) + "</b>" +
                (e.saidas ? " em " + e.saidas + " saída" + (e.saidas === 1 ? "" : "s") : "") + "</p>") + contagem +
            '<div class="pomo-acoes"><button class="btn btn-secundario" data-pomo="' + (pausado ? "retomar" : "pausar") + '">' + (pausado ? "▶ Retomar" : "⏸ Pausar") + "</button>" +
            '<button class="btn btn-secundario btn-perigo" data-pomo="cancelar">' + (pomoConfirmar ? "Confirmar: cancelar" : "Cancelar") + "</button></div>" +
            (pomoConfirmar ? '<p class="pomo-aviso">Cancelando, este pomodoro não conta para a ofensiva.</p>' : ""));
    }
    corpo += '<a class="pomo-relatorio" href="#/relatorio" data-pomo="fechar">📊 Ver meu relatório de estudo</a>';
    return '<div class="pomo-cabeca"><h3>🍅 Pomodoro</h3><button class="pomo-fechar" data-pomo="fechar" aria-label="Fechar">×</button></div>' + corpo;
  }

  // Roda a cada segundo: atualiza chip, painel e título da aba, e percebe quando o tempo acabou
  function pomoAtualizar() {
    const e = pomoEstado();
    const ativo = e && (e.fase === "foco" || e.fase === "pausa");
    if (ativo && e.pausadoRestante == null && Date.now() >= e.fimEm) {
      if (e.fase === "foco") { pomoConcluir(e); return; }
      gravarJSON(POMO_CHAVE, null);
      pomoBipe();
      toast("Fim da pausa. Bora para o próximo pomodoro?", "ok");
      pomoAtualizar();
      return;
    }
    const chip = document.getElementById("pomo-chip");
    if (chip) {
      chip.classList.toggle("ativo", !!ativo && e.fase === "foco");
      chip.classList.toggle("pausa", !!ativo && e.fase === "pausa");
      chip.classList.toggle("feito", pomodorosHoje() > 0 && !ativo);
      document.getElementById("pomo-chip-tempo").textContent = ativo ? relogio(pomoRestante(e)) : pomodorosHoje() ? pomodorosHoje() + " hoje" : "Foco";
    }
    if (!document.body.dataset.tituloBase) document.body.dataset.tituloBase = document.title;
    document.title = ativo ? "🍅 " + relogio(pomoRestante(e)) + " · " + document.body.dataset.tituloBase : document.body.dataset.tituloBase;

    let painel = document.getElementById("pomo-painel");
    if (!pomoAberto || !S.session || !S.bruto) { if (painel) painel.remove(); return; }
    if (!painel) {
      painel = document.createElement("aside");
      painel.id = "pomo-painel";
      painel.className = "pomo-painel";
      document.body.appendChild(painel);
    }
    // Só o relógio muda a cada segundo; o resto do painel é redesenhado quando o estado muda
    const assinatura = JSON.stringify([e, pomoConfirmar, pomodorosHoje()]);
    if (painel.dataset.assinatura !== assinatura || !ativo) {
      if (painel.dataset.assinatura !== assinatura) painel.innerHTML = pomoPainelHTML(e);
      painel.dataset.assinatura = assinatura;
    }
    if (ativo) {
      const rest = pomoRestante(e);
      const t = document.getElementById("pomo-tempo");
      if (t) t.textContent = relogio(rest);
      const anel = painel.querySelector(".pomo-anel");
      if (anel) anel.style.setProperty("--p", Math.round((1 - rest / (e.minutos * 60000)) * 100));
    }
  }

  document.addEventListener("click", function (ev) {
    if (ev.target.closest("#pomo-chip, [data-pomodoro-abrir]")) {
      pomoAberto = !ev.target.closest("#pomo-chip") || !pomoAberto;
      pomoConfirmar = false;
      pomoAtualizar();
      return;
    }
    const b = ev.target.closest("[data-pomo]");
    if (!b) return;
    const acao = b.dataset.pomo, e = pomoEstado();
    if (acao === "fechar") { pomoAberto = false; pomoConfirmar = false; }
    else if (acao === "foco" || acao === "foco-exec" || acao === "pausa") {
      pomoComecar(acao === "pausa" ? "pausa" : "foco", acao === "foco-exec" ? "execucao" : "estudo");
      // Começou pela tela de bloqueio da aula: entra na aula na hora
      if (acao !== "pausa" && document.querySelector(".portao")) { pomoAberto = false; rotear(); }
    }
    else if (acao === "pular") gravarJSON(POMO_CHAVE, null);
    else if (acao === "pausar" && e) { pomoFecharSaida(e, Date.now()); e.pausadoRestante = pomoRestante(e); gravarJSON(POMO_CHAVE, e); }
    else if (acao === "retomar" && e) { e.fimEm = Date.now() + e.pausadoRestante; e.pausadoRestante = null; gravarJSON(POMO_CHAVE, e); }
    else if (acao === "cancelar") {
      if (!pomoConfirmar) pomoConfirmar = true;
      else { gravarJSON(POMO_CHAVE, null); pomoConfirmar = false; toast("Pomodoro cancelado."); }
    }
    pomoAtualizar();
  });
  // Outra aba mexeu no pomodoro: acompanha na hora
  window.addEventListener("storage", function (ev) { if (ev.key === POMO_CHAVE) pomoAtualizar(); });
  setInterval(function () { pomoVigiar(); pomoAtualizar(); }, 1000);

  // Portão das aulas: sem pomodoro de foco rodando, a aula não abre
  function aulaLiberada() {
    if (!REGRAS.aulaSoComPomodoro) return true;
    if (REGRAS.adminsSemPortao && S.perfil && S.perfil.is_admin) return true;
    const e = pomoEstado();
    return !!(e && e.fase === "foco");
  }

  function telaPortao(n) {
    const aula = CURSO.aulas.find(function (a) { return a.numero === n; });
    const e = pomoEstado();
    layout(
      '<a href="' + rota("") + '" class="voltar">← Voltar para as aulas</a>' +
      '<section class="painel portao"><div class="portao-icone">🍅</div>' +
      '<p class="hero-kicker">aula ' + dois(n) + (aula ? " · " + esc(aula.titulo) : "") + "</p>" +
      "<h1>Comece um pomodoro para entrar na aula</h1>" +
      '<p class="muted">As aulas só abrem com o foco ligado: são ' + REGRAS.pomodoroMinutos + " minutos dedicados a uma coisa só. Escolha o tipo do pomodoro:</p>" +
      (e && e.fase === "pausa" ? '<p class="aviso">Você está na pausa. Se já descansou, pode começar o próximo agora.</p>' : "") +
      botoesPomodoro() +
      '<ul class="portao-dicas"><li><b>🎧 Estudo:</b> resumo, áudio, flashcards e provas. Ficar fora da plataforma conta como tempo disperso no seu relatório' +
      " (avisamos depois de " + REGRAS.alertaForaSegundos + " segundos fora; com " + REGRAS.limiteForaMinutos + " minutos fora o pomodoro fica marcado como disperso).</li>" +
      "<li><b>🛠️ Execução prática:</b> para fazer a parte prática da aula em outras ferramentas. O tempo fora não é medido.</li></ul></section>"
    );
  }

  // ---------- roteador ----------

  async function rotear() {
    pararAudio();   // trocar de tela interrompe o áudio do resumo
    if (!configurado) return telaConfig();
    if (S.recuperacao) return telaNovaSenha();
    if (!S.session) return telaLogin();
    try {
      if (!S.perfil || !S.bruto) {
        app.innerHTML = '<div class="carregando">Carregando…</div>';
        await carregarPerfil();
        await carregarDados();
        pomoEnviarPendentes();
      }
      const partes = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
      S.noCurso = partes[0] === "c";
      if (S.noCurso) {
        // Dentro de uma mentoria: #/c/{curso}/aula/1/revisao, #/c/{curso}/certificado ...
        if (!usarCurso(partes[1])) { location.hash = "#/"; return; }
        switch (partes[2] || "") {
          case "": return telaInicio();
          case "aula": return aulaLiberada() ? telaAula(Number(partes[3]), partes[4] || "revisao") : telaPortao(Number(partes[3]));
          case "certificado": return telaCertificado(partes[3] === "modelo");
          case "equipe": return telaEquipe();
          case "ranking": return telaRanking();
          default: location.hash = rota("");
        }
        return;
      }
      switch (partes[0]) {
        case "": return telaCursos();
        case "como-funciona": return telaComoFunciona();
        case "temporada": return telaTemporada();
        case "relatorio": return telaRelatorio(partes[1]);
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
        S.perfil = null; S.bruto = null; S.porCurso = {}; S.dados = null; S.revisao = null; S.prova = null;
        setTimeout(rotear, 0);
      }
    });
    window.addEventListener("hashchange", rotear);
    rotear();
  }

  iniciar();
})();
