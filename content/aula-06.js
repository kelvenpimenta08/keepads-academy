// Mentoria Adriano Gianini (Agentes de IA para Tráfego Pago): conteúdo da Aula 06,
// extraído da transcrição completa da aula.
// Os ids (a6-...) não podem mudar depois que a equipe começar a estudar,
// porque o progresso de cada card fica salvo pelo id.
window.AULAS = window.AULAS || {};
window.AULAS["adriano-ia-trafego"] = window.AULAS["adriano-ia-trafego"] || {};
window.AULAS["adriano-ia-trafego"][6] = {
  numero: 6,
  titulo: "Plano de ação e níveis de rastreamento",
  resumo: "O plano de ação para as duas semanas sem aula (ler Essencialismo, definir os critérios do que construir, criar algo separado e totalmente funcional e usar até zerar as melhorias); os três níveis de rastreamento, a detecção de tráfego de robô e o assistente de instalação da central de rastreio; e as dúvidas da turma sobre WhatsApp, clientes que não fazem a parte deles, monetização e persuasão.",

  flashcards: [
    { id: "a6-c01", pergunta: "Qual era a grande missão da Aula 6?", resposta: "Tirar as dúvidas da turma e deixar um plano de ação para as duas semanas sem encontro ao vivo, já que a mentoria estava fechando só a segunda semana (cerca de 16 horas de conteúdo)." },
    { id: "a6-c02", pergunta: "Por que o Adriano pediu a leitura de “Essencialismo”?", resposta: "Porque a turma ficou com o problema de todo mundo que destravou: “poder demais, foco de menos”. A pergunta deixou de ser “o que eu posso fazer” e passou a ser “o que eu vou fazer agora”." },
    { id: "a6-c03", pergunta: "Como ler “Essencialismo” sem ter tempo?", resposta: "Ouvir o audiobook completo que está no YouTube (cerca de 6 horas). Em 2x vira 3 horas; com meia hora por dia na esteira, na bike ou no transporte, termina em 6 dias. O prazo eram duas semanas." },
    { id: "a6-c04", pergunta: "Quais são os três critérios do Adriano para decidir o que construir com IA?", resposta: "1) O que me faz vender mais; 2) o que economiza tempo; 3) o que economiza dinheiro. “Porque é legal” ou “vou me sentir um fodão” não entram." },
    { id: "a6-c05", pergunta: "Como o Adriano aplicou os critérios ao longo do tempo?", resposta: "Durante uns três meses, tudo o que construiu foi guiado por “isso vai me fazer vender mais?”. Quando isso normalizou, passou para o que economiza tempo e depois para o que economiza dinheiro." },
    { id: "a6-c06", pergunta: "O que faz o cérebro de VSLs do Adriano?", resposta: "Entra na página da VSL, salva com a minutagem, separa pelos pilares (abertura, tese, história e oferta), acha a biblioteca de anúncios da pessoa, salva os anúncios e presume qual é o mais escalado." },
    { id: "a6-c07", pergunta: "Como o cérebro de VSLs presume o anúncio mais escalado?", resposta: "Pelas duas informações que a biblioteca do Meta mostra: quantidade de visualizações e há quanto tempo o anúncio está rodando. Não é certeza, mas ninguém deixa um anúncio que não funciona rodando um ano." },
    { id: "a6-c08", pergunta: "Quais são os quatro passos do plano de ação?", resposta: "1) Ler ou ouvir Essencialismo; 2) definir os critérios do que será construído (ou usar os do Adriano); 3) criar algo separado, porém totalmente funcional; 4) usar até não ter mais bugs, falhas ou melhorias." },
    { id: "a6-c09", pergunta: "O que é o “algo separado, porém totalmente funcional”?", resposta: "Uma, duas ou no máximo três coisas que resolvem o 80/20 das tarefas operacionais que mais tomam seu tempo, escolhidas entre os 5 problemas da tarefa anterior. A Freedom fica no caderno de desabafos por enquanto." },
    { id: "a6-c10", pergunta: "Por que é difícil cumprir o passo 4 (usar até zerar as melhorias)?", resposta: "Porque usar uma coisa que você criou não dá dopamina. Construir é que é empolgante, então a tendência é pular para o próximo projeto antes de deixar o atual funcionando de verdade." },
    { id: "a6-c11", pergunta: "Por que construir as partes antes do todo?", resposta: "Porque a turma tenta construir o todo sem ter a visão das partes. Com três partes funcionando, basta pedir: “faça o que as três fazem em separado juntos”, e o Claude transforma em uma coisa só." },
    { id: "a6-c12", pergunta: "Como a análise de concorrência pode virar Skill e depois agente?", resposta: "Primeiro, uma Skill que roda quando você pede: mapear concorrentes, analisar campanhas e anúncios pela biblioteca e analisar as páginas. Depois, na Freedom, roda uma vez por semana e avisa, por exemplo, que a queda de cliques veio de um anúncio novo do concorrente." },
    { id: "a6-c13", pergunta: "Por que análise de mercado semanal é “impossível para um ser humano”?", resposta: "Um cliente com 5 serviços e 5 concorrentes por serviço já dá 25 análises. Com 10 clientes, são 250 por semana. Um agente faz isso." },
    { id: "a6-c14", pergunta: "Qual foi o “conselho número cinco” sobre o grupo de mentoria?", resposta: "Usar a mente mestra (o conceito da Lei do Triunfo, de Napoleon Hill): antes de quebrar a cabeça sozinho, pergunte no grupo. Alguém pode já ter resolvido e te dar a Skill pronta, em .md." },
    { id: "a6-c15", pergunta: "Qual é o nível 1 de rastreamento e para quem ele basta?", resposta: "Ter a UTM de absolutamente todas as conversões, em todo meio (marketing, CRM etc.). Basta para uns 70 ou 80% da turma: quem joga jogo de fim de funil, de aquisição, em que a pessoa clica, fala e compra." },
    { id: "a6-c16", pergunta: "Qual é o nível 2 de rastreamento?", resposta: "Atribuição, para quem tem jornada de compra longa. O último clique cega: é preciso salvar todos os contatos ou, ao menos, o primeiro e o último." },
    { id: "a6-c17", pergunta: "Quanto tempo os clientes do Adriano levam para comprar?", resposta: "É raro alguém comprar em menos de 3 meses. O cliente ideal compra, em média, depois de 6 meses; os mais difíceis levam um ano; e há a “raça do CAC alto”, que leva dois ou três anos." },
    { id: "a6-c18", pergunta: "O que o exemplo do vídeo da tag do Google Ads ensina sobre atribuição?", resposta: "O vídeo traz muitas vendas como primeiro contato. Olhando só o último clique, a campanha de venda parece linda e o vídeo parece inútil. Se você despreza o primeiro contato, as vendas começam a cair." },
    { id: "a6-c19", pergunta: "O que é o nível 3 de rastreamento?", resposta: "Marketing preditivo: cálculos complexos de incrementalidade (quanto de venda a mais vem com quanto de verba a mais). É jogo de quem investe ao menos um milhão por mês e não pode queimar milhões para descobrir." },
    { id: "a6-c20", pergunta: "Que camada extra o Adriano colocou no próprio rastreamento?", resposta: "Identificação de tráfego de robô. Ele mandou o Claude estudar o IAB, ClickCease e Traffic Guard, e pediu que mostrasse a mídia, o criativo e o público que mais trazem robô." },
    { id: "a6-c21", pergunta: "O que o detector de robô revelou nas campanhas do Adriano?", resposta: "As campanhas de geração de demanda estavam horríveis: em uma delas, de 30 mil investidos, 13 mil foram tráfego de robô. “Eu rasguei treze mil reais sem saber que tinha rasgado.”" },
    { id: "a6-c22", pergunta: "Bloquear tráfego de robô depois do clique resolve?", resposta: "Não. O clique já foi gasto. É preciso não aparecer para o robô. O Adriano rastreia, não bloqueia. Quem tem volume muito alto deve contratar uma ferramenta como o ClickCease, que é barata e já tem as listas de IPs." },
    { id: "a6-c23", pergunta: "Tráfego vindo de IA (ChatGPT, Gemini, Claude) é tráfego de robô?", resposta: "Não. “Tráfego de IA não é tráfego de robô.” É um ser humano chegando via IA. Bloquear robô não bloqueia esse público." },
    { id: "a6-c24", pergunta: "Qual é o indicador de sucesso de rastreabilidade do Adriano?", resposta: "50%. Se de 100 mil de verba ele sabe exatamente o que 50 mil trouxe, já está feliz. Depois da Apple e da LGPD, 100% não existe mais; quem tem 80% está ótimo." },
    { id: "a6-c25", pergunta: "Como rastrear venda que vem 100% pelo WhatsApp, segundo a resposta ao Daniel?", resposta: "Por cruzamento de dados: exportar as conversas, ensinar ao Claude o padrão de cliente novo, recorrente e pós-compra, e cruzar a hora do clique com a conversa no padrão novo. Um micro redirect invisível salva gclid, fbclid, navegador e UTMs." },
    { id: "a6-c26", pergunta: "Qual é a solução mais simples para rastrear cliente local sem CRM?", resposta: "Uma página só sua (tudo que converter ali é seu) e, se for WhatsApp, um chip novo de 10 ou 15 reais com WhatsApp Web próprio. O que vier daquele número é seu." },
    { id: "a6-c27", pergunta: "O que é um rastreamento bem feito para o Adriano?", resposta: "É o que te deixa tomar decisão com segurança: onde colocar mais dinheiro, onde colocar menos e o que pausar. Não é um carimbo de 100% de todos os cliques e vendas, que é tecnologicamente impossível." },
    { id: "a6-c28", pergunta: "Qual é a premissa do Adriano para contratar um software?", resposta: "Só contratar depois de ter certeza de que não pode ou não quer construir. E, se contratar, precisa ter API completa. Foi por isso que ele trocou de CRM." },
    { id: "a6-c29", pergunta: "Como o Adriano ensinou a precificar uma consultoria de IA?", resposta: "Olhar o quanto o problema vale. Ex.: cortar 5 funcionários de 7 mil (custo no Simples) dá 35 mil por mês, vezes 13, uns 455 mil por ano. Cobrar 50 mil em 10 de 5 mil: o cliente paga com a economia." },
    { id: "a6-c30", pergunta: "Com cliente na defensiva, por que fazer uma pergunta em vez de mostrar o dado?", resposta: "Porque mostrar que ele está pior que o concorrente invade o mapa de mundo dele e ativa a defesa. Perguntando “você compraria de você ou dele?”, ele chega à conclusão e sente que a decisão foi dele." }
  ],

  // Prova teórica (nível difícil, situações práticas). "correta" é o índice da opção certa;
  // a ordem das opções é embaralhada a cada tentativa.
  prova_teorica: [
    { id: "a6-t01", pergunta: "Um colega quer passar o fim de semana construindo um painel animado no Claude “porque ficou muito legal”. Ele não vende mais, não economiza tempo nem dinheiro. Pela régua do Adriano:",
      opcoes: ["Não entra na fila: tudo o que se constrói precisa seguir um dos critérios (vender mais, economizar tempo, economizar dinheiro)", "Pode construir, porque treinar a construção sempre vale a pena", "Pode construir, desde que use o Opus", "Deve construir antes de tudo, porque motiva a equipe"],
      correta: 0, explicacao: "Nos critérios do Adriano não existe “porque é legal”. Sem clareza do que e por que construir, ninguém sai do lugar." },
    { id: "a6-t02", pergunta: "Na segunda semana, uma aluna travou tentando desenhar a Freedom inteira, o gestor de tráfego completo. Qual foi a orientação do plano de ação?",
      opcoes: ["Contratar um programador para desenhar a arquitetura", "Deixar a Freedom no caderno de desabafos e construir algo separado e totalmente funcional, resolvendo o 80/20 de uma tarefa operacional", "Construir a Freedom primeiro, porque depois fica mais difícil juntar as partes", "Esperar a próxima aula ao vivo para começar"],
      correta: 1, explicacao: "O todo trava porque falta a visão das partes. Com as partes prontas, juntar fica fácil." },
    { id: "a6-t03", pergunta: "Você criou a primeira versão de um auditor de campanha: metade do trabalho ficou automática e a outra metade continua manual. Você já quer partir para o próximo projeto. O que a aula diz?",
      opcoes: ["Ótimo, metade automática já é uma vitória", "Faça a outra metade em outra ferramenta", "“Você não fez nada da sua vida”: use até não ter mais bugs, falhas ou melhorias antes de ir para o próximo", "Apague e comece de novo com uma Skill maior"],
      correta: 2, explicacao: "O passo 4 protege justamente contra isso. Jamais vá para o próximo antes de deixar o atual funcional." },
    { id: "a6-t04", pergunta: "Um cliente local anuncia, a pessoa clica, chama no WhatsApp e compra no mesmo dia. Que nível de rastreamento ele precisa?",
      opcoes: ["Nível 3, com marketing preditivo", "Nível 2, salvando todos os contatos da jornada", "Nenhum, porque WhatsApp não se rastreia", "Nível 1: ter a UTM de todas as conversões já resolve a imensa maioria dos problemas"],
      correta: 3, explicacao: "Quem joga jogo de fim de funil ou de aquisição, em que clicou, falou, comprou, só precisa do nível 1." },
    { id: "a6-t05", pergunta: "Um infoprodutor vende para quem o acompanha há meses, entre conteúdo, lives e remarketing. Ele só olha a UTM da venda. Qual é o problema?",
      opcoes: ["O último clique o cega: com jornada longa, ele precisa de atribuição, salvando ao menos o primeiro e o último contato", "Nenhum, a UTM da venda é suficiente", "Ele precisa trocar a UTM por pixel", "Ele deveria rodar só remarketing"],
      correta: 0, explicacao: "Se a pessoa compra num remarketing depois de três anos na base, a UTM da venda não diz o que a fez comprar." },
    { id: "a6-t06", pergunta: "Um empresário cansou de produzir conteúdo no Instagram e parou. Semanas depois, as campanhas de venda perderam performance. Qual é a leitura da aula?",
      opcoes: ["Coincidência: conteúdo orgânico não influencia campanha paga", "O primeiro contato que abastecia o segundo morreu; sem salvar o primeiro toque, ele não enxerga isso", "O algoritmo do Meta puniu a conta por inatividade", "As campanhas saturaram e precisam de criativos novos"],
      correta: 1, explicacao: "É o mesmo raciocínio do vídeo da tag do Google Ads: desprezar o primeiro contato derruba as vendas do último." },
    { id: "a6-t07", pergunta: "Um desentupidor sofre ataque pesado de concorrente: troca de IP, VPN e vários navegadores simulados. O que o Adriano recomenda?",
      opcoes: ["Construir um bloqueio pós-clique no próprio site", "Pedir reembolso ao Google Ads, que resolve isso sozinho", "Contratar uma ferramenta como o ClickCease, porque bloquear depois do clique não serve e o tráfego sofisticado é muito complexo de construir", "Pausar a conta por um mês"],
      correta: 2, explicacao: "É preciso não aparecer para o robô. Para o Google, clique de robô é clique, e ele ganha com isso." },
    { id: "a6-t08", pergunta: "O Paulo tem pacientes dizendo que o encontraram pelo ChatGPT, pelo Gemini e pelo Claude. Ele teme que bloquear robô corte esse público. Qual foi a resposta?",
      opcoes: ["Ele precisa escolher: ou bloqueia robô ou recebe tráfego de IA", "Tráfego de IA deve ser bloqueado, porque é automatizado", "Basta liberar só o ChatGPT", "Tráfego de IA não é tráfego de robô: é um ser humano chegando via IA"],
      correta: 3, explicacao: "Além disso, o Adriano não bloqueia robô: ele rastreia." },
    { id: "a6-t09", pergunta: "O Daniel desligou uma campanha de negócio local que, no rastreio, não mostrava venda, e as vendas caíram. As vendas são quase todas pelo WhatsApp. O que o Adriano propôs?",
      opcoes: ["Cruzar dados: ensinar ao Claude o padrão de conversa de cliente novo, cruzar com a hora dos cliques e usar um redirect invisível que salva gclid, fbclid e UTMs, aceitando algum nível de inferência", "Desistir de rastrear WhatsApp e voltar a campanha ao ar para sempre", "Trocar o WhatsApp por formulário em todos os clientes", "Confiar no evento de conversa iniciada do Meta, que é preciso"],
      correta: 0, explicacao: "Para 100%, a resposta é não; para resolver o problema de verdade, é sim. O Meta ainda tem muita discrepância na conversa iniciada." },
    { id: "a6-t10", pergunta: "Um aluno reclama que o rastreamento dele está horrível: de cada 10 vendas, sabe a origem de 8. Pelo critério do Adriano:",
      opcoes: ["Está horrível mesmo, o mínimo aceitável é 95%", "Está ótimo: o indicador de sucesso do Adriano é 50%, e 100% não existe depois da Apple e da LGPD", "Precisa contratar uma ferramenta de atribuição", "Precisa voltar para o último clique"],
      correta: 1, explicacao: "Se de 100 mil de verba ele sabe o que 50 mil trouxe, já é uma amostragem enorme." },
    { id: "a6-t11", pergunta: "A Camille atende um negócio local sem CRM, e o dono não libera o WhatsApp (usa o mesmo número para a vida inteira). Qual é a saída mais simples?",
      opcoes: ["Construir um CRM no Claude e obrigar o cliente a usar", "Exportar as conversas pessoais dele mesmo assim", "Criar uma página só sua e um WhatsApp com chip novo: tudo que vier dali é seu", "Abrir mão do rastreamento e otimizar só por cliques"],
      correta: 2, explicacao: "É a solução “dos Incas e dos Maias”, de quando nem existia pixel. A Camille já tinha gastado tokens num CRM que o cliente não usava." },
    { id: "a6-t12", pergunta: "O time de tráfego comemora 83 leads de mentoria com custo baixíssimo. O painel do Adriano mostra 10 aplicações vindas do tráfego pago e só 1 qualificada. Como o painel foi pensado?",
      opcoes: ["Como uma cópia do Google Ads e do Meta Ads, para ver tudo num lugar só", "Para mostrar só o custo por lead", "Para mostrar só a taxa de conversão de cada campanha", "Para cruzar Hotmart, aplicações e CRM e mostrar o que as plataformas não mostram, como o score das aplicações"],
      correta: 3, explicacao: "Uma campanha com taxa de conversão parecida pode ser disparada melhor se traz aplicações com score mais alto." },
    { id: "a6-t13", pergunta: "Um cliente diz para a Natália: “tem carta branca, eu confio”, mas não libera acesso às conversas nem ao faturamento. Como o Adriano chama isso?",
      opcoes: ["“Sabor autonomia”: se ele te deu autonomia e não te deu acesso, ele não te deu autonomia", "Autonomia completa, porque o acesso é detalhe", "Um bom começo, que dispensa conversa", "Uma desculpa para a agência cobrar menos"],
      correta: 0, explicacao: "Para vender são precisas duas metades: o cliente conhecer o negócio e a agência traduzir isso em campanha. Sem acesso, a segunda metade trava." },
    { id: "a6-t14", pergunta: "O cliente disse não para a sugestão de melhorar o site. Segundo o Adriano, o que importa mais?",
      opcoes: ["Aceitar o não e seguir, porque há boleto para pagar", "O porquê do não: ele pode não ter confiado, achar desnecessário (virou “sommelier de estratégia”) ou não ter dinheiro", "Insistir até ele aceitar", "Cobrar mais caro para compensar"],
      correta: 1, explicacao: "Cada motivo pede um caminho diferente, como lembrar o desejo que ele contou no começo." },
    { id: "a6-t15", pergunta: "Uma empresa tem 10 pessoas no atendimento e você tem certeza de que uma IA permite tirar 5. Cada uma ganha 5 mil e custa uns 7 mil no Simples. Qual é o raciocínio de preço da aula?",
      opcoes: ["Cobrar o preço de mercado de uma automação, uns 2 mil", "Cobrar a economia inteira do primeiro ano", "Mostrar a economia (7 mil x 5 x 13, uns 455 mil por ano) e cobrar uma fração, como 50 mil em 10 de 5 mil, que o cliente paga com o que economiza", "Cobrar por hora de desenvolvimento"],
      correta: 2, explicacao: "Aprenda a olhar o problema e quanto ele vale para alguém. A IA também trabalha 24 por 7 e não adoece." },
    { id: "a6-t16", pergunta: "Você vai escolher um CRM para a agência. Qual é a primeira premissa do Adriano?",
      opcoes: ["Escolher o mais barato do mercado", "Escolher o que tem mais integrações nativas", "Escolher o que os clientes já usam", "Só contratar depois de ter certeza de que não pode ou não quer construir, e exigir API completa"],
      correta: 3, explicacao: "Ter “uma API” não basta: precisa dar acesso a tudo, para ele manter 100% de controle da operação." }
  ],

  pratica: [
    {
      id: "a6-p1",
      titulo: "Ler ou ouvir Essencialismo em duas semanas",
      descricao: "Ler o livro “Essencialismo” ou ouvir o audiobook completo (cerca de 6 horas no YouTube) até a volta das aulas. Encaixar nos intervalos do dia: esteira, bike, trânsito, Uber. Anotar como o livro muda a sua escolha do que construir primeiro.",
      perguntas: [
        { id: "a6-pq01", pergunta: "Você diz que não tem tempo para o livro. Qual foi a conta do Adriano?",
          opcoes: ["Ler 10 páginas por noite durante um mês", "Ouvir o audiobook de 6 horas em 2x (3 horas): com meia hora por dia na bike ou no transporte, termina em 6 dias", "Ler só o resumo gerado pelo Claude", "Pular o livro e ver um vídeo de 10 minutos sobre ele"],
          correta: 1, explicacao: "O prazo era de duas semanas, e quem gosta de dirigir pode ir de Uber em duas reuniões da semana e ouvir." }
      ]
    },
    {
      id: "a6-p2",
      titulo: "Definir os critérios do que será construído",
      descricao: "Escrever os pilares que vão decidir o que você constrói com IA. Pode modelar os do Adriano (vender mais, economizar tempo, economizar dinheiro) ou criar os seus. Colocar em ordem e aplicar como filtro em cada ideia nova antes de construir.",
      perguntas: [
        { id: "a6-pq02", pergunta: "Você adotou os três critérios do Adriano. Como ele os aplicou na prática?",
          opcoes: ["Um por dia, em rodízio", "Por uns três meses, só o que fazia vender mais; quando isso normalizou, passou para o que economiza tempo e depois para o que economiza dinheiro", "Todos ao mesmo tempo, com peso igual", "Só o de economizar dinheiro, porque é o mais fácil de medir"],
          correta: 1, explicacao: "Foi assim que nasceram a página de vendas, a VSL e o cérebro de VSLs: tudo guiado por vender mais." }
      ]
    },
    {
      id: "a6-p3",
      titulo: "Construir algo separado e totalmente funcional",
      descricao: "Pegar um dos 5 problemas que você listou (o 80/20 do que mais toma tempo operacional) e construir uma, duas ou no máximo três coisas separadas, como um auditor de campanha ou um auditor de concorrência (mapear concorrentes, ler a biblioteca de anúncios e analisar as páginas). Pode ficar só no Claude Code.",
      perguntas: [
        { id: "a6-pq03", pergunta: "Seu auditor funciona bem no Claude Code, mas você quer gastar a semana fazendo uma interface web bonita para ele. O que a aula diz?",
          opcoes: ["“Não começa a gourmetizar”: se não tiver interface web, não tem problema nenhum; o importante é ficar 100% funcional", "A interface é obrigatória antes de usar", "Sem interface web ele não pode virar agente depois", "A interface deve vir antes do auditor"],
          correta: 0, explicacao: "Deixe um chat trabalhando na auditoria e vá para outro." },
        { id: "a6-pq04", pergunta: "Uma tarefa toma uma hora por dia, seis dias por semana. Pela conta da aula, por que ela pode valer mais que uma tarefa enorme feita uma vez por semana?",
          opcoes: ["Porque tarefas diárias são sempre mais fáceis", "Porque são 6 horas por semana, umas 24 a 25 por mês e centenas de horas por ano", "Porque o cliente percebe mais", "Porque tarefas semanais não podem ser automatizadas"],
          correta: 1, explicacao: "O critério de escolha é o 80/20 do tempo perdido em tarefas estritamente operacionais." }
      ]
    },
    {
      id: "a6-p4",
      titulo: "Usar até não ter mais bugs, falhas ou melhorias",
      descricao: "Usar a ferramenta criada no dia a dia real até chegar ao ponto de dizer “por hora, não tenho nenhuma melhoria”. Só então ir para o próximo problema. Quando tiver três ou quatro partes prontas, identificar quais se juntam em um agente.",
      perguntas: [
        { id: "a6-pq05", pergunta: "Você tem três ferramentas separadas funcionando e quer criar o agente que faz tudo. Qual é o pedido ao Claude?",
          opcoes: ["Começar o agente do zero, ignorando as três", "“Faça o que as três fazem em separado, juntos”: a base já está construída, ele só transforma em uma coisa só", "Pedir para ele inventar quais partes faltam", "Copiar as três para um único arquivo de texto"],
          correta: 1, explicacao: "É por isso que o Adriano inverteu a ordem: primeiro as partes, depois o todo." },
        { id: "a6-pq06", pergunta: "O agente final depende de você dar um comando, mas você quer que ele rode sozinho. O que o Adriano sugeriu?",
          opcoes: ["Deixar o computador ligado com o chat aberto para sempre", "Se depende de comando, fica no Claude; se precisa ser autônomo, publica numa hospedagem ou servidor", "Pedir ao Claude para lembrar de rodar toda semana", "Transformar em planilha"],
          correta: 1, explicacao: "Autonomia é uma escolha de onde o agente mora, não de como ele foi construído." }
      ]
    },
    {
      id: "a6-p5",
      titulo: "Diagnosticar o nível de rastreamento de cada cliente",
      descricao: "Para cada cliente, classificar a jornada de compra: clicou, falou, comprou (nível 1, UTM em tudo); jornada longa com vários contatos (nível 2, salvar ao menos o primeiro e o último); ou verba muito alta que pede incrementalidade (nível 3). Definir a meta de rastreabilidade de cada um.",
      perguntas: [
        { id: "a6-pq07", pergunta: "Quem deveria se preocupar com o nível 3 (marketing preditivo)?",
          opcoes: ["Todo negócio local que anuncia no Google", "Quem investe pelo menos um milhão por mês e precisa saber quanto de venda virá com mais verba, sem queimar milhões para descobrir", "Quem vende pelo WhatsApp", "Quem tem jornada de mais de três meses"],
          correta: 1, explicacao: "Num cliente que investe 50 por dia, é fácil testar mais verba. O Adriano chuta que quase ninguém da turma vai jogar esse jogo." }
      ]
    },
    {
      id: "a6-p6",
      titulo: "Instalar a central de rastreio com o assistente",
      descricao: "Criar uma pasta, colocar o arquivo ASSISTENTE-DE-RASTREAMENTO.md e pedir ao Claude Code: “Leia o arquivo e seja meu assistente de instalação”. Seguir as 9 etapas: explicação, diagnóstico, reconhecimento dos sites, contas (Supabase e Vercel), banco e receptor, tag nos sites, webhook e UTMs padronizadas, testes com prova no banco e entrega com relatórios e rotina.",
      perguntas: [
        { id: "a6-pq08", pergunta: "No diagnóstico do assistente, um cliente vende só pelo WhatsApp, com vendedor. O que o arquivo recomenda?",
          opcoes: ["Instalação completa com detector de robô", "Não instalar nada", "O carimbo de site ajuda pouco; o mais útil é cada vendedor ter seu link com src e os anúncios terem etiquetas", "Trocar o WhatsApp pela Hotmart"],
          correta: 2, explicacao: "O assistente recomenda com franqueza, conforme a situação de cada negócio." },
        { id: "a6-pq09", pergunta: "A central foi instalada hoje. Quando dá para decidir verba com base nos números dela?",
          opcoes: ["No mesmo dia", "Depois de 3 a 6 meses de histórico; antes disso, os relatórios mostram formato e tendência", "Depois de uma semana", "Nunca, ela serve só para robô"],
          correta: 1, explicacao: "Ela só conta a partir do dia da instalação: o passado não aparece. Por isso o melhor dia para instalar é hoje." }
      ]
    },
    {
      id: "a6-p7",
      titulo: "Ensinar ao Claude os padrões de conversa do WhatsApp",
      descricao: "Com autorização do cliente, exportar as conversas pelo WhatsApp Web, jogar no Claude e pedir que aprenda o padrão de cliente novo, de cliente recorrente e de pós-compra. Depois, cruzar a hora dos cliques nos anúncios com as conversas no padrão de cliente novo para estimar o que veio do tráfego pago.",
      perguntas: [
        { id: "a6-pq10", pergunta: "Por que o padrão da primeira mensagem ajuda a rastrear o WhatsApp?",
          opcoes: ["Porque o WhatsApp manda a UTM junto com a mensagem", "Porque o Meta marca a conversa como paga", "Porque todos os clientes novos mandam a mesma palavra", "Porque o jeito que alguém fala com a empresa pela primeira vez, vindo de anúncio, é diferente de quem já é cliente; com isso, dá para inferir a origem sem gclid"],
          correta: 3, explicacao: "É inferência, mas muito próxima, a ponto de saber que deu ruim ao tirar uma campanha." }
      ]
    },
    {
      id: "a6-p8",
      titulo: "Criar um analista de crenças limitantes no Claude",
      descricao: "Criar no Claude um especialista (psicólogo, psicanalista, programador neurolinguístico) e pedir que analise a sua conversa com um cliente difícil: quais crenças limitantes aparecem e como impactam o seu trabalho. Depois, pedir uma estratégia de quebra dessas crenças.",
      perguntas: [
        { id: "a6-pq11", pergunta: "O analista detectou três crenças limitantes do cliente. Qual é o pedido seguinte que o Adriano sugeriu?",
          opcoes: ["Mandar o relatório de crenças direto para o cliente", "Pedir uma estratégia de quebra dessas crenças com as técnicas de prestidigitação verbal da PNL", "Pedir que o Claude converse com o cliente no seu lugar", "Encerrar o contrato"],
          correta: 1, explicacao: "Até você desenvolver essa competência, o Claude analisa a crença por você. Depois da quebra de crença, a técnica que o Adriano mais usa é a ressignificação." }
      ]
    }
  ]
};
