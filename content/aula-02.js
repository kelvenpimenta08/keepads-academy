// Mentoria Adriano Gianini (Agentes de IA para Tráfego Pago): conteúdo da Aula 02,
// extraído da transcrição completa da aula.
// Os ids (a2-...) não podem mudar depois que a equipe começar a estudar,
// porque o progresso de cada card fica salvo pelo id.
window.AULAS = window.AULAS || {};
window.AULAS["adriano-ia-trafego"] = window.AULAS["adriano-ia-trafego"] || {};
window.AULAS["adriano-ia-trafego"][2] = {
  numero: 2,
  titulo: "Sistema no ar, loops e a primeira skill",
  resumo: "Vercel, Supabase e Resend; o primeiro sistema com login e dois níveis de usuário publicado na nuvem; integrações guardadas no próprio sistema; a estrutura de loop; o redator de blog com três revisores; e como fragmentar um processo grande (persona → planejamento → anúncios) em skills.",

  flashcards: [
    { id: "a2-c01", pergunta: "Qual era a missão principal da Aula 02?", resposta: "Terminar o dia com um sistema publicado na internet, conectado a um banco de dados e com login e senha. Daqui para a Freedom, a coisa fica mais fácil: você já sabe conectar APIs e hospedar um sistema com login." },
    { id: "a2-c02", pergunta: "O que é a Vercel?", resposta: "Uma hospedagem de sites e sistemas, que roda a AWS (Amazon) por trás e foi pensada para ser manipulada totalmente pela IA. Alternativas citadas: Hostinger e Lovable." },
    { id: "a2-c03", pergunta: "O que é o Supabase?", resposta: "Um banco de dados “ridiculamente simples”. Tudo o que precisa guardar informação (usuários, tarefas, relatórios) fica nele." },
    { id: "a2-c04", pergunta: "Para que serve o Resend?", resposta: "Para enviar e-mails a partir do sistema. Ex.: a secretária do Jarvis que avisa o financeiro que a comissão fechou e avisa os vendedores que a comissão foi paga." },
    { id: "a2-c05", pergunta: "Quais eram as 4 regras do mini sistema da aula?", resposta: "1) Tela de login com dois níveis de usuário (comum e administrador). 2) Ao logar, cada um vê a sua tela. 3) O admin cadastra, edita e exclui usuários. 4) O usuário consegue logar e sair." },
    { id: "a2-c06", pergunta: "Precisa assinar plano da Vercel e do Supabase para começar?", resposta: "Não. Cria a conta gratuita e só assina quando estourar o limite. Dá até para pedir ao Claude: “acompanhe e me avise quando estiver chegando no limite”." },
    { id: "a2-c07", pergunta: "Por que simplificar o primeiro sistema (sem “esqueci minha senha”, sem Git, sem Resend)?", resposta: "Para resolver um problema de cada vez. O objetivo não é o sistema em si, é aprender a publicar algo com banco de dados e login." },
    { id: "a2-c08", pergunta: "Qual é a “lei universal nº 2” da mentoria?", resposta: "É terminantemente proibido usar o Claude pelo navegador: use sempre o app desktop (Windows ou Mac). No navegador você fica preso aos limites de permissão do próprio navegador." },
    { id: "a2-c09", pergunta: "Qual frase muda completamente o jeito que o Claude se comunica com você?", resposta: "“Sou leigo, preciso de tudo mastigado.” E dá para ir além: “Já estou logado no Chrome, acesse e faça tudo por mim.”" },
    { id: "a2-c10", pergunta: "“Na era da IA você só constrói o que sabe”: o que a aula responde a isso?", resposta: "Você não precisa saber, precisa pedir. E nem precisa saber pedir direito: “Me ajuda, não sei nem dar o primeiro passo” já funciona." },
    { id: "a2-c11", pergunta: "Você mostrou uma chave do Supabase com a tela compartilhada. O que fazer?", resposta: "Terminou de usar, exclua a chave e gere outra. Com aquela chave dá para conectar no seu banco." },
    { id: "a2-c12", pergunta: "Onde as conexões de API devem ficar no sistema (segundo o Jarvis)?", resposta: "Numa aba de Integrações dentro do próprio sistema, com um card por ferramenta e os campos que a API dela pede. Nada de passar chave pelo chat, por segurança." },
    { id: "a2-c13", pergunta: "Por que a conexão precisa “subir” junto quando o agente vai para a nuvem?", resposta: "Porque um agente na nuvem 24/7 dependendo de conexão no seu computador é uma Ferrari com quatro pneus de Celta." },
    { id: "a2-c14", pergunta: "Quais são as duas integrações mais chatas? E a recompensa?", resposta: "Google Ads (via MCC) e a API oficial do Meta. Quem sobrevive a conectar essas duas acha o resto “mamão com açúcar”." },
    { id: "a2-c15", pergunta: "Por que conectar o Google Ads pela MCC?", resposta: "Porque você faz o processo uma vez só na MCC e ela libera o acesso a todas as contas de clientes. Conta por conta, seriam dez vezes o mesmo trabalho." },
    { id: "a2-c16", pergunta: "MCP do Meta ou API do Meta?", resposta: "O Adriano ficou pouco tempo no MCP: é muito limitado. Foi direto para a API oficial, mesmo sendo chata (criar app e ainda se dar permissão ao próprio app)." },
    { id: "a2-c17", pergunta: "Várias sessões do Claude trabalhando no mesmo projeto: qual o risco e a solução?", resposta: "Uma sessão pode estragar o trabalho da outra (aconteceu com ele). Solução: pedir um processo de segurança e documentação entre as sessões, ter backup e usar o Git o tempo todo para poder voltar no tempo." },
    { id: "a2-c18", pergunta: "Tarefa básica como transcrever ou procurar algo: qual modelo usar?", resposta: "Um modelo mais simples e barato, como o Haiku (até vários em paralelo). Não precisa gastar o modelo mais forte em tarefa básica." },
    { id: "a2-c19", pergunta: "O que é um loop no Claude?", resposta: "“Faça isso até isso acontecer” ou “enquanto isso não acontecer, não saia do loop”. É uma condição de saída: enquanto não for atendida, ele não para." },
    { id: "a2-c20", pergunta: "O que faz um loop funcionar bem?", resposta: "Uma condição de saída simples, clara, objetiva e, de preferência, com referência. Ex.: “carregar em 3 segundos ou menos”, e não “melhore a performance”." },
    { id: "a2-c21", pergunta: "“Melhore a performance do site” × loop: qual a diferença?", resposta: "Sem loop: se cair de 6 para 5 segundos, ele já “melhorou” e a tarefa acabou. Com loop: “enquanto não carregar em 3 segundos ou menos, não saia do loop”." },
    { id: "a2-c22", pergunta: "Como o redator de blog do Jarvis funciona?", resposta: "Três voltas em loop: 1) escrever no manual de linguagem do Adriano; 2) tamanho, formato e SEO a partir do cérebro do Ahrefs; 3) o Gemini verifica se parece texto de IA e tenta bloquear. Reprovou, volta e reescreve." },
    { id: "a2-c23", pergunta: "Por que a terceira volta do redator é o Gemini e não o Claude?", resposta: "Se o mesmo agente que escreve também revisa, ele aprova fácil. O revisor tem que ser outro, com a tarefa de fazer de tudo para bloquear. E o Gemini é do Google, onde ele quer aparecer." },
    { id: "a2-c24", pergunta: "“Escreva dentro das regras de SEO” × “aprenda com o cérebro de SEO”: qual a diferença?", resposta: "No primeiro, ele usa o que sabe da internet e dá a tarefa como cumprida. No segundo, ele aprende com o seu cérebro (ex.: o canal do Ahrefs transcrito) antes de escrever. É um nível acima." },
    { id: "a2-c25", pergunta: "Por que a parte mais difícil de um agente fica fora do Claude?", resposta: "Porque é definir as decisões que ele toma. Você acha que tem um processo, mas tem dez: as exceções existem e mudam conforme o cliente (ex.: negativar palavras-chave)." },
    { id: "a2-c26", pergunta: "Como construir um processo grande sem virar um Frankenstein?", resposta: "Fragmentar em etapas: construir a primeira, masterizar até o resultado sair do seu jeito e só então ir para a próxima." },
    { id: "a2-c27", pergunta: "Qual é a ordem do processo de criar uma campanha de Google Ads na aula?", resposta: "Persona (com concorrência e risco de mercado) → planejamento (produto/serviço e estrutura de campanhas e grupos) → palavras-chave → anúncios por grupo → validação nas políticas do Google Ads." },
    { id: "a2-c28", pergunta: "Quais são os dois gatilhos da skill de persona?", resposta: "A URL do site ou você explicar o que é e o que não é o negócio. E, nos dois casos, ela sempre faz uma varredura na internet para enriquecer a persona, sem fugir da proposta." },
    { id: "a2-c29", pergunta: "De onde veio a análise de “risco de mercado” da skill de persona?", resposta: "De uma conversa sobre franquia: por que comprar se é menos arriscado pôr o dinheiro na renda fixa? Virou regra da skill. No exemplo da pousada, o risco era depender de uma âncora: o calendário da Canção Nova." },
    { id: "a2-c30", pergunta: "Qual foi a tarefa de casa da Aula 02?", resposta: "Pegar um processo seu e mapear como ele é de verdade. Senão você não constrói o seu processo: constrói o processo do Adriano para você." }
  ],

  // Prova teórica (nível difícil, situações práticas). "correta" é o índice da opção certa;
  // a ordem das opções é embaralhada a cada tentativa.
  prova_teorica: [
    { id: "a2-t01", pergunta: "Você vai montar um sistema para os clientes verem relatórios com login, e quer que ele avise o cliente por e-mail quando o relatório sair. Qual combinação de serviços a aula usou para cada papel?",
      opcoes: ["Supabase para hospedar, Vercel para o banco de dados e Resend para o e-mail", "Vercel para hospedar, Supabase para o banco de dados e Resend para o e-mail", "Vercel para hospedar e para o banco, e Supabase para disparar o e-mail", "Resend para hospedar, Supabase para o banco de dados e Vercel para o e-mail"],
      correta: 1, explicacao: "Vercel é hospedagem (roda AWS por trás), Supabase é banco de dados e Resend é o serviço de envio de e-mails." },
    { id: "a2-t02", pergunta: "Um colega está usando o Claude no navegador e o Claude diz que não tem permissão para fazer uma parte da conexão com o Supabase. Segundo a aula, qual é a orientação?",
      opcoes: ["Dar mais permissões ao navegador nas configurações do Chrome", "Baixar e usar o app desktop do Claude e pedir para ele tentar de novo de lá", "Trocar para o Opus, que tem mais permissões que o Sonnet", "Fazer essa etapa manualmente e deixar o Claude só com o código"],
      correta: 1, explicacao: "Lei universal nº 2: proibido usar pelo navegador. No navegador você fica preso ao limite de permissão do próprio navegador." },
    { id: "a2-t03", pergunta: "Na primeira versão do mini sistema, o Claude perguntou se devia criar “esqueci minha senha”. O que a aula recomendou e por quê?",
      opcoes: ["Criar, porque todo sistema com login precisa disso desde o início", "Não criar por enquanto: simplificar ao máximo e resolver um problema de cada vez", "Criar só para o administrador, por segurança", "Deixar o Claude decidir, porque ele sabe o que é melhor"],
      correta: 1, explicacao: "O foco era aprender a publicar um sistema com banco de dados e login. Git e Resend também ficaram para depois." },
    { id: "a2-t04", pergunta: "Você está montando a Freedom e vai conectar Hotmart, CRM e Meta. Como o Adriano organizou as conexões no Jarvis?",
      opcoes: ["Colando as chaves no chat do Claude Code, que guarda tudo na memória", "Uma aba de Integrações no próprio sistema, com um card por ferramenta e os campos que a API de cada uma pede", "Um arquivo de texto no computador com todas as chaves", "Uma planilha compartilhada com o time"],
      correta: 1, explicacao: "Ele não passa nenhum dado pelo chat, por segurança. Cada integração vira um card em “Integrações”, preenchido com o que a API exige." },
    { id: "a2-t05", pergunta: "Seu agente vai rodar na nuvem 24/7, mas as conexões com Google Ads e Meta foram feitas no seu computador. Qual é a avaliação da aula?",
      opcoes: ["Está ótimo: o agente usa as conexões do computador sem problema", "Não faz sentido: é uma Ferrari com quatro pneus de Celta; as conexões também precisam subir para a nuvem", "É obrigatório: conexões de API nunca podem ficar na nuvem", "Só funciona se o computador for um Mac"],
      correta: 1, explicacao: "Dá até para fazer, mas um agente 24/7 dependente do seu computador perde o sentido." },
    { id: "a2-t06", pergunta: "Você trabalha com quatro sessões do Claude ao mesmo tempo no mesmo projeto. O que a experiência do Adriano ensina?",
      opcoes: ["Nunca abrir mais de uma sessão no mesmo projeto", "Criar um processo de segurança e documentação para uma sessão não estragar o trabalho da outra, com backup e Git", "Usar uma conta do Claude diferente para cada sessão", "Deixar cada sessão num modelo diferente para não conflitarem"],
      correta: 1, explicacao: "Uma sessão estragou o trabalho da outra; o backup salvou. Depois ele criou um processo em que as sessões se avisam antes de publicar." },
    { id: "a2-t07", pergunta: "Qual é a melhor definição de loop segundo a aula?",
      opcoes: ["Repetir a mesma pergunta até o Claude acertar", "Dar uma condição de saída: enquanto ela não for atendida, o Claude continua trabalhando e não encerra a tarefa", "Rodar várias sessões do Claude em paralelo", "Pedir para o Claude revisar o próprio trabalho uma vez no final"],
      correta: 1, explicacao: "“Faça isso até isso acontecer” ou “enquanto isso não acontecer, não saia do loop”." },
    { id: "a2-t08", pergunta: "Qual pedido aplica melhor a estrutura de loop para deixar um site rápido?",
      opcoes: ["“Melhore a performance desse site”", "“Abra um loop de otimização do tempo de carregamento e, enquanto não carregar em 3 segundos ou menos, não saia do loop”", "“Otimize o site o máximo que conseguir”", "“Teste o site e me diga se está rápido”"],
      correta: 1, explicacao: "Sem uma condição clara, cair de 6 para 5 segundos já conta como “melhorou” e a tarefa acaba." },
    { id: "a2-t09", pergunta: "Você pediu ao agente para checar o saldo das 10 contas da MCC. Ele leu 7, disse que não conseguiu 3 e deu a tarefa como feita. Como o loop resolve isso?",
      opcoes: ["Pedindo para ele ignorar as contas com erro", "Definindo que a tarefa só termina quando tiver as informações das 10 contas", "Dividindo em 10 tarefas separadas, uma por conta", "Trocando o modelo para o Opus"],
      correta: 1, explicacao: "Com a condição “enquanto não tiver as dez, a tarefa não terminou”, ele insiste e pode até pedir ajuda para tratar os erros." },
    { id: "a2-t10", pergunta: "No redator de blog do Jarvis, por que a terceira revisão é feita pelo Gemini e não pelo próprio Claude?",
      opcoes: ["Porque o Gemini é mais barato", "Porque se o mesmo agente que escreve também revisa, ele aprova fácil; o revisor precisa ser outro, com a tarefa de bloquear", "Porque o Claude não sabe identificar texto de IA", "Porque o Gemini escreve melhor em português"],
      correta: 1, explicacao: "A tarefa do Gemini é fazer de tudo para bloquear. Ainda tem o bônus: ele é do Google, onde o blog quer aparecer." },
    { id: "a2-t11", pergunta: "Na segunda volta do redator, o texto precisa respeitar SEO. Qual instrução sobe o nível do resultado?",
      opcoes: ["“Escreva dentro das melhores práticas de SEO do mercado”", "“Aprenda com o cérebro de SEO que eu tenho na máquina antes de escrever”", "“Pesquise no Google como fazer SEO e aplique”", "“Use o máximo de palavras-chave possível”"],
      correta: 1, explicacao: "Sem o cérebro, ele usa o que sabe da internet e acha que cumpriu. Com o cérebro do Ahrefs transcrito, ele aprende antes, inclusive a costurar links internos." },
    { id: "a2-t12", pergunta: "Você quer um agente que negative palavras ruins no Google Ads. Segundo a aula, onde está a maior dificuldade?",
      opcoes: ["Conectar a API do Google Ads", "Definir as decisões: a regra tem exceções, e a quantidade de exceções depende do tipo de cliente", "Escolher o modelo certo do Claude", "Fazer a interface do agente"],
      correta: 1, explicacao: "“Você acha que tem um processo, mas tem dez.” A parte mais complexa é fora do Claude: mapear o seu processo." },
    { id: "a2-t13", pergunta: "Você quer automatizar o planejamento completo de campanhas de Google Ads. Qual estratégia a aula recomenda?",
      opcoes: ["Construir tudo de uma vez num único sistema, para ganhar tempo", "Fragmentar em etapas (persona, planejamento, anúncios), masterizar cada uma e só então ir para a próxima", "Começar pelos anúncios, que é a parte que o cliente vê", "Comprar uma ferramenta pronta e adaptar"],
      correta: 1, explicacao: "Construir o Frankenstein de uma vez faz você gastar mais tempo fazendo funcionar do que deixando impecável." },
    { id: "a2-t14", pergunta: "Um cliente novo não tem site. Como a skill de persona do Adriano lida com isso?",
      opcoes: ["Não roda: sem site não há como criar persona", "Usa o segundo gatilho: você explica o que é e o que não é o negócio, e ela ainda enriquece com varredura na internet", "Cria uma persona genérica do segmento", "Pede para você preencher um formulário de 50 perguntas"],
      correta: 1, explicacao: "Os gatilhos são a URL ou “o que é e o que não é”. E sempre há a varredura na internet, sem fugir da proposta do negócio." },
    { id: "a2-t15", pergunta: "No exemplo da pousada, qual foi o “risco de mercado” encontrado pela skill?",
      opcoes: ["A taxa Selic alta, que reduz o consumo de turismo", "A dependência de uma âncora: toda a demanda nasce do calendário da Canção Nova, com picos em poucos fins de semana", "A concorrência dos grandes hotéis da região", "A sazonalidade das férias escolares"],
      correta: 1, explicacao: "A campanha perde dinheiro anunciando com o hotel lotado e sumindo quando o peregrino decide o próximo evento." },
    { id: "a2-t16", pergunta: "Você usa Make e Zapier para ligar todas as ferramentas. Qual alternativa o Adriano mostrou e qual a vantagem principal?",
      opcoes: ["Trocar por outra ferramenta de automação mais barata", "Pedir ao Claude uma API/repositório próprio que recebe os dados de todas as ferramentas e guarda o histórico no seu banco", "Conectar cada ferramenta direto na outra, sem intermediário", "Usar o Cowork com tarefas agendadas"],
      correta: 1, explicacao: "Se trocar de CRM, ele só muda a direção da conexão, e o histórico continua no banco dele." }
  ],

  pratica: [
    {
      id: "a2-p1",
      titulo: "Criar contas gratuitas na Vercel e no Supabase",
      descricao: "Criar uma conta gratuita na Vercel (hospedagem) e outra no Supabase (banco de dados). Não assinar plano: só quando estourar o limite.",
      perguntas: [
        { id: "a2-pq01", pergunta: "Quando a aula diz que vale a pena assinar um plano pago da Vercel ou do Supabase?",
          opcoes: ["Logo no começo, para não ter limitações", "Só quando estourar o limite do gratuito; dá até para pedir ao Claude para avisar quando estiver chegando perto", "Quando o sistema tiver mais de 10 usuários", "Nunca, o gratuito resolve para sempre"],
          correta: 1, explicacao: "“Não assinem até estourar.” O Claude pode acompanhar o uso e avisar." }
      ]
    },
    {
      id: "a2-p2",
      titulo: "Construir o mini sistema com login e dois níveis de usuário",
      descricao: "No Claude Code (num chat novo), pedir um mini sistema com login, usuário comum e administrador. Cada um vê a sua tela, o admin cadastra, edita e exclui usuários, e o usuário loga e sai. Usar Vercel e Supabase.",
      perguntas: [
        { id: "a2-pq02", pergunta: "O Flávio fez o pedido dentro da sessão do caderno de desabafos e o Claude disse “o pedido é explícito, vou sair da fase de registrar”. Qual era o risco que o Adriano apontou?",
          opcoes: ["Nenhum, é sempre melhor fazer tudo na mesma sessão", "O problema seria pedir “construa tudo o que eu falei no caderno de desabafos”; ali era só um sistema simples, e depois dava para voltar ao desabafo", "O Claude apagar o caderno de desabafos", "O sistema ficar sem banco de dados"],
          correta: 1, explicacao: "O ideal é abrir um chat novo para o sistema. Construir o caderno inteiro por engano seria o problema." },
        { id: "a2-pq03", pergunta: "Qual pedido está mais próximo do que o Adriano ditou para o mini sistema?",
          opcoes: ["“Crie um sistema completo de gestão para a minha agência”", "“Estou aprendendo a hospedar um site que conecte a um banco de dados. Quero um mini sistema com login de dois níveis; cada um vê a sua tela; o admin cadastra, edita e exclui usuários; o usuário loga e sai. Vou usar Vercel e Supabase, e já criei as contas.”", "“Faça um login com Google e Facebook”", "“Crie uma tela de login bonita, com o banco de dados que você preferir”"],
          correta: 1, explicacao: "Tem contexto (estou aprendendo), tarefa (o sistema e suas regras) e as ferramentas definidas." }
      ]
    },
    {
      id: "a2-p3",
      titulo: "Publicar e testar o sistema na nuvem",
      descricao: "Mandar o Claude publicar na Vercel (“o mais feio que tiver, pode publicar”), criar o seu login de administrador e testar: cadastrar, editar e excluir um usuário e entrar como usuário comum.",
      perguntas: [
        { id: "a2-pq04", pergunta: "O Claude pediu para você abrir o Supabase e copiar duas chaves, mas você não acha a página. O que a aula orienta?",
          opcoes: ["Procurar um tutorial no YouTube", "Dizer: “Sou muito leigo, não sei achar isso, mas já estou logado no Chrome. Acesse e faça por mim” (ou pedir o endereço completo para colar)", "Desistir dessa etapa e usar outro banco de dados", "Criar um projeto novo no Supabase e começar de novo"],
          correta: 1, explicacao: "Normalizar falar “não sei”. Ele pode navegar pelo seu Chrome ou mandar o link direto da página." },
        { id: "a2-pq05", pergunta: "Durante o processo, o Claude sugere uma resposta óbvia na caixa de mensagem. Qual atalho a aula mostrou?",
          opcoes: ["Ctrl + Enter", "Apertar Tab para aceitar a sugestão sem digitar", "Esc para pular a pergunta", "Ctrl + C para copiar a sugestão"],
          correta: 1, explicacao: "Quando ele começa a entender que a resposta é óbvia, é só dar um Tab." }
      ]
    },
    {
      id: "a2-p4",
      titulo: "Cuidar das chaves e registrar as integrações",
      descricao: "Se uma chave apareceu em tela compartilhada, excluir e gerar outra. Anotar no caderno de desabafos da Freedom: “quero uma aba de Integrações com um card por ferramenta, com os campos que a API de cada uma pede”.",
      perguntas: [
        { id: "a2-pq06", pergunta: "Você mostrou a chave secreta do Supabase com a tela compartilhada na reunião. O que fazer depois de terminar?",
          opcoes: ["Nada, a chave só funciona no seu computador", "Excluir essa chave e gerar uma nova, porque com ela dá para conectar no seu banco", "Trocar a senha da sua conta do Supabase", "Apagar o projeto inteiro"],
          correta: 1, explicacao: "“Assim que terminar, você tem que excluir. Joga isso fora e cria outra.”" },
        { id: "a2-pq07", pergunta: "O que a Andréia foi orientada a anotar no caderno de desabafos?",
          opcoes: ["A lista de todas as senhas das ferramentas", "Que todas as integrações por API da Freedom fiquem numa aba de configurações, com cada conexão lá", "Que o Claude guarde as chaves na memória", "Que cada pessoa da equipe tenha a própria conexão no computador"],
          correta: 1, explicacao: "E a dica extra: tirar um print da tela de Integrações do Jarvis e pedir “copia essa tela”." }
      ]
    },
    {
      id: "a2-p5",
      titulo: "Conectar Google Ads (via MCC) e Meta (API oficial)",
      descricao: "Seguir o tutorial gravado pelo Adriano para conectar o Google Ads pela MCC e a API oficial do Meta. São as duas mais chatas, mas destravam o resto.",
      perguntas: [
        { id: "a2-pq08", pergunta: "Por que a aula recomenda conectar o Google Ads pela MCC mesmo não sendo mais obrigatório?",
          opcoes: ["Porque é mais barato", "Porque você faz o processo uma vez só e a MCC libera o acesso a todas as contas de clientes", "Porque a MCC dá acesso às métricas privadas do YouTube", "Porque sem MCC a API não traz volume de busca"],
          correta: 1, explicacao: "Com 10 clientes, conta por conta seriam 10 vezes o mesmo rolê." },
        { id: "a2-pq09", pergunta: "O agente traz só o valor gasto no dia, e não o saldo disponível das contas do Meta. Qual é o primeiro passo que o Adriano mandou fazer?",
          opcoes: ["Trocar para o MCP do Meta", "Perguntar tudo o que a API do Meta tem sobre saldo, separado por contas pré-pagas e pós-pagas, e o que o seu nível de acesso permite ver", "Criar um agente novo do zero", "Pedir o saldo para o suporte do Meta"],
          correta: 1, explicacao: "Assim você acha a limitação: ou a API não devolve, ou o seu nível de acesso não permite. Plano B: o Cowork navegando pelo Chrome logado." }
      ]
    },
    {
      id: "a2-p6",
      titulo: "Aprender e aplicar a estrutura de loop",
      descricao: "Pedir ao Claude: “Quero aprender a estrutura de loops aqui no Claude. Me ensine e me traga três exemplos de aplicação real, considerando o que eu uso e não usei loop mas poderia.” Depois, aplicar um loop numa tarefa real.",
      perguntas: [
        { id: "a2-pq10", pergunta: "Qual destes é um loop bem escrito, segundo a aula?",
          opcoes: ["“Deixe o site responsivo”", "“Simule a navegação em todos os iPhones do 12 ao 18 e, enquanto não estiver 100% adaptado em todos, não pare”", "“Teste o site no celular e me avise”", "“Veja se o site está bom no iPhone”"],
          correta: 1, explicacao: "Tem uma condição de saída objetiva. Sem ela, ele corrige um erro, você acha outro, e vira uma prisão de idas e vindas." },
        { id: "a2-pq11", pergunta: "Você passou duas horas pedindo “não é isso” para o Claude. Qual é o diagnóstico da aula?",
          opcoes: ["O modelo é ruim e precisa trocar de IA", "Faltou uma condição clara e objetiva (de preferência com referência) do que significa a tarefa pronta; com ela, abre-se um loop e ele trabalha até chegar lá", "Você precisa digitar mais devagar", "O Claude estava no horário de pico"],
          correta: 1, explicacao: "Oriente o comando para o resultado que encerra a tarefa, em vez de falar com ele como se fosse uma criança de cinco anos." }
      ]
    },
    {
      id: "a2-p7",
      titulo: "Usar sempre o app desktop do Claude",
      descricao: "Instalar o app desktop do Claude (Windows ou Mac) e parar de usar o Claude pelo navegador.",
      perguntas: [
        { id: "a2-pq12", pergunta: "Por que a aula proíbe usar o Claude pelo navegador?",
          opcoes: ["Porque o navegador gasta mais tokens", "Porque no navegador você fica submetido ao limite de permissão do próprio navegador, e tem coisas que só o app consegue fazer", "Porque o navegador não tem o modelo Opus", "Porque o navegador não salva as conversas"],
          correta: 1, explicacao: "Foi o caso do Marlon: travou no navegador e a orientação foi baixar o app e retomar a mesma conversa." }
      ]
    },
    {
      id: "a2-p8",
      titulo: "Mapear um processo seu de ponta a ponta",
      descricao: "Tarefa de casa: escolher um processo da agência (ex.: planejamento de campanha, auditoria, onboarding) e mapear como VOCÊ faz, com as etapas, as decisões e as exceções.",
      perguntas: [
        { id: "a2-pq13", pergunta: "Por que a aula pede para mapear o seu processo antes de construir a skill?",
          opcoes: ["Para gastar menos tokens", "Porque, se não, você constrói o processo do Adriano para você, e toda vez vai ter o trabalho de corrigir para o seu jeito", "Porque o Claude não sabe fazer planejamento de campanha", "Porque a skill do Adriano não funciona para outros nichos"],
          correta: 1, explicacao: "Exemplo da Mayara: se ela faz algo diferente do Máquina porque funciona melhor para ela, a skill tem que ter o jeito dela." },
        { id: "a2-pq14", pergunta: "Com o tempo, como o Adriano trata as exceções do processo (por exemplo, palavras negativas por nicho)?",
          opcoes: ["Ignora as exceções, para o agente não ficar confuso", "Vai ensinando o agente: para advogado trabalhista, essas exceções; para previdenciário, essas; para saúde, essas", "Cria um agente diferente para cada cliente", "Só trabalha com um nicho"],
          correta: 1, explicacao: "As exceções viram regras ao longo do tempo, e o trabalho vai ficando no automático." }
      ]
    },
    {
      id: "a2-p9",
      titulo: "Fazer um uso “idiota” e produtivo do Claude",
      descricao: "Usar o Claude numa tarefa simples do dia a dia que você faria na mão (achar uma foto entre milhares, montar uma lista, organizar algo) e compartilhar no grupo da mentoria.",
      perguntas: [
        { id: "a2-pq15", pergunta: "O time pediu uma foto do antigo estúdio e a pasta tinha mais de 8 mil fotos. O que o Adriano fez?",
          opcoes: ["Pediu para o time procurar", "Descreveu por voz para o Claude como era o lugar (parede verde clara, iMac enorme) e pediu umas quatro fotos; em 5 minutos ele achou", "Organizou as fotos por data antes de procurar", "Usou o Google Fotos"],
          correta: 1, explicacao: "Ele ia perder uma hora. A ideia é criar a cultura de compartilhar esses usos para destravar a cabeça." }
      ]
    }
  ]
};
