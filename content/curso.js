// Cursos e mentorias do Keep Ads Academy.
// Para criar um curso novo: copie um bloco abaixo, dê um "id" único (sem espaço nem acento)
// e crie os arquivos das aulas registrando em window.AULAS["id-do-curso"][numero].
// Os ids de flashcards, perguntas e práticas devem ser únicos entre TODOS os cursos
// (use um prefixo do curso, ex.: "ds-a1-c01" para a Di Santana).
(function () {
  // Regras gerais do Academy (valem para todos os cursos)
  window.ACADEMY_REGRAS = {
    // Início da competição: antes disso nada conta para a ofensiva nem para os rankings
    // (o banco usa o mesmo momento, gravado em academy_config pelo supabase/inicio.sql)
    inicioContagem: "2026-11-04T00:00:00-03:00",
    metaDiaria: 5,          // flashcards revisados no dia para contar na ofensiva (o ranking usa o mesmo número)
    pomodoroMinutos: 30,    // bloco de foco; a ofensiva do dia exige pelo menos 1 pomodoro concluído (o banco exige 30 min ou mais)
    pausaMinutos: 5,        // pausa sugerida depois de cada pomodoro
    aulaSoComPomodoro: true, // as aulas (revisão, resumo, prática, provas) só abrem com um pomodoro rodando
    adminsSemPortao: false,  // true = administradores entram nas aulas sem pomodoro (para revisar o conteúdo)
    alertaForaSegundos: 60,  // no pomodoro de estudo, avisa depois de tantos segundos fora da plataforma
    limiteForaMinutos: 5,    // pomodoro de estudo com tanto tempo fora (somado) fica marcado como disperso
    travaDiasParado: 2,     // dias sem estudar para perguntar "O que impediu o próximo passo?"
    travaDiasAula: 7,       // dias sem mexer numa aula começada (e não aprovada) para perguntar
    travaPerguntarDeNovo: 3, // depois de responder, só pergunta de novo depois de tantos dias
    refazerProvaDias: 30    // dias de espera para refazer uma prova (o banco também garante essa regra)
  };

  // Regras padrão de nota, liberação de prova e certificado (cada curso pode mudar as suas)
  const padrao = {
    notaMinima: 70,
    pesos: { teorica: 0.4, pratica: 0.4, checklist: 0.2 },
    // As provas de uma aula só liberam depois de uma semana estudando os flashcards dela
    liberarProva: {
      diasDesdeInicio: 7,   // dias desde a primeira revisão de flashcards da aula
      diasDeRevisao: 4,     // dias diferentes em que a pessoa revisou
      todosOsCards: true    // todos os cards da aula vistos pelo menos uma vez
    }
  };

  window.CURSOS = [
    Object.assign({}, padrao, {
      id: "adriano-ia-trafego",
      tipo: "Mentoria",
      titulo: "Agentes de IA para Tráfego Pago",
      mentor: "Adriano Gianini",
      descricao: "Construção da Freedom: uma agência de marketing automatizada com IA, do caderno de desabafos às integrações.",
      // Onde assistir as aulas gravadas (card no topo da tela da mentoria)
      linkAulas: "https://alunos.adrianogianini.com.br/m/course",
      imagem: "",           // opcional: caminho de uma imagem de capa (ex.: "img/capa-adriano.jpg")
      // Versão das provas: tentativas feitas em versões anteriores (mais fáceis) não contam na nota
      versaoProvas: 2,
      aulas: [
        { numero: 1, titulo: "Contexto, cérebros e APIs", disponivel: true },
        { numero: 2, titulo: "Sistema no ar, loops e a primeira skill", disponivel: true },
        { numero: 3, titulo: "Prompt CTR, skills e o primeiro agente", disponivel: true },
        { numero: 4, titulo: "Prioridades, processo e skills de persona e anúncios", disponivel: true },
        { numero: 5, titulo: "Processo, procedimento e o otimizador", disponivel: true },
        { numero: 6, titulo: "Plano de ação e níveis de rastreamento", disponivel: true }
      ]
    }),
    Object.assign({}, padrao, {
      id: "di-santana-growth-commerce",
      tipo: "Mentoria",
      titulo: "Growth Commerce AI",
      mentor: "Di Santana",
      descricao: "Consultoria de growth para e-commerce em grupo: leitura estratégica, métodos, ferramentas e prompts de IA para cada aula virar uma decisão aplicada na semana.",
      linkAulas: "https://drive.google.com/drive/folders/1X6ekxWDLkZGTgIvD1XPAYIRN0oPNTzhQ",
      imagem: "",
      versaoProvas: 1,
      prefixoArquivos: "ds-",   // arquivos desta mentoria: content/ds-aula-NN.js e audio/resumos/ds-aula-NN-hora-H.mp3
      aulas: [                  // novas aulas entram aqui conforme acontecerem
        { numero: 1, titulo: "Pesquisas que viram decisão", disponivel: true },
        { numero: 2, titulo: "Planejamento anual por drivers", disponivel: true },
        { numero: 3, titulo: "Matriz criativa de performance", disponivel: true },
        { numero: 4, titulo: "Tráfego pago começa no destino", disponivel: true }
      ]
    })
  ];

  // Temporadas (competição de 90 dias com prêmio). Cada temporada foca em uma mentoria.
  // Datas no horário de Brasília; "fim" é o último dia que conta.
  // adminsConcorrem: false = administradores aparecem no placar, mas não disputam os prêmios.
  window.TEMPORADAS = [
    {
      id: "t1-adriano",
      nome: "Temporada 1",
      curso: "adriano-ia-trafego",
      inicio: "2026-11-04",   // começa na quarta, depois da apresentação da plataforma para a equipe
      fim: "2027-02-01",      // 90 dias contando o primeiro
      adminsConcorrem: true,  // o Kelven também disputa
      premios: [
        { id: "campeao", titulo: "Campeão da temporada", icone: "🥇", valor: 550, regra: "1º lugar no placar dos 90 dias",
          opcoes: ["Air fryer grande (5 a 6 L)", "Cafeteira espresso ou de cápsula com espumador", "Caixa de som JBL ou smartwatch"] },
        { id: "segundo", titulo: "2º lugar", icone: "🥈", valor: 200, regra: "2º lugar no placar dos 90 dias",
          opcoes: ["Aparador e barbeador multifunção", "Liquidificador potente", "Fone Bluetooth com cancelamento de ruído"] },
        { id: "terceiro", titulo: "3º lugar", icone: "🥉", valor: 120, regra: "3º lugar no placar dos 90 dias",
          opcoes: ["Garrafa ou copo térmico Stanley", "Mixer de mão", "Sanduicheira/grill"] },
        { id: "evolucao", titulo: "Maior evolução", icone: "📈", valor: 80, regra: "Mais XP nos últimos 30 dias (fora os 3 primeiros)",
          opcoes: ["Kit churrasco (faca + tábua)", "Moedor de café manual", "Copo térmico"] },
        { id: "ofensiva", titulo: "Ofensiva mais longa", icone: "🔥", valor: 50, regra: "Mais dias seguidos estudando na temporada (fora os 3 primeiros)",
          opcoes: ["Caneca térmica", "Kit de barbear", "Squeeze de academia"] }
      ]
    },
    {
      id: "t2-di-santana",
      nome: "Temporada 2",
      curso: "di-santana-growth-commerce",
      inicio: "2027-02-03",
      fim: "2027-05-03",
      adminsConcorrem: false,
      premios: []           // a definir antes de a temporada começar
    }
  ];

  // Pontos (XP) das temporadas. O placar é calculado no banco com estes números.
  window.TEMPORADA_PONTOS = {
    revisao: 1,             // por flashcard revisado
    limiteDia: 40,          // máximo de XP de revisão por dia
    livre: 0.5,             // a revisão livre vale metade
    meta: 5,                // bônus do dia em que bate a meta diária (ACADEMY_REGRAS.metaDiaria)
    ofensiva: { 7: 20, 30: 80, 60: 150 },  // bônus ao completar 7, 30 e 60 dias seguidos
    dominado: 3,            // por card com memória de 7 dias ou mais
    pratica: 15,            // por parte prática executada (com o relato do que fez)
    prova: 2,               // XP = nota × 2 (melhor nota de cada prova na temporada)
    aula: 50,               // bônus por aula aprovada
    simulado: { xp: 10, dias: 3 }  // bônus único por aula: simulados feitos em 3 dias diferentes
  };

  // Níveis pelo XP da temporada
  window.TEMPORADA_NIVEIS = [
    { nome: "Bronze", xp: 0, icone: "🥉" },
    { nome: "Prata", xp: 750, icone: "🥈" },
    { nome: "Ouro", xp: 2000, icone: "🥇" },
    { nome: "Diamante", xp: 4000, icone: "💎" }
  ];

  window.AULAS = window.AULAS || {};
})();
