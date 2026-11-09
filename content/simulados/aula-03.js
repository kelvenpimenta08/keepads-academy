// Simulado da Aula 03 (Adriano Gianini): questões de treino, diferentes das da prova.
// Os ids não podem mudar depois de publicados.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[3];
  if (!aula) return;
  aula.simulado = [
    { id: "a3-s01", pergunta: "Um colega diz: “Vou criar um cérebro chamado Social Media de YouTube”. Pela distinção feita na aula, o que está misturado nessa frase?",
      opcoes: ["Nada: cérebro e social media são sinônimos dentro da Freedom", "O social media deveria ser uma skill, e não um cérebro nem um agente", "O cérebro só pode ter um uso, então o nome precisa indicar a tarefa", "Social media é uma cadeira (um funcionário) que usa vários cérebros; o cérebro é a informação guardada"],
      correta: 3, explicacao: "Cérebro é conhecimento bruto em pastas ou banco de dados; a cadeira é o “funcionário” que consulta vários cérebros para trabalhar." },
    { id: "a3-s02", pergunta: "O gerador de capas do Jarvis sugere opções e o Adriano recusa várias. Para que serve o botão “Por que não?” nesse momento?",
      opcoes: ["Para pedir ao agente que gere novas opções sem mudar nada no padrão", "Para devolver o motivo da recusa ao agente, que aprende o que ele não aprova e fica mais inteligente", "Para registrar a recusa num relatório que vai para o designer do time", "Para trocar o modelo usado na geração por um mais forte"],
      correta: 1, explicacao: "O motivo da recusa volta para o Jarvis, que aprende os padrões rejeitados e melhora com o uso." },
    { id: "a3-s03", pergunta: "Mesmo com o upload por API funcionando, o Jarvis abre o YouTube Studio no fim do processo. Por quê?",
      opcoes: ["Para conferir upload e agendamento e porque a adequação para anúncios (monetização) não existe na API e precisa ser feita na mão", "Porque a API do YouTube não permite agendar vídeos, só publicar na hora", "Porque os capítulos só podem ser cadastrados pelo YouTube Studio", "Para baixar as métricas de CTR da capa, que a API não fornece"],
      correta: 0, explicacao: "Ele confere se subiu e se o agendamento está certo, e faz a parte de monetização, que não existe na API do YouTube." },
    { id: "a3-s04", pergunta: "Em um fim de semana, um gestor construiu cinco “agentes” com vibe coding e acha que já substituiu o time. Qual alerta a aula faz?",
      opcoes: ["Vibe coding só funciona para sites, nunca para agentes de tráfego", "Ele deveria ter construído os cinco no mesmo sistema para evitar retrabalho", "É o efeito dopaminérgico: dá para construir coisas medíocres muito rápido, mas o que substitui uma pessoa de verdade dá trabalho", "Agentes construídos em fim de semana são sempre mais seguros, porque são simples"],
      correta: 2, explicacao: "O Jarvis de YouTube levou duas semanas, mesmo com o processo todo gravado. Construção rápida tende a ser medíocre." },
    { id: "a3-s05", pergunta: "Um sócio quer que a skill de saldo, além de avisar, reduza sozinha o orçamento das campanhas quando o saldo estiver acabando. Como era o escopo da skill de saldo revisada na aula?",
      opcoes: ["Ela reduzia o orçamento automaticamente, mas só nas contas pré-pagas", "Ela só lia o saldo das contas pré-pagas e avisava no Telegram; nunca alterava orçamento, pausava campanha ou gerava pagamento", "Ela pausava as campanhas quando o saldo zerava e avisava o cliente por e-mail", "Ela gerava o boleto de recarga e mandava para o financeiro aprovar"],
      correta: 1, explicacao: "A skill do Adriano Gouveia era só de leitura e alerta, com projeção da data de recarga. Nenhuma ação na conta." },
    { id: "a3-s06", pergunta: "Como a aula chega às 264 horas por ano economizadas pela skill de saldo?",
      opcoes: ["30 minutos por dia × 30 dias × 12 meses, contando fins de semana", "2 horas por semana × 52 semanas, mais as horas de construção", "1 hora por dia × 20 dias úteis × 12 meses, mais um mês de férias", "1 hora por dia × 22 dias úteis × 12 meses"],
      correta: 3, explicacao: "1 h × 22 dias úteis × 12 meses = 264 horas por ano, por algo que levou meia hora para construir." },
    { id: "a3-s07", pergunta: "Seu agente de saldo funciona bem, mas você quer mudar a lógica de projeção. Qual cuidado a aula recomenda para não quebrar o que já roda?",
      opcoes: ["Criar um paralelo com a mudança e só substituir o atual quando o novo estiver pronto", "Editar o agente em produção num horário de pouco uso, como de madrugada", "Desligar o agente atual durante a mudança para evitar conflito", "Pedir ao Claude para mudar e confiar no backup se algo der errado"],
      correta: 0, explicacao: "Para mudar algo que funciona, crie um paralelo e só substitua quando ele estiver pronto." },
    { id: "a3-s08", pergunta: "Você vai abrir o sistema da agência para o time acessar de fora. Quais camadas de segurança a aula cita como exemplo?",
      opcoes: ["Senha forte trocada todo mês e acesso só pelo navegador", "Firewall pago, antivírus em todas as máquinas e VPN obrigatória", "Login só com e-mail do seu domínio, verificação em duas etapas e aprovação de novo dispositivo", "Um único login compartilhado pelo time, para controlar melhor os acessos"],
      correta: 2, explicacao: "As camadas citadas são login restrito ao domínio, verificação em duas etapas e aprovação de novo dispositivo; depois, o teste de invasão." },
    { id: "a3-s09", pergunta: "O agente de saldo avisou no Telegram que o saldo de uma conta acabaria no dia 4. O que tornou esse alerta realmente útil, segundo o exemplo da aula?",
      opcoes: ["Ele pausou a campanha mais cara até a recarga cair", "Ele mandou o alerta também para o cliente, que fez a recarga sozinho", "Ele dobrou a frequência de checagem até o saldo ser recarregado", "Ele projetou a data e recomendou gastar até R$ 202 por dia para a conta chegar ao dia 5"],
      correta: 3, explicacao: "O alerta trouxe a projeção e um limite de gasto diário para chegar à data da recarga, sem mexer na conta." },
    { id: "a3-s10", pergunta: "Você quer que o agente de saldo mande os alertas por WhatsApp em vez de Telegram. Qual orientação a aula dá?",
      opcoes: ["Usar um número dedicado só para isso e uma VPS no Brasil", "Usar o número pessoal do gestor, que já está em todos os grupos", "Hospedar na Vercel, que já tem integração nativa com o WhatsApp", "Rodar pelo Cowork no computador do escritório, que fica sempre ligado"],
      correta: 0, explicacao: "Para WhatsApp: um número só para isso e hospedagem em VPS no Brasil." },
    { id: "a3-s11", pergunta: "Um aluno leu o guia de prompts da Anthropic e achou que contradiz o CTR da mentoria. O que a aula explica?",
      opcoes: ["O CTR é uma evolução que substitui o guia da Anthropic, que ficou ultrapassado", "O guia da Anthropic serve para o Chat e o CTR serve só para o Claude Code", "É o mesmo método da Anthropic com outro nome: o Adriano usou uma sigla do mercado de tráfego para ficar mais didático", "O CTR é um método próprio do Adriano, sem relação com a Anthropic"],
      correta: 2, explicacao: "Contexto, Tarefa e Resultado é o método da Anthropic rebatizado com uma sigla familiar para quem é de tráfego." },
    { id: "a3-s12", pergunta: "Você quer uma skill de copy para anúncios e tem um livro em PDF, um curso gravado no HD e o Meta conectado por API. Como a aula trata essas fontes?",
      opcoes: ["Escolher só uma, porque fontes misturadas confundem a skill", "Todas podem ser contexto ao mesmo tempo, e o segundo cérebro pode servir de base para a skill", "Só o curso gravado vale, porque PDF e API não entram como contexto", "Primeiro transformar tudo em um único resumo escrito à mão"],
      correta: 1, explicacao: "O contexto pode vir de vários lugares ao mesmo tempo: API, curso gravado, PDF, link ou print." }
  ];
})();
