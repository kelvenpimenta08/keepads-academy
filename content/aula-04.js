// Mentoria Adriano Gianini (Agentes de IA para Tráfego Pago): conteúdo da Aula 04,
// extraído da transcrição completa da aula.
// Os ids (a4-...) não podem mudar depois que a equipe começar a estudar,
// porque o progresso de cada card fica salvo pelo id.
window.AULAS = window.AULAS || {};
window.AULAS["adriano-ia-trafego"] = window.AULAS["adriano-ia-trafego"] || {};
window.AULAS["adriano-ia-trafego"][4] = {
  numero: 4,
  titulo: "Prioridades, processo e skills de persona e anúncios",
  resumo: "Sair da dopamina de criar e decidir o que vale construir (tempo, dinheiro ou retenção); as ideias da Freedom; por que o processo vem antes da IA e como validar um processo; a skill criadora de persona e a skill de anúncios de rede de pesquisa; e como uma skill que constrói vira uma skill que audita.",

  flashcards: [
    { id: "a4-c01", pergunta: "Qual é a “parte ruim” depois da semana em que tudo passou a ser possível?", resposta: "O efeito dopaminérgico de criar é muito mais gostoso do que usar. De nada adianta ter um monte de coisa construída que você não usa: agora é hora de decidir o que vale a pena construir." },
    { id: "a4-c02", pergunta: "Qual é a régua do Adriano para decidir o que construir?", resposta: "Ou muda o jogo (põe mais dinheiro no bolso, com uma velocidade ou capacidade que um humano não teria) ou economiza tempo. Reter clientes é uma terceira forma de pôr dinheiro no bolso." },
    { id: "a4-c03", pergunta: "Qual foi o exercício com o caderno de desabafos?", resposta: "Pedir ao Claude a lista de todos os itens anotados e numerar por prioridade (qual faria mais diferença se já estivesse pronto hoje), com o eixo de cada uma: tempo, dinheiro ou retenção." },
    { id: "a4-c04", pergunta: "Para que serve o caderno de desabafos (e para que não serve)?", resposta: "Só para anotar ideias. Não é para criar nem planejar nada. Ele existe porque o “todo” muda de um dia para o outro: sabendo das próximas ideias, você constrói diferente." },
    { id: "a4-c05", pergunta: "Qual cadeira o Adriano escolheu primeiro, e por quê?", resposta: "A de social media de YouTube: a que ele mais conhecia o processo e a mais estratégica para o negócio dele. Ele prefere uma coisa muito importante e bem construída a quatro mais ou menos." },
    { id: "a4-c06", pergunta: "Qual foi o resultado financeiro da primeira cadeira do Adriano?", resposta: "Duas semanas sem precisar das social medias de YouTube. Os dois salários (R$ 9 mil + R$ 4,5 mil), com 13º, somavam cerca de R$ 175,5 mil por ano." },
    { id: "a4-c07", pergunta: "Que tipo de coisa “humanamente impossível” a IA passou a permitir? Dê o exemplo da comissão.", resposta: "Cruzar as conversas do vendedor no CRM com as compras da Hotmart (antes ou depois da compra) para dar a comissão a quem tirou as dúvidas. Um vendedor ganhou R$ 500 a mais no mês. Ninguém leria 300 conversas na mão." },
    { id: "a4-c08", pergunta: "Por que o gestor de tráfego, a cadeira que todos querem, é uma das últimas a construir?", resposta: "Porque é a mais complexa: vira vários agentes (planejar, criar, auditar, otimizar campanha que vende, que oscila, que parou, que nunca vendeu) e um orquestrador. Começar por ela é a receita para travar." },
    { id: "a4-c09", pergunta: "Qual é a relação entre o processo e o agente?", resposta: "Quanto mais falho é o seu processo, mais inútil vai ser o agente. A maioria tenta construir o processo junto com a IA e se depara com a própria falta de clareza." },
    { id: "a4-c10", pergunta: "“Saber quem sabe” (pegar o método de alguém) funciona sempre?", resposta: "Funciona para coisas de baixo risco. Para alto risco, não: o cliente não vai aceitar que o agente gaste mais R$ 5 mil da verba “porque ainda está em treinamento”." },
    { id: "a4-c11", pergunta: "Quais são os 4 critérios de um processo validado?", resposta: "1) Escrevi todas as etapas. 2) Executei seguindo essas etapas. 3) Sei documentar e explicar cada etapa para uma IA. 4) A etapa é tecnologicamente possível." },
    { id: "a4-c12", pergunta: "Se você joga o “Frankenstein” no Claude e pede ajuda para pensar, o que acontece?", resposta: "Ele ajuda, mas não vai construir o seu processo para você: vai construir o processo dele. E aí você passa a seguir o processo de uma IA, que não é o que você quer." },
    { id: "a4-c13", pergunta: "Quais são as etapas do processo de social media de Instagram montado na aula?", resposta: "Persona → analisar o que já foi feito → pesquisa de mercado e concorrentes → estratégia → pautas → calendário → escrever → revisão de português → produzir o visual → revisão de arte → agendar → conferir se publicou." },
    { id: "a4-c14", pergunta: "Por que o revisor de português vem antes de produzir o visual?", resposta: "Porque, se vier depois, gera retrabalho: o texto já foi para a arte. A revisão de arte, depois, olha a coerência (ex.: foto sorrindo num título de notícia ruim)." },
    { id: "a4-c15", pergunta: "Depois de postar, analisar as métricas faz parte da mesma cadeira de social media?", resposta: "Não: é outra cadeira. “Não tenta botar as duas.” Cada agente faz bem uma coisa." },
    { id: "a4-c16", pergunta: "Qual é o começo do processo de análise de uma campanha de rede de pesquisa?", resposta: "A campanha está vendendo? Se sim, qual o custo da venda, e ele está dentro do CAC? Se não está vendendo, é outro processo. Daí em diante vêm as N situações." },
    { id: "a4-c17", pergunta: "Um atalho para descobrir o seu padrão de decisão em cada cenário?", resposta: "Gravar a tela por 30 dias enquanto trabalha e pedir ao Claude para entender o seu padrão em cada cenário. Para processos muito sérios, o Adriano ainda prefere escrever na mão." },
    { id: "a4-c18", pergunta: "Como o Adriano vai criar a cadeira de designer de criativos sem trabalho?", resposta: "Com mais de mil cards do ClickUp com briefing e a pasta de criativos aprovados de cada um: “analise, entenda o padrão e construa a cadeira que lê o briefing e gera a imagem”. Ele pagou o pedágio do processo lá atrás." },
    { id: "a4-c19", pergunta: "Quais são as etapas da skill criadora de persona?", resposta: "1) Entender o que o cliente vende. 2) Responder as perguntas do documento padrão de persona. 3) Decidir a fonte (cliente, site, pesquisa ou tudo). 4) Decidir o formato do resultado. 5) Definir o gatilho (URL, descrição do negócio ou transcrição da call)." },
    { id: "a4-c20", pergunta: "Qual dica deixa a skill sempre mais eficaz quando você descreve algo?", resposta: "Pedir que ela pergunte também o que NÃO é. Ex.: “vendo serviço de limpeza; não vendo produto de limpeza” ou “vendo camiseta personalizada só para empresa, não para pessoa física”." },
    { id: "a4-c21", pergunta: "Por que é melhor separar a persona de anúncio e a de social media em abas, e não num documento único?", resposta: "Quanto menos distrações, melhor o agente. Num documento com tudo, você precisa dizer o que ele deve ignorar. É mais fácil dizer “para conteúdo, use só a aba tal”." },
    { id: "a4-c22", pergunta: "Quando o fim de uma tarefa é o começo de outro agente, o que pedir na saída?", resposta: "Um arquivo .md para o próximo agente usar (além do HTML ou documento para você ver)." },
    { id: "a4-c23", pergunta: "Quais regras a skill de anúncios de rede de pesquisa recebeu?", resposta: "Começa com o upload da persona; 3 ideias por produto ou serviço; 6 títulos e 2 descrições; ler a documentação (tamanhos) e as políticas do Google Ads; tom direto, com abreviações; saída em página web com abas e contador de caracteres." },
    { id: "a4-c24", pergunta: "O que significa dar ao agente “uma decisão sem risco”?", resposta: "Ex.: pedir 6 títulos como mínimo e deixar que ele faça 8, 9, 10 se a persona tiver material. É dar poder de decisão onde errar não custa nada." },
    { id: "a4-c25", pergunta: "“Você não é Madre Teresa de Calcutá”: o que isso quer dizer no anúncio?", resposta: "Anúncio é para vender: direto, objetivo, com o máximo de informação sem precisar clicar. Abreviar para ganhar caracteres (ex.: “c/ garantia” em vez de “com garantia”)." },
    { id: "a4-c26", pergunta: "Como a skill de anúncios ganhou a prévia igual à do Google Ads?", resposta: "Ele tirou um print da prévia ao criar um anúncio no Google Ads e pediu “quero assim”. Depois foi pedindo: celular e desktop, tela cheia, claro e escuro, botão de fechar." },
    { id: "a4-c27", pergunta: "Como uma skill que constrói vira uma skill que audita?", resposta: "A base é a mesma: quem sabe o que é o certo consegue analisar se o certo foi feito. Quem cria anúncio bem feito audita anúncio; quem cria site profissional audita site; quem cria campanha audita campanha." },
    { id: "a4-c28", pergunta: "Que problema o Adriano teve ao criar persona, planejamento e criativos como três skills separadas?", resposta: "Uma não falava com a outra: ele melhorava uma e esquecia de levar para as outras. Recriou do zero, cada skill usando a anterior como base." },
    { id: "a4-c29", pergunta: "No “melhor caminho” para o Ítalo, o que mais toma tempo: a decisão ou a análise?", resposta: "A análise e a pré-decisão. Automatize isso; a decisão continua com você, porque ela carrega a sua bagagem e o seu histórico (“todo aviso tem uma história”)." },
    { id: "a4-c30", pergunta: "Qual era a tarefa das duas semanas sem aula da mentoria?", resposta: "Escrever os processos do que vai virar agente. E para a aula seguinte: a skill de anúncios pronta, porque ali começa o planejamento de campanha." }
  ],

  // Prova teórica (nível difícil, situações práticas). "correta" é o índice da opção certa;
  // a ordem das opções é embaralhada a cada tentativa.
  prova_teorica: [
    { id: "a4-t01", pergunta: "Você conectou Asaas, CRM, Autentique e YouTube em uma semana e já tem dez coisas construídas, mas usa duas. Qual é o diagnóstico da aula?",
      opcoes: ["Falta conectar mais APIs para tudo funcionar junto", "É o efeito dopaminérgico: criar é mais gostoso do que usar; agora é hora de decidir o que vale construir", "Você precisa migrar para o plano mais caro do Claude", "Você deveria ter começado pelo gestor de tráfego"],
      correta: 1, explicacao: "O limite virou a sua capacidade de criar. O desafio passou a ser decidir." },
    { id: "a4-t02", pergunta: "Conferir o saldo de 30 clientes não é complexo, mas toma 1 hora por dia. Pela régua do Adriano, vale construir?",
      opcoes: ["Não, porque é uma tarefa simples demais", "Sim: não muda o jogo, mas devolve cerca de 30 horas por mês, e tempo é um dos dois eixos da régua", "Só se o cliente pagar a mais por isso", "Só depois de construir o gestor de tráfego"],
      correta: 1, explicacao: "Ou muda o jogo, ou economiza tempo. Saldo é braçal: vale pelas horas." },
    { id: "a4-t03", pergunta: "Pelo critério que o Adriano usou na própria jornada, qual deve ser a sua primeira cadeira?",
      opcoes: ["A mais desejada pela equipe, mesmo que você não domine o processo", "A que você mais conhece de ponta a ponta e que é estratégica para o negócio, para construí-la melhor do que quem fazia", "A mais fácil tecnicamente, mesmo que pouco importante", "Várias ao mesmo tempo, para ganhar escala"],
      correta: 1, explicacao: "Ele escolheu o YouTube: o processo que mais dominava e o pilar do negócio." },
    { id: "a4-t04", pergunta: "Na conversa da Dayvina, qual foi a orientação para construir coisas que depois vão para uma estrutura maior?",
      opcoes: ["Construir tudo numa única conversa gigante", "Abrir um chat novo para cada construção e pedir uma documentação de tudo, legível para outro chat continuar o sistema", "Nunca juntar o que foi construído separado", "Usar o caderno de desabafos para construir"],
      correta: 1, explicacao: "Construir isolado não é problema quando você já sabe que aquilo vai fazer parte de um todo." },
    { id: "a4-t05", pergunta: "Toda a turma concordou que o gestor de tráfego é a cadeira mais desejada. O que o Adriano decidiu?",
      opcoes: ["Construir ela primeiro, já que é consenso", "Deixar para o fim: é a mais complexa, vira vários agentes com um orquestrador, e começar por ela faz travar", "Comprar uma pronta", "Construir só a parte de otimização"],
      correta: 1, explicacao: "Um agente treinado em uma semana não vai saber mais do que anos de experiência sua." },
    { id: "a4-t06", pergunta: "Você pegou as aulas de um especialista para o agente otimizar campanhas dos clientes. Qual é o risco que a aula aponta?",
      opcoes: ["As aulas podem estar desatualizadas", "Para coisas de alto risco, como a verba do cliente, não dá para o agente “aprender errando”; o processo precisa estar validado por você", "O agente fica lento com muita informação", "O especialista pode processar você"],
      correta: 1, explicacao: "O cliente não vai deixar o agente gastar mais R$ 5 mil para aprender." },
    { id: "a4-t07", pergunta: "Qual destes NÃO é um dos critérios de processo validado da aula?",
      opcoes: ["Escrevi todas as etapas", "O processo foi aprovado pelo cliente", "Executei seguindo as etapas que escrevi", "A etapa é tecnologicamente possível"],
      correta: 1, explicacao: "Os critérios: escrevi, executei seguindo, sei explicar para a IA e é tecnologicamente possível." },
    { id: "a4-t08", pergunta: "Ao executar o processo que escreveu, você percebe que entre o passo 2 e o 3 faz algo que não estava escrito. O que fazer?",
      opcoes: ["Ignorar, porque o agente vai deduzir", "Voltar e escrever a etapa que faltava: enquanto você não segue o próprio processo documentado, ele ainda não está identificado", "Pedir para o Claude completar sozinho", "Começar a construir a skill e corrigir depois"],
      correta: 1, explicacao: "Revisar o processo é diferente de executá-lo. Faltou, volta e escreve." },
    { id: "a4-t09", pergunta: "No processo de social media montado na aula, por que a revisão de português foi movida para antes da produção visual?",
      opcoes: ["Porque o Claude escreve melhor no começo", "Porque revisar depois gera retrabalho: o texto já estaria na arte", "Porque a revisão de arte já corrige o português", "Porque o cliente revisa o português"],
      correta: 1, explicacao: "Depois vem a revisão de arte, que olha a coerência entre imagem e mensagem." },
    { id: "a4-t10", pergunta: "Você quer que o mesmo agente produza os posts e depois analise as métricas. O que a aula recomenda?",
      opcoes: ["Ótimo: um agente completo é mais eficiente", "Separar: analisar depois de postar é outra cadeira", "Deixar a análise para o cliente", "Analisar só os posts que deram errado"],
      correta: 1, explicacao: "É mais fácil ter agentes bem treinados em uma coisa do que um que faz tudo." },
    { id: "a4-t11", pergunta: "Por que ter três agentes de copy (rede de pesquisa, YouTube e Meta/Instagram) em vez de um que faça os três?",
      opcoes: ["Porque cada plataforma cobra separado", "Porque dá mais trabalho construir um que faça os três bem do que três individuais, e agentes não são três salários", "Porque o Claude não consegue escrever para mais de uma plataforma", "Porque o cliente exige"],
      correta: 1, explicacao: "É fruto da experiência dele: especialização deixa cada agente melhor." },
    { id: "a4-t12", pergunta: "Na skill criadora de persona, por que pedir que ela pergunte também o que o negócio NÃO é?",
      opcoes: ["Para a skill ficar mais longa", "Porque o jogo do que é e do que não é deixa o resultado muito mais preciso (ex.: vende o serviço de limpeza, não o produto)", "Para evitar problemas jurídicos", "Porque o Google Ads exige"],
      correta: 1, explicacao: "É uma dica para qualquer construção a partir de uma descrição." },
    { id: "a4-t13", pergunta: "A Camille quer usar a persona para anúncios e também para social media. O que o Adriano sugeriu?",
      opcoes: ["Um documento único com tudo, para o agente escolher", "Uma aba separada para social media, porque quanto menos distrações melhor; é mais fácil dizer “use só esta aba” do que listar o que ignorar", "Duas skills que não podem se ver", "Usar só a persona de anúncio para tudo"],
      correta: 1, explicacao: "Mandar ignorar é o mesmo trabalho de não ter separado." },
    { id: "a4-t14", pergunta: "Na skill de anúncios, você pede “6 títulos no mínimo; se a persona tiver material, pode fazer mais”. O que isso ensina?",
      opcoes: ["Que o Google Ads aceita no máximo 6 títulos", "Dar ao agente poder de decisão onde não há risco", "Que o Claude sempre erra a quantidade", "Que é melhor sempre pedir 15 títulos"],
      correta: 1, explicacao: "Princípio básico: autonomia onde errar não custa nada." },
    { id: "a4-t15", pergunta: "Você tem uma skill que cria anúncios bem feitos. Pegou uma conta com 5 campanhas, 3 grupos cada e 3 anúncios por grupo. O que a aula sugere?",
      opcoes: ["Refazer todos os anúncios do zero", "Transformar a skill que cria numa skill que audita: ela sabe o que é o certo e analisa se o certo foi feito", "Pagar alguém para revisar", "Auditar só os anúncios com menos cliques"],
      correta: 1, explicacao: "Eram dois dias de trabalho. A base de construir é a mesma base de auditar." },
    { id: "a4-t16", pergunta: "O Ítalo perguntou qual o melhor caminho para criar os processos da agência. Qual foi o centro da resposta?",
      opcoes: ["Automatizar tudo de uma vez, começando pelo mais complexo", "Partir do objetivo de tempo e lucro, olhar o 80/20 e automatizar a análise e a pré-decisão do que é braçal, mantendo a decisão com você", "Copiar o processo do Adriano", "Esperar a Freedom ficar pronta para comprar"],
      correta: 1, explicacao: "O que toma tempo é a análise; a decisão carrega a sua experiência." }
  ],

  pratica: [
    {
      id: "a4-p1",
      titulo: "Priorizar o caderno de desabafos",
      descricao: "Pedir ao Claude (na sessão do caderno de desabafos) a lista de tudo o que está anotado. Numerar por prioridade e escrever ao lado o eixo de cada item: tempo, dinheiro ou retenção.",
      perguntas: [
        { id: "a4-pq01", pergunta: "Qual pergunta guia a priorização da lista?",
          opcoes: ["Qual é a mais fácil de construir?", "Qual faria muita diferença se já estivesse construída hoje, e em qual eixo?", "Qual o cliente mais pediu?", "Qual usa mais APIs?"],
          correta: 1, explicacao: "Tempo, dinheiro no bolso ou retenção de clientes." }
      ]
    },
    {
      id: "a4-p2",
      titulo: "Escolher a primeira cadeira",
      descricao: "Da lista priorizada, escolher uma cadeira só: a que você mais domina de ponta a ponta e que mais impacta o negócio. Escrever por que ela vem primeiro.",
      perguntas: [
        { id: "a4-pq02", pergunta: "Você domina bem o processo de planejamento de campanhas, que toma metade do seu tempo, mas a equipe quer o gestor de tráfego completo. Qual escolha segue a aula?",
          opcoes: ["O gestor de tráfego completo, porque é o consenso", "O planejamento: processo que você domina e que devolve muito tempo; o resto vem depois", "As duas ao mesmo tempo", "Nenhuma, primeiro conectar todas as APIs"],
          correta: 1, explicacao: "Uma coisa muito importante e bem construída vale mais que quatro mais ou menos." }
      ]
    },
    {
      id: "a4-p3",
      titulo: "Escrever e validar um processo",
      descricao: "Escrever as etapas de um processo seu (ex.: social media ou análise de campanha que está vendendo). Executar uma vez seguindo exatamente o que escreveu, corrigir o que faltou e checar os 4 critérios.",
      perguntas: [
        { id: "a4-pq03", pergunta: "Qual é a primeira pergunta do processo de análise de uma campanha de rede de pesquisa, segundo a aula?",
          opcoes: ["Qual é o índice de qualidade?", "A campanha está vendendo? (e, se sim, o custo da venda está dentro do CAC?)", "Quantas palavras-chave ela tem?", "Qual é o orçamento diário?"],
          correta: 1, explicacao: "Se não está vendendo, é outro processo." },
        { id: "a4-pq04", pergunta: "Você não sabe direito o que mais faz no dia a dia. Qual atalho o Adriano deu?",
          opcoes: ["Perguntar para a equipe", "Gravar a tela por 30 dias e pedir ao Claude para entender o seu padrão em cada cenário", "Adivinhar e ir ajustando", "Copiar o processo de um curso"],
          correta: 1, explicacao: "Para processos muito sérios, ele ainda prefere escrever na mão." }
      ]
    },
    {
      id: "a4-p4",
      titulo: "Construir a skill criadora de persona",
      descricao: "Sem abrir a skill de persona do Adriano, construir a sua no Claude Code: o que o cliente vende, as perguntas do documento de persona, a fonte (cliente, site, pesquisa), o formato da saída e os gatilhos. Incluir a pergunta do que o negócio NÃO é.",
      perguntas: [
        { id: "a4-pq05", pergunta: "Você pediu “gere um documento de persona” sem passar o site. Como a skill do Adriano reage?",
          opcoes: ["Gera uma persona genérica", "Pergunta o que é e depois o que não é o produto ou serviço, e só então gera", "Dá erro", "Procura o site sozinha no Google"],
          correta: 1, explicacao: "Os gatilhos são a URL do site ou a descrição do negócio." },
        { id: "a4-pq06", pergunta: "O documento de persona vai ser usado depois por outro agente que cria anúncios. O que pedir na saída?",
          opcoes: ["Só uma imagem bonita", "Além da página para você ver, um arquivo .md para o próximo agente usar", "Um áudio", "Nada, o próximo agente pergunta de novo"],
          correta: 1, explicacao: "O fim de uma tarefa é o começo do outro agente." }
      ]
    },
    {
      id: "a4-p5",
      titulo: "Construir a skill de anúncios de rede de pesquisa",
      descricao: "Criar a skill que gera anúncios a partir do upload da persona: 3 ideias por produto, 6 títulos e 2 descrições, documentação e políticas do Google Ads, tom direto com abreviações e saída em página web com abas, contador de caracteres e download. Depois pedir a prévia igual à do Google Ads, mandando um print.",
      perguntas: [
        { id: "a4-pq07", pergunta: "Qual é o gatilho de disparo da skill de anúncios?",
          opcoes: ["Digitar o nome do cliente", "Fazer o upload do documento de persona e pedir para gerar os anúncios", "Colar a URL da campanha", "Abrir o Google Ads"],
          correta: 1, explicacao: "A persona é a base de tudo." },
        { id: "a4-pq08", pergunta: "Como fazer a skill mostrar a prévia do anúncio igual à do Google Ads?",
          opcoes: ["Descrever em detalhes como é a prévia", "Tirar um print da prévia ao criar um anúncio no Google Ads e pedir “quero assim”", "Não dá, só no Google Ads", "Pedir para ele pesquisar no Google"],
          correta: 1, explicacao: "Depois dá para pedir celular, desktop, tela cheia, claro e escuro." },
        { id: "a4-pq09", pergunta: "Qual frase final o Adriano usou no comando para evitar que a skill saia errada?",
          opcoes: ["“Faça o mais rápido possível”", "“Qualquer dúvida, me pergunte antes de construir esta skill”", "“Use o modelo mais barato”", "“Não precisa testar”"],
          correta: 1, explicacao: "Assim ele pergunta antes de decidir sozinho o que ficou em aberto." }
      ]
    },
    {
      id: "a4-p6",
      titulo: "Transformar uma skill que cria numa que audita",
      descricao: "Pegar a skill de anúncios (ou outra que cria) e criar a versão auditora: ela não cria nada, só analisa o que existe na conta e aponta o que está fora do padrão de qualidade.",
      perguntas: [
        { id: "a4-pq10", pergunta: "Você quer outra versão de uma skill de persona que já funciona. Como pedir sem estragar a original?",
          opcoes: ["Editar a original direto", "Dizer que quer uma skill parecida com a que já existe, mas separada, sem mexer na skill já gerada", "Apagar a original e recriar", "Não dá para ter duas"],
          correta: 1, explicacao: "Ele mesmo tem três ou quatro skills de persona para dar aula." }
      ]
    },
    {
      id: "a4-p7",
      titulo: "Mapear onde vai o seu tempo",
      descricao: "Preencher por uma semana uma planilha de meia em meia hora, do acordar ao dormir (ou ver o relatório de uso do celular), e marcar o que é braçal e poderia ser automatizado ou semiautomatizado.",
      perguntas: [
        { id: "a4-pq11", pergunta: "Qual é a ideia da ferramenta de coaching que o Adriano contou?",
          opcoes: ["Cortar o sono para ter mais tempo", "Anotar de meia em meia hora tudo o que você faz por 7 dias para ver o que cortar, delegar ou fazer ao mesmo tempo", "Trabalhar só de manhã", "Usar um cronômetro em cada tarefa"],
          correta: 1, explicacao: "Ex.: ouvir audiolivro nos 40 minutos de esteira." },
        { id: "a4-pq12", pergunta: "Conferir o saldo e mandar no WhatsApp de cada cliente: qual é o caminho mais simples, sem construir agente?",
          opcoes: ["Contratar um assistente", "Uma tarefa agendada no Claude que abre o Chrome, olha as contas e manda o relatório pelo WhatsApp Web", "Fazer na mão todo dia", "Esperar a Freedom ficar pronta"],
          correta: 1, explicacao: "Hoje o Claude já fica aberto o dia todo." }
      ]
    },
    {
      id: "a4-p8",
      titulo: "Escrever os processos nas duas semanas sem aula",
      descricao: "Usar as duas semanas sem aula da mentoria para documentar o processo da cadeira escolhida, seguindo os 4 critérios. Juntar o que já existe gravado ou escrito (aulas, cards, modelos) para não explicar do zero.",
      perguntas: [
        { id: "a4-pq13", pergunta: "Por que o Adriano conseguiu construir tanta coisa rápido?",
          opcoes: ["Porque tem o plano mais caro do Claude", "Porque já tinha muito processo documentado e pediu para o Claude ler, entender o padrão e trazer para revisão", "Porque contratou programadores", "Porque copiou o Paperclip"],
          correta: 1, explicacao: "Quem já é orientado a processo pagou o pedágio antes." },
        { id: "a4-pq14", pergunta: "Qual é a maior dificuldade que a aula antecipa para o otimizador de campanhas?",
          opcoes: ["Conectar a API do Google Ads", "Otimizar uma campanha quando o cliente não informa se ela está vendendo", "Escrever os anúncios", "Escolher as cores do painel"],
          correta: 1, explicacao: "Se um humano não otimiza sem saber se vende, imagine uma IA." }
      ]
    }
  ]
};
