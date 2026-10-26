// Estrutura do curso. Para liberar uma aula nova:
// 1) crie o arquivo content/aula-0X.js (copie o formato da aula-01.js);
// 2) adicione a tag <script> dele no index.html;
// 3) mude "disponivel" para true aqui embaixo.
window.CURSO = {
  titulo: "Mentoria Agentes de IA para Tráfego Pago",
  subtitulo: "Programa de estudos e certificação interna Keep Ads",
  notaMinima: 70,
  pesos: { teorica: 0.4, pratica: 0.4, checklist: 0.2 },
  // As provas de uma aula só liberam depois de uma semana estudando os flashcards dela
  liberarProva: {
    diasDesdeInicio: 7,   // dias desde a primeira revisão de flashcards da aula
    diasDeRevisao: 4,     // dias diferentes em que a pessoa revisou
    todosOsCards: true    // todos os cards da aula vistos pelo menos uma vez
  },
  // Versão das provas: tentativas feitas em versões anteriores (mais fáceis) não contam na nota
  versaoProvas: 2,
  aulas: [
    { numero: 1, titulo: "Contexto, cérebros e APIs", disponivel: true },
    { numero: 2, titulo: "Aula 2", disponivel: false },
    { numero: 3, titulo: "Aula 3", disponivel: false },
    { numero: 4, titulo: "Aula 4", disponivel: false },
    { numero: 5, titulo: "Aula 5", disponivel: false },
    { numero: 6, titulo: "Aula 6", disponivel: false }
  ]
};

window.AULAS = window.AULAS || {};
