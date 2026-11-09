// Simulado da Aula 03 (Di Santana): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["di-santana-growth-commerce"] || {})[3];
  if (!aula) return;
  aula.simulado = [
    { id: "ds-a3-s01", pergunta: "Um designer entrega uma peça linda, mas ninguém sabe dizer de qual evidência ela saiu nem o que ela testa. Pela cadeia da matriz criativa, o que faltou?",
      opcoes: ["Faltou só definir o formato, vídeo ou imagem, antes de produzir", "Faltou o caminho evidência, dor, ângulo, conceito e prova antes da peça, e o teste e o aprendizado depois", "Faltou aprovar a peça com o dono antes de subir no Meta", "Faltou uma variação de cor para comparar com a original"],
      correta: 1, explicacao: "Na matriz, cada peça nasce de uma evidência, testa uma tese e devolve um aprendizado; peça sem essa cadeia não ensina nada." },
    { id: "ds-a3-s02", pergunta: "O gestor quer resolver a queda de resultado subindo 100 criativos novos por semana, sem hipóteses definidas. O que a tese da matriz criativa diz sobre isso?",
      opcoes: ["Está certo: na Black, o volume sozinho resolve a entrega", "Está certo, desde que todos sejam vídeos curtos", "Só funciona se a verba de teste for maior que a do motor", "O volume de criativos cresce depois que a qualidade das hipóteses cresce"],
      correta: 3, explicacao: "A matriz organiza decisões, não formatos: primeiro se melhora a qualidade das hipóteses, depois se ganha volume." },
    { id: "ds-a3-s03", pergunta: "No planejamento da Black, o Di compara o resultado de outubro com o que se pensa para novembro. Como ele chama essa leitura?",
      opcoes: ["Nowcast", "Guardrail", "Baseline", "Pacing"],
      correta: 0, explicacao: "Nowcast é outubro comparado com a projeção de novembro; no caso real, quase R$ 1,7 milhão contra R$ 2,2 milhões projetados." },
    { id: "ds-a3-s04", pergunta: "A IA analisou os pedidos dos últimos seis meses e mostrou que 52% das cestas eram multilinha e que os kits geravam volume. Para que servem esses sinais de cesta no plano?",
      opcoes: ["Para definir o CPS baseline de cada semana", "Para calcular quanto da meta vem de clientes novos e da base", "Para categorizar o que usar para atrair multilinha, gerar volume, gerar demanda e reter", "Para escolher quais anúncios pausar no Ad Pulse"],
      correta: 2, explicacao: "Os sinais de cesta organizam o sortimento por função: atrair multilinha, gerar volume, gerar demanda e reter." },
    { id: "ds-a3-s05", pergunta: "Sala de guerra da Black, 17h. Pela rotina de checkpoints do Di, o que o time revisa nesse horário?",
      opcoes: ["Conversão, ticket e CRM", "O pacing do dia", "Como está a mídia", "O que ajustar no dia seguinte"],
      correta: 0, explicacao: "8h30 é pacing, meio-dia é mídia, 17h é conversão, ticket e CRM, e o fim do dia define a métrica a ajustar amanhã." },
    { id: "ds-a3-s06", pergunta: "Ao escrever a tese de um sérum, o time tem público, dor e mecanismo, mas nenhuma prova de que ele funciona. O que a matriz faz?",
      opcoes: ["Usa um depoimento genérico para completar a frase", "Registra a lacuna de prova em vez de inventar uma", "Pula a tese e vai direto para os cinco pilares", "Troca a prova por um desconto maior na peça"],
      correta: 1, explicacao: "O modelo é público, JTBD, dor, mecanismo e prova; se faltar mecanismo ou prova, a matriz registra a lacuna." },
    { id: "ds-a3-s07", pergunta: "O cliente vê a matriz de 15 células e se assusta: “vou ter que pagar 15 vídeos e 15 imagens?”. Qual é a resposta certa?",
      opcoes: ["Sim, cada célula exige um vídeo e uma imagem", "Sim, mas só na semana da Black", "Não, só os 15 vídeos, as imagens são opcionais", "Não: cada célula é uma hipótese; a prioridade define o que vira briefing conforme verba e capacidade"],
      correta: 3, explicacao: "A matriz cria um backlog de hipóteses; só o que for priorizado vira briefing, de acordo com a verba e a capacidade de teste." },
    { id: "ds-a3-s08", pergunta: "Uma célula da matriz tirou 52 no SPC 100 e não tem risco de compliance. Qual é o destino dela?",
      opcoes: ["Produzir primeiro", "Entrar na fila de teste", "Refinar antes de produzir", "Não produzir"],
      correta: 2, explicacao: "No SPC 100: 80 a 100 produz primeiro, 60 a 79 vai para a fila, 40 a 59 refina e 0 a 39 não produz." },
    { id: "ds-a3-s09", pergunta: "A creator gravou um gancho falado fraco, mas o vídeo abre num cenário inusitado que faz o público parar. Como a aula explica o resultado?",
      opcoes: ["O hook verbal sempre pesa mais que a imagem", "O vídeo funcionou por sorte e deve ser descartado", "O hook visual, o que aparece na primeira cena, já segura a pessoa mesmo sem bom gancho falado", "O resultado veio do público, não do criativo"],
      correta: 2, explicacao: "Hook verbal é o que se fala no gancho; hook visual é a primeira cena, e um cenário que chama atenção faz a pessoa parar." },
    { id: "ds-a3-s10", pergunta: "No contrato de teste de um novo criativo, o time precisa registrar qual métrica vai dizer se a hipótese venceu. Em qual campo isso entra?",
      opcoes: ["ENTÃO, a métrica primária", "SE, a variável alterada", "PARA, o público e o contexto", "PORQUE, o mecanismo esperado"],
      correta: 0, explicacao: "O contrato tem SE (variável), PARA (público), ENTÃO (métrica primária), DEVE (direção e diferença mínima) e PORQUE (mecanismo)." },
    { id: "ds-a3-s11", pergunta: "Faltam três semanas para a Black e o time só pensa em vídeos com desconto. Que tipo de criativo o Di recomenda incluir?",
      opcoes: ["Só vídeos longos institucionais sobre a marca", "Apenas peças com contagem regressiva e preço riscado", "Banners genéricos de banco de imagens com o logo", "Imagens estáticas e anúncios de prova social com avaliações reais do produto"],
      correta: 3, explicacao: "Muita gente vai vender na Black, pouca gente vai provar que o produto é bom; a IA pode gerar esses anúncios a partir das avaliações." },
    { id: "ds-a3-s12", pergunta: "Antes de a IA produzir um vídeo a partir do vídeo de uma creator, qual etapa o Di mostrou para validar a ideia?",
      opcoes: ["Publicar uma versão de teste direto no Meta Ads", "Gerar um moodboard com as cenas para aprovar antes da produção", "Pedir à creator que regrave o vídeo do zero", "Converter o vídeo em imagens estáticas 4:5"],
      correta: 1, explicacao: "A IA assiste ao vídeo, entende o DNA, recebe fotos do produto e da pessoa e cria um moodboard para aprovar antes de produzir." }
  ];
})();
