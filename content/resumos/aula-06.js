// Resumo por hora e mapa mental da Aula 06 (Adriano Gianini), feitos a partir da transcrição completa.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[6];
  if (!aula) return;
  aula.fases = [
    {
      hora: 1,
      tempo: "0:00 a 1:00",
      titulo: "O plano de ação e os níveis de rastreamento",
      ideia: "Antes de duas semanas sem aula ao vivo, o Adriano entrega um plano de ação em quatro passos para trocar o excesso de poder por foco. Depois explica os três níveis de rastreamento e o detector de tráfego de robô que ele construiu no Jarvis.",
      aprender: [
        "A turma ficou com o problema de todo mundo que destravou: poder demais, foco de menos. A pergunta deixou de ser o que eu posso fazer e passou a ser o que eu vou fazer agora. Por isso a primeira tarefa é ler ou ouvir o livro Essencialismo.",
        "Os critérios do Adriano para decidir o que construir são três: o que me faz vender mais, o que economiza tempo e o que economiza dinheiro. Por uns três meses ele só construiu o que fazia vender mais, como a página de vendas, a VSL e o cérebro de VSLs.",
        "O plano em quatro passos: ler Essencialismo, definir os critérios do que será construído, criar algo separado porém totalmente funcional (o 80/20 das tarefas operacionais) e usar até não ter mais bugs, falhas ou melhorias. A Freedom fica no caderno de desabafos.",
        "O todo trava porque a turma não tem a visão das partes. Com as partes prontas, basta pedir ao Claude que faça junto o que as três fazem em separado. Uma análise de concorrência, por exemplo, nasce como Skill e depois vira agente semanal: 10 clientes podem somar 250 concorrentes.",
        "Nível 1 de rastreamento é ter a UTM de todas as conversões, em todo meio, e basta para uns 70 a 80% da turma. Nível 2 é atribuição para jornada longa: salvar ao menos o primeiro e o último contato. Nível 3 é marketing preditivo, para quem investe milhões por mês.",
        "O vídeo de como instalar a tag do Google Ads pelo Tag Manager vende até hoje como primeiro contato. Olhando só o último clique, a campanha de venda parece linda e o vídeo parece inútil. Se você corta o primeiro contato, as vendas caem.",
        "O detector de robô mostrou que as campanhas de geração de demanda estavam péssimas: de 30 mil investidos em uma delas, 13 mil foram robô. O Adriano pediu ao Claude um assistente de instalação, escrito para leigos, para a turma montar o mesmo sistema."
      ],
      executar: [
        "Separar os horários de esteira, bike ou transporte para ouvir o audiobook de Essencialismo em 2x.",
        "Escrever os seus critérios de construção ou adotar os três do Adriano, em ordem de prioridade.",
        "Escolher um dos cinco problemas listados e construir uma solução separada e totalmente funcional.",
        "Classificar a jornada de compra de cada cliente no nível 1, 2 ou 3 de rastreamento."
      ],
      frase: "Vocês têm poder demais e foco de menos."
    },
    {
      hora: 2,
      tempo: "1:00 a 2:00",
      titulo: "WhatsApp, cliente que não colabora e quanto vale um problema",
      ideia: "Nas dúvidas da turma, o Adriano mostra que rastreamento bom é o que permite decidir com segurança, não o que chega a 100%. Depois ensina a cobrar pelo tamanho do problema e a lidar com o cliente que diz não.",
      aprender: [
        "Para rastrear venda que vem pelo WhatsApp, cruze dados: exporte as conversas, ensine ao Claude o padrão de cliente novo, recorrente e pós-compra, e cruze com a hora dos cliques. Um redirect invisível pode salvar gclid, fbclid e UTMs.",
        "O indicador de sucesso do Adriano é 50%: se de 100 mil de verba ele sabe o que 50 mil trouxe, já está feliz. Depois da Apple e da LGPD, 100% não existe mais. Quem tem 80% está ótimo.",
        "Tráfego de IA não é tráfego de robô: é gente chegando pelo ChatGPT, Gemini ou Claude. O Adriano rastreia o robô, não bloqueia, porque bloquear depois do clique não serve. Com volume muito alto, vale contratar uma ferramenta como o ClickCease.",
        "Para negócio local sem CRM, a solução mais simples é uma página só sua e um WhatsApp com chip novo: tudo que vier dali é seu. Não é porque você pode criar o melhor sistema de rastreamento do mundo que você precisa criar.",
        "Para precificar consultoria de IA, olhe o quanto o problema vale. Cortar 5 funcionários de 7 mil gera uns 455 mil de economia por ano; cobrar 50 mil em 10 parcelas faz o cliente pagar com o próprio dinheiro economizado.",
        "Para vender são precisas duas metades: o cliente conhecer o próprio negócio e a agência traduzir isso em campanha. Autonomia sem acesso é sabor autonomia. Quando o cliente diz não, importa mais o porquê do não do que o não.",
        "Com cliente na defensiva, troque o dado jogado na cara por uma pergunta, como você compraria de você ou do seu concorrente. Ele chega sozinho à conclusão e a decisão parece dele."
      ],
      executar: [
        "Instalar a central de rastreio com o arquivo do assistente, seguindo as nove etapas no Claude Code.",
        "Exportar as conversas de WhatsApp de um cliente, com autorização, e pedir ao Claude os padrões de cliente novo, recorrente e pós-compra.",
        "Calcular quanto custa para um cliente não resolver um problema que a IA resolveria.",
        "Definir o limite do que você entrega e cobrar por cada coisa a mais que fizer pelo cliente."
      ],
      frase: "Se ele te deu autonomia e não te deu acesso, ele não te deu autonomia."
    },
    {
      hora: 3,
      tempo: "2:00 ao fim",
      titulo: "Persuasão, crenças e a revisão do plano",
      ideia: "O Adriano fala sobre a linha tênue entre persuasão e manipulação e sobre crenças que travam uma venda. Fecha revisando o plano de ação das duas semanas e explicando por que construir as partes antes do todo.",
      aprender: [
        "Dá para criar no Claude um analista de crenças limitantes: ele lê a sua conversa com o cliente, aponta as crenças e ajuda a montar uma estratégia de quebra com as técnicas de prestidigitação verbal da PNL. Depois da quebra de crença, a técnica que o Adriano mais usa é a ressignificação.",
        "A venda consultiva parte da premissa de que a venda é complexa a ponto de você precisar ajudar o cliente a entender o que contratar. Quando a pessoa chega sozinha à conclusão, é dez vezes mais fácil a venda acontecer.",
        "Toda vez que você invade o mapa de mundo de alguém, ele entra em defesa. Se uma pergunta fere um valor forte, você perde a venda da ideia. A diferença entre persuasão e manipulação é tão tênue que quase não existe.",
        "Para não precisar aturar cliente mimado, o Adriano trabalha para ter fila de espera. A frase que ele adotou: eu me recuso a tratar adulto como criança.",
        "Na revisão do plano: ler Essencialismo, definir os critérios, criar algo separado e funcional a partir dos cinco problemas, sem gourmetizar com interface web, e usar até zerar as melhorias. Uma versão metade automática e metade manual não conta."
      ],
      executar: [
        "Criar no Claude um analista de crenças limitantes e testar com uma conversa real com cliente.",
        "Revisar o plano de ação e marcar no calendário as entregas das duas semanas.",
        "Usar a ferramenta construída todo dia até não ter mais bugs, falhas ou melhorias.",
        "Depois de três ou quatro partes prontas, identificar quais se juntam em um agente."
      ],
      frase: "Eu me recuso a tratar adulto como criança."
    }
  ];
  aula.mapa = {
    centro: "Foco para construir e rastrear",
    ramos: [
      { titulo: "Plano de ação", itens: ["Ler ou ouvir Essencialismo", "Definir critérios do que construir", "Criar algo separado e funcional", "Usar até zerar melhorias"] },
      { titulo: "Critérios de construção", itens: ["Vender mais", "Economizar tempo", "Economizar dinheiro", "Nada de “porque é legal”"] },
      { titulo: "Partes antes do todo", itens: ["Freedom no caderno de desabafos", "80/20 das tarefas operacionais", "Juntar as partes num agente", "Concorrência: Skill e depois agente semanal"] },
      { titulo: "Níveis de rastreamento", itens: ["Nível 1: UTM em tudo", "Nível 2: primeiro e último contato", "Nível 3: marketing preditivo", "Meta de sucesso: 50%"] },
      { titulo: "Tráfego de robô", itens: ["Rastrear, não bloquear depois do clique", "Robô comum e sofisticado (IAB)", "ClickCease para volume alto", "Tráfego de IA é gente"] },
      { titulo: "Rastrear o difícil", itens: ["Padrões de conversa no WhatsApp", "Página e chip só seus", "Telefone fixo só no site", "Assistente de instalação da central"] },
      { titulo: "Cliente e venda", itens: ["Duas metades para vender", "Autonomia exige acesso", "O porquê do não", "Pergunta em vez de dado na cara", "Cobrar pelo valor do problema"] }
    ]
  };
})();
