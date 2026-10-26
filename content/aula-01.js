// Conteúdo da Aula 01, extraído da transcrição completa da aula.
// Os ids (a1-...) não podem mudar depois que a equipe começar a estudar,
// porque o progresso de cada card fica salvo pelo id.
window.AULAS = window.AULAS || {};
window.AULAS[1] = {
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

  // Prova teórica (múltipla escolha). "correta" é o índice da opção certa.
  prova_teorica: [
    { id: "a1-t01", pergunta: "Segundo a aula, quando você realmente testou se a IA consegue fazer algo?", opcoes: ["Quando o primeiro resultado sai bom", "Quando você tenta provar que ela NÃO consegue e vai a fundo, sem parar no primeiro resultado ruim", "Quando um concorrente já fez", "Quando a ferramenta tem um plano pago"], correta: 1, explicacao: "O espírito da mentoria é se colocar à prova: só depois de tentar provar que a IA não consegue é que você testou de verdade." },
    { id: "a1-t02", pergunta: "O que as letras do CTR significam?", opcoes: ["Custo, Taxa e Retorno", "Contexto, Tarefa e Resultado", "Clique, Tráfego e Receita", "Criativo, Teste e Resultado"], correta: 1, explicacao: "CTR aqui é a estrutura de prompt: Contexto, Tarefa e Resultado, somada às Referências." },
    { id: "a1-t03", pergunta: "Qual é a relação entre o contexto que você dá e as perguntas que o Claude faz?", opcoes: ["Quanto mais contexto, mais ele pergunta", "Não existe relação", "Quanto mais contexto, menos ele pergunta", "Ele sempre faz as mesmas perguntas"], correta: 2, explicacao: "É inversamente proporcional: mais contexto, menos perguntas e menos decisões tomadas por ele." },
    { id: "a1-t04", pergunta: "Por que a aula “proíbe” digitar para o Claude?", opcoes: ["Porque digitar gasta mais tokens", "Porque ninguém digita com o mesmo nível de detalhe com que fala, e a mágica está no contexto", "Porque o Claude não entende texto digitado", "Porque o Wispr Flow é obrigatório no plano pago"], correta: 1, explicacao: "Falar entrega muito mais contexto do que digitar." },
    { id: "a1-t05", pergunta: "Você quer descobrir o perfil de cliente que mais fecha com a agência. Qual caminho a aula ensina?", opcoes: ["Perguntar ao comercial", "Transcrever as reuniões de venda gravadas e cruzar com formulários e vendas para achar o padrão", "Comprar uma pesquisa de mercado", "Pedir ao Claude para inventar uma persona"], correta: 1, explicacao: "Foi o caso do Máquina Black: reuniões transcritas + formulários + dados de compra revelaram o ICP e as perguntas do formulário." },
    { id: "a1-t06", pergunta: "Você mandou: “baixe todas as aulas de otimização e crie uma skill”. Qual é o risco?", opcoes: ["O Claude se recusar", "Ele criar só a skill e não guardar as transcrições brutas (o cérebro)", "A skill ficar grande demais", "Nenhum"], correta: 1, explicacao: "A tarefa define o que ele entrega. Peça sempre para guardar os originais: o material bruto é o cérebro." },
    { id: "a1-t07", pergunta: "Qual é o formato recomendado para guardar transcrições?", opcoes: [".docx", ".pdf", ".md", ".txt sem estrutura"], correta: 2, explicacao: "Markdown (.md) é lido facilmente por qualquer IA e permite linkar arquivos, no estilo Obsidian." },
    { id: "a1-t08", pergunta: "O que é uma API?", opcoes: ["Um tipo de inteligência artificial", "Uma porta controlada que uma ferramenta abre para outras se conectarem e puxarem dados, nas regras dela", "Um plano pago do Claude", "Um painel de relatórios"], correta: 1, explicacao: "Se a ferramenta tem API, dá para conectar e puxar dados; se não tem, não dá." },
    { id: "a1-t09", pergunta: "Quem determina se você pode ler e escrever dados por uma API?", opcoes: ["Você", "O Claude", "O criador da API", "O Google"], correta: 2, explicacao: "As regras são de quem criou a API. Por isso o primeiro passo é ler a documentação." },
    { id: "a1-t10", pergunta: "Qual é a diferença prática entre MCP e API citada na aula?", opcoes: ["MCP é sempre pago", "MCP é uma espécie de API simplificada; a Meta tem MCP e conectar é rápido, o Google ainda é API e é mais chato", "API é só para Google", "Não há diferença"], correta: 1, explicacao: "Na maioria dos casos, MCP é mais simples de conectar no Claude." },
    { id: "a1-t11", pergunta: "Você quer que um agente acompanhe comissões em tempo real, 24 horas por dia. Onde ele deve rodar?", opcoes: ["No seu computador pessoal", "Hospedado num servidor (web/VPS)", "No celular", "No Claude Chat"], correta: 1, explicacao: "Local depende do computador ligado e do Claude não travar. Operação 24/7 precisa ser hospedada." },
    { id: "a1-t12", pergunta: "Por que a mentoria vai criar um “conselho” de agentes para decisões estratégicas?", opcoes: ["Para gastar menos tokens", "Porque o Claude tende a bajular e raramente discorda de você", "Porque um agente só não sabe tráfego", "Por exigência da Anthropic"], correta: 1, explicacao: "O conselho tem agentes com o papel deliberado de discordar, achar falhas e trazer pontos cegos." },
    { id: "a1-t13", pergunta: "Na otimização de campanhas, qual é o modelo de autonomia que a aula considera mais provável para a maioria?", opcoes: ["A IA otimiza tudo sozinha", "A IA faz a auditoria, propõe otimizações e você aprova antes de executar", "A IA só lê relatórios", "Nenhuma automação"], correta: 1, explicacao: "Quem perde o contrato é você. A IA propõe; você dá o check." },
    { id: "a1-t14", pergunta: "Qual é a melhor definição de “cérebro” na aula?", opcoes: ["O modelo Opus", "O conjunto de transcrições e informações brutas guardadas intactas, que servem de base para construir várias coisas", "Um resumo feito pela IA", "O histórico do chat"], correta: 1, explicacao: "Do mesmo cérebro saem um escritor de livros, um redator de blog, skills etc." }
  ],

  // Partes práticas citadas na aula. Cada uma tem perguntas sobre a execução.
  pratica: [
    {
      id: "a1-p1",
      titulo: "Usar o Claude Code (e não o Chat)",
      descricao: "Ter o plano pago do Claude e fazer todas as tarefas da mentoria no Claude Code. Iniciantes: assistir ao curso de Claude da área de membros.",
      perguntas: [
        { id: "a1-pq01", pergunta: "Você pediu para instalar uma ferramenta e o Claude disse que não tem acesso. Você percebe que estava no Chat. O que faz?", opcoes: ["Insiste no Chat até funcionar", "Muda para a aba do Claude Code e repete o pedido, porque instalar e programar é coisa do Code", "Desiste da tarefa", "Usa o Gemini"], correta: 1, explicacao: "Foi o caso do Vinícius na aula: instalar, programar e mexer no computador é coisa do Claude Code." },
        { id: "a1-pq02", pergunta: "Uma tarefa travou e o Claude insiste que não dá. Qual a primeira atitude recomendada?", opcoes: ["Subir para o Opus e pedir outra solução, dizendo que outras pessoas conseguiram", "Trocar de computador", "Abrir um ticket no suporte da Anthropic", "Esperar um modelo novo"], correta: 0, explicacao: "O Sonnet é “preguiçoso” em problemas difíceis; o Opus resolve e você pode devolver a pressão (“se vira, outros conseguiram”)." }
      ]
    },
    {
      id: "a1-p2",
      titulo: "Instalar o Wispr Flow e parar de digitar",
      descricao: "Instalar o Wispr Flow (tem versão para Windows), configurar o atalho e usar um microfone decente.",
      perguntas: [
        { id: "a1-pq03", pergunta: "Qual o objetivo principal de usar o Wispr Flow com o Claude?", opcoes: ["Economizar dinheiro", "Dar muito mais contexto, falando em vez de digitar", "Traduzir o Claude para português", "Gravar reuniões"], correta: 1, explicacao: "Contexto é a mágica; falando você entrega muito mais detalhe." },
        { id: "a1-pq04", pergunta: "Qual tipo de microfone a aula diz que transcreve mal?", opcoes: ["Microfone de mesa", "Os microfones pequenos de fone de ouvido", "Microfone de lapela", "Nenhum"], correta: 1, explicacao: "Ele usa o fone só para ouvir e fala sempre num microfone melhor." }
      ]
    },
    {
      id: "a1-p3",
      titulo: "Criar a pasta Freedom",
      descricao: "Criar uma pasta com o nome da sua IA (Freedom ou o nome que você quiser) e abrir todas as sessões da mentoria dentro dela.",
      perguntas: [
        { id: "a1-pq05", pergunta: "Por que criar uma pasta para a IA no Claude Code?", opcoes: ["Porque o Claude Code não tem “projetos”; a pasta organiza todas as sessões e arquivos daquele sistema", "Porque é obrigatório para instalar o Claude", "Para economizar tokens", "Para o Claude não ler outros arquivos"], correta: 0, explicacao: "Diferente das outras versões, o Claude Code não tem projetos. A pasta faz esse papel." }
      ]
    },
    {
      id: "a1-p4",
      titulo: "Começar o caderno de desabafos",
      descricao: "Abrir uma sessão na pasta Freedom e, por voz, explicar que é um caderno de desabafos: você vai despejar recursos por 1 a 2 semanas e ele anota, entende o recurso, pensa em integrações, cruzamentos e alertas de segurança.",
      perguntas: [
        { id: "a1-pq06", pergunta: "Qual modelo a aula diz que basta para o caderno de desabafos?", opcoes: ["Opus no esforço máximo", "Sonnet, porque é só anotação", "Haiku", "Precisa ser o Codex"], correta: 1, explicacao: "Para desabafo não precisa do modelo mais forte." },
        { id: "a1-pq07", pergunta: "Além de anotar, o que você pede para o Claude fazer a cada desabafo?", opcoes: ["Construir o recurso na hora", "Entender o recurso e pensar em integrações, cruzamentos de dados e alertas de segurança", "Corrigir a gramática", "Gerar um orçamento"], correta: 1, explicacao: "O valor do caderno é ele ir enxergando o todo e os cruzamentos enquanto você ainda não tem a visão completa." }
      ]
    },
    {
      id: "a1-p5",
      titulo: "Exercício de CTR: vídeo do YouTube vira método",
      descricao: "Pedir ao Claude a transcrição da aula gratuita do Adriano sobre “o que fazer quando uma campanha do Google Ads para de vender” e, com contexto, pedir para transformar em passo a passo que possa virar agente ou skill.",
      perguntas: [
        { id: "a1-pq08", pergunta: "Para só transcrever o vídeo, quanto contexto é necessário?", opcoes: ["Muito: explicar todo o objetivo do agente", "Pouco: “quero a transcrição literal desse vídeo” resolve", "Nenhum, basta colar o link sem texto", "É preciso enviar o áudio"], correta: 1, explicacao: "Tarefa simples, instrução simples. O contexto entra quando você diz o que fazer com a transcrição." },
        { id: "a1-pq09", pergunta: "Qual pedido aplica o CTR corretamente no segundo passo?", opcoes: ["“Resuma isso”", "“Essa transcrição é um método do que fazer quando uma campanha para de vender. Seu papel é entender o método e colocar em passo a passo para eu transformar em um agente ou skill.”", "“Crie um agente”", "“Faça o melhor que puder”"], correta: 1, explicacao: "Tem contexto (o que é o material), tarefa (passo a passo) e resultado esperado (base para agente/skill)." }
      ]
    },
    {
      id: "a1-p6",
      titulo: "Transcrever um arquivo de vídeo local",
      descricao: "Pegar um vídeo do computador (de preferência uma reunião de vendas ou de onboarding), pedir para transcrever em .md guardando o original e instalar o que o Claude pedir (normalmente o Whisper local).",
      perguntas: [
        { id: "a1-pq10", pergunta: "No Windows, o Claude diz que não consegue transcrever um vídeo local. Qual é a orientação?", opcoes: ["Desistir e usar um site online", "Avisar que está no app desktop no Windows e pedir para instalar o Whisper local", "Converter o vídeo para PDF", "Enviar o vídeo para o YouTube"], correta: 1, explicacao: "Às vezes ele não percebe o ambiente. Dizer onde você está e pedir o Whisper resolve." },
        { id: "a1-pq11", pergunta: "Como o Adriano melhorou a precisão dos termos técnicos ao transcrever a palestra?", opcoes: ["Falando mais devagar", "Passando para o Whisper o vocabulário dos slides da palestra", "Usando o modelo menor do Whisper", "Editando a transcrição à mão"], correta: 1, explicacao: "O Claude passou o vocabulário dos slides para o Whisper não errar os termos técnicos." }
      ]
    },
    {
      id: "a1-p7",
      titulo: "Cérebro de YouTube: últimos 10 vídeos de um canal",
      descricao: "Usar o arquivo cerebro-youtube-instrucoes.md (do grupo) e pedir ao Claude Code para transcrever os 10 últimos vídeos de um canal (sugestão: um canal de Google Ads).",
      perguntas: [
        { id: "a1-pq12", pergunta: "O Claude começou a tocar o vídeo com áudio alto no fundo para transcrever. Qual era o caminho certo?", opcoes: ["Deixar tocar, é normal", "Pegar a legenda/transcrição que o YouTube já disponibiliza, sem ouvir o áudio", "Baixar o vídeo em MP4", "Gravar a tela"], correta: 1, explicacao: "O cérebro que funciona ataca a legenda pública; não ouve o áudio." },
        { id: "a1-pq13", pergunta: "Por que o cérebro de YouTube processa um vídeo por vez com pausas aleatórias?", opcoes: ["Para economizar tokens", "Para não parecer um robô e o YouTube não bloquear o IP", "Porque o Claude é lento", "Por exigência do Wispr Flow"], correta: 1, explicacao: "Ir rápido custa caro: um bloqueio pode durar dias. O sistema imita uma pessoa abrindo um vídeo de cada vez." },
        { id: "a1-pq14", pergunta: "O Claude recusou transcrever alegando direitos autorais. O que a aula orienta dizer?", opcoes: ["Que você é o dono do canal, mesmo não sendo", "Que o vídeo é público no YouTube e você só quer a transcrição/legenda que já está disponível", "Que é para uso comercial", "Nada, não há como resolver"], correta: 1, explicacao: "Vídeo público + legenda já disponível: você só quer pegar o que é público, para estudo." }
      ]
    },
    {
      id: "a1-p8",
      titulo: "Conectar a API de uma ferramenta de terceiro",
      descricao: "Escolher uma ferramenta da agência em que você é administrador (não pode ser Google nem Meta: ex. Asaas, Hotmart, CRM, ClickSign, Reportei, Hostinger) e pedir ao Claude para achar a documentação, explicar tudo o que dá para fazer e conectar.",
      perguntas: [
        { id: "a1-pq15", pergunta: "Qual é a primeira coisa a pedir antes de conectar uma ferramenta?", opcoes: ["Que ele crie o dashboard", "Que descubra se a ferramenta tem API e o que dá para ler e fazer por ela", "Que contrate o plano mais caro", "Que exporte uma planilha"], correta: 1, explicacao: "Saber se existe API e o que ela permite define se vale a pena conectar." },
        { id: "a1-pq16", pergunta: "No prompt da aula, por que dizer “sou totalmente leigo, faça todo o trabalho por mim”?", opcoes: ["Para ele responder mais rápido", "Para ele assumir a pesquisa da documentação e o passo a passo, sem pressupor que você sabe programar", "Para gastar menos tokens", "Não faz diferença"], correta: 1, explicacao: "É contexto: muda o nível de explicação e quem faz o trabalho pesado." },
        { id: "a1-pq17", pergunta: "Conectando o Asaas, o que a agência passa a conseguir ver dentro da Freedom?", opcoes: ["Apenas o logo da empresa", "Caixa, valores a receber, inadimplentes (e até pausar tráfego de quem não paga) e LTV", "As campanhas do Google Ads", "Os grupos de WhatsApp"], correta: 1, explicacao: "Foi o exemplo do fim da aula: dados financeiros cruzados com a operação." }
      ]
    },
    {
      id: "a1-p9",
      titulo: "Criar o hábito de gravar todas as reuniões",
      descricao: "A partir de agora, gravar tudo o que é trabalho (vendas, onboarding, alinhamentos), centralizado em uma ferramenta (Zoom ou Meet). Presencial: celular ou gravador tipo Plaud.",
      perguntas: [
        { id: "a1-pq18", pergunta: "Qual é a dica para organizar as gravações?", opcoes: ["Gravar em várias ferramentas diferentes", "Centralizar tudo em uma ferramenta só (Zoom ou Meet), desde que grave e transcreva", "Gravar só reuniões de vendas", "Não guardar as gravações antigas"], correta: 1, explicacao: "Centralizar facilita conectar a ferramenta ao Claude e montar o segundo cérebro." }
      ]
    }
  ]
};
