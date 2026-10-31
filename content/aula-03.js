// Mentoria Adriano Gianini (Agentes de IA para Tráfego Pago): conteúdo da Aula 03,
// extraído da transcrição completa da aula.
// Os ids (a3-...) não podem mudar depois que a equipe começar a estudar,
// porque o progresso de cada card fica salvo pelo id.
window.AULAS = window.AULAS || {};
window.AULAS["adriano-ia-trafego"] = window.AULAS["adriano-ia-trafego"] || {};
window.AULAS["adriano-ia-trafego"][3] = {
  numero: 3,
  titulo: "Prompt CTR, skills e o primeiro agente",
  resumo: "O caminho prompt redondo → skill → agente autônomo; o método CTR (contexto, tarefa e resultado); por que processo não documentado vira agente ruim; cérebro como conhecimento bruto; o conferente de saldo que vira agente com horário; segurança e LGPD; e quando vale construir ou contratar uma ferramenta.",

  flashcards: [
    { id: "a3-c01", pergunta: "Qual é o caminho que a Aula 03 ensina para chegar a um agente?", resposta: "1) Criar um prompt redondo. 2) Rodar umas três vezes até sair sempre do jeito que você quer. 3) Transformar em skill. 4) Transformar a skill em agente autônomo." },
    { id: "a3-c02", pergunta: "O que significa CTR no método de prompt do Adriano?", resposta: "Contexto, Tarefa e Resultado. É o método da Anthropic com outro nome: ele trocou para uma sigla do mercado de tráfego, para ficar mais didático." },
    { id: "a3-c03", pergunta: "O que vai em cada parte do CTR?", resposta: "Contexto: tudo o que ele precisa saber para entender o que você quer. Tarefa: o que ele deve fazer, direto e objetivo. Resultado: como a entrega final deve sair (formato, visual, onde fica)." },
    { id: "a3-c04", pergunta: "O que acontece com tudo o que você deixa fora do prompt?", resposta: "Ele decide por você. Ex.: quantos anúncios criar, se foca em dor, desejo ou objeção, se segue as políticas do Google Ads e em que formato entrega." },
    { id: "a3-c05", pergunta: "Você pediu os anúncios “em HTML” e não disse mais nada. O que acontece?", resposta: "Ele cria o HTML do jeito dele (tipografia, cores...). A exceção é quando você já tem muitos HTMLs no mesmo padrão: aí o Claude já aprendeu o seu gosto." },
    { id: "a3-c06", pergunta: "O que é uma skill?", resposta: "Uma habilidade. Um prompt validado vira uma espécie de plugin no seu computador: daí em diante você só diz “faça isso a partir da habilidade X”, sem rodar o prompt de novo." },
    { id: "a3-c07", pergunta: "Como transformar um prompt validado em skill?", resposta: "É só falar: “agora transforma em skill”. Subindo um nível, você define as condições de entrada: quando eu mandar uma URL, quando eu colar tal arquivo etc." },
    { id: "a3-c08", pergunta: "Por que é impossível criar um agente que siga o seu processo de otimização hoje?", resposta: "Porque a maioria não tem o processo documentado. Você sabe o que faz, mas não sabe a ordem: olha palavra-chave antes ou depois dos termos de pesquisa? Confere antes se rodou, quanto gastou, impressões, cliques?" },
    { id: "a3-c09", pergunta: "Segundo o Adriano, onde vai dar problema de verdade na construção de agentes?", resposta: "Na construção do processo, e não na parte da IA. A necessidade de criar skills revelou a nossa incapacidade de olhar para os próprios processos." },
    { id: "a3-c10", pergunta: "O que é o “efeito dopaminérgico” do vibe coding?", resposta: "Você constrói coisas medíocres muito rápido. O que substitui uma pessoa ou um software de verdade dá trabalho: o Jarvis de YouTube levou duas semanas, e ele já tinha o processo todo gravado." },
    { id: "a3-c11", pergunta: "Como o Adriano construiu o Jarvis de YouTube?", resposta: "Uma etapa por vez: definir pauta, usar até ficar redonda, subir. Depois estruturar pauta, rodar e ajustar até ficar redonda, subir. Depois título e capa, e assim por diante." },
    { id: "a3-c12", pergunta: "Como ele ensinou o Jarvis a estruturar pautas e a fazer capas sem explicar do zero?", resposta: "Pautas: deu acesso ao ClickUp e mandou ler as centenas de cards já estruturados. Capas: transcreveu um treinamento de 7 horas que tinha gravado para o time." },
    { id: "a3-c13", pergunta: "Por que o gerador de capa aprendeu com o próprio canal, e não com canais de outros?", resposta: "Porque de canais alheios você só tem as métricas públicas. Do seu canal você tem a métrica interna mais importante, o CTR das capas: ele analisou o histórico e achou os padrões que geram clique." },
    { id: "a3-c14", pergunta: "Para que serve o botão “Por que não?” no Jarvis?", resposta: "Quando ele recusa as sugestões, devolve o motivo ao Jarvis. Assim o agente aprende os padrões que ele não aprova e vai ficando mais inteligente." },
    { id: "a3-c15", pergunta: "Qual é a diferença entre a descrição e os capítulos de um vídeo no YouTube?", resposta: "A descrição é SEO para o próprio YouTube. Os nomes dos capítulos funcionam como palavras-chave no Google. Por isso o Jarvis confere o volume de cada nome no Planejador de Palavras-chave, pela API do Google Ads." },
    { id: "a3-c16", pergunta: "Por que o Jarvis abre o YouTube Studio no fim do upload?", resposta: "Para conferir se subiu e se o agendamento está certo, e porque a parte de monetização (adequação para anúncios) não existe na API do YouTube: ela precisa ser feita na mão." },
    { id: "a3-c17", pergunta: "Você tem um vídeo, um print ou um modelo pronto do que quer. O que fazer?", resposta: "Não perca tempo explicando: mande o modelo. Ex.: “Está aqui o link do Typeform, leia a documentação e copie todos os tipos de campo.”" },
    { id: "a3-c18", pergunta: "De onde pode vir o contexto de um prompt agora?", resposta: "De vários lugares ao mesmo tempo: uma API conectada, um curso gravado no computador, um livro em PDF, um link, um print. O segundo cérebro pode servir de base para uma skill." },
    { id: "a3-c19", pergunta: "Qual é a diferença entre cérebro e uso?", resposta: "O cérebro é conhecimento bruto (ex.: todos os vídeos de um canal transcritos, mais as capas). O uso é o que você faz com ele: o mesmo cérebro pode alimentar dez skills ou agentes diferentes." },
    { id: "a3-c20", pergunta: "Qual é a crença que a aula pede para você instalar?", resposta: "“Eu só preciso saber o que eu quero, não como fazer.” Você precisa saber onde está o conhecimento: manda buscar e monta um cérebro com ele." },
    { id: "a3-c21", pergunta: "Como manter um cérebro “vivo”, que se atualiza sozinho?", resposta: "Com uma tarefa agendada no Claude: toda quarta ela varre os canais, baixa os vídeos novos e traz um resumo. Cursos gravados no computador não precisam disso, porque não mudam." },
    { id: "a3-c22", pergunta: "Qual é a diferença entre um cérebro e uma “cadeira”?", resposta: "O cérebro é a informação guardada (pastas no HD ou banco de dados). A cadeira é um funcionário: o social media de YouTube que usa vários cérebros para trabalhar." },
    { id: "a3-c23", pergunta: "O que a skill de saldo do Adriano Gouveia podia e não podia fazer?", resposta: "Só lia o saldo das contas pré-pagas e avisava no Telegram antes de uma conta parar, projetando a data da recarga. Nunca alterava orçamento, pausava campanha ou gerava pagamento." },
    { id: "a3-c24", pergunta: "Quanto tempo a skill de saldo economiza em um ano, na conta do Adriano?", resposta: "1 hora por dia × 22 dias úteis × 12 meses = 264 horas por ano, por algo que levou meia hora para construir. E ainda evita perder cliente porque a campanha parou por falta de saldo." },
    { id: "a3-c25", pergunta: "Qual é o comando para transformar a skill em agente autônomo?", resposta: "“Transforme isto em um agente autônomo, suba no meu projeto (Vercel e Supabase) como a cadeira de auditor de saldo, rode nestes horários, todos os dias, no fuso de São Paulo. Crie o que precisar (crons etc.). Faça agora.”" },
    { id: "a3-c26", pergunta: "Por que fazer primeiro só Google Ads e depois só Meta, em vez de os dois de uma vez?", resposta: "Com duas APIs ao mesmo tempo, se uma falhar você tem que tratar o erro de uma e o da outra. Construa uma parte, masterize, construa a próxima." },
    { id: "a3-c27", pergunta: "O que é “separar a construção do uso”?", resposta: "Primeiro construir a skill o melhor possível (ensinar o processo); depois rodá-la num caso real. Misturar no mesmo pedido “aprenda o meu processo e analise o cliente X” pode até conflitar com o processo documentado." },
    { id: "a3-c28", pergunta: "Como deixar o Claude mais cuidadoso com dados pessoais?", resposta: "Mande ele ler a LGPD na íntegra e agir 100% dentro dela em tudo o que envolver dados de terceiros. Ele fica “chato pra cacete”, e é isso que você quer." },
    { id: "a3-c29", pergunta: "Como testar a segurança de um sistema que você construiu?", resposta: "Coloque as camadas de segurança (login só do seu domínio, verificação em duas etapas, aprovação de novo dispositivo). Depois troque para o modelo mais forte e mande ele tentar invadir o seu próprio sistema." },
    { id: "a3-c30", pergunta: "Qual era a tarefa inegociável para a aula seguinte?", resposta: "Ter uma skill muito redonda, rodada várias vezes e saindo sempre do jeito que você quer. Quem estava travado devia assistir à aula de skills do curso de Claude da comunidade." }
  ],

  // Prova teórica (nível difícil, situações práticas). "correta" é o índice da opção certa;
  // a ordem das opções é embaralhada a cada tentativa.
  prova_teorica: [
    { id: "a3-t01", pergunta: "Você quer um agente que crie anúncios de Google Ads para os clientes. Qual é a ordem de construção que a aula recomenda?",
      opcoes: ["Criar o agente de cara e ir corrigindo o prompt enquanto conecta tudo", "Criar um prompt, rodar umas três vezes até sair do jeito que você quer, transformar em skill e só então em agente", "Transformar a ideia em skill e testar o prompt dentro do agente", "Conectar as APIs primeiro e escrever o prompt depois"],
      correta: 1, explicacao: "Corrigir o prompt enquanto conecta o agente “é um mole desgraçado”. Primeiro o prompt redondo, depois a skill, depois o agente." },
    { id: "a3-t02", pergunta: "Um colega escreveu: “Crie anúncios de Google Ads a partir desta URL.” Qual é o principal problema, pelo método CTR?",
      opcoes: ["O prompt está curto demais e precisa de mais educação", "Ficou tudo em aberto: quantos anúncios, se foca em dor, desejo ou objeção, se segue as políticas e como entrega. Ele vai decidir tudo por você", "Faltou dizer qual modelo do Claude usar", "Faltou pedir para ele pensar passo a passo"],
      correta: 1, explicacao: "Tudo o que fica de fora do contexto, da tarefa e do resultado vira decisão da IA." },
    { id: "a3-t03", pergunta: "Você pediu os anúncios em HTML, mas não disse nada sobre o visual. Em que caso ele mesmo assim sai no seu padrão?",
      opcoes: ["Nunca, ele sempre escolhe cores aleatórias", "Quando você já tem um histórico de muitos HTMLs no mesmo padrão visual, que o Claude aprendeu", "Quando você usa o Opus", "Quando o HTML é curto"],
      correta: 1, explicacao: "É uma exceção: o próprio Claude aprende com o seu histórico. Fora disso, ele cria do jeito dele." },
    { id: "a3-t04", pergunta: "Você quer criar um agente que otimize campanhas de rede de pesquisa “do seu jeito”. O que a aula diz que vai travar primeiro?",
      opcoes: ["A conexão com a API do Google Ads", "O seu processo não estar documentado: sem saber a ordem e as decisões que você toma, não há como o agente seguir o seu jeito", "O limite de tokens do plano", "A falta de um dashboard"],
      correta: 1, explicacao: "“Como vou criar um agente que deve seguir o meu processo, cujo processo não está documentado? É impossível.”" },
    { id: "a3-t05", pergunta: "O Adriano tinha centenas de pautas estruturadas no ClickUp. Como ele ensinou o Jarvis a estruturar pautas?",
      opcoes: ["Escreveu um manual novo explicando cada etapa", "Deu acesso do Claude ao ClickUp, mostrou o tipo de card e mandou ler todos e aprender o padrão", "Gravou um vídeo explicando o processo", "Contratou alguém para treinar o agente"],
      correta: 1, explicacao: "Ele poderia treinar, mas o processo já estava documentado em algum lugar. Tudo o que você já gravou e documentou vira arsenal." },
    { id: "a3-t06", pergunta: "O gerador de capas do Adriano aprendeu com o histórico do próprio canal, e não com canais de outros. Por quê?",
      opcoes: ["Porque baixar capas de outros canais é proibido", "Porque só do próprio canal ele tem a métrica interna mais importante, o CTR de cada capa, para separar o que gera clique do que não gera", "Porque os outros canais têm capas piores", "Porque a API do YouTube só libera o próprio canal"],
      correta: 1, explicacao: "De canais alheios vêm só as métricas públicas. O construtor de capa nasceu dos padrões das capas com CTR alto." },
    { id: "a3-t07", pergunta: "No Jarvis, os nomes dos capítulos de um vídeo são conferidos no Planejador de Palavras-chave. Por quê?",
      opcoes: ["Porque o YouTube exige palavras-chave nos capítulos", "Porque os capítulos funcionam como SEO para o buscador do Google; com volume de busca, o vídeo pode aparecer lá", "Porque a descrição do vídeo é montada só com os capítulos", "Para descobrir o CPC de cada capítulo"],
      correta: 1, explicacao: "A descrição é SEO do YouTube; os capítulos, SEO do Google. Ele puxa o planejador pela API do Google Ads." },
    { id: "a3-t08", pergunta: "Você quer um sistema de pesquisa com todos os tipos de campo do Typeform. Qual é a orientação da aula?",
      opcoes: ["Descrever cada tipo de campo: texto, sim ou não, múltipla escolha...", "Mandar o link do Typeform e pedir para ler a documentação e copiar todos os tipos de campo, sem exceção", "Contratar o Typeform", "Pedir um formulário genérico e ir ajustando"],
      correta: 1, explicacao: "Quando você tem um modelo, um print ou um vídeo, não perca tempo explicando." },
    { id: "a3-t09", pergunta: "O Renato perguntou se precisava de um cérebro diferente para cada projeto. Qual é a ideia central da resposta?",
      opcoes: ["Sim, cada projeto precisa de uma conta separada do Claude", "O cérebro é conhecimento bruto; o mesmo cérebro pode servir a vários usos e agentes diferentes, e você separa os assuntos em pastas", "Não precisa de cérebro, o Claude já sabe tudo", "Cada skill precisa ter o próprio cérebro, sem compartilhar"],
      correta: 1, explicacao: "O canal dele baixado serve para aprender Google Ads, ter ideias de pauta e criar capas: três usos do mesmo cérebro." },
    { id: "a3-t10", pergunta: "Por que o Adriano consulta o cérebro de canais na hora de gerar pauta, em vez de transformá-lo uma vez numa “inteligência” fixa?",
      opcoes: ["Porque consultar na hora é mais barato", "Porque o cérebro é vivo: uma tarefa agendada atualiza os canais toda semana", "Porque transformar em inteligência fixa é impossível no Claude", "Porque assim ele não precisa de internet"],
      correta: 1, explicacao: "Toda quarta a tarefa agendada varre os canais, baixa os vídeos novos e traz um resumo." },
    { id: "a3-t11", pergunta: "A API do YouTube do Rogério teve a cota cortada depois de vários uploads automáticos. Qual foi o diagnóstico mais provável e a orientação?",
      opcoes: ["Limite normal da conta; basta esperar 24 horas", "Um erro sem tratamento fez o Claude retentar sem parar, como um ataque; o caminho é abrir chamado no Google e, se não resolver, criar outro projeto", "O YouTube proibiu uploads por API", "Ele precisa de um plano pago do Google Cloud"],
      correta: 1, explicacao: "Por isso é preciso pedir tratamento de erro. Voltar ao Cowork clicando em upload seria voltar aos incas e maias." },
    { id: "a3-t12", pergunta: "Você vai criar uma skill de saldo para Google Ads e Meta, mas tem pouca experiência. O que a aula recomenda?",
      opcoes: ["Fazer as duas plataformas juntas para ganhar tempo", "Fazer primeiro uma plataforma, masterizar e depois a outra, porque com duas APIs você precisa tratar o erro de cada uma", "Começar pela Meta, que é mais fácil", "Usar só o MCP, sem API"],
      correta: 1, explicacao: "Construa uma pequena coisa; funcionou, construa a segunda. No fim aparece um baita sistema." },
    { id: "a3-t13", pergunta: "O Valdimir pediu: “Acesse o meu Notion de processos, veja como eu analiso e analise a campanha do cliente X.” O que o Adriano apontou?",
      opcoes: ["Que o Notion não pode ser conectado ao Claude", "Que é preciso separar a construção do uso, e que o documento descrevia um dashboard, e não um processo de análise de campanha", "Que faltou pedir para ele usar o Opus", "Que análise de campanha não pode ser automatizada"],
      correta: 1, explicacao: "Pegar o dado e montar a tela não é análise. A análise seria: campanha, grupo, palavra-chave, termos, índice de qualidade, cenários e ações." },
    { id: "a3-t14", pergunta: "A Thamiris analisa conversas de clientes com CPF e documentos. Qual combinação de cuidados a aula sugeriu?",
      opcoes: ["Não usar IA com dados pessoais de forma alguma", "Mandar o Claude agir 100% dentro da LGPD, preferir sistema local quando der, colocar camadas de segurança e pedir ao modelo mais forte para tentar invadir o próprio sistema", "Usar só o Claude no navegador, que é mais seguro", "Apagar as conversas depois de cada análise"],
      correta: 1, explicacao: "Nenhum sistema é 100% seguro. No último teste, o modelo achou uma chave exposta na sessão e reescreveu o código." },
    { id: "a3-t15", pergunta: "O Renato fez um prompt que preenche contratos a partir da transcrição da reunião, com duas aprovações dele. O que o Adriano sugeriu?",
      opcoes: ["Acrescentar uma terceira aprovação, por segurança", "Simplificar: mandar o cliente preencher um formulário; evita erro de transcrição, tira as conferências e quem preencheu errado foi o cliente", "Desistir de automatizar contratos", "Usar um advogado para revisar cada contrato"],
      correta: 1, explicacao: "Se o agente é burocrático, a automação é burocrática. Ele resolveu um problema e criou outro." },
    { id: "a3-t16", pergunta: "Você quer construir o seu próprio CRM com multiatendimento no WhatsApp. O que a aula diz?",
      opcoes: ["Sempre vale construir, porque sai de graça", "Às vezes sai mais caro construir do que contratar; o que você nunca mais deve fazer é contratar um software sem antes ver se ele tem API completa", "Nunca contrate software, construa tudo", "Contrate o CRM mais barato, com ou sem API"],
      correta: 1, explicacao: "Um CRM profissional é muito trabalho; ele paga em torno de R$ 330 por mês. Com API completa, tudo conversa com tudo." }
  ],

  pratica: [
    {
      id: "a3-p1",
      titulo: "Escrever um prompt no método CTR",
      descricao: "Escolher uma tarefa simples do dia a dia (conferir saldo, montar persona, criar anúncios) e escrever o prompt com contexto, tarefa e resultado, sem deixar nada de fora: quantidade, foco, regras e formato da entrega.",
      perguntas: [
        { id: "a3-pq01", pergunta: "Qual pedaço do prompt diz que a entrega deve ser uma planilha com uma formatação visual específica?",
          opcoes: ["Contexto", "Resultado", "Tarefa", "Nenhum, isso o Claude decide sozinho"],
          correta: 1, explicacao: "Resultado é como a entrega final deve sair. Se é planilha, tem que dizer que é planilha, e como." },
        { id: "a3-pq02", pergunta: "Qual tarefa a aula recomenda para o primeiro prompt?",
          opcoes: ["O processo mais complexo da agência, para já ganhar muito tempo", "Algo simples, como conferir o saldo das contas ou criar uma persona", "Um agente que faz tudo de ponta a ponta", "Um CRM completo"],
          correta: 1, explicacao: "“Não pega a coisa mais complexa de todas.”" }
      ]
    },
    {
      id: "a3-p2",
      titulo: "Rodar o prompt três vezes e ajustar",
      descricao: "Rodar o mesmo prompt pelo menos três vezes. Onde o resultado variar ou sair diferente do que você quer, ajustar o prompt até sair igual em todas as rodadas.",
      perguntas: [
        { id: "a3-pq03", pergunta: "Quando um prompt está pronto para virar skill?",
          opcoes: ["Quando funcionou uma vez", "Quando você roda duas, três, quatro vezes e o resultado sai exatamente do jeito que você quer", "Quando ficou longo o suficiente", "Quando o Claude diz que está bom"],
          correta: 1, explicacao: "O prompt redondo é a premissa de tudo: quanto melhor o prompt, melhor a skill; quanto melhor a skill, melhor o agente." }
      ]
    },
    {
      id: "a3-p3",
      titulo: "Transformar o prompt validado em skill",
      descricao: "Pedir ao Claude: “agora transforma em skill”. Definir os gatilhos de entrada (ex.: quando eu mandar uma URL, quando eu colar um arquivo) e testar chamando pela habilidade.",
      perguntas: [
        { id: "a3-pq04", pergunta: "Depois que o prompt de persona virou skill, como você pede uma persona nova?",
          opcoes: ["Colando o prompt inteiro de novo", "Só pedindo: crie a persona deste site a partir da habilidade de persona", "Abrindo um projeto novo", "Mandando o arquivo da skill no chat"],
          correta: 1, explicacao: "A habilidade já está lá, como algo que o seu cérebro aprendeu a fazer." },
        { id: "a3-pq05", pergunta: "O que significa “definir as condições de entrada” de uma skill?",
          opcoes: ["Definir quem pode usar a skill", "Definir o que dispara cada comportamento: quando eu mandar uma URL faz isto, quando eu colar tal arquivo faz aquilo", "Definir o preço da skill", "Definir em que horário ela roda"],
          correta: 1, explicacao: "Foi o que o Adriano fez na skill de persona: os gatilhos são a URL ou a descrição do negócio." }
      ]
    },
    {
      id: "a3-p4",
      titulo: "Subir a skill como agente autônomo",
      descricao: "No projeto com Vercel e Supabase (o sistema com login da Aula 02), pedir para transformar a skill em agente autônomo: a “cadeira” que roda sozinha nos horários definidos, no fuso de São Paulo, criando os crons necessários. Pode usar a skill de saldo do grupo.",
      perguntas: [
        { id: "a3-pq06", pergunta: "Qual é a forma mais simples de fazer uma skill rodar sozinha uma vez por dia, sem Vercel nem Supabase, e qual é a limitação?",
          opcoes: ["Um cron na Vercel; não tem limitação", "Uma tarefa agendada no próprio Claude; ela depende do computador ligado", "Um alarme no celular; precisa apertar o botão", "O Cowork; só roda de madrugada"],
          correta: 1, explicacao: "É “fácil demais”. Para rodar 24/7 sem depender do computador, sobe para o sistema na nuvem." },
        { id: "a3-pq07", pergunta: "O que o comando para virar agente precisa dizer, segundo a aula?",
          opcoes: ["Só “transforma em agente”", "Que é um agente autônomo, em qual projeto subir, qual cadeira ele é, quantas vezes e em que horários roda, o fuso e que ele pode criar o que precisar, como crons", "Só o nome do agente", "A linguagem de programação que deve usar"],
          correta: 1, explicacao: "Ex.: rodar todos os dias, inclusive feriados, às 10h e às 18h de Brasília. “Crie o que for necessário. Faça agora.”" }
      ]
    },
    {
      id: "a3-p5",
      titulo: "Documentar o seu processo de otimização",
      descricao: "Escrever, na ordem real, como você otimiza uma campanha de rede de pesquisa: o que confere primeiro (rodou? gastou? impressões? cliques?), campanha, grupo, palavra-chave, termos de pesquisa, índice de qualidade, e o que faz em cada cenário.",
      perguntas: [
        { id: "a3-pq08", pergunta: "Qual é o formato que o Adriano descreveu para uma skill de análise de campanha?",
          opcoes: ["Uma tela com os dados da conta", "A ordem da análise (campanha, grupo, palavra-chave, termos, índice de qualidade...) e, para cada cenário possível, o que fazer", "Uma lista de métricas para acompanhar", "Um relatório mensal para o cliente"],
          correta: 1, explicacao: "Puxar os dados e montar a tela é dashboard. A análise vem dos cenários e das ações." }
      ]
    },
    {
      id: "a3-p6",
      titulo: "Montar um cérebro vivo com tarefa agendada",
      descricao: "Escolher uma fonte que muda (canais de YouTube, blogs, concorrentes), montar o cérebro numa pasta e criar uma tarefa agendada semanal que baixa o que é novo e traz um resumo.",
      perguntas: [
        { id: "a3-pq09", pergunta: "Qual destes cérebros NÃO precisa de tarefa agendada de atualização?",
          opcoes: ["Os canais de YouTube de concorrentes", "Um curso gravado que está no seu computador", "Os blogs oficiais do Google e da Meta", "As novidades de tráfego pago de 15 sites"],
          correta: 1, explicacao: "Conteúdo que não muda não precisa de atualização; dependeria de você alimentar de novo." },
        { id: "a3-pq10", pergunta: "Uma pasta “cérebro concorrentes” com 20 subpastas, ou 20 pastas separadas: qual a diferença para o Claude?",
          opcoes: ["As subpastas deixam o Claude mais lento", "Nenhuma: a pasta serve só para você se organizar, o Claude lida com qualquer organização", "As pastas separadas gastam mais tokens", "O Claude só lê uma pasta por vez"],
          correta: 1, explicacao: "“O Claude consegue lidar com toda a sua bagunça mental.”" }
      ]
    },
    {
      id: "a3-p7",
      titulo: "Aplicar segurança e LGPD num sistema seu",
      descricao: "Pedir ao Claude para ler a LGPD e agir 100% dentro dela com dados de terceiros. Revisar as camadas de segurança do sistema da Aula 02 e mandar o modelo mais forte tentar invadir esse sistema, avisando que ele é seu.",
      perguntas: [
        { id: "a3-pq11", pergunta: "Ao pedir para o modelo testar a invasão, o que é importante dizer a ele?",
          opcoes: ["Nada, ele já sabe", "Que o sistema é seu, que você precisa testar a segurança e que ele deve tentar de todas as formas: invadir, quebrar o banco de dados etc.", "Que ele não pode mexer no código", "Que é só para olhar a tela de login"],
          correta: 1, explicacao: "Depois do teste, ele mostra as falhas e pode reescrever o código para fechá-las." }
      ]
    },
    {
      id: "a3-p8",
      titulo: "Conferir se as suas ferramentas têm API",
      descricao: "Listar as ferramentas que a agência usa (CRM, e-mail, contratos, cobrança) e conferir quais têm API completa. Daqui em diante, antes de contratar qualquer software, perguntar se ele tem API.",
      perguntas: [
        { id: "a3-pq12", pergunta: "Com um CRM com API completa e UTM em cada negócio, o que o Adriano consegue fazer?",
          opcoes: ["Só exportar planilhas", "Ler as conversas dos vendedores para avaliar as vendas e, quando o negócio vai para ganho, devolver a venda com o valor como conversão", "Nada além do que o CRM já mostra", "Apenas mandar e-mails"],
          correta: 1, explicacao: "Com o valor da venda devolvido, dá para usar valor de conversão no Google Ads." },
        { id: "a3-pq13", pergunta: "Por que o Adriano não construiu o próprio CRM?",
          opcoes: ["Porque o Claude não sabe fazer CRM", "Porque um CRM profissional é muito trabalho e o preço de um pronto (com API) quase empata com o custo de Supabase e Vercel", "Porque é proibido pela Meta", "Porque ele não tem time de vendas"],
          correta: 1, explicacao: "Tem horas que sai mais caro construir do que contratar, por tempo ou por complexidade." }
      ]
    },
    {
      id: "a3-p9",
      titulo: "Fazer o mapa mental das aulas",
      descricao: "Pegar as transcrições das aulas e pedir: “construa um mapa mental para mim”. Usar o mapa para revisar o que ficou para trás antes da próxima aula.",
      perguntas: [
        { id: "a3-pq14", pergunta: "O Wellington se sentiu perdido com tanta novidade. O que o Adriano orientou?",
          opcoes: ["Assistir de novo todas as aulas inteiras", "Pegar as transcrições e pedir o mapa mental, assistir ao curso de Claude da comunidade se faltar base, e não se deixar travar pela embriaguez de informação", "Pular para a próxima fase", "Esperar a próxima aula"],
          correta: 1, explicacao: "E trazer as dúvidas: para ele, dúvida é o indicador de que a turma está colocando em prática." }
      ]
    }
  ]
};
