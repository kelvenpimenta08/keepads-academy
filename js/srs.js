// Revisão espaçada no estilo Anki (variação simplificada do algoritmo SM-2).
// Notas: 1 = Errei, 2 = Difícil, 3 = Bom, 4 = Fácil.
window.SRS = (function () {
  const MIN = 60 * 1000;
  const DIA = 24 * 60 * MIN;
  const EASE_INICIAL = 2.5;
  const EASE_MINIMO = 1.3;

  function proximo(estado, nota, agora) {
    agora = agora || new Date();
    const s = Object.assign({ ease: EASE_INICIAL, interval_days: 0, reps: 0, lapses: 0 }, estado || {});
    let ease = Number(s.ease);
    let intervalo = Number(s.interval_days);
    let reps = s.reps;
    let lapses = s.lapses;
    let espera;

    if (nota === 1) {
      // Errou: volta para o começo e reaparece em 10 minutos.
      if (reps > 0) lapses += 1;
      reps = 0;
      intervalo = 0;
      ease = Math.max(EASE_MINIMO, ease - 0.2);
      espera = 10 * MIN;
    } else {
      if (reps === 0) intervalo = nota === 4 ? 4 : 1;
      else if (reps === 1) intervalo = nota === 2 ? 2 : nota === 3 ? 3 : 6;
      else if (nota === 2) intervalo = Math.max(intervalo + 1, intervalo * 1.2);
      else if (nota === 3) intervalo = Math.max(intervalo + 1, intervalo * ease);
      else intervalo = Math.max(intervalo + 1, intervalo * ease * 1.3);
      intervalo = Math.round(intervalo);
      if (nota === 2) ease = Math.max(EASE_MINIMO, ease - 0.15);
      if (nota === 4) ease = ease + 0.15;
      reps += 1;
      espera = intervalo * DIA;
    }

    return {
      ease: Math.round(ease * 100) / 100,
      interval_days: intervalo,
      reps: reps,
      lapses: lapses,
      due: new Date(agora.getTime() + espera).toISOString(),
      last_review: agora.toISOString()
    };
  }

  function formatarIntervalo(dias) {
    if (dias <= 0) return "10 min";
    if (dias === 1) return "1 dia";
    if (dias < 30) return dias + " dias";
    const meses = Math.round(dias / 30);
    return meses === 1 ? "1 mês" : meses + " meses";
  }

  function rotulo(estado, nota) {
    return formatarIntervalo(proximo(estado, nota).interval_days);
  }

  function vencido(estado, agora) {
    return !estado || new Date(estado.due) <= (agora || new Date());
  }

  return { proximo: proximo, rotulo: rotulo, vencido: vencido, formatarIntervalo: formatarIntervalo };
})();
