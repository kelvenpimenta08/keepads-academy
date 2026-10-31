// Resumo por hora e mapa mental da Aula 04 (Adriano Gianini), feitos a partir da transcrição completa.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[4];
  if (!aula) return;
  aula.fases = [
    {
      hora: 1,
      tempo: "0:00 a 1:00",
      titulo: "Da dopamina de criar às prioridades",
      ideia: "Depois da semana em que tudo passou a ser possível, o desafio virou decidir o que vale construir. O Adriano mostra como escolheu a primeira cadeira e apresenta as ideias do caderno de desabafos da Freedom.",
      aprender: [
        "Criar dá mais prazer do que usar. De nada adianta ter um monte de coisa construída que você não usa: agora é hora de sair da dopamina e escolher o que vale a pena construir.",
        "A IA permite coisas humanamente impossíveis. Exemplo: cruzar as conversas do vendedor no CRM com as compras da Hotmart para dar a comissão certa. Um vendedor ganhou R$ 500 a mais no mês, e ninguém leria 300 conversas na mão.",
        "A régua do Adriano: ou muda o jogo (põe dinheiro no bolso, com velocidade ou capacidade que um humano não teria) ou economiza tempo. Reter clientes é outra forma de pôr dinheiro no bolso.",
        "Ele começou por uma cadeira só: a de social media de YouTube, o processo que mais dominava. Prefere uma coisa muito importante e bem construída a quatro mais ou menos. Construiu etapa por etapa e só avançou quando cada uma ficou redonda.",
        "O resultado: duas semanas sem precisar das social medias de YouTube. Os dois salários (R$ 9 mil + R$ 4,5 mil), com 13º, somavam cerca de R$ 175,5 mil por ano.",
        "O caderno de desabafos serve só para anotar ideias, não para criar nem planejar. Ele existe porque o “todo” muda de um dia para o outro, e sabendo das próximas ideias você constrói diferente.",
        "A lista da Freedom tem cerca de 23 cadeiras: site e CRM interno, esteira de vendas, histórico de tudo o que foi testado na conta, “fofoqueiro” dos grupos de WhatsApp, vigia de saldo e três agentes de copy separados (pesquisa, YouTube e Meta). Agentes especializados funcionam melhor e não são três salários."
      ],
      executar: [
        "Pedir ao Claude, na sessão do caderno de desabafos, a lista de todos os itens anotados.",
        "Numerar os itens por prioridade: qual faria muita diferença se já estivesse pronto hoje.",
        "Escrever ao lado de cada item o eixo: tempo, dinheiro no bolso ou retenção de clientes.",
        "Abrir um chat novo para cada construção e pedir uma documentação de tudo, fácil de outro chat entender e continuar."
      ],
      frase: "O efeito de criar é muito mais gostoso do que o de usar."
    },
    {
      hora: 2,
      tempo: "1:00 a 2:00",
      titulo: "Processo antes da IA e skill de persona",
      ideia: "O gestor de tráfego é a cadeira mais desejada, mas fica para o fim por ser a mais complexa. Antes de construir qualquer agente, é preciso escrever e validar o próprio processo, e a turma começa pela skill criadora de persona.",
      aprender: [
        "Quanto mais falho é o seu processo, mais inútil vai ser o agente. A maioria tenta construir o processo junto com a IA e esbarra na própria falta de clareza.",
        "“Saber quem sabe” (usar o método de outra pessoa) serve para coisas de baixo risco. Para alto risco, não: o cliente não vai deixar o agente gastar mais R$ 5 mil da verba para aprender.",
        "Processo de social media de Instagram montado na aula: persona, analisar o que já foi feito, pesquisa de mercado, estratégia, pautas, calendário, escrever, revisão de português, produzir o visual, revisão de arte, agendar e conferir se publicou. Analisar métricas depois é outra cadeira.",
        "O processo só está validado com 4 critérios: escrevi todas as etapas, executei seguindo essas etapas, sei explicar cada etapa para uma IA e a etapa é tecnologicamente possível. Se faltou um passo entre o 2 e o 3, volte e escreva.",
        "Se você joga um processo bagunçado no Claude e pede ajuda, ele não constrói o seu processo: constrói o processo dele. Na análise de campanha de rede de pesquisa, a primeira pergunta é: está vendendo, e o custo da venda está dentro do CAC?",
        "Quem já tem processo documentado constrói rápido. O Adriano vai criar o designer de criativos a partir de mais de mil cards do ClickUp com briefing e os criativos aprovados de cada um.",
        "A skill criadora de persona tem 5 etapas: entender o que o cliente vende, responder as perguntas do documento padrão de persona, decidir a fonte (cliente, site, pesquisa ou tudo), decidir o formato do resultado e definir o gatilho (URL, descrição do negócio ou transcrição da call)."
      ],
      executar: [
        "Escrever um processo seu, etapa por etapa, e executá-lo uma vez seguindo exatamente o que escreveu.",
        "Usar as duas semanas sem aula para escrever os processos do que vai virar agente.",
        "Construir no Claude a sua skill criadora de persona, sem abrir a skill pronta do Adriano.",
        "Pedir que a skill pergunte o que o negócio é e também o que ele NÃO é.",
        "Pedir na saída uma página para você ver e um arquivo .md para o próximo agente usar."
      ],
      frase: "Quanto mais falho é o seu processo, mais inútil será o agente."
    },
    {
      hora: 3,
      tempo: "2:00 ao fim",
      titulo: "Skill de anúncios e o melhor caminho",
      ideia: "A turma constrói a skill de anúncios de rede de pesquisa a partir da persona e aprende que quem cria bem também audita. No fim, o Adriano explica como escolher o que automatizar primeiro: o que é braçal e toma mais tempo.",
      aprender: [
        "Ao criar persona, planejamento e criativos como três skills separadas, uma não falava com a outra. O Adriano recriou do zero, cada skill usando a anterior como base. A prévia, as cores e o contador de caracteres vieram de muitos pedidos de melhoria.",
        "Quanto menos distrações, melhor o agente. Para a Camille, a sugestão foi uma aba separada de persona para social media, porque é mais fácil dizer “use só esta aba” do que listar tudo o que ignorar.",
        "Ao usar o método de um curso, execute uma otimização seguindo o processo à risca. Revisar o processo é diferente de executá-lo. E separe em três: otimização, campanha com oscilação ou queda de vendas e campanha que não vendeu.",
        "Regras da skill de anúncios: começa com o upload da persona, 3 ideias por produto ou serviço, 6 títulos e 2 descrições, ler a documentação e as políticas do Google Ads, tom direto com abreviações (“c/ garantia”) e saída em página web com abas, contador de caracteres e download.",
        "Dar ao agente uma decisão sem risco: pedir 6 títulos como mínimo e deixar que ele faça mais se a persona tiver material. Para a prévia igual à do Google Ads, basta mandar um print e pedir “quero assim”.",
        "A base de construir é a mesma de auditar: quem sabe o que é o certo analisa se o certo foi feito. A skill que cria anúncio vira a que audita anúncio, e o mesmo vale para site e campanha.",
        "No melhor caminho para o Ítalo: partir do objetivo de tempo e lucro, olhar o 80/20 e automatizar o que é braçal. O que toma tempo é a análise e a pré-decisão; a decisão continua com você, porque “todo aviso tem uma história”."
      ],
      executar: [
        "Construir a skill de anúncios de rede de pesquisa e deixá-la pronta para a aula seguinte, que começa o planejamento de campanha.",
        "Terminar o comando da skill com “qualquer dúvida, me pergunte antes de construir esta skill”.",
        "Pedir a prévia do anúncio mandando um print da tela de criação de anúncio do Google Ads.",
        "Criar uma versão auditora de uma skill que já cria, que só analisa e aponta o que está fora do padrão.",
        "Mapear onde vai o seu tempo por uma semana (planilha de meia em meia hora ou relatório de uso do celular) e marcar o que é braçal."
      ],
      frase: "O que toma tempo não é a decisão, é a análise antes dela."
    }
  ];
  aula.mapa = {
    centro: "Decidir e documentar antes de construir",
    ramos: [
      { titulo: "O que construir", itens: ["Criar é mais gostoso do que usar", "Régua: muda o jogo ou economiza tempo", "Reter clientes também põe dinheiro no bolso", "Uma cadeira bem feita vale mais que quatro"] },
      { titulo: "Caderno de desabafos", itens: ["Só anotar ideias, sem planejar", "Listar e numerar por prioridade", "Eixo: tempo, dinheiro ou retenção", "Freedom: cerca de 23 cadeiras listadas"] },
      { titulo: "Processo antes da IA", itens: ["Processo falho gera agente inútil", "Saber quem sabe só em baixo risco", "4 critérios de processo validado", "Executar seguindo o que escreveu", "Gravar a tela para achar seu padrão"] },
      { titulo: "Gestor de tráfego", itens: ["Cadeira mais desejada e mais complexa", "Vários agentes e um orquestrador", "Primeiro analisar: está vendendo?", "Fica entre as últimas a construir"] },
      { titulo: "Skill de persona", itens: ["O que vende e o que NÃO vende", "Perguntas do documento padrão de persona", "Fonte: cliente, site ou pesquisa", "Gatilho: URL, descrição ou call", "Arquivo .md para o próximo agente"] },
      { titulo: "Skill de anúncios", itens: ["Começa com o upload da persona", "3 ideias, 6 títulos e 2 descrições", "Documentação e políticas do Google Ads", "Tom direto, com abreviações", "Prévia igual à do Google Ads"] },
      { titulo: "Melhor caminho", itens: ["Quem cria bem também audita", "Automatizar o braçal primeiro", "Automatizar análise, decisão fica com você", "Mapear o tempo de meia em meia hora"] }
    ]
  };
})();
