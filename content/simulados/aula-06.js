// Simulado da Aula 06 (Adriano Gianini): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[6];
  if (!aula) return;
  aula.simulado = [
    { id: "a6-s01", pergunta: "Depois de duas semanas de mentoria, um aluno abre dez projetos ao mesmo tempo no Claude e não termina nenhum. Segundo o Adriano, qual é o problema dele?",
      opcoes: ["Falta de conhecimento técnico para terminar os projetos", "Plano do Claude com limite baixo demais", "Poder demais e foco de menos: a pergunta passou a ser o que ele vai fazer agora, não o que ele pode fazer", "Falta de um segundo monitor"],
      correta: 2, explicacao: "É o problema de todo mundo que destravou. Por isso a primeira tarefa do plano é o livro Essencialismo." },
    { id: "a6-s02", pergunta: "Você está há dias quebrando a cabeça para resolver uma automação. Qual foi o conselho do Adriano baseado na ideia de mente mestra?",
      opcoes: ["Perguntar no grupo da mentoria: alguém pode já ter resolvido, seguido um caminho mais simples, e te mandar a Skill pronta", "Só perguntar ao Claude, nunca a outras pessoas", "Esperar a próxima aula ao vivo", "Desistir do problema e escolher outro"],
      correta: 0, explicacao: "O grupo que caminha para um objetivo em comum é mais forte que a individualidade. E hoje o presente entre gestores é uma Skill em .md." },
    { id: "a6-s03", pergunta: "Por que o Adriano diz que não dá para pedir ao Claude algo de que você não tem a menor ideia de que existe?",
      opcoes: ["Porque o Claude recusa pedidos vagos", "Porque o Claude só faz o que está em Skills instaladas", "Porque pedidos assim gastam tokens demais", "Porque existe um limite: você precisa ao menos saber que não sabe; o que você não sabe que não sabe, você não tem como pedir"],
      correta: 3, explicacao: "Por isso não adianta só sair pedindo: o conhecimento técnico continua necessário para enxergar o que é possível." },
    { id: "a6-s04", pergunta: "Pelo padrão do IAB citado na aula, como se divide o tráfego de robô?",
      opcoes: ["Em robô do Google e robô do Meta", "Em tráfego comum e tráfego sofisticado, este último extremamente complexo de bloquear", "Em robô bom e robô ruim, conforme o navegador", "Em tráfego nacional e internacional"],
      correta: 1, explicacao: "O sofisticado simula navegadores, usa VPN e troca de IP o tempo inteiro, como nos ataques de concorrente em desentupidora." },
    { id: "a6-s05", pergunta: "Ao criar o painel de visitas do Jarvis, o Adriano e o Claude precisaram definir o que é uma visita real. Uma visita de um segundo conta?",
      opcoes: ["Não: em um segundo não dá para ler nem fazer nada, isso é robô", "Sim, toda visita registrada conta igual", "Sim, se veio de anúncio pago", "Só se a pessoa estiver no celular"],
      correta: 0, explicacao: "Esse “Google Analytics” do Jarvis é só no sentido de contar visitas, mas com uma régua do que é visita de gente." },
    { id: "a6-s06", pergunta: "Depois de construir o detector de robô, que pergunta o Adriano fez ao sistema para agir sobre o problema?",
      opcoes: ["Qual é o horário com mais visitas", "Quantos robôs existem na internet", "Qual é a mídia, o criativo e o público da campanha que mais trazem tráfego de robô", "Quanto o Google vai devolver de reembolso"],
      correta: 2, explicacao: "Foi assim que ele descobriu que as campanhas de geração de demanda concentravam robô." },
    { id: "a6-s07", pergunta: "O Paulo diz que é impossível rastrear quem liga no telefone fixo da clínica, que só aparece no site e, às vezes, no cartão de visita. O que o Adriano respondeu?",
      opcoes: ["Que é preciso trocar o fixo por um número virtual com gravação", "Que ligação nunca deve ser considerada conversão", "Que é preciso tirar o fixo do site", "Se o único lugar onde o número aparece é o site, a ligação veio de lá; se aparece também no cartão, divida meio a meio"],
      correta: 3, explicacao: "Raciocínio lógico resolve muito rastreamento que parece impossível." },
    { id: "a6-s08", pergunta: "Numa imersão de persuasão, a turma debateu a diferença entre persuasão e manipulação. A que conclusão o Adriano chegou?",
      opcoes: ["Persuasão é sempre boa e manipulação é sempre ruim, sem exceção", "A linha é tão tênue que quase não existe; o que importa é perceber que invadir o mapa de mundo da pessoa ativa a defesa dela", "Manipulação é usar dados e persuasão é usar histórias", "Só existe manipulação quando o produto é ruim"],
      correta: 1, explicacao: "“É bom para ele” sob a ótica de quem? Quanto mais se filosofa, mais tênue fica a linha." },
    { id: "a6-s09", pergunta: "Um prospect diz: “eu não acredito que marketing funcione”. Segundo o Adriano, o que isso significa para a venda?",
      opcoes: ["Que sem quebrar essa crença não há venda, porque o que você vende depende de ele acreditar que marketing funciona", "Que basta mostrar um case e ele muda de ideia", "Que é um bom sinal, porque ele está aberto", "Que a crença não interfere em contratos de tráfego"],
      correta: 0, explicacao: "Aí é escolher: deixar a vida ensinar ou, se há boleto para pagar, contar uma história e levá-lo a chegar à conclusão." },
    { id: "a6-s10", pergunta: "A Natália acaba fazendo pelo cliente tudo o que ele não faz: pedir avaliação, acompanhar atendimento, mexer no site. O que o Adriano disse sobre isso?",
      opcoes: ["Que é obrigação da agência fazer tudo", "Que ela deve recusar qualquer tarefa fora das campanhas", "Que ela deve passar tudo para a IA sem cobrar", "Que é escolha dela, mas é obrigatório setar um limite: se for fazer dez coisas, não pode cobrar por uma"],
      correta: 3, explicacao: "Campanha, automação e análise são entregas diferentes, e cada uma tem preço." },
    { id: "a6-s11", pergunta: "O Adriano mudou a política de privacidade dos sites dele (depois de ler a LGPD e consultar o advogado). O que isso permitiu no rastreamento?",
      opcoes: ["Bloquear todo tráfego de robô na entrada", "Dispensar o uso de UTMs", "Criar um cookie enviado ao servidor e usado em todos os sites dele, recuperando a atribuição quando a pessoa volta meses depois", "Ler o WhatsApp dos clientes"],
      correta: 2, explicacao: "Assim, quem conheceu o site institucional e comprou depois por um remarketing ainda tem o primeiro contato registrado." },
    { id: "a6-s12", pergunta: "O cliente do Daniel, conectado a um agente num grupo de WhatsApp com cérebros e a conta de anúncios, perguntou quanto custava aquilo. Qual lição o Adriano tirou?",
      opcoes: ["Que esse tipo de serviço não deve ser cobrado", "Que a turma está na “bolha da bolha da bolha”: o que parece óbvio para vocês é valioso para o empresário, que quer vender mais com menos esforço e custo", "Que o certo é vender o agente como SaaS", "Que o cliente deveria ter construído sozinho"],
      correta: 1, explicacao: "Uma simples conversa sobre o problema do empresário já planta a semente de uma consultoria de IA." }
  ];
})();
