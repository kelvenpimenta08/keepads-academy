// Mentoria Adriano Gianini (Agentes de IA para Tráfego Pago): conteúdo da Aula 05,
// extraído da transcrição completa da aula.
// Os ids (a5-...) não podem mudar depois que a equipe começar a estudar,
// porque o progresso de cada card fica salvo pelo id.
window.AULAS = window.AULAS || {};
window.AULAS["adriano-ia-trafego"] = window.AULAS["adriano-ia-trafego"] || {};
window.AULAS["adriano-ia-trafego"][5] = {
  numero: 5,
  titulo: "Processo, procedimento e o otimizador",
  resumo: "A diferença entre processo e procedimento; o método de 6 passos para tirar o processo da sua cabeça; o exercício de negativar termos de pesquisa revisado ao vivo; por que não tratar a IA como ferramenta de automação; a cadeira de otimizador (analisar e propor, depois executar); e o planejador de campanha.",

  flashcards: [
    { id: "a5-c01", pergunta: "Qual é a diferença entre processo e procedimento?", resposta: "Processo são as etapas (o que fazer, em que ordem). Procedimento é o como cada etapa é feita. Um processo pode ter muitas etapas, e cada uma pode ter procedimentos diferentes." },
    { id: "a5-c02", pergunta: "Como saber se um processo está bem feito?", resposta: "Quando, seguindo rigorosamente as etapas, o resultado final acontece. E o sucesso precisa ser verificável, tipo sim ou não: “a conta nova foi criada?”." },
    { id: "a5-c03", pergunta: "Dá para otimizar uma campanha e ela não ficar melhor?", resposta: "Sim. O processo de otimização mede se as etapas foram executadas, não se o resultado melhorou. É diferente do jeito que a gente pensa no dia a dia." },
    { id: "a5-c04", pergunta: "Por que o plugin do Adriano tem persona, planejamento e anúncios separados?", resposta: "Porque uma é premissa da outra: não existe planejamento sem saber o que se vende, nem anúncio de rede de pesquisa sem a palavra-chave definida. Microprocessos são mais fáceis de gerenciar que um processo gigante." },
    { id: "a5-c05", pergunta: "O que um procedimento “assume” quando você delega uma etapa?", resposta: "Competências escondidas: que a pessoa sabe acessar o site, quais dados preencher e de onde tirar, se a conta é PF ou PJ, onde estão os dados de pagamento. Você precisa deixar isso claro." },
    { id: "a5-c06", pergunta: "Se uma etapa pode ser feita de duas ou três formas, qual escolher?", resposta: "A mais simples. Não precisa colocar as três: o que importa é chegar no resultado final." },
    { id: "a5-c07", pergunta: "“Eu olho as métricas, vejo o que não está bom e ajusto”: isso é um processo?", resposta: "Não. É um resumo do que você faz. Quem faz muito faz no automático, como quem dirige e não pensa mais na embreagem. Para ensinar, você precisa lembrar que ela existe." },
    { id: "a5-c08", pergunta: "O que a “receita da avó” ensina sobre skills?", resposta: "“Sal a gosto” e “farinha até dar o ponto” funcionam para a avó, mas quem segue a receita erra. Uma skill escrita assim faz o Claude chutar, porque ele faz exatamente o que está escrito." },
    { id: "a5-c09", pergunta: "“Analise minha campanha e sugira otimização”: o que o Claude entrega?", resposta: "A otimização média da internet. Com o seu processo (etapas, réguas, regras e exceções), ele entrega a sua otimização, toda semana, do mesmo jeito." },
    { id: "a5-c10", pergunta: "Quais são os 6 passos para tirar o processo da cabeça?", resposta: "1) Gravar fazendo de verdade, falando em voz alta. 2) Quebrar a gravação em etapas. 3) Raio-X: perguntas para cada etapa. 4) Caçar o “depende”. 5) Escrever o processo. 6) Testar a skill." },
    { id: "a5-c11", pergunta: "Por que não pular o óbvio na gravação?", resposta: "Porque o óbvio é justamente o que você esqueceria de escrever. Ex.: “palavra-chave de marca com CTR de 2% está horrível” é óbvio para você, mas sem isso o Claude não sabe." },
    { id: "a5-c12", pergunta: "Como uma fala vira etapas? Dê o exemplo da aula.", resposta: "“O CPA subiu para 62 e a meta é 45, deixa eu ver qual campanha puxou” vira: conferir o histórico de alterações, comparar com a semana anterior, comparar CPA com a meta, achar a campanha que puxou e abrir os termos de pesquisa." },
    { id: "a5-c13", pergunta: "Quais perguntas do raio-X definem a régua de uma etapa?", resposta: "O que eu olho (relatório, coluna, tela) e como eu sei se está bom ou ruim. Ex.: CTR de 10% é bom, mas se o CPA estourou, é ruim. Aí aparecem as regrinhas que você usa sem perceber." },
    { id: "a5-c14", pergunta: "O que é “caçar o depende”?", resposta: "Toda vez que você diz “depende”, existe uma regra escondida. Achar e escrever essas regras é o que faz a skill decidir como você decidiria." },
    { id: "a5-c15", pergunta: "Qual era a saída final do exercício de otimização de termos de pesquisa?", resposta: "A lista de termos que você negativaria naquela campanha ou grupo. O processo precisa terminar nisso." },
    { id: "a5-c16", pergunta: "Por que dar a opção de dizer o porquê de uma recusa (como na capa do Jarvis)?", resposta: "Para o agente aprender os padrões que você não aprova. “Não gosto desta cor” ensina; “nunca sugira isso” vira uma trava. Se você aceita sempre só 1 boa entre 3, ele entende que as 3 estão boas." },
    { id: "a5-c17", pergunta: "O Breno sentia que extraía pouco do segundo cérebro. Qual foi o diagnóstico?", resposta: "Faltava um problema real para resolver. Com um problema real, você descreve o problema e pede a solução. O mesmo cérebro de SEO para YouTube virou 3 usos: sugerir títulos, revisar títulos antigos e escrever descrições." },
    { id: "a5-c18", pergunta: "O que acontece com tudo que você não deixa declarado na skill?", resposta: "Ela toma a decisão por você. No caso do Paulo (campanha só com o nome do médico), uma variação como “Jefferson” com um F só seria tratada como concorrente se a regra não dissesse o contrário." },
    { id: "a5-c19", pergunta: "O que é um termo “sem relação direta” no exemplo da limpeza de sofá?", resposta: "“Produto para limpar sofá” tem relação com o problema do cliente, mas não com o que ele vende (o serviço). Esse contexto você sabe e precisa ensinar." },
    { id: "a5-c20", pergunta: "Mandar o Claude varrer a conta e achar o seu padrão de negativação funciona?", resposta: "Ajuda e ganha tempo, mas ele acha o resultado das decisões, não o porquê. Peça para ele explicar o padrão encontrado e confira se bate com o seu raciocínio." },
    { id: "a5-c21", pergunta: "O que fazer em vez de pedir “possíveis causas” na análise de termos?", resposta: "Dizer o que você quer e o que não quer (região, raio, produto, público) e dar exemplos de termos bons e ruins com o porquê. Exemplos resolvem mais do que uma explicação longa." },
    { id: "a5-c22", pergunta: "Qual é a diferença entre análise profissional e análise amadora de campanha?", resposta: "A profissional é orientada à performance (vendas, CPA). A amadora é orientada a cliques, para quando o cliente não informa o que virou venda. Na falta de dados, é o que dá." },
    { id: "a5-c23", pergunta: "Como proteger uma decisão séria, como negativar termos?", resposta: "A skill traz a proposta e você aprova. Quando ela passa um tempo (ex.: 30 dias) sem errar, você decide se dá carta branca." },
    { id: "a5-c24", pergunta: "Que interface o Adriano sugeriu para a Natália aprovar as negativas?", resposta: "Um relatório com o que negativar e o porquê, e três botões: aceitar tudo, recusar tudo e aceitar parcialmente (escolhendo termo a termo ou por grupo)." },
    { id: "a5-c25", pergunta: "Qual é a regra sobre tempo de construção e tempo de uso?", resposta: "Pode demorar mais para construir, nunca para operar. Se fazer pelo Claude toma o mesmo tempo ou mais do que fazer direto no Google, você não fez nada." },
    { id: "a5-c26", pergunta: "Como o Adriano separa a cadeira de otimizador de campanhas?", resposta: "Em dois grandes grupos: um analisa e propõe melhorias (termos, palavras-chave, anúncios, locais); o outro só executa o que foi aprovado." },
    { id: "a5-c27", pergunta: "“Não trate a IA como ferramenta de automação.” O que isso significa?", resposta: "Automação é chatbot: só funciona com regras preto no branco. Com IA, ensine o seu raciocínio e o contexto de decisão (ensine a pescar, não dê o peixe). Ela só fica mais inteligente com o treino." },
    { id: "a5-c28", pergunta: "Quais são as etapas do planejador de campanha mostradas na aula?", resposta: "Analisar a persona; entender a estratégia e o limite de verba; planejar (pesquisa e agrupamento de palavras); definir campanhas, grupos, palavras e anúncios; criar anúncios; analisar a página; trazer a proposta para aprovação; subir direto ou baixar o arquivo." },
    { id: "a5-c29", pergunta: "Por que o Adriano não deixa a verba limitar o planejamento logo de cara?", resposta: "Porque o planejador mataria sozinho três de quatro campanhas boas. Ele prefere ver as quatro, escolher as melhores e decidir a verba depois." },
    { id: "a5-c30", pergunta: "Qual era a tarefa para a aula seguinte?", resposta: "Ler linha por linha as 3 skills do plugin (persona, planejador e anúncios), sem instalar, e trazer 5 problemas ordenados pelo tempo que tomam, do que mais toma para o que menos toma." }
  ],

  // Prova teórica (nível difícil, situações práticas). "correta" é o índice da opção certa;
  // a ordem das opções é embaralhada a cada tentativa.
  prova_teorica: [
    { id: "a5-t01", pergunta: "Você escreveu: 1) acessar o Google Ads; 2) clicar em criar conta; 3) preencher os dados; 4) configurar pagamento; 5) finalizar. O que isso é, segundo a aula?",
      opcoes: ["Um procedimento completo, pronto para virar skill", "Um processo (as etapas); o como fazer cada etapa, com o que se assume que a pessoa sabe, são os procedimentos", "Uma skill, porque já tem etapas numeradas", "Um resumo do que você faz"],
      correta: 1, explicacao: "Ex.: “preencher os dados” assume que a pessoa sabe quais dados, de onde tirar e se é PF ou PJ." },
    { id: "a5-t02", pergunta: "Um processo de otimização de termos foi seguido à risca e a campanha não melhorou. Pelo critério da aula:",
      opcoes: ["O processo está errado e deve ser descartado", "O processo foi bem executado: o critério de sucesso do processo é a execução verificável, não a melhora da campanha", "A IA errou na execução", "O processo só vale se a campanha melhorar 10%"],
      correta: 1, explicacao: "Você pode otimizar uma campanha e não torná-la melhor." },
    { id: "a5-t03", pergunta: "Um colega disse que o processo de otimização dele é: “olho as métricas, vejo o que não está bom e ajusto”. O que falta?",
      opcoes: ["Nada, é um processo enxuto", "Isso é um resumo: faltam as etapas reais, as réguas de bom e ruim, as regras e as exceções", "Faltam só os nomes das métricas", "Falta colocar em ordem alfabética"],
      correta: 1, explicacao: "Com o resumo, o Claude entrega a otimização média da internet." },
    { id: "a5-t04", pergunta: "Qual é a ordem correta do método para transformar o que você faz em skill?",
      opcoes: ["Escrever, gravar, testar, quebrar, raio-X, caçar o depende", "Gravar fazendo e falando, quebrar em etapas, raio-X de cada etapa, caçar o “depende”, escrever o processo, testar a skill", "Testar, escrever, gravar, quebrar, raio-X, caçar o depende", "Pedir ao Claude para inventar o processo e depois testar"],
      correta: 1, explicacao: "Primeiro você grava fazendo de verdade, depois transforma em etapas e regras." },
    { id: "a5-t05", pergunta: "Na gravação, você pensou “palavra de marca com CTR de 2%, horrível” e não falou porque era óbvio. Qual o problema?",
      opcoes: ["Nenhum, o Claude sabe o que é óbvio", "O óbvio é exatamente o que você esqueceria de escrever, e sem ele o Claude não tem a sua régua", "O Claude não lê CTR", "Palavras de marca não importam"],
      correta: 1, explicacao: "Narre tudo, inclusive o que parece óbvio." },
    { id: "a5-t06", pergunta: "Você diz que um CTR de 10% “depende”. O que o método pede para fazer com isso?",
      opcoes: ["Ignorar, porque “depende” não cabe em skill", "Caçar a regra escondida: ex., é bom, mas se o CPA estourou, é ruim. E escrever a regra", "Deixar o Claude decidir", "Usar sempre a média do mercado"],
      correta: 1, explicacao: "Todo “depende” é uma regra escondida." },
    { id: "a5-t07", pergunta: "No processo do Paulo (campanha só com o nome do médico), a regra era “negativar profissionais diferentes”. Qual risco o Adriano apontou?",
      opcoes: ["Gastar muito com negativação", "O que não estiver declarado ele decide sozinho: uma grafia diferente do mesmo nome pode ser negativada como concorrente", "O Google não aceita negativar nomes", "A campanha ficaria sem termos"],
      correta: 1, explicacao: "Tudo o que você não deixa declarado, ele decide por você." },
    { id: "a5-t08", pergunta: "O Valdimir pediu para a skill “identificar possíveis causas” nos termos de pesquisa, sem dados de venda. O que o Adriano disse?",
      opcoes: ["Perfeito, é exatamente isso", "Sem rastreamento, qualquer termo vira “possível causa”; é melhor dizer o que quer e o que não quer e dar exemplos de termos bons e ruins", "Que é preciso usar o Opus", "Que análise de termos não pode ser automatizada"],
      correta: 1, explicacao: "Se você não consegue otimizar profissionalmente por falta de dados, a skill também não consegue." },
    { id: "a5-t09", pergunta: "Um cliente nunca informa as vendas. Como fica o processo de otimização?",
      opcoes: ["Não dá para otimizar", "Vira uma otimização orientada a cliques, a forma mais amadora, mas a possível; uma skill pode detectar se há dados de performance e escolher o padrão", "Inventar uma taxa de conversão média", "Pausar a campanha até o cliente informar"],
      correta: 1, explicacao: "Análise profissional é orientada à performance; a amadora, a cliques." },
    { id: "a5-t10", pergunta: "Você pediu para o Claude varrer suas negativas antigas e achar o seu padrão. Qual é a limitação?",
      opcoes: ["Ele não consegue ler negativas antigas", "Ele acha o resultado das suas decisões, não o porquê; vale pedir que explique o padrão e conferir com o seu raciocínio", "Ele apaga as negativas antigas", "Nenhuma, é sempre melhor que escrever o processo"],
      correta: 1, explicacao: "Mesmo assim, ganha muito tempo: a Natália tinha 1.577 negativas para ele aprender." },
    { id: "a5-t11", pergunta: "Antes de dar autonomia para a skill negativar termos, qual é a proteção recomendada?",
      opcoes: ["Nenhuma: se a skill foi bem escrita, pode executar", "Trazer a proposta para você aprovar (tudo, nada ou parcial) e só dar carta branca depois de um período sem erros", "Rodar só uma vez por mês", "Negativar só termos com mais de 100 cliques"],
      correta: 1, explicacao: "Enquanto não validar algo sério, não deixe automatizado." },
    { id: "a5-t12", pergunta: "Você montou uma skill, mas usá-la pelo Claude toma o mesmo tempo que fazer direto no Google Ads. Segundo a aula:",
      opcoes: ["Está ótimo, pelo menos ficou documentado", "Você não fez nada: pode demorar para construir, mas não para operar", "É normal nas primeiras semanas", "É preciso mudar de plano do Claude"],
      correta: 1, explicacao: "Por isso a sugestão da interface com botões de aprovar." },
    { id: "a5-t13", pergunta: "O Renato perguntou se precisa de uma skill de negativação por nicho (ortopedista, cardiologista). Qual foi o princípio da resposta?",
      opcoes: ["Sim, uma skill por cliente", "Não trate IA como ferramenta de automação: ensine o seu raciocínio e o contexto de decisão, e ela adapta ao cliente", "Uma lista fixa de negativas para todos", "Só usar correspondência exata"],
      correta: 1, explicacao: "Ensine a pescar: o contexto muda o resultado, não o raciocínio." },
    { id: "a5-t14", pergunta: "O Leandro queria avisar cada cliente no WhatsApp depois da auditoria da planilha. Qual solução simples o Adriano deu?",
      opcoes: ["Contratar a API oficial do WhatsApp", "Pôr na planilha uma coluna com o link wa.me de cada cliente e pedir ao Claude para abrir o WhatsApp Web logado e mandar a mensagem padrão", "Mandar por e-mail", "Esperar a Freedom ficar pronta"],
      correta: 1, explicacao: "A solução profissional é a que resolve o problema e faz ganhar tempo. O limite: o computador precisa estar ligado." },
    { id: "a5-t15", pergunta: "No planejador de campanha, por que não limitar pela verba antes de planejar?",
      opcoes: ["Porque a verba não importa no Google Ads", "Porque o planejador mataria sozinho campanhas boas; é melhor planejar tudo e decidir a verba depois, escolhendo as melhores", "Porque o cliente sempre aumenta a verba", "Porque a verba é calculada pelo Google"],
      correta: 1, explicacao: "A verba é um limitador, mas a decisão de cortar é sua, pós-planejamento." },
    { id: "a5-t16", pergunta: "Uma etapa do seu processo é um “monstro” (ex.: decidir a estratégia de conteúdo de cada cliente). O que fazer?",
      opcoes: ["Construí-la primeiro, porque é a mais importante", "Deixá-la manual, automatizar as outras e gravar cada decisão dela; depois de umas 30 gravações, o Claude aprende o padrão", "Pular essa etapa para sempre", "Pedir ao Claude para inventar a estratégia"],
      correta: 1, explicacao: "Se das 12 etapas você automatiza 11, já ganhou um tempo enorme." }
  ],

  pratica: [
    {
      id: "a5-p1",
      titulo: "Separar processo e procedimentos de uma tarefa",
      descricao: "Escolher uma tarefa sua e escrever as etapas (processo). Depois, para cada etapa, escrever o como (procedimento) e o que você está assumindo que a pessoa já sabe. Definir o critério de sucesso sim ou não.",
      perguntas: [
        { id: "a5-pq01", pergunta: "Qual é um bom critério de sucesso para o processo “criar uma conta no Google Ads”?",
          opcoes: ["A conta ficar bonita", "Uma conta nova criada (verificável: sim ou não)", "O cliente gostar", "Gastar menos de uma hora"],
          correta: 1, explicacao: "O sucesso precisa ser mensurável ou analisável, tipo sim ou não." }
      ]
    },
    {
      id: "a5-p2",
      titulo: "Gravar uma otimização real falando em voz alta",
      descricao: "Pegar uma conta real que você otimizaria nesta semana e gravar a tela e a voz, narrando tudo o que olha e por quê, inclusive o óbvio. Pedir ao Claude para transcrever e quebrar a fala em etapas.",
      perguntas: [
        { id: "a5-pq02", pergunta: "Na gravação, o que fazer com o que parece óbvio?",
          opcoes: ["Pular para economizar tempo", "Falar também: o óbvio é o que você esqueceria de escrever", "Escrever depois de memória", "Deixar o Claude deduzir"],
          correta: 1, explicacao: "Ex.: CTR baixo em palavra de marca." },
        { id: "a5-pq03", pergunta: "Precisa transcrever a gravação antes de mandar ao Claude?",
          opcoes: ["Sim, sempre à mão", "Não: o próprio Claude transcreve", "Só se tiver mais de uma hora", "Só com ferramenta paga"],
          correta: 1, explicacao: "“Irmão, transcreve aí.”" }
      ]
    },
    {
      id: "a5-p3",
      titulo: "Escrever o processo de otimização de termos de pesquisa",
      descricao: "Descrever passo a passo como você otimiza os termos de pesquisa de uma campanha de rede de pesquisa, terminando na lista de termos que negativaria. Para cada etapa: o que olha, como sabe se está bom ou ruim, e cada “depende”.",
      perguntas: [
        { id: "a5-pq04", pergunta: "Qual deve ser a saída final desse processo?",
          opcoes: ["Um relatório de métricas", "A lista de termos que você negativaria na campanha ou grupo", "Novas palavras-chave", "Um novo anúncio"],
          correta: 1, explicacao: "O processo precisa terminar nessa decisão." },
        { id: "a5-pq05", pergunta: "Você escreveu “negativar termos com incompatibilidade clara”. Como deixar isso à prova de chute?",
          opcoes: ["Repetir a frase em letras maiúsculas", "Dar exemplos de termos bons e ruins e o porquê de cada um", "Usar só correspondência exata", "Confiar no bom senso da IA"],
          correta: 1, explicacao: "Exemplos resolvem mais do que uma explicação longa." }
      ]
    },
    {
      id: "a5-p4",
      titulo: "Ensinar o padrão a partir do seu histórico",
      descricao: "Com a API do Google Ads conectada, pedir ao Claude para ler as negativas que você já fez, explicar o padrão encontrado e comparar com o processo que você escreveu.",
      perguntas: [
        { id: "a5-pq06", pergunta: "Depois que o Claude mostra o padrão das suas negativas antigas, o que ainda falta?",
          opcoes: ["Nada", "Conferir se o porquê bate com o seu raciocínio, porque ele só vê o resultado das decisões", "Apagar as negativas antigas", "Pedir para ele negativar tudo sozinho"],
          correta: 1, explicacao: "Ele acha o resultado, não o porquê." }
      ]
    },
    {
      id: "a5-p5",
      titulo: "Criar a tela de aprovação das negativas",
      descricao: "Pedir ao Claude uma interface web com o relatório do que ele negativaria e o porquê, e três botões: aceitar tudo, recusar tudo e aceitar parcialmente. Só executar no Google Ads o que você aprovar.",
      perguntas: [
        { id: "a5-pq07", pergunta: "Quando faz sentido dar carta branca para a skill negativar sozinha?",
          opcoes: ["Logo na primeira semana", "Depois de um bom tempo (ex.: 30 dias) aprovando tudo sem precisar corrigir", "Nunca", "Quando o cliente pedir"],
          correta: 1, explicacao: "Como no Jarvis: as travas saem conforme ele acerta." },
        { id: "a5-pq08", pergunta: "A API do Google Ads já conectada precisa de outra configuração para executar as negativas aprovadas?",
          opcoes: ["Sim, uma nova conta de desenvolvedor", "Não: a API já tem a permissão; ele só não executa porque você não autorizou", "Sim, um plano pago do Google", "Sim, o Google Ads Editor"],
          correta: 1, explicacao: "Por isso a proposta de interface com aprovação." }
      ]
    },
    {
      id: "a5-p6",
      titulo: "Desenhar a cadeira de otimizador em dois grupos",
      descricao: "Listar os processinhos da sua otimização (termos, palavras-chave, anúncios, locais, página...) e separar em dois grupos: o que analisa e propõe, e o que executa depois da aprovação.",
      perguntas: [
        { id: "a5-pq09", pergunta: "Qual separação o Adriano sugere para aprender a construir o otimizador?",
          opcoes: ["Por plataforma: Google e Meta", "Um grupo que analisa e propõe melhorias, e outro que só executa o que foi aprovado", "Por cliente", "Por dia da semana"],
          correta: 1, explicacao: "Depois do termo de pesquisa, os outros processinhos ficam fáceis." }
      ]
    },
    {
      id: "a5-p7",
      titulo: "Ler as 3 skills do plugin linha por linha",
      descricao: "Abrir os arquivos .md das skills de persona, planejador de campanha e criador de anúncios (na área de downloads da mentoria) e ler linha por linha. Não é para instalar: é para entender como o Adriano escreveu o processo dele.",
      perguntas: [
        { id: "a5-pq10", pergunta: "Por que a tarefa é ler as skills, e não só instalar?",
          opcoes: ["Porque instalar é pago", "Porque cada um chega ao mesmo resultado por um processo próprio; ler mostra como ele escreveu o dele para você escrever o seu", "Porque as skills estão com erro", "Porque o Claude não instala plugins"],
          correta: 1, explicacao: "A Natália chega no mesmo resultado que ele, mas pelo processo dela." }
      ]
    },
    {
      id: "a5-p8",
      titulo: "Listar 5 problemas ordenados por tempo",
      descricao: "Trazer 5 problemas do seu dia a dia, do que mais toma tempo para o que menos toma, com quantas horas cada um consome. Calcular quantas horas por ano você ganharia resolvendo os dois primeiros e quanto vale a sua hora.",
      perguntas: [
        { id: "a5-pq11", pergunta: "Como calcular o valor da sua hora, segundo a aula?",
          opcoes: ["Pelo preço que o mercado paga", "Faturamento mensal dividido pelas horas que você trabalha no mês", "Pelo salário mínimo", "Pelo preço do plano do Claude"],
          correta: 1, explicacao: "Se você gasta 5 horas numa tarefa que custaria R$ 100 para terceirizar, com hora a R$ 100, perdeu R$ 400." },
        { id: "a5-pq12", pergunta: "Um problema que toma 2 horas por dia, resolvido, devolve quanto tempo por ano (5 dias por semana)?",
          opcoes: ["Umas 48 horas", "Umas 480 horas", "Umas 4.800 horas", "Umas 12 horas"],
          correta: 1, explicacao: "10 horas por semana, 40 por mês, 480 por ano." },
        { id: "a5-pq13", pergunta: "Qual é o critério para ordenar os 5 problemas?",
          opcoes: ["Quanto mais faturamento trazem", "O tempo que cada um toma, do maior para o menor", "Os mais fáceis primeiro", "Os que o cliente mais reclama"],
          correta: 1, explicacao: "O KPI de escolha desta tarefa é tempo." }
      ]
    }
  ]
};
