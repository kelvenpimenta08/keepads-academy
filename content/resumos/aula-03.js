// Resumo por hora e mapa mental da Aula 03 (Adriano Gianini), feitos a partir da transcrição completa.
(function () {
  const aula = ((window.AULAS || {})["adriano-ia-trafego"] || {})[3];
  if (!aula) return;
  aula.fases = [
    {
      hora: 1,
      tempo: "0:00 a 1:00",
      titulo: "Do prompt redondo à skill, com o Jarvis",
      ideia: "Antes de pensar em agente, é preciso um prompt redondo no método CTR, que vira skill. O Adriano mostra o Jarvis de YouTube, feito de várias skills, rodando ao vivo.",
      aprender: [
        "O maior obstáculo não é a IA, é o processo. Se você não sabe a ordem em que otimiza uma campanha (palavra-chave, termos de pesquisa, gasto, impressões), não tem como criar um agente que siga o seu jeito.",
        "O caminho é: criar um prompt, rodar umas três vezes até sair sempre do jeito que você quer e só então transformar em skill. Corrigir o prompt enquanto conecta o agente não faz sentido.",
        "CTR é contexto, tarefa e resultado. Em “crie anúncios de Google Ads a partir de uma URL”, tudo o que fica de fora (quantos anúncios, foco em dor ou desejo, políticas do Google Ads, formato da entrega) ele decide por você.",
        "Skill é uma habilidade: o prompt validado vira uma espécie de plugin. Depois você só diz “crie a persona deste site a partir da habilidade de persona”, sem colar o prompt de novo.",
        "O Jarvis de YouTube é um caminhão de skills, construído uma etapa por vez em duas semanas. Ele aprendeu a estruturar pautas lendo os cards do ClickUp e a fazer capas com a transcrição de um treinamento de 7 horas.",
        "O gerador de capa aprendeu com o CTR das capas do próprio canal, métrica que não existe em canais de outros. O botão “Por que não?” devolve o motivo da recusa e o agente vai ficando mais inteligente.",
        "Os nomes dos capítulos do vídeo são SEO para o Google e a descrição é SEO para o YouTube. Por isso o Jarvis confere o volume de cada nome no Planejador de Palavras-chave, pela API do Google Ads."
      ],
      executar: [
        "Escrever a primeira versão do seu processo de otimização de uma campanha de rede de pesquisa, na ordem real em que você faz.",
        "Escolher uma tarefa simples (conferir saldo, criar persona) e escrever o prompt com contexto, tarefa e resultado, dizendo também o formato e o visual da entrega.",
        "Rodar o prompt pelo menos três vezes e ajustar até sair exatamente do jeito que você quer.",
        "Mandar ao Claude o modelo pronto (link, print, vídeo ou curso gravado) em vez de perder tempo explicando o que você quer."
      ],
      frase: "Precisar construir skills revelou a nossa incapacidade de olhar para os próprios processos."
    },
    {
      hora: 2,
      tempo: "1:00 a 2:00",
      titulo: "Cérebro, revisão do prompt de saldo e agente",
      ideia: "O cérebro é conhecimento bruto e pode servir a vários usos. A turma revisa o prompt de saldo do Adriano Gouveia e aprende o comando para transformar a skill no primeiro agente autônomo.",
      aprender: [
        "Cérebro é informação bruta, como um canal de YouTube baixado com todas as transcrições em arquivos .md e todas as capas. O mesmo cérebro pode servir para aprender Google Ads, ter ideias de pauta e criar capas.",
        "Cérebro não é cadeira. A cadeira é um funcionário, como o social media de YouTube, que usa vários cérebros. Ela consulta as pastas no HD ou, se estiver online, o banco de dados.",
        "O cérebro de canais é vivo: uma tarefa agendada no Claude roda toda quarta, baixa os vídeos novos e traz um resumo. Um curso gravado no computador não precisa disso, porque não muda.",
        "O prompt de saldo só lia o saldo das contas pré-pagas e avisava no Telegram antes de uma conta parar. Nunca alterava orçamento, pausava campanha ou gerava pagamento.",
        "Para quem tem pouca experiência, é melhor fazer primeiro Google Ads e depois Meta. Com duas APIs ao mesmo tempo, você precisa tratar o erro de cada uma.",
        "A skill de saldo economiza, na conta do Adriano, 1 hora por dia × 22 dias úteis × 12 meses = 264 horas por ano, por algo que levou meia hora. E evita campanha parada por falta de saldo.",
        "Vale construir fragmentado: masterizar cada etapa e juntar depois é mais fácil do que corrigir um todo que virou um Frankenstein. Para mudar algo que funciona, crie um paralelo e só substitua quando ele estiver pronto."
      ],
      executar: [
        "Montar um cérebro baixando um canal de YouTube (uns dez vídeos) e criar uma tarefa agendada semanal para manter ele atualizado.",
        "Pedir ao Claude “agora transforma em skill” quando o prompt estiver validado, definindo as condições de entrada (quando eu mandar uma URL, quando eu colar tal arquivo).",
        "Pedir ao Claude para transformar a skill em agente autônomo no projeto com Vercel e Supabase, como a cadeira de auditor de saldo, rodando todos os dias às 10h e às 18h no fuso de São Paulo e criando os crons necessários.",
        "Usar a skill de saldo do Adriano Gouveia, que está no grupo, se você ainda não tiver uma skill própria.",
        "Pegar as transcrições das aulas e pedir ao Claude para construir um mapa mental para revisar o conteúdo."
      ],
      frase: "Eu só preciso saber o que eu quero, não como fazer."
    },
    {
      hora: 3,
      tempo: "2:00 ao fim",
      titulo: "Separar construção do uso, segurança e APIs",
      ideia: "Revisões ao vivo mostram que é preciso separar a construção da skill do uso e simplificar processos. A aula fecha com segurança, a regra de só contratar software com API e o primeiro agente funcionando.",
      aprender: [
        "Separe a construção do uso: primeiro construa a skill o melhor possível, depois rode num cliente. O documento do Valdimir descrevia um dashboard, e pegar o dado e montar a tela não é análise.",
        "Uma skill de análise de campanha precisa da ordem (campanha, grupo, palavra-chave, termos de pesquisa, índice de qualidade) e, para cada cenário possível, do que fazer.",
        "Nenhum sistema é 100% seguro. Mande o Claude ler a LGPD e agir 100% dentro dela com dados de terceiros, coloque camadas de segurança e peça ao modelo mais forte do Claude para tentar invadir o seu próprio sistema.",
        "No contrato do Renato, o Adriano sugeriu trocar duas aprovações por um formulário preenchido pelo cliente. Evita erro de transcrição e quem preencheu errado foi o cliente. Agente burocrático gera automação burocrática.",
        "Às vezes sai mais caro construir do que contratar: ele prefere pagar um CRM pronto a construir um com multiatendimento no WhatsApp. Mas nunca mais contrate um software sem conferir se ele tem API completa.",
        "Com API completa no CRM, o Claude lê as conversas dos vendedores e, com UTM em cada negócio, devolve a venda com o valor como conversão para o Google Ads.",
        "O agente de saldo do Adriano Gouveia avisou no Telegram que o saldo acabaria no dia 4 e recomendou gastar até R$ 202 por dia para chegar ao dia 5. Para WhatsApp, use um número só para isso e uma VPS no Brasil."
      ],
      executar: [
        "Separar em duas etapas o pedido de construir a skill e o pedido de usá-la num cliente real.",
        "Pedir ao Claude para ler a LGPD na íntegra e agir 100% dentro dela em tudo o que envolver dados de terceiros.",
        "Mandar o modelo mais forte do Claude tentar invadir o sistema que você construiu, avisando que o sistema é seu.",
        "Conferir se as ferramentas que a agência usa têm API completa antes de contratar ou renovar.",
        "Chegar na terça com uma skill muito redonda e, se estiver travado, assistir à aula de skills do curso de Claude da comunidade."
      ],
      frase: "Quanto melhor você constrói, mais livre fica quando aquilo virar agente."
    }
  ];
  aula.mapa = {
    centro: "Prompt CTR, skill e agente",
    ramos: [
      { titulo: "Processo antes da IA", itens: ["Processo não documentado vira agente ruim", "Escrever a ordem real da otimização", "O problema está no processo, não na IA", "Construir uma etapa por vez"] },
      { titulo: "Método CTR", itens: ["Contexto: tudo o que ele precisa saber", "Tarefa: direta e objetiva", "Resultado: formato e visual da entrega", "O que fica de fora ele decide", "Mandar modelo em vez de explicar"] },
      { titulo: "Prompt vira skill", itens: ["Rodar umas três vezes até ficar redondo", "Pedir “agora transforma em skill”", "Definir as condições de entrada", "Separar a construção do uso"] },
      { titulo: "Jarvis de YouTube", itens: ["Caminhão de skills em duas semanas", "Pautas aprendidas nos cards do ClickUp", "Capas guiadas pelo CTR do canal", "Botão “Por que não?” ensina o agente", "Capítulos conferidos no Planejador de Palavras-chave"] },
      { titulo: "Cérebro e cadeira", itens: ["Cérebro é conhecimento bruto", "Um cérebro serve a vários usos", "Cadeira é um funcionário", "Tarefa agendada mantém o cérebro vivo", "PDF, curso, vídeo ou API viram contexto"] },
      { titulo: "Primeiro agente autônomo", itens: ["Skill de saldo só lê e avisa", "Uma plataforma de cada vez", "Vercel, Supabase e crons nos horários", "264 horas economizadas por ano", "Alerta no Telegram com data da recarga"] },
      { titulo: "Segurança e ferramentas", itens: ["Claude agindo 100% dentro da LGPD", "Camadas de segurança no sistema", "Modelo mais forte tenta invadir", "Às vezes contratar sai mais barato", "Só contratar software com API"] }
    ]
  };
})();
