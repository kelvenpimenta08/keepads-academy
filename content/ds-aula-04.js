// Mentoria Growth Commerce AI (Di Santana): conteúdo da Aula 04,
// Tráfego pago começa no destino, extraído da transcrição completa da aula,
// dos slides (cálculo reverso, arquitetura Meta e Google, diagnóstico do funil)
// e dos agentes de IA entregues no drive.
// Os ids (ds-a4-...) não podem mudar depois que a equipe começar a estudar,
// porque o progresso de cada card fica salvo pelo id.
window.AULAS = window.AULAS || {};
window.AULAS["di-santana-growth-commerce"] = window.AULAS["di-santana-growth-commerce"] || {};
window.AULAS["di-santana-growth-commerce"][4] = {
  numero: 4,
  titulo: "Tráfego pago começa no destino",
  resumo: "O Di mostra que o tráfego só leva pessoas ao site: o resultado depende da conta de trás para frente, da oferta e da página de destino. Ao vivo, ele analisa os links das campanhas dos mentorados e entrega os agentes de tráfego e de CRO.",

  flashcards: [
    { id: "ds-a4-c01", pergunta: "Quais são os três pilares que o Di manda revisar quando o tráfego não dá resultado?", resposta: "Criativo, página de destino e montagem da oferta. Para ele, não existe um truque dentro do tráfego pago: o diferencial é a estratégia montada em volta dele." },
    { id: "ds-a4-c02", pergunta: "O que é “compor a oferta”, no exemplo do desconto de 20%?", resposta: "Em vez de dar 20% de desconto direto, dar 10% e diluir os outros 10% em outras ações, como cashback ou desconto no frete. O composto da oferta pesa muito na decisão de comprar." },
    { id: "ds-a4-c03", pergunta: "Quais são as quatro decisões que organizam o tráfego pago?", resposta: "Calcular (meta em pedidos, sessões e investimento), distribuir (papel de Meta, Google, orgânico e CRM), conectar (narrativa do anúncio à página e ao checkout) e decidir (ler o funil completo antes de corrigir ou escalar)." },
    { id: "ds-a4-c04", pergunta: "Por que o Di diz que não vai ensinar a pagar menos no CPS ou no CAC?", resposta: "Porque o CAC é uma métrica espelho e a mídia vai encarecer. O que ele ensina é fazer cada sessão valer mais e converter mais no site: quem tirar mais eficiência leva o jogo." },
    { id: "ds-a4-c05", pergunta: "Que mudanças no Meta o Di citou para o ano que vem?", resposta: "O Meta vai ganhar também com tempo de audiência, com formatos como um espaço reservado em que o anúncio aparece sem concorrentes e anúncios em expansão no Reels. Isso favorece quem tem muita verba e encarece o tráfego para os outros." },
    { id: "ds-a4-c06", pergunta: "Qual é a cadeia que precisa estar alinhada para o tráfego funcionar?", resposta: "Produto, oferta, criativo, página, checkout e CRM. O checkout flui a conversão e o CRM faz cada real investido voltar em lucratividade; nada funciona isolado." },
    { id: "ds-a4-c07", pergunta: "Como fazer a conta de trás para frente de uma meta de R$ 300 mil?", resposta: "Meta ÷ ticket médio ÷ conversão. Com ticket de R$ 300 e conversão de 1%, são 1.000 pedidos e 100 mil sessões necessárias." },
    { id: "ds-a4-c08", pergunta: "Como chegar ao investimento depois de saber as sessões necessárias?", resposta: "Separar quantas sessões vêm da mídia paga e multiplicar pelo CPS. Se 70% de 100 mil sessões vêm de mídia paga e o CPS é R$ 1,00, o investimento é R$ 70 mil." },
    { id: "ds-a4-c09", pergunta: "Qual é o erro comum ao definir a verba de mídia?", resposta: "Definir a verba como porcentagem de um faturamento que ainda nem aconteceu, como “só posso investir 10%”. A verba depende das sessões que o planejamento pede." },
    { id: "ds-a4-c10", pergunta: "O que acontece se o CPS for R$ 1,80 em vez de R$ 1,00 no exemplo das 70 mil sessões?", resposta: "O investimento sobe para R$ 126 mil. Se isso quebra a conta, o problema não é a conta, é a fórmula do negócio que já está quebrada." },
    { id: "ds-a4-c11", pergunta: "Por que depender demais de tráfego pago é perigoso?", resposta: "Quanto maior a dependência, mais difícil fechar a conta quando a mídia encarece. Um projeto que sobe verba sem crescer o orgânico pode passar de 70% para 95% de dependência; com 90% faturando R$ 1 milhão, é um castelo de areia." },
    { id: "ds-a4-c12", pergunta: "Qual é o papel do Meta e do Google na visão do Di?", resposta: "O Meta gera demanda e o Google captura quem já procura. Investir 80% no Meta e 20% no Google não tem nada de errado; o problema é 100% e 0%, porque outro pode vender para a demanda que você gerou." },
    { id: "ds-a4-c13", pergunta: "Qual exercício o Di pediu aos mentorados no começo da aula?", resposta: "Pegar o link de destino de uma campanha que não está dando um bom ROAS e mandar no chat. Ele não precisava de investimento, público ou criativo: só do link para onde as pessoas vão." },
    { id: "ds-a4-c14", pergunta: "Por que o Di analisa as páginas sempre no mobile, olhando a primeira tela?", resposta: "Porque quase todo mundo abre pelo celular (ele estima mais de 85%). Os primeiros três segundos decidem se a pessoa continua, e cada scroll exigido perde público, pelo menos 20% no primeiro." },
    { id: "ds-a4-c15", pergunta: "O que o Di criticou na primeira tela da loja de lingerie?", resposta: "Banner grande demais, botões escuros difíceis de ler, cupom escondido e botões de filtrar e ordenar ocupando cerca de 25% da tela. O nome do produto e a avaliação ficavam abaixo da foto, e os benefícios apareciam cortados no mobile." },
    { id: "ds-a4-c16", pergunta: "Qual foi o problema do conjunto sutiã e calcinha de R$ 69,80?", resposta: "O sutiã custava R$ 49,90 e a calcinha R$ 19,90: o conjunto saía pelo mesmo preço das peças separadas. Um desconto pequeno no conjunto, como 5%, já seria argumento para levar os dois." },
    { id: "ds-a4-c17", pergunta: "Por que pedir o CEP logo na entrada do site é ruim, mesmo com estoque por loja?", resposta: "A pessoa ainda nem viu o que você quer mostrar e já tem que dar uma informação. É bom para o atendimento, mas ruim para a conversão; o ideal é resolver no produto, mostrando alternativas quando faltar estoque." },
    { id: "ds-a4-c18", pergunta: "Que filtro faria sentido numa categoria de perfumes, segundo o Di?", resposta: "Filtro por essência, como amadeirado, floral ou cítrico. Filtrar por marca (só havia uma), gênero e preço só ocupa espaço na tela." },
    { id: "ds-a4-c19", pergunta: "Como a vitrine deve mostrar a diferença entre produtos parecidos?", resposta: "Com selos na imagem da categoria, como floral, cítrico, amadeirado, para o dia a dia ou para a noite. Se a pessoa precisa abrir produto por produto para descobrir a diferença, ela desiste." },
    { id: "ds-a4-c20", pergunta: "Por que trocar textos corridos por iconografia na página?", resposta: "Porque é muito mais fácil e rápido de ler. O Di prefere ler seis ícones a seis parágrafos; benefícios como “couro legítimo em 15 cores” ficam melhores como ícones." },
    { id: "ds-a4-c21", pergunta: "Qual foi o problema da loja de calçados que mandou o link?", resposta: "O produto do anúncio tinha a grade quebrada, com um tamanho só, o que frustra quem clica. O Di sugeriu anunciar a versão branca, que tinha mais tamanhos, além de deixar o cupom copiável." },
    { id: "ds-a4-c22", pergunta: "Como o Di sugere tratar as opções de frete?", resposta: "No máximo duas: a econômica e a rápida. Se já há subsídio no frete grátis do PAC, aplicar essa diferença no rápido para ele ficar acessível, porque o cliente não sabe diferenciar várias transportadoras." },
    { id: "ds-a4-c23", pergunta: "Quais ajustes o Di sugeriu na página de coleiras personalizadas?", resposta: "Escolha em etapas, como um quiz, destacar as três cores e o metal mais vendidos e responder objeções com ícones de durabilidade. Também trocar campos digitados (raça, idade, peso) por opções de clique." },
    { id: "ds-a4-c24", pergunta: "Como resolver o medo de a pessoa comprar o tamanho errado sem travar a compra?", resposta: "Trocar tamanho por porte, que qualquer pessoa sabe escolher, e fazer o atendimento chamar depois da compra para agradecer e reconfirmar raça e tamanho. Resolver um problema operacional não pode complicar a conversão." },
    { id: "ds-a4-c25", pergunta: "Como o Di sugere testar mudanças numa página que já roda nos anúncios?", resposta: "Não mexer na página atual: duplicar a landing page, fazer a versão simplificada e comparar a conversão num teste A/B. Ele recomendou fazer isso antes da Black." },
    { id: "ds-a4-c26", pergunta: "O que funciona em sites de atacado, segundo a experiência do Di?", resposta: "Curadoria com algumas perguntas para mostrar os produtos que mais funcionam para aquela empresa e mostrar a lucratividade, como “venda por até tanto e lucre X”. No atacado a pessoa olha preço e decide, muitas vezes no desktop." },
    { id: "ds-a4-c27", pergunta: "Como funciona a escada de brindes que o Di usa?", resposta: "Produtos commodity viram brinde, com o preço cheio sempre mostrado, porque o brinde não pode valer zero. Conforme o ticket sobe, a pessoa desbloqueia brindes e o foco fica no produto principal; o cliente que faz isso fatura de R$ 100 mil a R$ 150 mil por dia." },
    { id: "ds-a4-c28", pergunta: "Como descobrir quais combinações de produtos oferecer na jornada?", resposta: "Baixar os pedidos dos últimos seis meses da loja e pedir à IA as combinações de compra que mais saem. Com isso se monta o cross-sell e a sequência da oferta até o checkout." },
    { id: "ds-a4-c29", pergunta: "O que fazem os agentes de CRO UX e de UX UI entregues na aula?", resposta: "O de CRO UX revisa a oferta e a página: clareza, valor percebido, preço, frete, benefícios e prova social. O de UX UI audita a interface, e os dois estudam todo dia os exemplos do Baymard, com mais de 18 mil páginas analisadas." },
    { id: "ds-a4-c30", pergunta: "Qual é a diferença entre usar a IA para perguntar e para estudar?", resposta: "A maioria só faz perguntas. O Di coloca a IA para estudar todo dia uma base de referência, gastando tokens; quando ele pergunta algo, ela já tem conhecimento acumulado e responde mastigado." }
  ],

  // Prova teórica (nível difícil, situações práticas). "correta" é o índice da opção certa;
  // a ordem das opções é embaralhada a cada tentativa.
  prova_teorica: [
    { id: "ds-a4-t01", pergunta: "Um cliente quer faturar R$ 300 mil no mês. O ticket médio é R$ 300 e a conversão do site é 1%. Quantas sessões ele precisa?",
      opcoes: ["100 mil sessões", "300 mil sessões", "30 mil sessões", "1 milhão de sessões"],
      correta: 0, explicacao: "R$ 300.000 ÷ R$ 300 = 1.000 pedidos; 1.000 ÷ 0,01 = 100 mil sessões." },
    { id: "ds-a4-t02", pergunta: "O dono da loja diz: “Só invisto 10% do faturamento em mídia”. A conta reversa pede R$ 70 mil, bem acima disso. O que o Di responderia?",
      opcoes: ["Que 10% é a regra certa e a meta deve ser mantida", "Que a verba depende das sessões necessárias: ou investe o calculado, ou traz sessões de outro canal, ou não bate a meta", "Que basta trocar os criativos para gastar menos", "Que o Google resolve a diferença sem custo extra"],
      correta: 1, explicacao: "Porcentagem de um faturamento que ainda não existe não define verba; sessões definem." },
    { id: "ds-a4-t03", pergunta: "Na conta reversa, o projeto precisa de 70 mil sessões pagas, mas o CPS real é R$ 1,80. O investimento fica em R$ 126 mil e a margem não fecha. Qual é a leitura do Di?",
      opcoes: ["A conta está errada e deve usar o CPS de R$ 1,00", "Basta cortar a verba e manter a meta", "O problema é só o criativo, que precisa baratear a sessão", "A fórmula do negócio já está quebrada e é preciso rever onde compor as sessões"],
      correta: 3, explicacao: "Quando a conta certa não fecha, o problema é a dependência de mídia e a estrutura do negócio." },
    { id: "ds-a4-t04", pergunta: "Um e-commerce aumentou a verba de 20% em 20% e triplicou o faturamento. A dependência de mídia paga passou de 70% para 95%. Como o Di avalia esse crescimento?",
      opcoes: ["Ótimo, porque a mídia respondeu na mesma proporção", "Neutro, desde que o ROAS se mantenha", "Arriscado: o projeto virou refém da mídia, porque orgânico e outros canais não cresceram junto", "Ideal para a Black, quando a mídia barateia"],
      correta: 2, explicacao: "Crescer dependendo de 90% ou mais de mídia é um castelo de areia." },
    { id: "ds-a4-t05", pergunta: "Um cliente investe 100% da verba no Meta e nada no Google. Qual é o risco apontado na aula?",
      opcoes: ["Gerar demanda e deixar outra empresa vender para quem depois pesquisa no Google", "O Meta parar de entregar por falta de Google", "O CPS do Meta cair demais", "Nenhum, se o ROAS do Meta for bom"],
      correta: 0, explicacao: "O Meta gera, o Google captura; a jornada não é linear. Investir 80/20 não tem problema; 100/0 sim." },
    { id: "ds-a4-t06", pergunta: "Uma campanha tem criativo com ótima taxa de parada e cliques, mas vende pouco. O time quer trocar o criativo. O que o Di e os agentes de análise orientam?",
      opcoes: ["Trocar o criativo e testar novos ganchos", "Aumentar a verba para sair do aprendizado", "Mudar o público para interesses", "Olhar o destino: página, oferta, frete e checkout, porque o problema está depois do clique"],
      correta: 3, explicacao: "Hook bom com conversão ruim é o quadrante CORRIGIR: não troque o criativo, conserte o destino." },
    { id: "ds-a4-t07", pergunta: "A primeira tela mobile de uma categoria mostra um banner grande, botões de filtrar e ordenar e só depois a foto do produto, sem nome. O que o Di priorizaria?",
      opcoes: ["Aumentar o banner para destacar a marca", "Reduzir o banner, tirar filtro e ordenação da frente e mostrar nome e avaliação sem exigir scroll", "Colocar mais filtros para a pessoa achar o produto", "Trocar a categoria por um vídeo institucional"],
      correta: 1, explicacao: "Cada scroll perde público, e os primeiros três segundos decidem se a pessoa continua." },
    { id: "ds-a4-t08", pergunta: "Uma loja vende sutiã a R$ 49,90, calcinha a R$ 19,90 e o conjunto a R$ 69,80. O ticket é baixo e o anúncio leva a uma categoria. O que o Di sugeriria?",
      opcoes: ["Manter os preços e destacar o conjunto só na PDP", "Tirar o conjunto do site", "Dar um pequeno desconto no conjunto e mostrar as peças combinadas em grid de dois na categoria", "Aumentar o preço unitário sem mudar o conjunto"],
      correta: 2, explicacao: "Sem vantagem para levar os dois, a combinação não convence; uns 5% a menos já viram argumento." },
    { id: "ds-a4-t09", pergunta: "Uma rede com 52 lojas pede o CEP logo na entrada para mostrar o estoque da loja mais próxima. O comercial quer tirar, a operação teme reclamações. Qual é a posição do Di?",
      opcoes: ["Tirar o CEP da entrada e resolver no produto, mostrando alternativas quando não houver estoque", "Manter o CEP na entrada, porque evita reclamação", "Pedir o CEP e o e-mail juntos na entrada", "Tirar o estoque por loja e vender só do centro de distribuição"],
      correta: 0, explicacao: "O CEP na entrada é bom para o atendimento, mas ruim para a conversão." },
    { id: "ds-a4-t10", pergunta: "Uma categoria de perfumes mostra fotos brancas parecidas. A explicação de cada fragrância só aparece na foto da PDP. O que fazer?",
      opcoes: ["Colocar mais produtos por linha", "Adicionar filtro por preço e por marca", "Esconder a categoria e mandar o anúncio direto ao checkout", "Levar para a categoria a imagem explicativa e selos como floral, cítrico, amadeirado, dia ou noite"],
      correta: 3, explicacao: "A pessoa precisa ver a diferença na vitrine, sem abrir produto por produto." },
    { id: "ds-a4-t11", pergunta: "Uma PDP de calçados recebe tráfego, mas o modelo do anúncio só tem um tamanho disponível. Outra cor tem a grade completa. O que o Di recomendaria?",
      opcoes: ["Manter o anúncio e esperar o estoque voltar", "Anunciar a versão com mais grade, que tem mais chance de converter", "Subir a verba para compensar a baixa conversão", "Trocar o público para quem calça aquele número"],
      correta: 1, explicacao: "Grade quebrada frustra quem clica e faz a campanha não converter." },
    { id: "ds-a4-t12", pergunta: "O checkout mostra cinco transportadoras, e a mais cara (R$ 70) é a mais demorada. A loja já subsidia o frete grátis no PAC. O que ajustar?",
      opcoes: ["Mostrar todas, para dar liberdade ao cliente", "Tirar o frete grátis e cobrar todos os fretes", "Deixar só a econômica e a rápida e aplicar o subsídio também no rápido", "Mostrar só a mais cara para aumentar o ticket"],
      correta: 2, explicacao: "O cliente não sabe diferenciar transportadoras; frete rápido acessível ganha a conversão." },
    { id: "ds-a4-t13", pergunta: "Uma loja de coleiras pede raça, idade e peso digitados e tamanhos em PP, P e G, para evitar trocas. A conversão está baixa. Qual caminho a aula indica?",
      opcoes: ["Simplificar com opções de clique e porte, e reconfirmar raça e tamanho com o cliente depois da compra", "Manter tudo, porque evitar troca é mais importante", "Pedir também uma foto do pet antes de comprar", "Tirar a personalização do produto"],
      correta: 0, explicacao: "Resolver um problema operacional não pode complicar a conversão; o atendimento reconfirma no pós-compra." },
    { id: "ds-a4-t14", pergunta: "Um produto de R$ 59 mostra, logo na primeira tela, que o frete grátis só vale acima de um valor alto. No checkout, o frete é R$ 11. O que o Di mudaria?",
      opcoes: ["Destacar ainda mais o frete grátis no topo", "Dar desconto no produto principal", "Esconder o frete até o pagamento", "Focar no prazo de entrega no topo e compor a oferta no caminho, com brindes e combinações que aumentem o ticket"],
      correta: 3, explicacao: "Avisar cedo que não há frete grátis quebra a expectativa; sem compor a oferta, o frete pesa no fim." },
    { id: "ds-a4-t15", pergunta: "Uma marca vende acessórios baratos de commodity ao lado do produto principal. O Di sugere usá-los como brinde. Como mostrar o brinde?",
      opcoes: ["Como “grátis”, sem preço, para parecer simples", "Com o preço cheio visível, numa escada que libera brindes conforme o ticket sobe", "Só no e-mail pós-compra", "Com preço promocional reduzido ao lado"],
      correta: 1, explicacao: "O brinde não pode valer zero: a pessoa precisa ver quanto está ganhando." },
    { id: "ds-a4-t16", pergunta: "Um cliente da agência sobe a campanha copiando o link de destino por último, sem olhar. O que o Di diz sobre esse hábito?",
      opcoes: ["Está certo, porque o destino é detalhe operacional", "Basta conferir se o link abre", "O link de destino deveria ser quase o primeiro passo: revisar se a página ajuda a pessoa a escolher e decidir", "O link só importa no Google, não no Meta"],
      correta: 2, explicacao: "Até uma campanha montada por leigo funciona se joga a pessoa para um lugar que converte." }
  ],

  pratica: [
    {
      id: "ds-a4-p1",
      titulo: "Fazer a conta de trás para frente",
      descricao: "Com as médias do projeto, dividir a meta de receita pelo ticket médio e pela conversão para achar os pedidos e as sessões necessárias. Separar quantas sessões vêm de mídia paga, orgânico e CRM pela dependência dos últimos seis meses e multiplicar as sessões pagas pelo CPS histórico. Para isso, usar o agente de Tráfego Estratégico ou o prompt do último slide.",
      perguntas: [
        { id: "ds-a4-pq01", pergunta: "Meta de R$ 200 mil, ticket de R$ 250 e conversão de 0,8%. Quantas sessões o site precisa?",
          opcoes: ["80 mil sessões", "100 mil sessões", "160 mil sessões", "800 mil sessões"],
          correta: 1, explicacao: "R$ 200.000 ÷ R$ 250 = 800 pedidos; 800 ÷ 0,008 = 100 mil sessões." },
        { id: "ds-a4-pq02", pergunta: "Das 100 mil sessões, 60% vêm de mídia paga e o CPS histórico é R$ 1,20. Qual é o investimento?",
          opcoes: ["R$ 60 mil", "R$ 120 mil", "R$ 50 mil", "R$ 72 mil"],
          correta: 3, explicacao: "60 mil sessões pagas × R$ 1,20 = R$ 72 mil." }
      ]
    },
    {
      id: "ds-a4-p2",
      titulo: "Auditar o link da campanha que menos performa",
      descricao: "Abrir no celular o link de destino da campanha com pior ROAS, como se fosse a primeira visita. Avaliar o que aparece nos primeiros três segundos: tamanho do banner, leitura dos botões, cupom visível, espaço tomado por filtros e ordenação, nome do produto e avaliação sem precisar de scroll e textos cortados no mobile.",
      perguntas: [
        { id: "ds-a4-pq03", pergunta: "Qual pergunta o Di faz antes de dar qualquer scroll na página?",
          opcoes: ["Era isso que a pessoa deveria ver, e dessa forma?", "Quantas cores a marca usa?", "O site carrega em menos de um segundo?", "Quantos produtos cabem na tela?"],
          correta: 0, explicacao: "Quanto mais scroll a página exige, mais público se perde." },
        { id: "ds-a4-pq04", pergunta: "Na categoria auditada, filtrar e ordenar ocupam boa parte da tela de quem chega do Instagram. Qual é a leitura?",
          opcoes: ["São essenciais e devem ficar no topo", "Devem virar um banner animado", "Para quem acabou de conhecer a marca, eles só tomam espaço; ela quer ver o que você quer mostrar", "Só devem existir no desktop"],
          correta: 2, explicacao: "Esse espaço seria melhor usado com nome, avaliação ou um banner que conduza a escolha." }
      ]
    },
    {
      id: "ds-a4-p3",
      titulo: "Ajustar a vitrine e a categoria",
      descricao: "Revisar a categoria para onde o anúncio leva: usar grid de dois produtos, mostrar combinações e conjuntos, colocar selos e a imagem explicativa da PDP já na vitrine e trocar filtros sem sentido por filtros inteligentes, como por essência no caso de perfumes. Para produtos de ticket baixo, avaliar se faz sentido mandar a pessoa à PDP.",
      perguntas: [
        { id: "ds-a4-pq05", pergunta: "Numa categoria de lingerie, por que o Di prefere grid de dois produtos?",
          opcoes: ["Porque as fotos ficam maiores", "Porque reduz o número de produtos no site", "Porque a plataforma exige", "Porque dá para mostrar sutiã e calcinha da mesma cor lado a lado e entender o look"],
          correta: 3, explicacao: "Facilitar a combinação ajuda na decisão, sem obrigar a pessoa a montar tudo sozinha." },
        { id: "ds-a4-pq06", pergunta: "A categoria de uma loja de uma marca só tem filtro por marca, gênero e preço. O que fazer?",
          opcoes: ["Trocar por filtros que ajudem a escolher, ligados ao produto, ou usar o espaço para conduzir a decisão", "Manter, porque todo site tem esses filtros", "Adicionar mais filtros técnicos", "Colocar os filtros também no checkout"],
          correta: 0, explicacao: "Filtro que não muda a escolha só ocupa tela." }
      ]
    },
    {
      id: "ds-a4-p4",
      titulo: "Revisar a PDP e quebrar objeções",
      descricao: "Na página de produto, mostrar um preço claro sem repetições confusas, colocar benefícios antes do botão de compra, trocar texto corrido por ícones, destacar as opções mais vendidas, deixar o cupom copiável, conferir a grade do produto anunciado e subir informações que quebram objeções, como “o produto é original”.",
      perguntas: [
        { id: "ds-a4-pq07", pergunta: "Um card mostra R$ 89,90 em destaque, mas o mesmo produto sai por R$ 85,49 em uma vez ou no Pix, e o valor se repete três vezes. Qual é o problema?",
          opcoes: ["Nenhum, porque mais preço passa transparência", "O preço confunde: a pessoa não sabe qual é o valor real", "Falta mostrar também o preço em dólar", "O desconto do Pix deveria ser maior"],
          correta: 1, explicacao: "Repetir valores diferentes gera dúvida no exato momento da decisão." },
        { id: "ds-a4-pq08", pergunta: "Onde o Di quer os benefícios do produto na PDP?",
          opcoes: ["No rodapé da página", "Só na descrição longa", "Antes do botão de compra, para agregar valor antes de o preço pesar", "Num pop-up depois do carrinho"],
          correta: 2, explicacao: "É ali que se agrega mais valor antes do preço chegar forte." }
      ]
    },
    {
      id: "ds-a4-p5",
      titulo: "Ajustar frete, prazo e checkout",
      descricao: "Reduzir as opções de frete para a econômica e a rápida, aplicar o subsídio também no frete rápido, destacar quando o pedido chega antes do botão de compra e tirar da primeira tela avisos que quebram a expectativa. Rever pedidos de CEP fora de hora, testar o campo de CEP e avaliar um checkout de uma página.",
      perguntas: [
        { id: "ds-a4-pq09", pergunta: "Na PDP, o que o Di quer mais evidente do que o aviso de frete grátis a partir de um valor?",
          opcoes: ["O prazo, ou seja, quando o pedido chega", "O CNPJ da empresa", "A política de trocas completa", "O nome da transportadora"],
          correta: 0, explicacao: "A informação de quando chega reduz a ansiedade; o aviso de frete pode vir mais à frente." },
        { id: "ds-a4-pq10", pergunta: "Uma data estimada de entrega aparece na PDP e o prazo exato só na etapa seguinte. Isso é enganar o cliente?",
          opcoes: ["Sim, é uma data falsa", "Sim, porque o prazo deveria aparecer só no e-mail", "Não, desde que a data seja sempre a mais curta possível", "Não: é uma data real estimada, que reduz a ansiedade, e o prazo exato vem depois"],
          correta: 3, explicacao: "O Di explicou isso respondendo a uma pergunta da turma." }
      ]
    },
    {
      id: "ds-a4-p6",
      titulo: "Compor a oferta e montar a escada de brindes",
      descricao: "Baixar os pedidos dos últimos seis meses e pedir à IA as combinações que mais saem. Com isso, montar conjuntos com vantagem real, cross-sell na PDP e uma escada de brindes: produtos commodity com preço cheio visível que a pessoa desbloqueia conforme aumenta o ticket, com foco no produto principal.",
      perguntas: [
        { id: "ds-a4-pq11", pergunta: "Qual é o objetivo da escada de brindes?",
          opcoes: ["Vender mais os produtos baratos", "Aumentar o ticket e focar no produto principal, usando os commodities como recompensa", "Substituir o cupom de primeira compra", "Reduzir o preço do produto principal"],
          correta: 1, explicacao: "Os produtos de margem e o core ganham foco; o commodity vira motivo para subir a régua." },
        { id: "ds-a4-pq12", pergunta: "Uma marca tem uma semana de brindes na Black e campanhas que levam a um produto de fundo de funil. O que o Di sugere?",
          opcoes: ["Brinde só em datas pontuais", "Nunca dar brinde em produto de fundo de funil", "Deixar o brinde permanente, com régua de desbloqueio pelo que a pessoa compra", "Dar o brinde só para clientes antigos"],
          correta: 2, explicacao: "No fluxo do funil, a régua permanente faz ganhar ticket e vender o produto em si." }
      ]
    },
    {
      id: "ds-a4-p7",
      titulo: "Rodar os agentes de CRO e testar a nova página",
      descricao: "Rodar no site o agente de CRO UX (revisão de oferta e página) e o Especialista UX UI E-commerce, que usa os exemplos do Baymard como referência de estudo. Com os achados, duplicar a landing page sem mexer na que está no ar, simplificar a jornada e comparar a conversão num teste A/B. Compartilhar a página no grupo e mandar o feedback dos agentes ao Di.",
      perguntas: [
        { id: "ds-a4-pq13", pergunta: "Quais são os seis pilares da oferta que o agente de CRO UX analisa?",
          opcoes: ["Clareza, valor percebido, preço, frete, benefícios e prova social", "Criativo, público, verba, lance, posicionamento e frequência", "Banner, menu, filtro, busca, rodapé e pop-up", "SEO, e-mail, WhatsApp, Meta, Google e TikTok"],
          correta: 0, explicacao: "Um pilar fraco contamina os outros; a pergunta certa é se a decisão de compra está fácil." },
        { id: "ds-a4-pq14", pergunta: "Como o Especialista UX UI deve usar o Baymard?",
          opcoes: ["Copiar as telas e os scores para o relatório do cliente", "Declarar que a loja passou por uma auditoria Baymard", "Usar os layouts como template visual", "Extrair o mecanismo por trás do exemplo e testar se ele vale para a loja analisada"],
          correta: 3, explicacao: "O agente estuda o mecanismo, não a estética, e não republica conteúdo do portal." },
        { id: "ds-a4-pq15", pergunta: "A página de coleiras já roda nos anúncios e o Di sugeriu simplificar a escolha. Como aplicar sem risco?",
          opcoes: ["Mudar a página no ar e ver o resultado do dia", "Duplicar a página, fazer a versão simples e comparar a conversão num teste A/B", "Pausar as campanhas até terminar a mudança", "Trocar a plataforma do site"],
          correta: 1, explicacao: "Ele pediu para duplicar e não mexer na página que está rodando." }
      ]
    },
    {
      id: "ds-a4-p8",
      titulo: "Estruturar as campanhas novas com os agentes de tráfego",
      descricao: "Com um diagnóstico recente (agentes de análise de Meta Ads e de Google Ads) e a matriz criativa, rodar o Estrategista de Tráfego Pago para desenhar as campanhas novas do mês: no Meta, uma campanha ABO por produto foco, cinco conjuntos por dor, três anúncios por conjunto e verba de pelo menos 2 × CPA por conjunto por dia; no Google, Search de captura no mesmo mês. Ler o funil da esquerda para a direita antes de decidir.",
      perguntas: [
        { id: "ds-a4-pq16", pergunta: "O CPA atual é R$ 40. Pela regra dos slides, qual é a verba de largada por dia para uma dor com cinco conjuntos?",
          opcoes: ["R$ 200", "R$ 80", "R$ 400", "R$ 600"],
          correta: 2, explicacao: "5 conjuntos × 2 × R$ 40 = R$ 400 por dia." },
        { id: "ds-a4-pq17", pergunta: "A verba não comporta a estrutura completa de teste. O que o material manda cortar?",
          opcoes: ["A verba de cada conjunto, para caber mais conjuntos", "Os pilares criativos da dor", "A Search de captura no Google", "A quantidade de produtos ou o ritmo da fila de dores"],
          correta: 3, explicacao: "A verba de 2 × CPA por conjunto é inegociável; tira-se dor da fila ou produto do mês." },
        { id: "ds-a4-pq18", pergunta: "Um gestor pede ao Estrategista de Tráfego Pago uma lista de campanhas atuais para pausar. O que esperar?",
          opcoes: ["O agente não faz isso: ele só estrutura o novo; pausar e otimizar o que roda é papel dos agentes de diagnóstico", "O agente pausa tudo que estiver abaixo do ROAS médio", "O agente redistribui toda a verba da conta", "O agente duplica as campanhas atuais com mais verba"],
          correta: 0, explicacao: "Essa fronteira de papel está escrita no próprio agente." }
      ]
    }
  ]
};
