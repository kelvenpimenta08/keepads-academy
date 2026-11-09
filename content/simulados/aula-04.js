// Simulado da Aula 04 (Adriano Gianini): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[4];
  if (!aula) return;
  aula.simulado = [
    { id: "a4-s01", pergunta: "Um infoprodutor quer pagar comissão só ao vendedor que de fato tirou as dúvidas de quem comprou, cruzando 300 conversas do CRM com as vendas da Hotmart. Pela régua da aula, como classificar essa construção?",
      opcoes: ["Muda o jogo: põe dinheiro no bolso com uma capacidade que nenhum humano teria na mão", "Só economiza tempo, porque o financeiro já faria isso toda semana", "Não vale construir, porque comissão é assunto do RH, não de IA", "Vale só depois que o gestor de tráfego estiver pronto e rodando"],
      correta: 0, explicacao: "É o exemplo da aula de algo humanamente impossível: ninguém leria 300 conversas para acertar a comissão, e um vendedor ganhou R$ 500 a mais no mês." },
    { id: "a4-s02", pergunta: "Sua agência perde clientes porque eles esquecem tudo o que já foi testado na conta. Um agente que guarda esse histórico não economiza horas nem traz venda direta. Ele entra na régua do Adriano?",
      opcoes: ["Não, porque a régua só aceita o que economiza tempo", "Só se o cliente pagar uma taxa extra pelo histórico", "Sim: reter clientes é uma terceira forma de pôr dinheiro no bolso", "Só se ele também otimizar as campanhas sozinho"],
      correta: 2, explicacao: "A régua é mudar o jogo ou economizar tempo, e a aula inclui a retenção como outra forma de pôr dinheiro no bolso." },
    { id: "a4-s03", pergunta: "Um colega abriu o caderno de desabafos e começou a planejar e construir ali mesmo cada ideia que anotava. Por que isso foge do propósito do caderno?",
      opcoes: ["Porque o Claude apaga o caderno depois de uma semana", "Porque o caderno só aceita ideias de tráfego pago", "Porque construir no caderno custa mais tokens do que num chat novo", "Porque ele serve só para anotar: como o “todo” muda, saber as próximas ideias faz você construir diferente"],
      correta: 3, explicacao: "O caderno de desabafos não é para criar nem planejar. Ele existe para você enxergar o todo antes de construir cada parte." },
    { id: "a4-s04", pergunta: "Um gestor colou no Claude anotações soltas e contraditórias do seu jeito de otimizar e pediu: “me ajuda a montar meu processo”. O que a aula diz que vai acontecer?",
      opcoes: ["O Claude organiza as anotações e devolve exatamente o processo do gestor", "O Claude ajuda, mas monta o processo dele, e o gestor passa a seguir o processo de uma IA", "O Claude recusa, porque não trabalha com anotações soltas", "O Claude pede a gravação da tela antes de responder qualquer coisa"],
      correta: 1, explicacao: "Com o “Frankenstein”, ele não constrói o seu processo, constrói o dele. Quanto mais falho o processo, mais inútil o agente." },
    { id: "a4-s05", pergunta: "No processo de social media da aula, um post com título sobre uma notícia ruim saiu com a foto de uma pessoa sorrindo. Qual etapa deveria ter barrado isso?",
      opcoes: ["A revisão de português, que vem antes da arte", "A pesquisa de mercado e concorrentes", "A revisão de arte, que confere a coerência entre imagem e mensagem", "A etapa de conferir se o post foi publicado"],
      correta: 2, explicacao: "Depois de produzir o visual vem a revisão de arte, que olha a coerência, como no exemplo da foto sorrindo num título de notícia ruim." },
    { id: "a4-s06", pergunta: "O processo de Instagram de uma agência começa direto em “escrever os posts da semana”. Comparando com o processo montado na aula, o que está faltando antes de escrever?",
      opcoes: ["Persona, análise do que já foi feito, pesquisa de mercado, estratégia, pautas e calendário", "Só a revisão de português e a revisão de arte", "Só agendar e conferir se publicou", "Análise de métricas dos posts do mês anterior, na mesma cadeira"],
      correta: 0, explicacao: "Na aula, escrever só vem depois de persona, análise do que já foi feito, pesquisa, estratégia, pautas e calendário." },
    { id: "a4-s07", pergunta: "Uma agência tem anos de cards no ClickUp com briefing e, em cada um, a pasta dos criativos aprovados. Ela quer a cadeira de designer de criativos. Qual é o caminho que a aula mostra?",
      opcoes: ["Contratar um designer para ensinar a IA do zero", "Escrever todas as regras de design antes de olhar o histórico", "Começar pelo gestor de tráfego e deixar o designer para depois", "Pedir ao Claude para analisar briefings e aprovados, entender o padrão e construir a cadeira"],
      correta: 3, explicacao: "É o que o Adriano vai fazer com mais de mil cards: quem já documentou o processo pagou o pedágio antes e constrói rápido." },
    { id: "a4-s08", pergunta: "Você acabou de fazer a call de onboarding de um cliente novo e tem a transcrição, mas ele ainda não tem site. A skill criadora de persona pode começar mesmo assim?",
      opcoes: ["Não: sem a URL do site a skill não tem gatilho", "Sim: a transcrição da call é um dos gatilhos previstos, junto com a URL e a descrição do negócio", "Só se você responder sozinho todas as perguntas do documento", "Só depois de rodar a pesquisa de mercado manualmente"],
      correta: 1, explicacao: "Na etapa 5 da skill de persona, os gatilhos são a URL, a descrição do negócio ou a transcrição da call." },
    { id: "a4-s09", pergunta: "Por que a skill de anúncios de rede de pesquisa foi orientada a ler a documentação e as políticas do Google Ads antes de escrever?",
      opcoes: ["Para respeitar os tamanhos de título e descrição e não criar anúncio que a plataforma reprova", "Para copiar os anúncios de exemplo que o Google publica", "Para descobrir o orçamento ideal de cada campanha", "Para escolher as palavras-chave com maior volume de busca"],
      correta: 0, explicacao: "Entre as regras da skill estão ler a documentação (tamanhos) e as políticas do Google Ads, além do contador de caracteres na saída." },
    { id: "a4-s10", pergunta: "A skill entregou o título “Oferecemos com muito carinho serviços com garantia”. Pela orientação de tom da aula, como ele deveria ficar?",
      opcoes: ["Mais emotivo, para criar conexão com a persona", "Mais longo, porque o Google premia textos completos", "Igual, porque abreviar é proibido nas políticas", "Direto e com abreviações, como “c/ garantia”, para caber mais informação"],
      correta: 3, explicacao: "“Você não é Madre Teresa de Calcutá”: anúncio é para vender, direto e objetivo, abreviando para ganhar caracteres." },
    { id: "a4-s11", pergunta: "Você tem as skills de persona, planejamento e criativos feitas em momentos diferentes. Ao melhorar a persona, as outras continuam usando a versão antiga. O que o Adriano fez nessa situação?",
      opcoes: ["Juntou as três numa única skill gigante", "Passou a atualizar cada uma à mão toda semana", "Recriou do zero, cada skill usando a anterior como base", "Desistiu do planejamento e manteve só persona e criativos"],
      correta: 2, explicacao: "Como uma não falava com a outra, ele recriou as três, cada uma partindo da anterior." },
    { id: "a4-s12", pergunta: "Pensando em dar ao agente “uma decisão sem risco”, qual destas faz sentido deixar com ele sem aprovação?",
      opcoes: ["Aumentar a verba diária quando a campanha estiver bem", "Gerar mais títulos que o mínimo pedido, se a persona tiver material", "Pausar grupos de anúncio com CPA acima da meta", "Negativar termos de pesquisa direto na conta do cliente"],
      correta: 1, explicacao: "Autonomia só onde errar não custa nada: mais variações de título não mexem na verba nem na conta do cliente." }
  ];
})();
