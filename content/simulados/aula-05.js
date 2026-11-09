// Simulado da Aula 05 (Adriano Gianini): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[5];
  if (!aula) return;
  aula.simulado = [
    { id: "a5-s01", pergunta: "Um gestor quer uma única skill gigante que define a persona, planeja a campanha e escreve os anúncios. Por que o plugin do Adriano separa essas três partes?",
      opcoes: ["Porque uma é premissa da outra, e microprocessos são mais fáceis de gerenciar que um processo gigante", "Porque o Claude não aceita skills com mais de uma etapa", "Porque cada skill precisa ser vendida separadamente", "Porque persona e anúncio usam modelos de IA diferentes"],
      correta: 0, explicacao: "Não existe planejamento sem saber o que se vende, nem anúncio de pesquisa sem a palavra-chave definida." },
    { id: "a5-s02", pergunta: "Uma etapa do seu processo pode ser feita pelo Editor, pela interface web ou por planilha importada. Como escrever essa etapa para a skill?",
      opcoes: ["Descrever as três formas, para a IA escolher a cada vez", "Deixar a forma em aberto e confiar no bom senso da IA", "Escolher a forma mais simples, porque o que importa é chegar no resultado final", "Usar sempre a forma mais técnica, para parecer profissional"],
      correta: 2, explicacao: "Se a etapa pode ser feita de duas ou três formas, escolha a mais simples; não precisa colocar todas." },
    { id: "a5-s03", pergunta: "A skill de um colega diz: “ajuste os lances até ficar bom” e “negative o que achar estranho”. O que a “receita da avó” da aula prevê?",
      opcoes: ["Que a skill vai funcionar, porque o Claude entende a intenção", "Que o Claude vai chutar, porque faz exatamente o que está escrito e “até ficar bom” não diz nada", "Que a skill vai travar e pedir ajuda em toda execução", "Que o Claude vai copiar o padrão de outras contas da agência"],
      correta: 1, explicacao: "“Sal a gosto” funciona para a avó, mas quem segue a receita erra. Sem régua escrita, a IA chuta." },
    { id: "a5-s04", pergunta: "Na gravação, você diz: “o CPA subiu para 62 e a meta é 45, deixa eu ver qual campanha puxou”. Como essa fala vira etapas, segundo o exemplo da aula?",
      opcoes: ["Uma etapa só: “reduzir o CPA para 45”", "Pausar a campanha com maior gasto e esperar uma semana", "Aumentar a verba das campanhas que estão abaixo da meta", "Conferir o histórico de alterações, comparar com a semana anterior e com a meta, achar a campanha e abrir os termos"],
      correta: 3, explicacao: "Uma frase dita no automático esconde várias etapas, e o método de quebrar a gravação torna cada uma explícita." },
    { id: "a5-s05", pergunta: "No raio-X de uma etapa de análise de página de destino, quais perguntas definem a régua que a skill vai usar?",
      opcoes: ["Quanto tempo a etapa leva e quem costuma fazê-la", "Qual ferramenta é mais barata para essa análise", "O que eu olho (relatório, coluna, tela) e como eu sei se está bom ou ruim", "Qual é a opinião do cliente sobre a página"],
      correta: 2, explicacao: "Essas perguntas do raio-X revelam as regrinhas que você usa sem perceber." },
    { id: "a5-s06", pergunta: "O Jarvis sugere 3 capas por vídeo; você sempre aprova uma e ignora as outras duas sem comentar. O que o agente tende a aprender?",
      opcoes: ["Que as 3 estão boas, porque você nunca disse por que recusou as outras", "Que você não gosta de capas e deve parar de sugerir", "Que deve sugerir só uma capa por vez", "Nada, porque o agente não aprende com aprovações"],
      correta: 0, explicacao: "Dar a opção de dizer o porquê da recusa ensina os padrões que você não aprova." },
    { id: "a5-s07", pergunta: "Um aluno montou um segundo cérebro de SEO para YouTube, mas sente que tira pouco proveito dele. Qual foi o diagnóstico no caso do Breno?",
      opcoes: ["O cérebro tinha informação demais e precisava ser apagado", "Faltava um problema real: com ele, o mesmo cérebro virou sugestão de títulos, revisão de títulos antigos e descrições", "Ele precisava trocar para um modelo mais caro", "SEO para YouTube não funciona com IA"],
      correta: 1, explicacao: "Com um problema real, você descreve o problema e pede a solução ao cérebro que já tem." },
    { id: "a5-s08", pergunta: "Uma empresa de higienização de sofás recebe buscas por “produto para limpar sofá”. Por que esse termo precisa de uma regra explícita na skill?",
      opcoes: ["Porque termos com a palavra “produto” são proibidos no Google Ads", "Porque ele tem alto volume e deve virar palavra-chave principal", "Porque ele sempre converte melhor que os termos de serviço", "Porque tem relação com o problema do cliente, mas não com o que a empresa vende, e só você sabe esse contexto"],
      correta: 3, explicacao: "Um termo pode ter relação com o problema e nenhuma com o serviço vendido. Esse contexto precisa ser ensinado." },
    { id: "a5-s09", pergunta: "No planejador de campanha mostrado na aula, o que vem depois de criar os anúncios e antes de trazer a proposta para aprovação?",
      opcoes: ["Subir as campanhas direto na conta", "Definir o limite de verba de cada campanha", "Refazer a persona do cliente", "Analisar a página para onde o anúncio vai levar"],
      correta: 3, explicacao: "A sequência termina com criar anúncios, analisar a página, trazer a proposta para aprovação e só então subir ou baixar o arquivo." },
    { id: "a5-s10", pergunta: "Uma clínica oferece dez serviços. Antes de planejar a campanha, alguém precisa escolher se anuncia o principal, o 80/20 ou o produto de entrada. Como a aula trata essa escolha?",
      opcoes: ["Como uma decisão estratégica que vira uma etapa própria antes do planejamento", "Como algo que o planejador decide sozinho pela verba", "Como detalhe que se resolve depois de subir as campanhas", "Como tarefa do cliente, fora do processo da agência"],
      correta: 0, explicacao: "Escolher quais serviços anunciar é decisão estratégica e entra como etapa antes do planejamento." },
    { id: "a5-s11", pergunta: "Sua primeira versão da skill de persona funciona, mas ainda deixa a desejar em alguns clientes. O que a aula recomenda?",
      opcoes: ["Parar de usar até ela ficar perfeita", "Apagar e começar outra do zero", "Usar e ir melhorando: algo realmente útil só aparece depois do uso", "Trocar por uma skill pronta de outra pessoa"],
      correta: 2, explicacao: "Como todo software maduro: o criador de persona do Adriano já recebeu pelo menos 15 melhorias com o uso." },
    { id: "a5-s12", pergunta: "O agente de pautas trouxe dez ideias e você apagou sete que não serviam. Um colega diz que isso “deixa a IA mais burra”. O que a aula diz?",
      opcoes: ["É verdade: apagar sugestões faz o agente esquecer o que aprendeu", "Apagar o que não serviu não deixa a IA mais burra", "Só pode apagar depois de explicar cada recusa por escrito", "O certo é guardar tudo para o agente decidir depois"],
      correta: 1, explicacao: "Na primeira vitória do Jarvis, só trazer pautas já reduziu uma semana para 30 minutos, e descartar o que não serve faz parte do uso." }
  ];
})();
