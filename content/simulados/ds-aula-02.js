// Simulado da Aula 02 (Di Santana): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["di-santana-growth-commerce"] || {})[2];
  if (!aula) return;
  aula.simulado = [
    { id: "ds-a2-s01", pergunta: "Na reunião mensal, o sócio quer que o time passe a semana “trabalhando o ROAS e o CAC”. Pela lógica de key e driver da aula, onde o esforço do time deveria estar?",
      opcoes: ["No ROAS e no CAC, porque são os números que o sócio acompanha", "Na receita do mês, que resume o resultado de todas as áreas", "Em conversão, ticket, aprovação e CPS, as alavancas que produzem o ROAS e o CAC", "Em nenhum indicador específico, só em mais verba de mídia"],
      correta: 2, explicacao: "ROAS e CAC são métricas key, que mostram a consequência; o time opera os drivers, que são as alavancas que geram esse resultado." },
    { id: "ds-a2-s02", pergunta: "Uma loja investiu R$ 36 mil em mídia com CPS de R$ 1,20, teve 10 mil sessões orgânicas e converte 2%. Quantos pedidos captados a cascata indica?",
      opcoes: ["800 pedidos captados", "600 pedidos captados", "720 pedidos captados", "1.000 pedidos captados"],
      correta: 0, explicacao: "R$ 36 mil ÷ R$ 1,20 = 30 mil sessões pagas; somadas às 10 mil orgânicas dão 40 mil sessões × 2% = 800 pedidos captados." },
    { id: "ds-a2-s03", pergunta: "No mês, a loja captou R$ 500 mil em pedidos e faturou R$ 410 mil. O que a aula diz sobre esse número?",
      opcoes: ["Aprovação de 82% é normal e pode ficar fora do plano", "O certo é medir aprovação pelo número de sessões, não pela receita", "O gap só importa se passar de 30% entre captada e faturada", "A aprovação é de 82%; um gap acima de 15% pede investigar recusa, cancelamento, boleto vencido e fraude"],
      correta: 3, explicacao: "Aprovação é receita faturada ÷ captada; o gap de 18% passa do limite de 15% que a aula usa para abrir investigação." },
    { id: "ds-a2-s04", pergunta: "Um mentorado investe todo mês em grupos VIP e em impulsionamento de posts, fora de Meta Ads e Google Ads. Em qual camada dos 9 drivers isso entra?",
      opcoes: ["Na cascata direta, junto com conversão e ticket", "Na alocação, como investimentos de apoio fora de Meta e Google", "No mix, junto com a retenção e o LTV", "Em nenhuma camada, porque não é mídia paga tradicional"],
      correta: 1, explicacao: "Os drivers se dividem em cascata direta, mix (retenção) e alocação, que reúne grupos VIP e impulsionamento." },
    { id: "ds-a2-s05", pergunta: "O gestor comemora que derrubou o CPS pela metade comprando tráfego muito barato, mas as vendas não se mexeram. Como a aula leria essa melhora?",
      opcoes: ["Como vitória: CPS menor sempre melhora a receita faturada", "Como falsa melhora: sessão barata que não compra continua cara, e o CPS precisa vir sem perder qualidade", "Como sinal de que a conversão vai subir sozinha no mês seguinte", "Como motivo para dobrar a verba, já que cada sessão custa menos"],
      correta: 1, explicacao: "Melhorar o CPS é fazer mais pessoas entrarem com menos custo sem perder qualidade; tráfego que não compra não ajuda a cascata." },
    { id: "ds-a2-s06", pergunta: "Quase todas as sessões de uma loja vêm de mídia paga, e o dono não sabe de onde poderia vir o restante. Qual é o caminho apontado na aula?",
      opcoes: ["Aceitar a dependência, porque orgânico não entra na cascata", "Trocar a plataforma do site para ganhar mais tráfego direto", "Esperar a Black, quando o orgânico cresce naturalmente", "Planejar sessões orgânicas vindas de redes sociais, SEO, ações de CRM e grupos VIP"],
      correta: 3, explicacao: "Sem um plano para levar sessões orgânicas ao site, a loja fica dependente de mídia paga; esses canais próprios são as fontes citadas." },
    { id: "ds-a2-s07", pergunta: "Ninguém do time percebeu, mas o site quebra o layout em alguns modelos de celular. Que recurso do Axoly mostrado na aula ajuda a achar isso?",
      opcoes: ["O Mobile Simulator, em Performance, CRO, que abre o site em vários aparelhos e espelha a navegação", "O Ad Pulse, em Performance, Meta Ads, que mostra os anúncios pausados", "A aba Pesquisas, que importa respostas de clientes em CSV", "O conector MCP, em Dados, Conectores, que liga a IA aos dados"],
      correta: 0, explicacao: "A extensão Mobile Simulator abre o site lado a lado em vários aparelhos, revelando quebras de layout que passam despercebidas." },
    { id: "ds-a2-s08", pergunta: "Ao apresentar a meta da Black, o consultor mostra três cenários ao cliente. O que distingue o cenário recomendado dos outros dois?",
      opcoes: ["É a repetição exata do resultado atual, sem crescimento", "É o máximo que dá para brigar, com todo o risco possível", "É um crescimento gradual acima da referência atual, entre o base e o agressivo", "É a meta que o dono pediu, ajustada pela inflação"],
      correta: 2, explicacao: "Base é a referência atual, recomendado é um crescimento gradual acima dela e agressivo é o quanto dá para brigar a mais." },
    { id: "ds-a2-s09", pergunta: "Um cliente novo chega com a meta já pronta e quer que a consultoria apenas execute. Por que o Di não aceita a meta do cliente como ponto de partida?",
      opcoes: ["Porque a meta do cliente sempre é baixa demais para a consultoria", "Porque a consultoria só trabalha com metas anuais, nunca mensais", "Porque o contrato proíbe discutir metas com o dono", "Porque metas desenhadas no sonho derrubariam a assertividade de uns 97% para cerca de 30%"],
      correta: 3, explicacao: "A meta calculada pelos drivers chega a 97% de assertividade; aceitando a meta do cliente, sem base nos dados, cairia para uns 30%." },
    { id: "ds-a2-s10", pergunta: "Uma loja dá 10% de cashback, mas quase ninguém volta para usar o crédito. O dono quer encerrar o programa. O que o Di revisaria antes?",
      opcoes: ["Aumentar o cashback para 25% para chamar mais atenção", "A régua de lembrete, trocar 10% por um valor em reais e unir o crédito a sugestões de produtos", "Transformar o cashback em desconto imediato na primeira compra", "Encerrar o cashback e investir o valor em mídia paga"],
      correta: 1, explicacao: "Trocar 10% por R$ 20 muda a percepção, e lembrar o crédito junto a produtos que combinam com a cliente dá motivo para voltar." },
    { id: "ds-a2-s11", pergunta: "Sessões e ticket ficaram iguais ao mês anterior, mas a receita caiu. Antes de decidir qualquer ação, como a aula sugere localizar o problema de conversão?",
      opcoes: ["Comparar o CPS de cada campanha com o do mês anterior", "Perguntar ao time de atendimento quais reclamações chegaram", "Comparar com o mês anterior o funil do Google Analytics: produto, carrinho, checkout e compra", "Rodar uma pesquisa de satisfação com a base de clientes"],
      correta: 2, explicacao: "O funil do Google Analytics mostra em qual etapa as pessoas deixaram de avançar, separando problema de layout de comportamento de compra." },
    { id: "ds-a2-s12", pergunta: "Uma loja tem ótimo tráfego, mas as pessoas desistem por insegurança. Qual destas ações atua diretamente sobre uma das seis incertezas da oferta?",
      opcoes: ["Mostrar avaliações reais de clientes perto do botão de compra", "Trocar a cor do logotipo para algo mais moderno", "Aumentar a frequência dos anúncios no Meta", "Criar mais categorias no menu principal"],
      correta: 0, explicacao: "Provas sociais são uma das seis incertezas, ao lado de preço percebido, frete, prazo, vantagens antes e benefícios depois da compra." }
  ];
})();
