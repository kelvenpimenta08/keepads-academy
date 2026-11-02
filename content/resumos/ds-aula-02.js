// Resumo por partes e mapa mental da Aula 02 da mentoria Growth Commerce AI (Di Santana),
// feitos a partir da transcrição completa e dos materiais da aula.
(function () {
  const aula = ((window.AULAS || {})["di-santana-growth-commerce"] || {})[2];
  if (!aula) return;
  aula.fases = [
    {
      hora: 1,
      rotulo: "1ª parte",
      tempo: "0:00 a 0:32",
      titulo: "Os drivers que movem o e-commerce",
      ideia: "Depois de preparar as conexões (pesquisas, MCP do Axoly e Windsor), o Di apresenta a tese da aula: receita não se planeja, se calcula. Ele separa métricas key de métricas drivers e explica, um a um, os drivers que formam a receita.",
      aprender: [
        "Respostas de pesquisa coletadas fora da ferramenta podem subir na aba Pesquisas do Axoly, em Importar arquivo, no modelo CSV. Quanto mais frio o público, mais o incentivo vira a alavanca para ter respostas.",
        "O MCP do Axoly fica em Dados, Conectores, e entra no ChatGPT ou no Claude pela área de conectores. O Windsor conecta Meta Ads, Google Analytics e Google Ads e serve de ponte de backup do histórico.",
        "Métrica key mostra o que aconteceu, como receita e ROAS. Métrica driver é a alavanca que o time controla, como conversão, ticket, aprovação e CPS. A receita nasce da cascata: investimento, sessões, pedidos, receita captada e receita faturada.",
        "No caso real de outubro, sessões e ticket se mantiveram, mas menos gente foi do produto para o carrinho. O cashback dobrado, um desconto futuro, destravou o carrinho e sai mais barato que o custo de aquisição da Black.",
        "Escalar só com mídia aumenta o risco: sair de 60% para 90% de dependência de Meta deixa o negócio refém de um canal. A retenção saudável fica entre 25% e 30% com crescimento; acima de 40% indica aquisição fraca.",
        "Na aprovação, réguas de recuperação de Pix, boleto e cartão recuperam em média 50%. De R$ 40 mil não pagos, uns R$ 20 mil voltariam ao caixa. Cuidado com meios de pagamento que escondem o Pix não pago.",
        "Ticket se mantém, não se escala. A conversão é a grande alavanca e melhora quando a oferta reduz seis incertezas: preço percebido, frete, prazo, vantagens antes, benefícios depois e provas sociais."
      ],
      executar: [
        "Importar as respostas de pesquisa em CSV na aba Pesquisas do Axoly.",
        "Conectar o MCP do Axoly e o Windsor à sua IA de preferência.",
        "Comparar o funil do Google Analytics (produto, carrinho, checkout, compra) com o mês anterior.",
        "Testar o site em vários aparelhos com o Mobile Simulator, em Performance, CRO."
      ],
      frase: "Receita não se planeja: se calcula, compondo o esforço de cada área."
    },
    {
      hora: 2,
      rotulo: "2ª parte",
      tempo: "0:32 a 0:59",
      titulo: "Decidir o foco e calcular a meta da Black",
      ideia: "Enquanto a IA puxa os dados, o Di treina a decisão pelos drivers com um exemplo de queda de receita e faz ao vivo a conta de trás para frente da meta da Black de um mentorado, respeitando sazonalidade, guardrails e o que o negócio sustenta.",
      aprender: [
        "Com o arquivo do agente de planejamento no chat, basta pedir as métricas drivers de janeiro a outubro em tabela mês a mês. O agente já sabe, por exemplo, separar sessão orgânica de mídia.",
        "Receita caiu 18%: conversão -23%, CPS +34%, aprovação -15%, retenção -20%, ticket estável. A turma apontou CPS, base e aprovação, mas o Di iria direto na conversão, que coloca a loja no trilho mais rápido.",
        "A meta respeita a curva do negócio. Se no ano passado a loja cresceu 22% ao mês e 40% na Black, e este ano cresce 12%, a Black deste ano deve crescer proporcionalmente menos.",
        "Investimento em mídia não se calcula como percentual do faturamento. A conta reversa do mentorado: R$ 400 mil ÷ R$ 212 dá 1.886 pedidos; ÷ 90% dá 2.095 captados; ÷ 1,2% dá 174.583 sessões.",
        "Tirando 15 mil sessões orgânicas, sobram 159.583 sessões pagas. Com CPS de R$ 0,90, são cerca de R$ 143.624 de investimento. Na Black, a oferta tende a baixar o ticket e subir a conversão.",
        "Guardrails mostram quanto cada métrica subiu ou caiu na Black passada. Se a conversão subiu 15%, aplique esse ganho sobre a conversão atual para ter uma premissa segura.",
        "Os cenários base, recomendado e agressivo mostram o desafio que você vai comprar. A meta só é aprovada se o negócio sustentar margem e caixa: o jogo é caixa, não só faturar."
      ],
      executar: [
        "Pedir à IA, com o agente de planejamento, a tabela mês a mês das métricas drivers.",
        "Calcular de trás para frente a meta da Black até chegar no investimento em mídia.",
        "Levantar quanto cada driver subiu ou caiu na Black do ano passado.",
        "Montar os cenários base, recomendado e agressivo e checar margem e caixa."
      ],
      frase: "Às vezes a métrica mais fora do trilho não é onde gastar energia."
    },
    {
      hora: 3,
      rotulo: "3ª parte",
      tempo: "0:59 ao fim",
      titulo: "Planejamento da Black no Axoly e dúvidas",
      ideia: "A IA mostra o ano do projeto de teste e sobe tudo no planejamento anual do Axoly. Em seguida, calcula a Black de novembro com base no ano passado. O Di passa a tarefa de casa e responde dúvidas sobre Windsor, pesquisa e cashback.",
      aprender: [
        "No projeto de teste, a retenção foi de 20% para 32%, a conversão caiu, as sessões orgânicas oscilaram e o CPS subiu sem parar. Leitura: aquisição ineficiente e mais dependência de mídia paga.",
        "Um pedido simples sobe as métricas no planejamento anual do Axoly. Faltando a aprovação, o Di considerou 90% para ajustar depois. Depois de atualizar a página, o planejamento apareceu preenchido.",
        "Para a Black, a IA leu quanto os drivers mudaram de outubro para novembro do ano passado. A alavanca principal foi a conversão: subir um pouco renderia quase R$ 60 mil a mais em pedidos.",
        "IA sem contexto entrega ideias genéricas. Com drivers e método, a assertividade de meta chega a 97% na consultoria; aceitando a meta do cliente, cairia para uns 30%.",
        "Uma Black abaixo do faturamento de março pode ser a meta certa para aquele projeto. Se a dona quiser mais, mostre tudo que precisa fazer em três semanas e ela decide se compra o desafio.",
        "No Windsor, o plano free dá 10 fontes nos 30 dias de teste e depois cai para uma. Dá para fazer tudo pelo MCP do Axoly. Pesquisa deve ter no mínimo 25% de resposta.",
        "Cashback sem recompra: revisar a régua de lembrete, trocar 10% por R$ 20 e unir o crédito a sugestões de produtos que combinam com a compra."
      ],
      executar: [
        "Subir as métricas drivers do histórico no planejamento anual do Axoly.",
        "Pedir à IA o planejamento de novembro com base na variação do ano passado.",
        "Deixar no Axoly o DRE de performance e o planejamento de novembro ainda nesta semana.",
        "Oferecer cupom limitado em reais para quem responder a pesquisa."
      ],
      frase: "Não é só usar IA: é usar IA com método e contexto."
    }
  ];
  aula.mapa = {
    centro: "Meta calculada pelos drivers",
    ramos: [
      {
        titulo: "Key e drivers",
        itens: [
          "Key mostra o que aconteceu",
          "Driver é a alavanca controlável",
          "Esforço sempre nos drivers",
          "Cascata até a receita faturada"
        ]
      },
      {
        titulo: "Os nove drivers",
        itens: [
          "Cascata direta: seis drivers",
          "Retenção muda o mix",
          "VIP e impulsionamento são apoio",
          "Retenção saudável: 25% a 30%",
          "Ticket se mantém, não se escala"
        ]
      },
      {
        titulo: "Conversão em foco",
        itens: [
          "A alavanca que mais muda o jogo",
          "Seis incertezas da oferta",
          "Funil do Google Analytics",
          "Mobile Simulator do Axoly",
          "Cashback dobrado como gatilho"
        ]
      },
      {
        titulo: "Conta reversa da meta",
        itens: [
          "Meta ÷ ticket ÷ aprovação",
          "÷ conversão dá as sessões",
          "Menos orgânicas, × CPS",
          "Verba não é % do faturamento"
        ]
      },
      {
        titulo: "Meta realista",
        itens: [
          "Respeitar a sazonalidade",
          "Guardrails da Black passada",
          "Base, recomendado e agressivo",
          "Margem e caixa aprovam a meta"
        ]
      },
      {
        titulo: "IA, Windsor e Axoly",
        itens: [
          "MCP do Axoly na sua IA",
          "Windsor como backup de dados",
          "Agente de planejamento no chat",
          "Subir plano no Axoly",
          "IA com método e contexto"
        ]
      },
      {
        titulo: "Tarefa e dúvidas",
        itens: [
          "DRE de performance no Axoly",
          "Planejamento de novembro",
          "Pesquisa com 25% de resposta",
          "Cashback em reais e sugestões"
        ]
      }
    ]
  };
})();
