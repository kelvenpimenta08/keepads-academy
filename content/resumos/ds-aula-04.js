// Resumo por partes e mapa mental da Aula 04 da mentoria Growth Commerce AI (Di Santana),
// feitos a partir da transcrição completa, dos slides e dos agentes entregues na aula.
(function () {
  const aula = ((window.AULAS || {})["di-santana-growth-commerce"] || {})[4];
  if (!aula) return;
  aula.fases = [
    {
      hora: 1,
      rotulo: "1ª parte",
      tempo: "0:00 a 0:37",
      titulo: "A conta antes da campanha",
      ideia: "O Di explica que não existe truque no tráfego pago: o resultado vem da estratégia. Ele mostra a conta de trás para frente, o papel do Meta e do Google e começa a analisar ao vivo os links de campanhas dos mentorados.",
      aprender: [
        "Os pilares do tráfego são criativo, página de destino e montagem da oferta. Em vez de 20% de desconto, dá para dar 10% e diluir o resto em cashback ou desconto no frete.",
        "As quatro decisões são calcular, distribuir, conectar e decidir. A página precisa continuar falando com a pessoa do jeito que o criativo a trouxe.",
        "A mídia vai encarecer, com novos formatos no Meta. O CAC é uma métrica espelho: o jogo é fazer cada sessão valer mais e converter mais.",
        "A conta de trás para frente: R$ 300 mil ÷ R$ 300 de ticket ÷ 1% de conversão dá 1.000 pedidos e 100 mil sessões. Com 70% vindo de mídia paga e CPS de R$ 1,00, o investimento é R$ 70 mil.",
        "Definir verba como porcentagem de um faturamento que ainda não existe é erro. Se a conta certa não fecha, a fórmula do negócio já está quebrada, e é preciso construir orgânico para depender menos da mídia.",
        "O Meta gera demanda e o Google captura. Investir 80% e 20% não tem problema; 100% e 0% deixa outro vender para a demanda que você criou.",
        "Na loja de lingerie, a primeira tela no mobile perdia espaço com banner, filtros e cupom escondido. O conjunto de R$ 69,80 custava o mesmo que as peças separadas, sem vantagem para levar os dois."
      ],
      executar: [
        "Calcular pedidos, sessões e investimento a partir da meta, do ticket e da conversão.",
        "Separar as sessões entre mídia paga, orgânico e CRM pela dependência dos últimos seis meses.",
        "Pegar o link de destino da campanha com pior ROAS e abrir no celular.",
        "Conferir se a primeira tela mostra nome, avaliação e cupom sem exigir scroll.",
        "Dar uma vantagem real para quem leva o conjunto em vez das peças separadas."
      ],
      frase: "Tráfego só joga pessoas no site; o que acontece lá dentro decide a venda."
    },
    {
      hora: 2,
      rotulo: "2ª parte",
      tempo: "0:37 a 1:14",
      titulo: "O destino decide a conversão",
      ideia: "O Di segue analisando páginas reais: uma rede de perfumes que pede CEP na entrada, uma loja de calçados com grade quebrada e uma loja de coleiras personalizadas com escolha em várias etapas. Em todas, o problema estava no destino, não na campanha.",
      aprender: [
        "Pedir o CEP antes de a pessoa ver qualquer coisa é bom para o atendimento, mas ruim para a conversão. O ideal é resolver no produto, mostrando alternativas quando faltar estoque.",
        "Filtros sem sentido só tomam tela, como filtrar por marca numa loja de marca única. Para perfume, filtro inteligente é por essência: floral, cítrico ou amadeirado.",
        "A vitrine precisa mostrar a diferença entre produtos com selos e com a imagem explicativa que hoje só aparece na PDP. Preço repetido em valores diferentes confunde a decisão.",
        "Texto corrido vira iconografia: é mais fácil ler seis ícones do que seis parágrafos. Benefícios devem vir antes do botão de compra.",
        "Na loja de calçados, o produto do anúncio só tinha um tamanho. A versão com mais grade converte mais, e o cupom precisa ser copiável.",
        "No frete, bastam duas opções, a econômica e a rápida. Se já existe subsídio no PAC, vale aplicá-lo também no frete rápido.",
        "Nas coleiras, a escolha pode virar um quiz, com as três cores mais vendidas em destaque, porte no lugar de tamanho e reconfirmação do pedido pelo atendimento depois da compra."
      ],
      executar: [
        "Tirar da entrada do site pedidos de informação que podem ser feitos no produto.",
        "Trocar filtros que não ajudam por filtros que ajudam a escolher.",
        "Colocar selos e ícones na vitrine e na PDP no lugar de textos longos.",
        "Reduzir o frete a duas opções e subsidiar também o frete rápido.",
        "Duplicar a landing page e testar a versão simplificada num teste A/B."
      ],
      frase: "Na maioria das vezes, campanha com baixo resultado tem o problema no destino."
    },
    {
      hora: 3,
      rotulo: "3ª parte",
      tempo: "1:14 ao fim",
      titulo: "Oferta composta e agentes de CRO",
      ideia: "O Di analisa um site de atacado e uma loja de touca de banho, mostra a escada de brindes de um cliente real e entrega no drive os agentes de tráfego e de CRO. Fecha com dúvidas e com a tarefa de arrumar os destinos antes da próxima aula.",
      aprender: [
        "No atacado, funciona fazer curadoria com algumas perguntas e mostrar a lucratividade, como “venda por até tanto e lucre X”. A compra costuma ser no desktop e a pessoa decide pelo preço.",
        "Avisar na primeira tela que não há frete grátis quebra a expectativa. É melhor destacar quando o pedido chega e deixar o frete para mais à frente.",
        "Produtos commodity viram brinde com o preço cheio visível, porque o brinde não pode valer zero. Uma escada de brindes libera recompensas conforme o ticket sobe.",
        "Para montar as combinações, baixe os pedidos dos últimos seis meses e peça à IA as combinações que mais saem. O cliente da escada de brindes fatura de R$ 100 mil a R$ 150 mil por dia.",
        "O link de destino costuma ser a última coisa da campanha, mas deveria ser quase a primeira. Até um leigo faz campanha funcionar se leva a pessoa a um lugar que converte.",
        "No drive estão os agentes de tráfego (estratégia, análise de Meta Ads e de Google Ads) e os de revisão de oferta, CRO UX e UX UI. Os de CRO e UX estudam todo dia os exemplos do Baymard, com mais de 18 mil páginas.",
        "A equipe do Di mexe em páginas com IA em plataformas como Shopify e Nuvemshop. Quando o site exige código manual, ela indica parceiros."
      ],
      executar: [
        "Baixar os pedidos dos últimos seis meses e pedir à IA as combinações que mais saem.",
        "Montar uma escada de brindes com o preço cheio de cada brinde visível.",
        "Rodar os agentes de CRO UX e UX UI na página de destino das campanhas.",
        "Compartilhar a página no grupo da mentoria para receber opiniões.",
        "Enviar ao Di o feedback dos agentes depois de rodá-los."
      ],
      frase: "Não é sobre o botão apertado, é sobre para onde você leva as pessoas."
    }
  ];
  aula.mapa = {
    centro: "Tráfego pago começa no destino",
    ramos: [
      {
        titulo: "Conta reversa",
        itens: [
          "Meta ÷ ticket ÷ conversão",
          "Sessões pagas × CPS",
          "Verba não é % do faturamento",
          "Menos dependência de mídia"
        ]
      },
      {
        titulo: "Canais e sistema",
        itens: [
          "Meta gera demanda",
          "Google captura intenção",
          "Produto, oferta e criativo",
          "Página, checkout e CRM"
        ]
      },
      {
        titulo: "Primeira tela mobile",
        itens: [
          "Primeiros três segundos",
          "Cada scroll perde público",
          "Banner menor e cupom visível",
          "Nome e avaliação no topo",
          "Filtros só se ajudarem"
        ]
      },
      {
        titulo: "Vitrine e PDP",
        itens: [
          "Selos que mostram a diferença",
          "Ícones no lugar de texto",
          "Benefícios antes do botão",
          "Grade completa no anúncio",
          "Mais vendidos em destaque"
        ]
      },
      {
        titulo: "Frete e checkout",
        itens: [
          "Econômico e rápido",
          "Subsídio no frete rápido",
          "Mostrar quando chega",
          "CEP no produto, não na entrada"
        ]
      },
      {
        titulo: "Composição da oferta",
        itens: [
          "Conjunto com vantagem real",
          "Brinde com preço cheio",
          "Escada de brindes por ticket",
          "Combinações dos pedidos com IA"
        ]
      },
      {
        titulo: "Agentes e testes",
        itens: [
          "Estrategista de Tráfego Pago",
          "Análise de Meta e Google Ads",
          "CRO UX e UX UI",
          "Estudo diário no Baymard",
          "Duplicar a página e testar A/B"
        ]
      }
    ]
  };
})();
