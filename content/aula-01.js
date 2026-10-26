// Mentoria Adriano Gianini (Agentes de IA para Tráfego Pago): conteúdo da Aula 01,
// extraído da transcrição completa da aula.
// Os ids (a1-...) não podem mudar depois que a equipe começar a estudar,
// porque o progresso de cada card fica salvo pelo id.
window.AULAS = window.AULAS || {};
window.AULAS["adriano-ia-trafego"] = window.AULAS["adriano-ia-trafego"] || {};
window.AULAS["adriano-ia-trafego"][1] = {
  numero: 1,
  titulo: "Contexto, cérebros e APIs",
  resumo: "Nivelamento: a mentalidade de testar a IA até o limite, o CTR, falar em vez de digitar, transformar tudo o que já foi gravado em contexto, construir cérebros (YouTube e arquivos locais) e conectar ferramentas por API.",

  // Flashcards de revisão espaçada (estilo Anki)
  flashcards: [
    { id: "a1-c01", pergunta: "Qual é o “espírito” da mentoria antes de contratar alguém ou desistir de uma tarefa?", resposta: "Provar que a IA NÃO consegue fazer. Enquanto você não testou a fundo, sem parar no primeiro resultado ruim, você não testou de verdade." },
    { id: "a1-c02", pergunta: "O que é a Freedom?", resposta: "A IA que vamos construir na mentoria: uma agência de marketing 100% automatizada, do onboarding do cliente até planejamento, criação, análise e otimização de campanhas, saldos de conta e financeiro." },
    { id: "a1-c03", pergunta: "A pergunta mudou de “dá para automatizar?” para qual?", resposta: "“O que eu QUERO automatizar e o que não quero?” Tecnologicamente já é possível; a decisão é de autonomia e de risco." },
    { id: "a1-c04", pergunta: "O que é o “20% estratégico”?", resposta: "A parte que você mantém na mão porque é onde ganha dos concorrentes e faz o cliente vender. O resto (~80%) pode ser automatizado." },
    { id: "a1-c05", pergunta: "Se a IA otimizar sozinha e errar feio, quem paga a conta?", resposta: "Você. A IA diz “errei, vou consertar”; quem perde o contrato é a agência. Por isso a IA propõe e você aprova." },
    { id: "a1-c06", pergunta: "O que é o caderno de desabafos?", resposta: "Uma sessão no Claude Code (na pasta Freedom) onde você despeja, por voz, durante 1 a 2 semanas, todo recurso que quer no sistema. O Claude anota, entende o recurso, pensa em integrações, cruzamentos de dados e alertas de segurança." },
    { id: "a1-c07", pergunta: "Por que é “proibido” digitar para o Claude?", resposta: "Porque ninguém digita com o mesmo nível de detalhe com que fala. A mágica está no contexto, e falar entrega muito mais contexto. Ferramenta: Wispr Flow + microfone decente." },
    { id: "a1-c08", pergunta: "O que significa CTR?", resposta: "Contexto, Tarefa e Resultado (+ Referências). Contexto: o que você quer com o máximo de detalhe. Tarefa: o que fazer, claro como 2 + 2. Resultado: o que define se ele acertou ou errou." },
    { id: "a1-c09", pergunta: "Qual é a “lei universal nº 1”?", resposta: "A mágica está no contexto. A maestria está no contexto. A escala está no contexto. Quem tem contexto é rei." },
    { id: "a1-c10", pergunta: "Qual é a relação entre contexto e perguntas do Claude?", resposta: "Inversamente proporcional: quanto mais contexto você dá, menos ele pergunta (e menos decisões ele toma por você)." },
    { id: "a1-c11", pergunta: "Para que servem as referências num pedido?", resposta: "Uma imagem vale mais que mil palavras. Print, link, gravação de tela ou dar acesso a uma ferramenta (ex.: Reportei) para ele navegar e replicar acabam com a ambiguidade." },
    { id: "a1-c12", pergunta: "Por que um pedido como “crie um dashboard de tráfego pago” dá errado?", resposta: "É genérico: cada pessoa imagina um dashboard diferente (métricas, cores, layout, funil). Sem contexto e referência, o Claude decide por você." },
    { id: "a1-c13", pergunta: "“Tudo o que você já gravou na vida pode ser usado como…”", resposta: "…contexto. Reuniões, treinamentos, aulas e Looms são um arsenal de inteligência: você só aponta para a gravação e manda transcrever e aprender." },
    { id: "a1-c14", pergunta: "Como descobrir o ICP real da agência com o que você já tem?", resposta: "Transcrever as reuniões de venda, cruzar com os formulários e com quem comprou, e pedir o padrão da reunião que fecha vs. a que perde, o perfil que compra e as perguntas do formulário de aplicação." },
    { id: "a1-c15", pergunta: "Como descobrir o padrão de clientes que cancelam?", resposta: "Exportar os grupos de WhatsApp de cada cliente, separar ativos e cancelados e pedir ao Claude o padrão de quem fica vs. quem sai." },
    { id: "a1-c16", pergunta: "Qual hábito passa a ser obrigatório a partir da Aula 1?", resposta: "Gravar tudo o que é trabalho, centralizando em uma ferramenta (Zoom ou Meet). Reunião presencial: gravar no celular ou num gravador tipo Plaud." },
    { id: "a1-c17", pergunta: "“Quem disse que o contexto para construir qualquer coisa precisa ser seu?” O que isso significa?", resposta: "Se você transcreve qualquer material, pode treinar um agente com o conhecimento do maior especialista do assunto (ex.: SEO de YouTube montado com 3 canais transcritos)." },
    { id: "a1-c18", pergunta: "Quais são os dois caminhos para construir cérebros?", resposta: "1) Vídeos do YouTube (públicos, via legenda). 2) Arquivos locais do computador (transcritos com Whisper)." },
    { id: "a1-c19", pergunta: "Qual a diferença entre ter transcrições e ter um cérebro?", resposta: "O cérebro é o material bruto guardado intacto. O que você constrói em cima (livro, skill, redator de blog) é outra coisa. Se pedir só “crie um livro”, ele pode fazer o livro e não guardar a transcrição." },
    { id: "a1-c20", pergunta: "O que pedir SEMPRE ao mandar transcrever algo?", resposta: "Transcrever em arquivo .md e guardar o original, para nunca precisar transcrever de novo." },
    { id: "a1-c21", pergunta: "Como organizar os cérebros em pastas?", resposta: "Simples: um cérebro por coisa (ex.: um por canal), cada um numa pasta. Quem busca e cruza é o Claude, então não precisa de organização perfeita." },
    { id: "a1-c22", pergunta: "O que é uma API, em português claro?", resposta: "A porta que uma ferramenta abre para outras se conectarem com ela e puxarem dados, de acordo com as regras que o dono da ferramenta definiu." },
    { id: "a1-c23", pergunta: "O que é um MCP?", resposta: "Uma espécie de API simplificada (na maioria dos casos). Ex.: a Meta tem MCP, então conectar no Claude é rápido; o Google ainda é API, mais chato." },
    { id: "a1-c24", pergunta: "Antes de querer qualquer dado de outra ferramenta dentro da Freedom, o que perguntar?", resposta: "Essa ferramenta tem API? O que eu consigo ler e fazer por ela? Vale a pena conectar?" },
    { id: "a1-c25", pergunta: "Quem decide se uma API permite ler e/ou escrever dados?", resposta: "O criador da API, não você. E ferramentas comerciais costumam liberar API só nos planos mais caros (mas vale pedir ao Claude para ler a documentação, às vezes o plano barato já resolve)." },
    { id: "a1-c26", pergunta: "Agente local vs. agente web: qual a diferença?", resposta: "Local depende do seu computador (ligado, com internet, Claude sem travar). Para operação 24/7 é preciso hospedar (VPS). WhatsApp: hospede no Brasil." },
    { id: "a1-c27", pergunta: "Por que o Claude sozinho não é um bom conselheiro estratégico?", resposta: "Porque ele bajula e raramente discorda. A solução da mentoria: um conselho de agentes (um discorda, um acha falhas, um concorda mostrando o que você não viu, um neutro)." },
    { id: "a1-c28", pergunta: "O Claude travou ou disse que não consegue. O que fazer?", resposta: "Subir para o Opus, dizer que outras pessoas conseguiram e pedir outra solução. Se estiver no app desktop, avisar isso (às vezes ele não percebe)." },
    { id: "a1-c29", pergunta: "Precisa construir um agente para tudo?", resposta: "Não. O Cowork já faz muita coisa com tarefa agendada (ex.: olhar todas as contas do Google Ads, ver saldos e montar relatório)." },
    { id: "a1-c30", pergunta: "O que é o “fofoqueiro”?", resposta: "Um número de WhatsApp em todos os grupos de clientes que avisa o CS quando alguém some, cai o engajamento ou demonstra insatisfação: alerta de churn." }
  ],

  // Prova teórica (nível difícil, situações práticas). "correta" é o índice da opção certa;
  // a ordem das opções é embaralhada a cada tentativa.
  prova_teorica: [
    { id: "a1-v2-t01", pergunta: "Um gestor tentou automatizar a edição de criativos com IA, o resultado veio ruim duas vezes e ele concluiu: “IA ainda não faz isso, vou contratar um editor”. Segundo a aula, qual leitura é a mais correta?",
      opcoes: ["A conclusão é válida: dois testes negativos com ferramentas atuais já mostram um limite técnico real", "Ele ainda não testou de verdade: precisaria ter ido a fundo tentando provar que a IA não consegue, variando abordagem, ferramenta e modelo", "Ele deveria contratar o editor e deixar a IA só nos cortes simples, que é o uso recomendado na aula", "Ele deveria simplesmente esperar o próximo modelo, já que na aula só a versão nova resolveu a edição"],
      correta: 1, explicacao: "O espírito da mentoria é se colocar à prova: o Adriano testou três dias seguidos, todas as ferramentas, até concluir. Parar no primeiro resultado ruim não é teste." },
    { id: "a1-v2-t02", pergunta: "Você vai pedir ao Claude um dashboard de tráfego pago para os clientes. Qual pedido aplica o CTR de forma mais completa?",
      opcoes: ["“Crie um dashboard de tráfego pago completo, moderno e com as métricas mais importantes do mercado”", "Contexto do negócio e de quem vai usar, métricas e filtros obrigatórios, um print de referência e o critério do que significa “pronto”", "Um print de um dashboard que você gosta, com a instrução “faça igual a este”", "A lista exata de métricas e a ordem dos gráficos, deixando o visual livre para não limitar a criatividade dele"],
      correta: 1, explicacao: "CTR = contexto, tarefa e resultado, mais referência. As outras opções têm só uma parte (genérico, só referência ou sem critério de resultado)." },
    { id: "a1-v2-t03", pergunta: "Você deu um contexto curto e o Claude entregou direto, sem fazer nenhuma pergunta. À luz da aula, qual é a interpretação mais prudente?",
      opcoes: ["O pedido estava claro o bastante, por isso ele não precisou perguntar nada", "Provavelmente ele preencheu as lacunas tomando decisões por você; com pouco contexto o esperado era mais perguntas", "É sinal de que o modelo usado é mais fraco, porque só o Sonnet deixa de fazer perguntas", "Significa que o caderno de desabafos já tinha todo o contexto necessário para essa tarefa"],
      correta: 1, explicacao: "Menos contexto gera mais perguntas; quando ele não pergunta, ele decide sozinho e entrega algo que você não pediu exatamente." },
    { id: "a1-v2-t04", pergunta: "O comercial da sua agência diz que “não existe padrão de cliente”. Qual caminho a aula usou para provar o contrário?",
      opcoes: ["Uma pesquisa de satisfação com os clientes atuais cruzada com o NPS de cada um", "Transcrever as reuniões de venda, cruzar com as aplicações do formulário e com quem comprou, e pedir o padrão de quem fecha e de quem não fecha", "Exportar o CRM e pedir ao Claude o perfil médio dos clientes ativos para montar a persona", "Pedir ao comercial para gravar as próximas 50 reuniões antes de qualquer análise"],
      correta: 1, explicacao: "Foi o caso do Máquina Black: ~200 horas de reuniões transcritas + 2.880 aplicações + vendas revelaram o ICP e as perguntas do formulário." },
    { id: "a1-v2-t05", pergunta: "Você quer entender por que a agência perde clientes. Qual fonte de contexto a aula sugere usar?",
      opcoes: ["Os relatórios de performance das campanhas dos clientes que cancelaram", "Os grupos de WhatsApp de cada cliente exportados, separados entre quem continua e quem cancelou", "O histórico de pagamentos e de inadimplência no financeiro", "Uma pesquisa de saída enviada para os clientes que cancelaram nos últimos meses"],
      correta: 1, explicacao: "Exportar os grupos e separar ativos de cancelados permite ao Claude achar o padrão de quem fica e de quem sai." },
    { id: "a1-v2-t06", pergunta: "Você mandou: “baixe todas as aulas de otimização do canal e crie uma skill”. Qual é o problema dessa instrução segundo a aula?",
      opcoes: ["Skills não podem ser criadas a partir de transcrições de vídeo", "Ele pode entregar só a skill e não guardar as transcrições brutas, que são o cérebro reaproveitável", "Falta escolher o Opus, que é o único modelo capaz de criar skills", "O Claude Code só executa uma tarefa por sessão e essa instrução tem duas"],
      correta: 1, explicacao: "A tarefa define a entrega. Sempre peça para manter os originais: o material bruto é o cérebro." },
    { id: "a1-v2-t07", pergunta: "Qual orientação a aula dá sobre a organização dos cérebros?",
      opcoes: ["Um cérebro único, com subpastas por tema e um índice mantido manualmente por você", "Um cérebro por coisa (por exemplo, um por canal), em pastas simples; quem busca e cruza é o Claude", "Tudo dentro do Obsidian, porque o Claude se perde em pastas com muitas subpastas", "Um cérebro por cliente, para nunca misturar contextos de concorrentes diferentes"],
      correta: 1, explicacao: "“Simplifica, não complica”: uma pasta por cérebro. Com 30 pastas ou com 29 subpastas, o Claude acessa tudo." },
    { id: "a1-v2-t08", pergunta: "A pessoa de integração disse que o recurso que você quer numa ferramenta só existe no plano mais caro (R$ 18 mil a mais por ano). O que a aula mostra que vale fazer antes do upgrade?",
      opcoes: ["Fazer o upgrade, porque recursos de API avançados quase sempre ficam nos planos superiores", "Procurar um MCP da ferramenta, que sempre libera mais recursos do que a API", "Pedir ao Claude para ler a documentação da API e dizer o que dá para fazer em cada plano", "Usar o Cowork para extrair os dados pela tela e evitar a API"],
      correta: 2, explicacao: "Caso da Circle: o Claude leu a documentação e mostrou que o plano anterior já fazia tudo; o Adriano voltou para o plano mais barato." },
    { id: "a1-v2-t09", pergunta: "Sobre ler e escrever dados por uma API, qual afirmação está correta?",
      opcoes: ["Se a ferramenta tem API, dá para ler e escrever qualquer dado dela", "Quem define o que pode ser lido e escrito é o criador da API", "Escrita só é possível via MCP; API serve apenas para leitura", "Com o login de administrador, o Claude consegue liberar a escrita mesmo que a API não permita"],
      correta: 1, explicacao: "As regras são de quem criou a API. Algumas são bem documentadas, outras não, mas o limite é sempre do dono." },
    { id: "a1-v2-t10", pergunta: "Qual descrição de MCP e API bate com a aula?",
      opcoes: ["MCP é a versão paga da API, por isso conecta mais rápido", "MCP é uma espécie de API simplificada na maioria dos casos: a Meta tem MCP e conecta fácil, o Google ainda é API e é mais chato", "API serve para puxar dados e MCP serve só para disparar automações", "O Google tem MCP pronto e a Meta só oferece API, por isso a Meta é mais trabalhosa"],
      correta: 1, explicacao: "Na maioria dos casos o MCP simplifica a conexão. A aula cita Meta (MCP, fácil) e Google (API, mais chato)." },
    { id: "a1-v2-t11", pergunta: "Você quer um agente que avise o vendedor da comissão no momento em que a venda acontece, 24 horas por dia. Onde ele deve rodar?",
      opcoes: ["No seu computador, porque o Claude Code aproveita todos os recursos da máquina", "Hospedado num servidor (web/VPS), porque o local depende do computador ligado, da internet e de o Claude não travar", "No Cowork, com uma tarefa agendada a cada hora", "Local, desde que o computador fique ligado o tempo todo, que é o suficiente a longo prazo"],
      correta: 1, explicacao: "A aula é clara: para operação realmente no automático, a médio e longo prazo você vai ter que hospedar." },
    { id: "a1-v2-t12", pergunta: "Por que o Adriano mantém um Jarvis local além do Jarvis web?",
      opcoes: ["Porque o local é mais seguro para dados sensíveis de clientes", "Porque processos como os do social media de YouTube usam muito o processamento e os recursos do próprio computador", "Porque o Jarvis web não consegue usar o Claude Code", "Porque hospedar tudo num servidor sairia mais caro do que deixar local"],
      correta: 1, explicacao: "Se subisse para um servidor, teria que reconstruir tudo o que o Mac já oferece. Não fazia sentido para esses processos." },
    { id: "a1-v2-t13", pergunta: "Como a aula descreve o “conselho” de agentes para decisões estratégicas?",
      opcoes: ["Três especialistas (tráfego, comercial e financeiro) que dão parecer cada um na sua área", "Um que discorda, um que procura falhas, um que concorda mas traz o que você não viu e um neutro que nunca concorda", "Um que propõe, um que executa e um que audita o resultado", "Vários agentes que votam, e a decisão fica com a maioria"],
      correta: 1, explicacao: "O conselho existe porque o Claude bajula: os papéis são desenhados para contrariar você de propósito." },
    { id: "a1-v2-t14", pergunta: "Na otimização de campanhas dos clientes, qual nível de autonomia a aula considera o mais provável para a maioria dos alunos?",
      opcoes: ["A IA otimiza tudo sozinha, só com limite de orçamento definido", "A IA audita, propõe otimizações com base no seu padrão aprendido e você marca o que deve ser executado", "A IA só gera relatórios e toda otimização continua manual", "A IA otimiza sozinha as contas pequenas e só propõe nas contas grandes"],
      correta: 1, explicacao: "A IA aprende o seu padrão (por exemplo, gravando a sua tela em 100 otimizações), propõe, e você dá o check." },
    { id: "a1-v2-t15", pergunta: "Qual é a principal vantagem de usar como contexto aquilo que você já gravou (reuniões, treinamentos, aulas)?",
      opcoes: ["Gasta menos tokens do que escrever o contexto à mão", "Você não precisa explicar o processo: só aponta para a gravação e manda transcrever e aprender", "Dispensa a estrutura de CTR, porque a gravação já é o contexto completo", "Permite treinar o modelo da Anthropic com os dados da agência"],
      correta: 1, explicacao: "Caso do gerador de capas: um treinamento de 7 horas já gravado virou o processo inteiro, sem precisar explicar de novo." },
    { id: "a1-v2-t16", pergunta: "Qual é o motivo central de a aula “proibir” digitar para o Claude?",
      opcoes: ["O Claude entende áudio melhor do que texto", "Falando você entrega muito mais detalhe, e o contexto é o que define a qualidade do resultado", "O Wispr Flow consome menos tokens do que o texto digitado", "Evita erros de digitação, que confundem o modelo"],
      correta: 1, explicacao: "“Eu duvido que você escreva no mesmo nível de detalhe que você fala.” Mais detalhe = mais contexto." }
  ],

  // Partes práticas citadas na aula. Cada uma tem perguntas difíceis sobre a execução.
  pratica: [
    {
      id: "a1-p1",
      titulo: "Usar o Claude Code (e não o Chat)",
      descricao: "Ter o plano pago do Claude e fazer todas as tarefas da mentoria no Claude Code. Iniciantes: assistir ao curso de Claude da área de membros.",
      perguntas: [
        { id: "a1-v2-pq01", pergunta: "Você pede para instalar o Whisper e o Claude responde que não tem acesso ao terminal nem à internet. Pelo que aconteceu na aula, qual é a causa mais provável?",
          opcoes: ["Você está no plano gratuito do Claude", "Você está no Chat (ou Cowork) em vez do Claude Code", "Falta permissão de administrador no Windows", "O Whisper não tem versão para Windows"],
          correta: 1, explicacao: "Caso do Vinícius: estava no Chat. Instalar e programar é coisa do Claude Code." },
        { id: "a1-v2-pq02", pergunta: "O Sonnet insiste que uma tarefa não é possível. Qual é a sequência que a aula recomenda?",
          opcoes: ["Reformular o mesmo pedido no Sonnet até ele aceitar", "Subir para o Opus, dizer que outras pessoas conseguiram e pedir outra abordagem", "Abrir uma sessão no Chat para pesquisar a solução e colar no Code", "Perguntar ao Gemini e colar a resposta no Claude"],
          correta: 1, explicacao: "“O Sonnet é preguiçoso.” Para problemas complexos, Opus e pressão: “alguém já conseguiu, se vira”." }
      ]
    },
    {
      id: "a1-p2",
      titulo: "Instalar o Wispr Flow e parar de digitar",
      descricao: "Instalar o Wispr Flow (tem versão para Windows), configurar o atalho e usar um microfone decente.",
      perguntas: [
        { id: "a1-v2-pq03", pergunta: "Você já usa o ditado nativo do Claude. Por que a aula indica o Wispr Flow mesmo assim?",
          opcoes: ["Porque o ditado nativo não funciona em português", "Porque o Adriano considera o Wispr melhor que o nativo, e o objetivo é falar muito com boa transcrição", "Porque o Wispr envia o áudio direto para o Claude Code processar", "Porque o ditado nativo só existe no Mac"],
          correta: 1, explicacao: "“O Wispr é melhor do que o nativo do Claude.” Ele recomenda até a versão paga, porque você vai falar muito." },
        { id: "a1-v2-pq04", pergunta: "Qual montagem de áudio a aula recomenda para falar com o Claude?",
          opcoes: ["Fone com microfone embutido, para falar e ouvir no mesmo aparelho", "Um microfone minimamente decente para falar; o fone pequeno fica só para ouvir", "O microfone do notebook, já que o Wispr filtra o ruído", "Um gravador Plaud para tudo, inclusive para falar com o Claude"],
          correta: 1, explicacao: "Os microfones pequenos de fone transcrevem mal; ele usa o fone só para ouvir." }
      ]
    },
    {
      id: "a1-p3",
      titulo: "Criar a pasta Freedom",
      descricao: "Criar uma pasta com o nome da sua IA (Freedom ou o nome que você quiser) e abrir todas as sessões da mentoria dentro dela.",
      perguntas: [
        { id: "a1-v2-pq05", pergunta: "Qual é o motivo de criar uma pasta para a sua IA no Claude Code?",
          opcoes: ["O Claude Code não tem “projetos”; a pasta faz esse papel e organiza as sessões e os arquivos daquele sistema", "Limitar o que o Claude consegue ler no seu computador", "O Claude Code só abre se existir uma pasta com o nome do projeto", "Fazer o GitHub sincronizar o projeto automaticamente"],
          correta: 0, explicacao: "Diferente das outras versões, o Claude Code não tem projetos; a pasta organiza tudo o que for da Freedom." }
      ]
    },
    {
      id: "a1-p4",
      titulo: "Começar o caderno de desabafos",
      descricao: "Abrir uma sessão na pasta Freedom e, por voz, explicar que é um caderno de desabafos: você vai despejar recursos por 1 a 2 semanas e ele anota, entende o recurso, pensa em integrações, cruzamentos e alertas de segurança.",
      perguntas: [
        { id: "a1-v2-pq06", pergunta: "Qual destas tarefas NÃO faz parte do papel do Claude no caderno de desabafos?",
          opcoes: ["Anotar cada recurso desabafado", "Pensar em integrações e cruzamentos entre os recursos", "Levantar alertas de segurança", "Começar a construir cada recurso assim que ele for desabafado"],
          correta: 3, explicacao: "Por enquanto é só desabafo. Construir vem depois, quando você tiver a visão do todo." },
        { id: "a1-v2-pq07", pergunta: "Por quanto tempo o caderno de desabafos deve ser alimentado e com qual modelo?",
          opcoes: ["Uma única sessão longa, no Opus no esforço máximo", "De 1 a 2 semanas; o Sonnet basta, porque é só desabafo", "Até o fim da mentoria, sempre no Opus", "Três dias, no Haiku, para economizar"],
          correta: 1, explicacao: "“Vou passar de uma a duas semanas desabafando.” E “aqui pode ser o Sonnet de boa, porque é só desabafo”." }
      ]
    },
    {
      id: "a1-p5",
      titulo: "Exercício de CTR: vídeo do YouTube vira método",
      descricao: "Pedir ao Claude a transcrição da aula gratuita do Adriano sobre “o que fazer quando uma campanha do Google Ads para de vender” e, com contexto, pedir para transformar em passo a passo que possa virar agente ou skill.",
      perguntas: [
        { id: "a1-v2-pq08", pergunta: "No primeiro passo do exercício (só transcrever o vídeo), quanto contexto é necessário?",
          opcoes: ["Todo o contexto do agente final, senão a transcrição sai ruim", "Pouco: uma instrução simples como “quero a transcrição literal desse vídeo” resolve", "Nenhum: basta colar o link, sem texto", "É preciso baixar o vídeo e enviar o arquivo junto"],
          correta: 1, explicacao: "Tarefa simples, instrução simples. O contexto entra no passo seguinte, quando você diz o que fazer com a transcrição." },
        { id: "a1-v2-pq09", pergunta: "Qual pedido aplica o CTR corretamente no segundo passo do exercício?",
          opcoes: ["“Resuma essa transcrição em tópicos para eu estudar depois”", "“Essa transcrição é um método do que fazer quando uma campanha para de vender. Entenda o método e coloque em passo a passo para eu transformar em agente ou skill.”", "“Crie um agente que faça o que esse vídeo ensina quando uma campanha parar de vender”", "“Transforme essa transcrição numa skill de otimização de Google Ads”"],
          correta: 1, explicacao: "Tem contexto (o que é o material), tarefa (passo a passo) e resultado (base para agente ou skill). Na aula, criar a skill ainda não era a tarefa." }
      ]
    },
    {
      id: "a1-p6",
      titulo: "Transcrever um arquivo de vídeo local",
      descricao: "Pegar um vídeo do computador (de preferência uma reunião de vendas ou de onboarding), pedir para transcrever em .md guardando o original e instalar o que o Claude pedir (normalmente o Whisper local).",
      perguntas: [
        { id: "a1-v2-pq10", pergunta: "No Windows, o Claude Code diz que não consegue transcrever um vídeo local. Qual é a orientação da aula?",
          opcoes: ["Converter o vídeo em MP3 no celular e enviar de novo", "Avisar que está no app desktop no Windows e pedir para ele instalar o Whisper local", "Subir o vídeo no YouTube como não listado e transcrever por lá", "Trocar para o Codex, que transcreve vídeo nativamente"],
          correta: 1, explicacao: "Às vezes ele não percebe o ambiente. Dizer onde você está e pedir o Whisper local resolve." },
        { id: "a1-v2-pq11", pergunta: "Como o Adriano melhorou a precisão dos termos técnicos ao transcrever a palestra da Hotmart?",
          opcoes: ["Usando o Whisper Large V3 completo, que já conhece termos de marketing", "Passando para o Whisper o vocabulário dos slides da palestra", "Revisando a transcrição com um segundo agente corretor", "Gravando a palestra de novo com um microfone melhor"],
          correta: 1, explicacao: "O Claude passou o vocabulário dos slides para o Whisper não errar os termos técnicos." },
        { id: "a1-v2-pq12", pergunta: "Por que a aula prefere baixar o vídeo para o computador em vez de transcrever direto do link, neste exercício?",
          opcoes: ["Porque transcrever arquivo local exige ferramentas instaladas diferentes das do YouTube, e esse é o problema a resolver aqui", "Porque o YouTube proíbe qualquer transcrição de vídeo", "Porque transcrição local exige uma chave paga da API da Anthropic", "Porque arquivo local sempre sai mais rápido que o link"],
          correta: 0, explicacao: "O objetivo do exercício é deixar o seu Claude preparado para transcrever arquivos locais, com o que precisar instalar." }
      ]
    },
    {
      id: "a1-p7",
      titulo: "Cérebro de YouTube: últimos 10 vídeos de um canal",
      descricao: "Usar o arquivo cerebro-youtube-instrucoes.md (do grupo) e pedir ao Claude Code para transcrever os 10 últimos vídeos de um canal (sugestão: um canal de Google Ads).",
      perguntas: [
        { id: "a1-v2-pq13", pergunta: "Para transcrever, o Claude começou a tocar o vídeo do YouTube com áudio alto no fundo. Isso está certo?",
          opcoes: ["Sim: é assim que o Whisper transcreve vídeos do YouTube", "Não: o caminho que funciona pega a legenda/transcrição que o YouTube já disponibiliza, sem tocar o áudio", "Não: o certo seria baixar o MP4 e transcrever localmente com o Whisper", "Sim, desde que o volume fique baixo para não atrapalhar"],
          correta: 1, explicacao: "O cérebro do Adriano ataca a legenda pública; ele não ouve o áudio." },
        { id: "a1-v2-pq14", pergunta: "Qual destas práticas AUMENTA o risco de o YouTube bloquear o seu IP?",
          opcoes: ["Uma pausa aleatória de 25 a 40 segundos entre os vídeos", "Rodar dois canais ao mesmo tempo, em janelas diferentes, para terminar mais rápido", "Renovar os cookies do navegador a cada 10 vídeos", "Rodar no computador de casa em vez de um servidor na nuvem"],
          correta: 1, explicacao: "Um canal por vez, um vídeo por vez. Duas execuções simultâneas são dois robôs no mesmo IP." },
        { id: "a1-v2-pq15", pergunta: "O Claude recusou transcrever alegando direitos autorais. O que a aula orienta responder?",
          opcoes: ["Dizer que você é o dono do canal", "Explicar que o vídeo é público e que você só quer a transcrição/legenda que já está disponível", "Pedir para ele baixar o vídeo e transcrever localmente, que não tem trava", "Trocar para outra IA sem as travas éticas do Claude"],
          correta: 1, explicacao: "Vídeo público e legenda já disponível: você só quer pegar o que é público." },
        { id: "a1-v2-pq16", pergunta: "O cérebro do canal do próprio Adriano é “o mais inteligente de todos”. O que ele tem que os cérebros dos concorrentes não têm?",
          opcoes: ["As transcrições completas, porque os concorrentes bloqueiam a legenda", "Métricas privadas, como a capa vencedora, o CTR e a retenção, porque o canal dele é puxado via API", "As capas dos vídeos, porque só o dono consegue baixá-las", "Os comentários dos vídeos"],
          correta: 1, explicacao: "Dos concorrentes ele só tem o que é público (transcrição, views, capa e título). Do próprio canal, via API, tem tudo." }
      ]
    },
    {
      id: "a1-p8",
      titulo: "Conectar a API de uma ferramenta de terceiro",
      descricao: "Escolher uma ferramenta da agência em que você é administrador (não pode ser Google nem Meta: ex. Asaas, Hotmart, CRM, ClickSign, Reportei, Hostinger) e pedir ao Claude para achar a documentação, explicar tudo o que dá para fazer e conectar.",
      perguntas: [
        { id: "a1-v2-pq17", pergunta: "Qual deve ser o primeiro pedido ao Claude antes de conectar uma ferramenta?",
          opcoes: ["Pedir a chave de API e colar para ele testar a conexão", "Pedir para ele descobrir se existe API, o que ela permite ler e fazer, e só então conectar", "Procurar no YouTube um tutorial de integração da ferramenta", "Contratar o plano mais caro para garantir acesso à API"],
          correta: 1, explicacao: "Saber se existe API e o que ela permite define se vale a pena conectar." },
        { id: "a1-v2-pq18", pergunta: "No prompt da aula, qual é o papel da frase “sou totalmente leigo, faça todo o trabalho por mim”?",
          opcoes: ["Fazer ele responder mais rápido", "Dar contexto: muda o nível de explicação e faz ele assumir a pesquisa da documentação e o passo a passo", "Economizar tokens, porque ele explica menos", "Nenhum; é só educação"],
          correta: 1, explicacao: "É contexto. E o Adriano ainda acrescentou “me trate como iniciante”, porque o Claude dele já tinha a API conectada." },
        { id: "a1-v2-pq19", pergunta: "Conectando o Asaas, o que a agência passa a enxergar dentro da Freedom, segundo o exemplo do fim da aula?",
          opcoes: ["Apenas o saldo bancário do mês", "Caixa, valores a receber e inadimplentes (podendo até pausar o tráfego de quem não paga), além do LTV", "Os dados das campanhas de cada cliente", "As notas fiscais emitidas e os impostos a pagar"],
          correta: 1, explicacao: "Dados financeiros cruzados com a operação: caixa, a receber, inadimplência e LTV." }
      ]
    },
    {
      id: "a1-p9",
      titulo: "Criar o hábito de gravar todas as reuniões",
      descricao: "A partir de agora, gravar tudo o que é trabalho (vendas, onboarding, alinhamentos), centralizado em uma ferramenta (Zoom ou Meet). Presencial: celular ou gravador tipo Plaud.",
      perguntas: [
        { id: "a1-v2-pq20", pergunta: "Qual é a dica da aula para organizar as gravações?",
          opcoes: ["Gravar em várias ferramentas ao mesmo tempo, como backup", "Centralizar em uma ferramenta só (Zoom ou Meet), desde que grave e transcreva", "Gravar apenas as reuniões de venda, que são as que geram o ICP", "Usar o Plaud em todas as reuniões, inclusive nas online"],
          correta: 1, explicacao: "Centralizar facilita conectar ao Claude e montar o segundo cérebro." },
        { id: "a1-v2-pq21", pergunta: "E as reuniões presenciais com clientes?",
          opcoes: ["Não precisam ser gravadas, porque geram pouco contexto útil", "Grave pelo celular; um gravador como o Plaud vale a pena para quem faz muitas reuniões presenciais", "Peça ao cliente para gravar e enviar depois", "Faça um resumo escrito logo depois da reunião"],
          correta: 1, explicacao: "O Adriano só usou o Plaud quando tinha reunião presencial; para quem visita clientes, vale a pena." }
      ]
    }
  ]
};
