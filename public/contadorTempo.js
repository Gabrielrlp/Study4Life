let segundosNoSite = 0;

const usuarioId = localStorage.getItem("usuario_id");

setInterval(() => {
  segundosNoSite++;
}, 1000);

async function enviarTempoParaBanco() {
  if (!usuarioId) {
    return;
  }

  if (segundosNoSite <= 0) {
    return;
  }

  const minutos = segundosNoSite / 60;

  await fetch("/tempo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario_id: usuarioId,
      minutos: minutos
    })
  });

  segundosNoSite = 0;
}

setInterval(() => {
  enviarTempoParaBanco();
}, 60000);

window.addEventListener("beforeunload", () => {
  if (!usuarioId || segundosNoSite <= 0) {
    return;
  }

  const minutos = segundosNoSite / 60;

  navigator.sendBeacon(
    "/tempo",
    new Blob(
      [
        JSON.stringify({
          usuario_id: usuarioId,
          minutos: minutos
        })
      ],
      {
        type: "application/json"
      }
    )
  );
});