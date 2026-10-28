// Cursos e mentorias do Keep Ads Academy.
// Para criar um curso novo: copie um bloco abaixo, dê um "id" único (sem espaço nem acento)
// e crie os arquivos das aulas registrando em window.AULAS["id-do-curso"][numero].
// Os ids de flashcards, perguntas e práticas devem ser únicos entre TODOS os cursos
// (use um prefixo do curso, ex.: "ds-a1-c01" para a Di Santana).
(function () {
  // Regras gerais do Academy (valem para todos os cursos)
  window.ACADEMY_REGRAS = {
    metaDiaria: 5,          // flashcards revisados no dia para contar na ofensiva (o ranking usa o mesmo número)
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
      imagem: "",           // opcional: caminho de uma imagem de capa (ex.: "img/capa-adriano.jpg")
      // Versão das provas: tentativas feitas em versões anteriores (mais fáceis) não contam na nota
      versaoProvas: 2,
      aulas: [
        { numero: 1, titulo: "Contexto, cérebros e APIs", disponivel: true },
        { numero: 2, titulo: "Sistema no ar, loops e a primeira skill", disponivel: true },
        { numero: 3, titulo: "Aula 3", disponivel: false },
        { numero: 4, titulo: "Aula 4", disponivel: false },
        { numero: 5, titulo: "Aula 5", disponivel: false },
        { numero: 6, titulo: "Aula 6", disponivel: false }
      ]
    }),
    Object.assign({}, padrao, {
      id: "di-santana-growth-commerce",
      tipo: "Mentoria",
      titulo: "Growth Commerce",
      mentor: "Di Santana",
      descricao: "O conteúdo desta mentoria entra aqui conforme as aulas acontecerem.",
      imagem: "",
      versaoProvas: 1,
      aulas: []             // as aulas entram aqui quando o conteúdo chegar
    })
  ];

  window.AULAS = window.AULAS || {};
})();
