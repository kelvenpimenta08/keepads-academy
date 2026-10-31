// Resumo por hora e mapa mental da Aula 01 (Adriano Gianini), feitos a partir da transcrição completa.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[1];
  if (!aula) return;
  aula.fases = [
    {
      hora: 1,
      tempo: "0:00 a 1:00",
      titulo: "Mentalidade, Freedom, caderno de desabafos e CTR",
      ideia: "A pergunta não é mais se a IA consegue, e sim o que você quer automatizar. A hora apresenta a Freedom, o caderno de desabafos e a base de todo pedido: contexto, tarefa e resultado.",
      aprender: [
        "Espírito da mentoria: antes de contratar alguém ou desistir, tente provar que a IA não consegue. O Adriano testou edição de vídeo por três dias, com todas as ferramentas, até um modelo novo resolver.",
        "A Freedom é a IA que a turma vai construir: uma agência de marketing 100% automatizada, do onboarding do cliente ao planejamento, criação, análise e otimização de campanhas, saldos e financeiro.",
        "Automatizar tudo já é possível. A decisão é sua: por exemplo, automatizar 80% e manter na mão os 20% onde você ganha dos concorrentes. Se a IA errar, quem perde o contrato é você.",
        "Nem tudo precisa de agente: o Cowork pode olhar todas as contas do Google Ads, ver resultados e saldos e montar um relatório numa tarefa agendada.",
        "Caderno de desabafos: uma sessão no Claude Code, dentro da pasta Freedom, onde você despeja por voz, por 1 a 2 semanas, cada recurso que quer. O Claude anota, entende o recurso e pensa em integrações, cruzamentos e alertas de segurança.",
        "É “proibido” digitar: ninguém escreve com o mesmo detalhe com que fala, e a mágica está no contexto. A ferramenta indicada é o Wispr Flow, que o Adriano considera melhor que o ditado nativo do Claude.",
        "CTR é contexto, tarefa e resultado, mais referências. Pedir só “um dashboard de tráfego pago” é genérico: entre 66 alunos, nenhum dashboard sairia igual. Quanto mais contexto você dá, menos o Claude pergunta."
      ],
      executar: [
        "Assinar o plano pago do Claude e fazer tudo no Claude Code, não no Chat.",
        "Instalar o Wispr Flow e passar a falar com o Claude em vez de digitar.",
        "Criar uma pasta com o nome da sua IA (Freedom ou outro) e abrir as sessões da mentoria dentro dela.",
        "Começar o caderno de desabafos, explicando ao Claude que ele deve anotar cada recurso e pensar em integrações e alertas de segurança.",
        "Pedir ao Claude a transcrição da aula do Adriano sobre campanha do Google Ads que parou de vender e, com contexto, pedir para transformar em passo a passo."
      ],
      frase: "Tudo o que você já gravou na vida pode ser usado como contexto."
    },
    {
      hora: 2,
      tempo: "1:00 a 2:00",
      titulo: "Gravações viram contexto e nascem os cérebros",
      ideia: "Reuniões, treinamentos e aulas já gravados são um arsenal de inteligência. Sabendo transcrever vídeos do YouTube e arquivos do computador, você constrói cérebros com o conhecimento de qualquer especialista.",
      aprender: [
        "Caso do ICP: com cerca de 200 horas de reuniões de vendas transcritas, 2.880 aplicações e os dados da Hotmart, o Claude achou o perfil que compra, o que não compra e as perguntas do formulário de aplicação.",
        "Gravar tudo o que é trabalho passa a ser obrigatório. Dica: centralizar numa ferramenta só, Zoom ou Meet. Para reunião presencial, celular ou um gravador como o Plaud.",
        "Ao mandar transcrever, peça sempre para guardar o original. Assim você nunca precisa transcrever de novo. No Mac do Adriano, o Claude usou o Whisper local e o vocabulário dos slides para acertar os termos.",
        "Instalar e programar é coisa do Claude Code: no Chat ou no Cowork, ele diz que não consegue. Se ele não perceber que você está no app desktop, avise isso a ele.",
        "O contexto não precisa ser seu: o analista de SEO de YouTube do Adriano foi montado com três grandes canais transcritos, como o VidIQ. É a cena de Matrix em que a Trinity aprende a pilotar na hora.",
        "Dois caminhos para construir cérebros: vídeos do YouTube, que são públicos, e arquivos locais do computador.",
        "O arquivo de instruções do cérebro de YouTube (no grupo) evita bloqueios: acessos em tempos aleatórios, um vídeo por vez, simulando um humano. Pode pedir uma chave de API no console da Anthropic."
      ],
      executar: [
        "Transcrever um arquivo de vídeo do computador, instalando o que o Claude pedir, e guardar a transcrição original.",
        "Começar a gravar todas as reuniões de trabalho, centralizadas no Zoom ou no Meet.",
        "Usar o arquivo de instruções do cérebro de YouTube e pedir a transcrição dos 10 últimos vídeos de um canal.",
        "Se o Claude recusar, explicar que o vídeo é público e que você só quer a transcrição já disponível.",
        "Quando travar, subir para o Opus, dizer que outras pessoas conseguiram e pedir outra solução."
      ],
      frase: "Com o que já está gravado, você não precisa explicar: só aponta e manda aprender."
    },
    {
      hora: 3,
      tempo: "2:00 ao fim",
      titulo: "Organizar cérebros e conectar ferramentas por API",
      ideia: "O material bruto transcrito é o cérebro e deve ficar intacto para gerar livros, skills e agentes. Para trazer dados de outras ferramentas, primeiro descubra se existe API e o que ela permite.",
      aprender: [
        "Com API, a migração de vídeos da Panda Video, que o time estimava em 30 dias, foi feita numa tarde de quatro horas cruzando o que já tinha sido migrado.",
        "Transcreva sempre em arquivo .md e mantenha os originais. Se pedir só “crie um livro” ou “crie uma skill”, ele pode entregar só isso e não guardar o cérebro.",
        "Organização simples: um cérebro por coisa, cada um numa pasta (por exemplo, um por canal). Quem busca e cruza é o Claude. O cérebro do próprio canal, puxado via API, tem até CTR da capa e retenção.",
        "Segundo cérebro: o Adriano conectou o Claude ao Meet e ao Zoom, pediu tudo em .md com links no estilo do Obsidian e separou os conhecimentos por “cadeiras”, como aula, reunião de time e liderança.",
        "API é a porta que uma ferramenta abre para outras puxarem dados, com as regras do dono. MCP é uma API simplificada na maioria dos casos: a Meta conecta fácil, o Google ainda é API e é mais chato.",
        "Peça ao Claude para ler a documentação da API antes de pagar mais: no caso da Circle, o plano mais barato já fazia tudo, e o Adriano cancelou o plano de R$ 18 mil a mais por ano.",
        "O Claude bajula, então a parte estratégica terá um conselho de agentes que discorda de propósito. Agente local depende do computador; operação 24/7 precisa ser hospedada."
      ],
      executar: [
        "Escolher uma ferramenta em que você é administrador (não Google nem Meta) e pedir ao Claude para descobrir se ela tem API.",
        "Pedir ao Claude que explique tudo o que dá e o que não dá para fazer com essa API.",
        "Usar no pedido o contexto “sou leigo, faça todo o trabalho por mim” e fazer a conexão com a API.",
        "Pedir para transcrever sempre em .md e manter os originais intactos em uma pasta por cérebro."
      ],
      frase: "Até hoje você só fez o que sabia fazer. Isso acabou."
    }
  ];
  aula.mapa = {
    centro: "Contexto, cérebros e APIs",
    ramos: [
      { titulo: "Mentalidade", itens: ["Provar que a IA não consegue", "Decidir o que automatizar", "Manter o estratégico na mão", "Quem perde o cliente é você"] },
      { titulo: "Freedom e desabafos", itens: ["Agência de marketing automatizada", "Pasta Freedom no Claude Code", "Caderno de desabafos por 1 a 2 semanas", "Integrações e alertas de segurança"] },
      { titulo: "Falar e CTR", itens: ["Parar de digitar, usar Wispr Flow", "Contexto, tarefa e resultado", "Referências: print, link, acesso", "Mais contexto, menos perguntas"] },
      { titulo: "Gravações como contexto", itens: ["Gravar todas as reuniões de trabalho", "ICP a partir das reuniões de venda", "Padrão de clientes que cancelam", "Treinamento gravado vira processo"] },
      { titulo: "Construir cérebros", itens: ["YouTube: vídeos públicos, pela legenda", "Arquivos locais com Whisper", "Transcrever em .md e guardar original", "Um cérebro por pasta"] },
      { titulo: "APIs e MCP", itens: ["API: porta com regras do dono", "MCP: API simplificada", "Ler a documentação antes de pagar", "Conectar ferramenta de terceiro"] },
      { titulo: "Rumo à operação", itens: ["Conselho de agentes contra bajulação", "Local depende do computador", "Operação 24/7 precisa de hospedagem", "IA propõe, você aprova"] }
    ]
  };
})();
