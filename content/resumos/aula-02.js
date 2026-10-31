// Resumo por hora e mapa mental da Aula 02 (Adriano Gianini), feitos a partir da transcrição completa.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[2];
  if (!aula) return;
  aula.fases = [
    {
      hora: 1,
      tempo: "0:00 a 1:00",
      titulo: "Vercel, Supabase e o primeiro sistema com login",
      ideia: "Depois de uma revisão rápida, o Adriano apresenta os três serviços da aula (Vercel, Supabase e Resend) e a turma começa a construir, ao vivo, um mini sistema com login e banco de dados.",
      aprender: [
        "A missão do dia: terminar com um sistema publicado na internet, conectado a um banco de dados e com login e senha. Daqui para a Freedom, a coisa fica mais fácil.",
        "Várias sessões do Claude no mesmo projeto podem estragar o trabalho uma da outra. Aconteceu com o Adriano e o backup salvou. A solução é pedir um processo de segurança entre as sessões e usar o Git o tempo todo.",
        "As conexões de API devem ficar numa aba de Integrações dentro do próprio sistema, com um card por ferramenta. Nada de passar chave pelo chat. E agente na nuvem dependendo de conexão no seu computador é “uma Ferrari com quatro pneus de Celta”.",
        "Os três serviços: Vercel é hospedagem de sites (roda a AWS por trás), Supabase é banco de dados “ridiculamente simples” e Resend é para enviar e-mails, como a secretária do Jarvis que avisa o financeiro e os vendedores.",
        "O mini sistema tem 4 regras: login com dois níveis (comum e administrador), cada um vê a sua tela, o admin cadastra, edita e exclui usuários, e o usuário loga e sai. O foco não é o sistema, é aprender a publicar algo com banco e login.",
        "Na era da IA você não precisa saber, precisa pedir. E nem precisa saber pedir direito: “me ajuda, não sei nem dar o primeiro passo” já funciona.",
        "Se uma chave do Supabase apareceu com a tela compartilhada, exclua e gere outra depois, porque com ela dá para conectar no seu banco."
      ],
      executar: [
        "Criar uma conta gratuita na Vercel e outra no Supabase, sem assinar plano até estourar o limite.",
        "Abrir um chat novo no Claude Code e pedir o mini sistema com login de dois níveis, dizendo que vai usar Vercel e Supabase e que as contas já existem.",
        "Simplificar ao máximo quando o Claude perguntar sobre extras, como “esqueci minha senha”: um problema de cada vez.",
        "Anotar no caderno de desabafos da Freedom que todas as integrações devem ficar numa aba de configurações, com um card por ferramenta.",
        "Pedir ao Claude, quando não souber achar algo: “sou muito leigo, já estou logado no Chrome, acesse e faça por mim”."
      ],
      frase: "Você não precisa saber, precisa pedir. E nem precisa saber pedir direito."
    },
    {
      hora: 2,
      tempo: "1:00 a 2:00",
      titulo: "Sistema publicado, integrações na prática e loops",
      ideia: "Com os sistemas no ar, o Adriano mostra como o Jarvis junta várias integrações em painéis e apresenta a estrutura de loop, com o exemplo do redator de blog que reescreve até ser aprovado.",
      aprender: [
        "Dizer ao Claude “sou leigo, preciso de tudo mastigado” muda completamente o jeito como ele se comunica com você, como fez a Tamires.",
        "É proibido usar o Claude pelo navegador: use sempre o app desktop. No navegador você fica preso ao limite de permissão do próprio navegador, como aconteceu com o Marlon.",
        "O painel do funil low ticket do Jarvis usa poucas integrações: Hotmart (faturamento, ticket médio, vendas, reembolso), Meta (verba investida) e um rastreamento próprio. Ele mostra a conversão por página, como a V2 com 8,57%.",
        "A parte mais difícil de um agente fica fora do Claude: definir as decisões. Ao negativar palavras no Google Ads, a regra tem exceções, e a quantidade depende do cliente. Você acha que tem um processo, mas tem dez.",
        "Loop é dar uma condição de saída: “faça isso até isso acontecer”. Ex.: simular o site em todos os iPhones do 12 ao 18 e não parar enquanto não estiver 100% adaptado.",
        "O redator de blog do Jarvis tem três voltas: escrever no manual de linguagem do Adriano, ajustar SEO a partir do cérebro do Ahrefs e passar pelo Gemini, que tenta bloquear texto com cara de IA. Reprovou, reescreve.",
        "O revisor não pode ser o mesmo agente que escreve, senão ele aprova fácil. Um redator de blog com SEO custaria uns 6 mil por mês, cerca de 78 mil por ano."
      ],
      executar: [
        "Instalar o app desktop do Claude e parar de usar o Claude pelo navegador.",
        "Pedir ao Claude para publicar o mini sistema, criar o seu login de administrador e testar cadastro, edição e exclusão de usuário.",
        "Pedir ao Claude: “quero aprender a usar a estrutura de loops aqui no Claude, me ensine e me traga três exemplos de aplicação real que eu não usei e poderia”.",
        "Fazer um uso “idiota” e produtivo do Claude no dia a dia e compartilhar no grupo da mentoria."
      ],
      frase: "O Claude é o anel do Lanterna Verde: o limite está na sua imaginação."
    },
    {
      hora: 3,
      tempo: "2:00 ao fim",
      titulo: "Loops na prática e a skill de persona",
      ideia: "O Adriano fecha o conceito de loop com exemplos reais e mostra como fragmentar um processo grande em skills: persona, planejamento de campanha e anúncios de Google Ads.",
      aprender: [
        "Um loop funciona com uma condição simples, clara e com referência. “Melhore a performance” acaba quando cai de 6 para 5 segundos. “Não saia do loop enquanto não carregar em 3 segundos ou menos” vai até o fim.",
        "Sem loop, o agente que checa o saldo de 10 contas na MCC lê 7 e dá a tarefa como feita. Com a regra “enquanto não tiver as 10, a tarefa não terminou”, ele insiste.",
        "O Jarvis local roda no Mac para o que só é usado com o computador ligado, como transcrever. O Jarvis web fica na nuvem para o que precisa rodar o tempo todo.",
        "Se o agente não traz o saldo das contas do Meta, pergunte tudo o que a API tem sobre saldo, separado por contas pré-pagas e pós-pagas, e o que o seu nível de acesso permite ver. Assim você acha a limitação.",
        "Para construir algo grande sem virar um Frankenstein, fragmente em etapas e masterize cada uma antes de ir para a próxima. Use a estrutura contexto, tarefa e resultado.",
        "A skill de persona tem dois gatilhos: a URL do site ou você explicar o que é e o que não é o negócio. Ela sempre faz uma varredura na internet e traz concorrência e risco de mercado. No exemplo da pousada, o risco era depender do calendário da Canção Nova.",
        "A skill de planejamento traz campanhas, grupos, palavras negativas, volume de busca e CPC pela API do Google Ads. A de anúncios valida as políticas do Google em loop e exporta para o Google Ads Editor."
      ],
      executar: [
        "Escrever loops com uma condição de saída objetiva, como um tempo de carregamento ou “todas as 10 contas lidas”.",
        "Perguntar ao Claude o que a API do Meta devolve sobre saldo, separado por contas pré-pagas e pós-pagas, e o que o seu acesso permite ver.",
        "Continuar o caderno de desabafos antes de juntar tudo num sistema só, pensando no que é seu e no que o time e os clientes vão acessar.",
        "Mapear um processo seu de ponta a ponta, com etapas, decisões e exceções, para construir o seu processo e não o do Adriano."
      ],
      frase: "Quão automático vai ser agora é decisão sua, não mais uma barreira tecnológica."
    }
  ];
  aula.mapa = {
    centro: "Sistema no ar, loops e skills",
    ramos: [
      { titulo: "Os três serviços", itens: ["Vercel: hospedagem de sites e sistemas", "Supabase: banco de dados simples", "Resend: envio de e-mails", "Contas gratuitas até estourar o limite"] },
      { titulo: "Primeiro sistema", itens: ["Login com dois níveis de usuário", "Admin cadastra, edita e exclui usuários", "Simplificar: um problema de cada vez", "Publicar e testar na nuvem"] },
      { titulo: "Como pedir ao Claude", itens: ["Não precisa saber, precisa pedir", "“Sou leigo, preciso de tudo mastigado”", "Sempre o app desktop, nunca o navegador", "Tab aceita a sugestão óbvia"] },
      { titulo: "Integrações e segurança", itens: ["Aba de Integrações com um card por ferramenta", "Nada de chave pelo chat", "Chave exposta: excluir e gerar outra", "Conexões sobem junto com o agente", "Google Ads pela MCC e API do Meta"] },
      { titulo: "Estrutura de loop", itens: ["Condição de saída clara e com referência", "Site responsivo do iPhone 12 ao 18", "Carregar em 3 segundos ou menos", "Saldo das 10 contas da MCC", "Redator de blog com revisor Gemini"] },
      { titulo: "Skills de Google Ads", itens: ["Fragmentar em etapas e masterizar cada uma", "Persona com concorrência e risco de mercado", "Planejamento com volume de busca e CPC", "Anúncios validados nas políticas do Google", "Exportar para o Google Ads Editor"] },
      { titulo: "Processo antes do agente", itens: ["Decisões e exceções ficam fora do Claude", "Você acha que tem um, mas tem dez", "Caderno de desabafos antes de juntar tudo", "Tarefa: mapear um processo seu"] }
    ]
  };
})();
