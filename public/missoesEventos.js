async function registrarEventoMissao(evento) {
  const usuarioId = localStorage.getItem("usuario_id");

  if (!usuarioId) {
    console.log("Usuário não encontrado.");
    return;
  }

  const resposta = await fetch("/missao/evento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario_id: usuarioId,
      evento: evento
    })
  });

  const resultado = await resposta.json();

  console.log("Evento:", evento);
  console.log("Resposta:", resultado.mensagem);

  return resultado;
}