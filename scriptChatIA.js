// menu lateral
const menu = document.getElementById("menuLateral");
const menuIcon = document.querySelector(".menu-icon");

function openMenu() {
  menu.classList.add("active");
}

function closeMenu() {
  menu.classList.remove("active");
}

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
    menu.classList.remove("active");
  }
});

function toggleHistorico() {
  const historico = document.querySelector(".historico");
  historico.classList.toggle("fechado");
}

function enviarMensagem() {
  const input = document.getElementById("pergunta");
  const texto = input.value.trim();
  const chatBox = document.getElementById("chatBox");

  if (texto === "") return;

  // mensagem do usuário
  const msgUser = document.createElement("div");
  msgUser.classList.add("mensagem", "usuario");
  msgUser.innerText = texto;
  chatBox.appendChild(msgUser);

  // resposta da IA
  const msgIA = document.createElement("div");
  msgIA.classList.add("mensagem", "ia");
  msgIA.innerText = "Pensando...";
  chatBox.appendChild(msgIA);

  input.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    msgIA.innerText = "Essa é uma resposta simulada da IA 😉";
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}