// Simulado da Aula 02 (Adriano Gianini): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[2];
  if (!aula) return;
  aula.simulado = [
    { id: "a2-s01", pergunta: "Você precisa transcrever 40 reuniões gravadas e procurar nelas onde cada cliente falou de orçamento. Qual escolha de modelo a aula recomenda para esse tipo de tarefa?",
      opcoes: ["Um modelo simples e barato, como o Haiku, podendo rodar vários em paralelo", "O Opus no esforço máximo, para não perder nenhum detalhe das reuniões", "O Sonnet, porque o Haiku não consegue ler arquivos de transcrição", "Alternar Opus e Sonnet a cada reunião para comparar os resultados"],
      correta: 0, explicacao: "Tarefa básica, como transcrever ou procurar algo, não precisa do modelo mais forte: o Haiku resolve e pode rodar em paralelo." },
    { id: "a2-s02", pergunta: "Para conectar a Freedom ao Meta, um colega quer ficar no MCP porque “é mais rápido de configurar”. O que a experiência do Adriano indica?",
      opcoes: ["O MCP é o caminho oficial e completo, a API serve só para quem já programa", "O MCP e a API entregam exatamente os mesmos dados, então tanto faz", "O ideal é usar o MCP para leitura e o Cowork para fazer alterações nas campanhas", "O MCP do Meta é muito limitado; ele foi para a API oficial, mesmo sendo chata de criar o app e dar permissão a ele"],
      correta: 3, explicacao: "O Adriano ficou pouco tempo no MCP do Meta por ser limitado e partiu para a API oficial, apesar do trabalho de criar e autorizar o próprio app." },
    { id: "a2-s03", pergunta: "A skill de persona de um cliente de estética já está redonda. Pela ordem do processo mostrado na aula, qual é a próxima etapa?",
      opcoes: ["Escrever os anúncios de cada grupo para já ter algo para mostrar ao cliente", "O planejamento: produto ou serviço e a estrutura de campanhas e grupos", "A validação dos anúncios nas políticas do Google Ads", "A exportação da conta para o Google Ads Editor"],
      correta: 1, explicacao: "A ordem é persona → planejamento (estrutura de campanhas e grupos) → palavras-chave → anúncios por grupo → validação nas políticas." },
    { id: "a2-s04", pergunta: "Na skill de anúncios de Google Ads do Adriano, o que acontece depois que os anúncios de cada grupo são escritos?",
      opcoes: ["São enviados ao cliente por e-mail pelo Resend para aprovação", "São publicados direto na conta pela API, sem revisão", "São validados nas políticas do Google em loop e exportados para o Google Ads Editor", "São revisados pelo Gemini para ver se parecem texto de IA"],
      correta: 2, explicacao: "A skill de anúncios valida as políticas do Google em loop e exporta para o Google Ads Editor." },
    { id: "a2-s05", pergunta: "No planejamento de Google Ads gerado pela skill do Adriano, de onde vêm o volume de busca e o CPC de cada palavra-chave?",
      opcoes: ["De estimativas que o Claude faz com base no que sabe sobre o nicho", "De um cérebro com transcrições de canais de Google Ads", "De uma planilha que o gestor preenche manualmente antes de rodar a skill", "Da API do Google Ads, conectada à skill de planejamento"],
      correta: 3, explicacao: "A skill de planejamento traz campanhas, grupos, negativas, volume de busca e CPC puxados pela API do Google Ads." },
    { id: "a2-s06", pergunta: "Um aluno estranhou a skill de persona trazer “risco de mercado”. De onde, segundo a aula, veio essa regra?",
      opcoes: ["De uma conversa sobre franquia: por que comprar uma, se pôr o dinheiro na renda fixa é menos arriscado?", "De uma exigência das políticas do Google Ads para anunciantes de serviços", "De um curso de persona que o Adriano transcreveu para montar o cérebro", "De um pedido do Gemini durante a revisão do redator de blog"],
      correta: 0, explicacao: "A análise de risco de mercado nasceu de uma conversa sobre franquia e virou regra fixa da skill de persona." },
    { id: "a2-s07", pergunta: "Os textos do blog de um cliente estão com SEO bom e passam no detector de IA, mas não soam como a marca. Qual volta do redator do Jarvis cuida disso?",
      opcoes: ["A terceira, em que o Gemini tenta bloquear o texto", "A segunda, que ajusta tamanho, formato e SEO pelo cérebro do Ahrefs", "A primeira, que escreve dentro do manual de linguagem do Adriano", "Nenhuma: tom de voz fica fora do redator e é ajustado à mão"],
      correta: 2, explicacao: "A primeira volta escreve no manual de linguagem; a segunda cuida de SEO e a terceira é o Gemini tentando bloquear." },
    { id: "a2-s08", pergunta: "Quais integrações alimentam o painel do funil low ticket mostrado no Jarvis?",
      opcoes: ["Google Ads, Google Analytics e o CRM da agência", "Hotmart (faturamento, vendas, reembolso), Meta (verba investida) e um rastreamento próprio", "Meta, Resend e Supabase, com os e-mails de compra como fonte de vendas", "Hotmart, ClickUp e Telegram, que avisa a cada venda nova"],
      correta: 1, explicacao: "Com poucas integrações (Hotmart, Meta e rastreamento próprio) o painel mostra até a conversão por página, como a V2 com 8,57%." },
    { id: "a2-s09", pergunta: "Por que a aula escolheu a Vercel como hospedagem do sistema?",
      opcoes: ["Porque roda a AWS por trás e foi pensada para ser manipulada totalmente pela IA", "Porque é a única hospedagem que aceita banco de dados Supabase", "Porque já vem com envio de e-mails embutido, dispensando o Resend", "Porque é a única opção gratuita, já que Hostinger e Lovable são pagas"],
      correta: 0, explicacao: "A Vercel roda AWS por trás e é feita para a IA operar; Hostinger e Lovable aparecem como alternativas." },
    { id: "a2-s10", pergunta: "Qual destes itens NÃO fazia parte das regras do mini sistema construído na aula?",
      opcoes: ["Tela de login com usuário comum e administrador", "Cada tipo de usuário ver a sua própria tela ao entrar", "Recuperação de senha por e-mail para o usuário comum", "O administrador cadastrar, editar e excluir usuários"],
      correta: 2, explicacao: "As 4 regras eram login de dois níveis, telas separadas, admin gerenciando usuários e usuário logar e sair. Recuperação de senha ficou de fora de propósito." },
    { id: "a2-s11", pergunta: "Uma gestora quer montar o sistema da agência, mas trava porque “não sabe programar nem por onde começar”. Qual é a orientação da aula?",
      opcoes: ["Fazer primeiro um curso de programação básica para entender o que o Claude vai gerar", "Começar contratando um desenvolvedor para montar a base e depois assumir com o Claude", "Copiar o projeto de outro aluno e adaptar aos poucos", "Você não precisa saber, precisa pedir; e até “me ajuda, não sei nem dar o primeiro passo” já funciona"],
      correta: 3, explicacao: "Na era da IA você não precisa saber, precisa pedir, e nem precisa saber pedir direito." },
    { id: "a2-s12", pergunta: "No Jarvis, por que algumas funções ficam no Jarvis local (no Mac) e outras no Jarvis web?",
      opcoes: ["O local guarda os dados sensíveis e o web guarda só os relatórios dos clientes", "O local cuida do que só é usado com o computador ligado, como transcrever; o web fica na nuvem para o que precisa rodar o tempo todo", "O local é a versão de testes e o web é a versão final de tudo que já foi aprovado", "O local roda no Sonnet e o web roda no Opus, por causa do custo"],
      correta: 1, explicacao: "A divisão é por uso: tarefas que só fazem sentido com o computador ligado ficam no local; o que precisa rodar 24/7 vai para a nuvem." }
  ];
})();
