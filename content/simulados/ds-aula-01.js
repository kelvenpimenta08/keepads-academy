// Simulado da Aula 01 (Di Santana): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["di-santana-growth-commerce"] || {})[1];
  if (!aula) return;
  aula.simulado = [
    { id: "ds-a1-s01", pergunta: "Uma loja testou um novo argumento de anúncio a partir da pesquisa e o teste funcionou. Pelos 4 passos da pesquisa como infraestrutura de decisão, o que falta?",
      opcoes: ["Nada: o ciclo termina quando o teste dá certo", "Registrar o que funcionou no playbook, que é o passo de aprendizado", "Refazer a mesma pesquisa com perguntas novas", "Escalar a verba antes de documentar qualquer coisa"],
      correta: 1, explicacao: "Os passos são pergunta, padrão, ação e aprendizado: o que funcionou vai para o playbook." },
    { id: "ds-a1-s02", pergunta: "Uma loja de ferramentas quer incluir “Qual é o seu time de futebol?” na pesquisa pós-compra. Por que a pergunta ainda não está pronta?",
      opcoes: ["Porque a resposta não muda campanha, página, produto, logística ou CRM", "Porque perguntas sobre futebol são proibidas em pesquisa", "Porque ela precisaria de pelo menos 6 opções de resposta", "Porque só pode ser feita no pós-uso, após 90 dias"],
      correta: 0, explicacao: "A pergunta precisa capturar uma variável que você consegue mudar." },
    { id: "ds-a1-s03", pergunta: "O formulário de uma marca de roupas pergunta: “O preço e o prazo de entrega atenderam ao que você esperava?”. Qual regra de arquitetura isso quebra?",
      opcoes: ["O limite de 5 perguntas por questionário", "A proibição de perguntas sobre preço", "A regra de usar campo aberto em toda pergunta", "Uma variável por vez: preço e prazo juntos não mostram o que corrigir"],
      correta: 3, explicacao: "A arquitetura do método pede uma variável por pergunta, até 4 opções fechadas e campo aberto só para captar a linguagem do cliente." },
    { id: "ds-a1-s04", pergunta: "Na página de obrigado, uma marca quer oferecer 10% de desconto para quem responder a pesquisa pós-compra. O que a aula sugere no lugar?",
      opcoes: ["Aumentar o desconto para 20% para subir a taxa de resposta", "Não oferecer nada e mandar a pesquisa por e-mail dias depois", "Evitar desconto e usar acesso VIP ou conteúdo como contrapartida", "Trocar a pesquisa por um pedido de avaliação 5 estrelas"],
      correta: 2, explicacao: "No pós-compra, a orientação é evitar desconto; acesso VIP ou conteúdo funcionam como contrapartida." },
    { id: "ds-a1-s05", pergunta: "No convite da pesquisa, uma loja colocou uma única caixa: “Aceito responder e receber ofertas por WhatsApp”. Qual cuidado de privacidade foi quebrado?",
      opcoes: ["Coletar o nome completo do cliente", "Misturar o consentimento da pesquisa com comunicação promocional", "Explicar a finalidade da pesquisa no convite", "Permitir que o cliente saia da pesquisa a qualquer momento"],
      correta: 1, explicacao: "A aula pede explicar a finalidade, coletar só o necessário, permitir saída fácil e não misturar consentimento com promoção." },
    { id: "ds-a1-s06", pergunta: "Um seller de marketplace recebe reclamações, mas não sabe se o problema é o produto ou o atendimento e envio dele. O que o exemplo da Amazon ensina?",
      opcoes: ["Pedir uma nota única de 1 a 5 logo após o pagamento", "Perguntar tudo antes da compra, quando o cliente está mais engajado", "Esperar o cliente reclamar espontaneamente no SAC", "Avaliar depois da entrega e separar a nota do produto da nota do vendedor"],
      correta: 3, explicacao: "A Amazon pede avaliação após a entrega e separa produto de vendedor: o momento define a verdade que o cliente consegue contar." },
    { id: "ds-a1-s07", pergunta: "Na pesquisa social de uma marca de cadeirinhas infantis, o resultado desejado dominante foi “mais segurança”. Qual é o próximo ativo?",
      opcoes: ["Trocar a promessa genérica por prova, garantia, demonstração e comparação", "Lançar um cupom de primeira compra para os seguidores", "Reduzir o preço das cadeirinhas mais caras", "Postar mais conteúdo de bastidores da equipe"],
      correta: 0, explicacao: "Quando o público pede segurança, a resposta é prova, garantia, demonstração e comparação, não promessa genérica." },
    { id: "ds-a1-s08", pergunta: "Uma loja de produtos para pet só pode manter uma das três perguntas centrais do pós-compra nesta rodada. Qual a aula aponta como pergunta de ouro para esse nicho?",
      opcoes: ["“O que motivou você comprar?”", "“Onde você nos encontrou?”", "“O que faria você nos indicar?”", "“O que quase fez você desistir?”"],
      correta: 2, explicacao: "Quem tem pet convive com outros donos de pet; por isso a indicação é o grande motor nesse nicho." },
    { id: "ds-a1-s09", pergunta: "O relatório de atribuição diz que quase todas as vendas vieram do Google, mas o dono sente que o Instagram pesa mais. Qual pergunta do pós-compra ajuda nessa dúvida?",
      opcoes: ["“Você gostou da experiência de compra?”", "“Onde você nos encontrou?”, feita logo após a compra", "“Qual nota você dá para o nosso site?”", "“Você compraria de novo nos próximos 90 dias?”"],
      correta: 1, explicacao: "Logo após a compra a origem está fresca na memória: é o cliente dizendo de onde lembra de você, além do que a atribuição mostra." },
    { id: "ds-a1-s10", pergunta: "A equipe de CRM quer saber qual pergunta do pós-compra alimenta diretamente o trabalho dela. Qual é?",
      opcoes: ["“O que motivou você comprar?”", "“Onde você nos encontrou?”", "“O que faria você nos indicar?”", "“O que motivaria você voltar?”"],
      correta: 3, explicacao: "O que motivou comprar alimenta aquisição; o que faria voltar alimenta CRM; o que faria indicar alimenta prova e advocacy." },
    { id: "ds-a1-s11", pergunta: "Um e-commerce manda régua de recompra no WhatsApp há meses e a recompra não sobe. Onde a aula sugere olhar antes de mexer nas mensagens?",
      opcoes: ["No pós-entrega: caixa amassada ou atraso fazem o cliente hesitar, e nenhuma mensagem resolve isso", "Na frequência dos disparos, dobrando o número de mensagens", "No desconto oferecido, subindo de 10% para 25%", "No horário de envio, testando madrugada e fim de semana"],
      correta: 0, explicacao: "Se a entrega falha, a recompra vira quase uma nova aquisição. O pós-entrega revela isso antes do CRM." },
    { id: "ds-a1-s12", pergunta: "Uma loja de peças de decoração em vidro descobre na pesquisa que o maior medo é o item chegar quebrado. Como o case Ela Decora usou essa informação?",
      opcoes: ["Passou a oferecer seguro pago em todos os pedidos", "Parou de vender os itens mais frágeis do catálogo", "Transformou em anúncio os bastidores da embalagem e vídeos de unboxing", "Ofereceu cupom para quem recebesse o pedido quebrado"],
      correta: 2, explicacao: "O medo dominante virou criativo: mostrar como a peça é embalada e chega inteira." }
  ];
})();
