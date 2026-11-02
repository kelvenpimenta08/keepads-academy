// Resumo por hora e mapa mental da Aula 05 (Adriano Gianini), feitos a partir da transcrição completa.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[5];
  if (!aula) return;
  aula.fases = [
    {
      hora: 1,
      tempo: "0:00 a 1:00",
      titulo: "Extrair o processo que você já faz",
      ideia: "Antes de construir o gestor de tráfego, o Adriano separa processo (as etapas) de procedimento (como cada etapa é feita). A turma aprende a extrair o próprio jeito de otimizar e escreve o processo de negativação de termos de pesquisa.",
      aprender: [
        "Processo são as etapas; procedimento é o como de cada etapa. Ao delegar “criar uma conta no Google Ads” em 5 passos, você assume que a pessoa sabe quais dados preencher, de onde tirar e se a conta é de pessoa física ou jurídica.",
        "Um processo está bem feito quando, seguindo as etapas à risca, o resultado acontece, e dá para conferir com sim ou não. Processos grandes viram microprocessos: persona é premissa do planejamento, que é premissa do anúncio.",
        "“Eu olho as métricas e vejo o que não está bom” não é processo, é um resumo. Quem faz muito faz no automático, como quem dirige e esquece a embreagem. Se você escreve “analise minha campanha”, o Claude entrega a otimização média da internet.",
        "O método em 6 passos: gravar a tela narrando em voz alta, quebrar a fala em etapas, fazer 5 perguntas para cada etapa (como “o que eu olho?” e “como sei se está bom?”), caçar o “depende” (é sempre uma regra escondida), escrever o processo e testar a skill.",
        "Exemplo de fala que vira etapas: “o CPA subiu para 62 e a meta é 45, qual campanha puxou isso?” vira conferir o histórico, comparar com a semana anterior, comparar o CPA com a meta, achar a campanha e abrir os termos de pesquisa.",
        "Tudo o que você não deixar declarado, a IA decide por você. No processo do Paulo, se o nome tem dois F, quem busca “Jefferson” com um F só poderia ser negativado. E “produto de limpeza de sofá” tem relação com o problema, mas não com o que a empresa vende.",
        "Exemplos de termos bons e ruins, com o porquê, funcionam melhor que explicações longas. Pedir “possíveis causas” abre espaço para a IA inventar. Sem dados de venda, a otimização é orientada a cliques (amadora); com dados, é orientada à performance (profissional)."
      ],
      executar: [
        "Escrever em 10 minutos o seu processo de otimização de termos de pesquisa do Google Ads, terminando com a lista de termos que você negativaria.",
        "Executar uma otimização real seguindo exatamente o que escreveu, para achar as etapas que faltaram.",
        "Gravar um áudio ou vídeo longo explicando o como de cada etapa mais difícil.",
        "Pedir que a skill traga uma proposta de negativação para você aprovar, em vez de negativar sozinha."
      ],
      frase: "O seu diferencial nunca foi saber otimizar, e sim o seu jeito de otimizar."
    },
    {
      hora: 2,
      tempo: "1:00 a 2:00",
      titulo: "Análise, aprovação e o planejador de campanha",
      ideia: "Com o exemplo da Natália, o Adriano mostra que otimizar é analisar, decidir e executar, com aprovação humana no meio. Depois desenha o planejador de campanha e ensina a não travar na etapa mais difícil.",
      aprender: [
        "A Natália subiu tudo o que tinha escrito e o Claude leu 1.577 negativas já feitas em um cliente para aprender o padrão dela: concorrentes, exames que a clínica não faz, outras cidades e convênio. Não precisa ditar tudo: use o histórico que você já tem.",
        "Sugestão do Adriano: transformar o relatório em uma página com o que negativar, o porquê e três botões: aceito tudo, não aceito nada e aceito parcialmente. Se fazer pelo Claude toma o mesmo tempo que direto no Google, você não ganhou nada.",
        "A cadeira de otimizador tem dois grandes grupos: um analisa e propõe melhorias (termos, palavras-chave, anúncios, locais), o outro só executa. O Adriano só dá carta branca quando o agente passa uns 30 dias sem errar.",
        "“Não trate uma IA como uma ferramenta de automação.” Em vez de listar o que fazer e o que não fazer, ensine o seu raciocínio e o contexto da decisão, como faria com um ser humano. O que você treina uma vez, ela não esquece.",
        "A solução profissional é a que resolve o problema e faz ganhar tempo. Para o Leandro avisar clientes sobre saldo, bastou uma coluna com o link wa.me de cada um e o WhatsApp Web logado no Chrome, com o computador ligado.",
        "O planejador de campanha: analisar a persona, entender a estratégia e a verba do cliente, pesquisar e agrupar palavras-chave sem limitar pela verba ainda, criar os anúncios, analisar a página e trazer a proposta para aprovação antes de publicar.",
        "Escolher quais serviços anunciar (o principal, o 80/20 ou o produto de entrada) é decisão estratégica e vira uma etapa antes do planejamento. Se de 12 etapas uma é um monstro, automatize as outras 11 e grave essa umas 30 vezes até a IA aprender o padrão."
      ],
      executar: [
        "Pedir ao Claude que analise as negativas já feitas na conta e explique o padrão de decisão encontrado.",
        "Pedir uma interface web com a proposta de negativação e os botões aceito tudo, não aceito e aceito parcialmente.",
        "Escrever como você decide quais serviços de um cliente anunciar e por quê.",
        "Deixar a etapa mais complexa manual e gravar cada vez que fizer, guardando no caderno de desabafos."
      ],
      frase: "Não trate uma inteligência artificial como uma ferramenta de automação."
    },
    {
      hora: 3,
      tempo: "2:00 ao fim",
      titulo: "Construir, usar e medir o tempo ganho",
      ideia: "O Adriano reforça que uma ferramenta só amadurece com uso e passa as tarefas da próxima aula: ler as três skills do plugin e listar cinco problemas que mais tomam tempo.",
      aprender: [
        "Construa e use. Algo útil de verdade só aparece depois do uso, como todo software maduro. O criador de persona já recebeu pelo menos 15 melhorias, incluindo a análise de risco de mercado.",
        "A primeira vitória do Jarvis foi só trazer ideias de pauta: antes era uma semana entre reunião e pesquisa, agora são 30 minutos. Apagar o que não serviu não deixa a IA mais burra.",
        "Leia as skills dos outros: o resultado final pode ser o mesmo, mas o processo e os critérios de cada um são diferentes.",
        "A conta do tempo: resolver um problema de 2 horas por dia dá 40 horas por mês, 5 dias úteis, e 480 horas por ano. Para saber o valor da sua hora, divida o faturamento mensal pelas horas trabalhadas.",
        "Use a IA também nas coisas simples. O Adriano mandou preencher os formulários em PDF do condomínio novo e ganhou uma ou duas horas; pedir orçamentos a três empresas também dá."
      ],
      executar: [
        "Ler linha por linha os arquivos .md das três skills do plugin (persona, planejador de campanha e criador de anúncios), sem só instalar.",
        "Listar cinco problemas em ordem do que mais toma tempo para o que menos toma, com as horas de cada um.",
        "Calcular quanto vale a sua hora e quanto tempo por ano cada problema resolvido devolveria.",
        "Começar a pensar como resolver o problema número um no Claude."
      ],
      frase: "Algo realmente útil e funcional só aparece depois do uso."
    }
  ];
  aula.mapa = {
    centro: "Do processo na cabeça à skill",
    ramos: [
      { titulo: "Processo e procedimento", itens: ["Processo são as etapas", "Procedimento é o como de cada etapa", "Sucesso conferível com sim ou não", "Quebrar em microprocessos com premissas"] },
      { titulo: "Extrair seu processo", itens: ["Gravar a tela narrando em voz alta", "Quebrar a fala em etapas", "5 perguntas para cada etapa", "Caçar o “depende” escondido", "Executar o que escreveu antes da skill"] },
      { titulo: "Negativação de termos", itens: ["Saída: termos que você negativaria", "Declarar o que quer e não quer", "Dar exemplos bons e ruins", "Histórico de negativas ensina o padrão", "Sem dados de venda, otimizar por cliques"] },
      { titulo: "Aprovação humana", itens: ["Analisar, decidir e executar", "Um grupo propõe, outro executa", "Botões: tudo, nada ou parcial", "Carta branca após 30 dias sem erro"] },
      { titulo: "IA não é automação", itens: ["Ensine o raciocínio, não regras soltas", "Treine como treinaria um ser humano", "Solução boa resolve e ganha tempo", "WhatsApp Web com link wa.me"] },
      { titulo: "Planejador de campanha", itens: ["Persona, estratégia e verba", "Planejar sem limitar pela verba", "Decisão estratégica antes do planejamento", "Etapa monstro fica manual e gravada", "Proposta para aprovação antes de publicar"] },
      { titulo: "Usar e medir tempo", itens: ["Construir e usar para amadurecer", "Ler as três skills do plugin", "Listar 5 problemas por tempo", "2 horas por dia são 480 por ano"] }
    ]
  };
})();
