// Simulado da Aula 04 (Di Santana): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["di-santana-growth-commerce"] || {})[4];
  if (!aula) return;
  aula.simulado = [
    { id: "ds-a4-s01", pergunta: "Para a Black, o dono quer dar 20% de desconto direto em tudo. Pelo conceito de compor a oferta da aula, qual alternativa o Di sugeriria?",
      opcoes: ["Dar 30% de desconto para se destacar da concorrência", "Manter 20% e esconder o frete até o pagamento", "Tirar o desconto e investir o valor em mais mídia", "Dar 10% de desconto e diluir os outros 10% em cashback ou desconto no frete"],
      correta: 3, explicacao: "O composto da oferta pesa muito na decisão: o mesmo esforço dividido entre desconto, cashback e frete pode converter mais." },
    { id: "ds-a4-s02", pergunta: "O anúncio traz a pessoa com a promessa de “kit para pele oleosa”, mas o clique cai na home genérica da loja. Qual das quatro decisões do tráfego falhou?",
      opcoes: ["Calcular, que define pedidos, sessões e investimento", "Conectar, que mantém a narrativa do anúncio na página e no checkout", "Distribuir, que define o papel de cada canal", "Decidir, que lê o funil antes de escalar"],
      correta: 1, explicacao: "Conectar é garantir que a página continue falando com a pessoa do jeito que o criativo a trouxe, até o checkout." },
    { id: "ds-a4-s03", pergunta: "Um mentorado pede ao Di técnicas para baixar o CAC no gerenciador. Qual é a resposta coerente com a aula?",
      opcoes: ["O CAC é métrica espelho e a mídia vai encarecer: o jogo é fazer cada sessão valer mais e converter mais", "Basta trocar de público a cada semana para baixar o CAC", "O CAC cai sozinho quando a verba aumenta", "O CAC só importa no Google, não no Meta"],
      correta: 0, explicacao: "O Di não ensina a pagar menos no CPS ou no CAC; quem tirar mais eficiência de cada sessão no site leva o jogo." },
    { id: "ds-a4-s04", pergunta: "Por que as mudanças previstas no Meta, como espaço reservado sem concorrentes e anúncios em expansão no Reels, preocupam lojas de verba menor?",
      opcoes: ["Porque o Meta vai deixar de aceitar anúncios de e-commerce", "Porque esses formatos só funcionam para quem vende no atacado", "Porque favorecem quem tem muita verba e encarecem o tráfego para os outros", "Porque obrigam todas as lojas a anunciar também no Google"],
      correta: 2, explicacao: "O Meta passa a ganhar também com tempo de audiência; quem tem mais verba ocupa esses espaços e o leilão encarece para os demais." },
    { id: "ds-a4-s05", pergunta: "A loja tem produto, oferta, criativo, página e checkout ajustados, mas nenhum trabalho com a base depois da compra. Qual papel da cadeia está faltando?",
      opcoes: ["O do checkout, que deveria trazer o cliente de volta", "O do criativo, que deveria fidelizar o comprador", "O da página, que deveria mandar e-mails pós-compra", "O do CRM, que faz cada real investido voltar em lucratividade"],
      correta: 3, explicacao: "Na cadeia produto, oferta, criativo, página, checkout e CRM, o checkout flui a conversão e o CRM transforma o investimento em lucratividade." },
    { id: "ds-a4-s06", pergunta: "Uma PDP de bolsa explica em três parágrafos que é couro legítimo, tem 15 cores e garantia de um ano. O que o Di faria com esse conteúdo?",
      opcoes: ["Transformaria os benefícios em ícones, que são muito mais rápidos de ler", "Aumentaria o texto para passar mais autoridade", "Moveria o texto para o rodapé, depois das avaliações", "Tiraria as informações para deixar a página limpa"],
      correta: 0, explicacao: "Ler seis ícones é mais fácil e rápido do que ler seis parágrafos; benefícios como couro legítimo em 15 cores ficam melhores como ícones." },
    { id: "ds-a4-s07", pergunta: "Um site de atacado de cosméticos mostra só uma grade enorme de produtos e converte pouco. O que funciona nesse tipo de site, pela experiência do Di?",
      opcoes: ["Esconder os preços para forçar o contato com o vendedor", "Priorizar vídeos longos de marca na primeira tela", "Fazer curadoria com algumas perguntas e mostrar a lucratividade, como “venda por até tanto e lucre X”", "Copiar a vitrine do varejo, com banners de desconto"],
      correta: 2, explicacao: "No atacado a pessoa olha preço e decide, muitas vezes no desktop; curadoria e lucratividade facilitam essa decisão." },
    { id: "ds-a4-s08", pergunta: "O time quer montar combinações de produtos e cross-sell na jornada, mas ninguém sabe quais itens costumam sair juntos. Como a aula sugere descobrir?",
      opcoes: ["Perguntar aos vendedores quais produtos eles mais indicam", "Baixar os pedidos dos últimos seis meses e pedir à IA as combinações que mais saem", "Copiar os kits que os concorrentes estão anunciando", "Combinar sempre o produto mais caro com o mais barato"],
      correta: 1, explicacao: "Os pedidos reais mostram as combinações de compra; com elas se monta o cross-sell e a sequência da oferta até o checkout." },
    { id: "ds-a4-s09", pergunta: "Um gestor só usa a IA fazendo perguntas pontuais e recebe respostas rasas. Como o Di usa os agentes de CRO e UX de forma diferente?",
      opcoes: ["Coloca a IA para estudar todo dia uma base de referência, como o Baymard, para ela já ter conhecimento acumulado", "Faz perguntas mais longas e detalhadas a cada vez", "Usa várias IAs diferentes para a mesma pergunta e tira a média", "Pede respostas sempre em formato de tabela"],
      correta: 0, explicacao: "Gastando tokens com estudo diário, a IA acumula conhecimento e, quando o Di pergunta, ela já responde mastigado." },
    { id: "ds-a4-s10", pergunta: "O tráfego de uma loja não traz resultado e o gestor procura um “truque” novo dentro do gerenciador. Quais três pilares o Di manda revisar antes?",
      opcoes: ["Público, lance e posicionamento", "Verba, frequência e horário de veiculação", "Pixel, domínio e catálogo", "Criativo, página de destino e montagem da oferta"],
      correta: 3, explicacao: "Para o Di não existe truque dentro do tráfego pago: o diferencial é a estratégia montada em volta dele." },
    { id: "ds-a4-s11", pergunta: "O dono aprova o novo layout da loja olhando só a tela grande do computador do escritório. Por que o Di analisa as páginas sempre no celular?",
      opcoes: ["Porque o celular carrega mais rápido que o computador", "Porque quase todo mundo abre pelo celular, ele estima mais de 85%, e a primeira tela decide se a pessoa segue", "Porque o Meta só entrega anúncios para celular", "Porque o desktop não mostra o cupom de desconto"],
      correta: 1, explicacao: "A maioria chega pelo mobile e os primeiros três segundos decidem se a pessoa continua; cada scroll exigido perde público." },
    { id: "ds-a4-s12", pergunta: "Clientes de uma loja de perfumes importados hesitam porque não sabem se o produto é original. O que fazer na PDP?",
      opcoes: ["Baixar o preço para parecer mais acessível", "Deixar a informação só na página de perguntas frequentes", "Subir para perto da decisão a informação que quebra a objeção, como “o produto é original”", "Mandar a garantia apenas por e-mail depois da compra"],
      correta: 2, explicacao: "Na revisão da PDP, a aula pede para subir as informações que quebram objeções, junto com benefícios antes do botão de compra." }
  ];
})();
