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

async function enviarMensagem() {
  const input = document.getElementById("pergunta");
  const texto = input.value.trim();
  const chatBox = document.getElementById("chatBox");

  if (texto === "") return;

  const msgUser = document.createElement("div");
  msgUser.classList.add("mensagem", "usuario");
  msgUser.innerText = texto;
  chatBox.appendChild(msgUser);

  const msgIA = document.createElement("div");
  msgIA.classList.add("mensagem", "ia");
  msgIA.innerText = "Pensando...";
  chatBox.appendChild(msgIA);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const resposta = await fetch("/chat-ia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario_id: localStorage.getItem("usuario_id") || 1,
        pergunta: texto
      })
    });

    const dados = await resposta.json();

    msgIA.innerText = dados.resposta;

    if (dados.sucesso) {
      carregarHistorico();
    }

  } catch (error) {
    console.error(error);
    msgIA.innerText = "Erro ao conectar com a IA.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("pergunta").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensagem();
  }
});

async function carregarHistorico() {
  const usuarioId = localStorage.getItem("usuario_id") || 1;

  const resposta = await fetch(
    `/historico-chat-ia/${usuarioId}`
  );

  const chats = await resposta.json();

  const historico = document.getElementById("historicoChats");
  historico.innerHTML = "";

  chats.forEach(chat => {
    const item = document.createElement("div");
    item.classList.add("item-historico");

   item.innerHTML = `
  <strong>${chat.pergunta.length > 32 ? chat.pergunta.substring(0, 32) + "..." : chat.pergunta}</strong>
  <small>Conversa salva</small>
`;

    item.onclick = () => abrirChat(chat);

    historico.appendChild(item);
  });
}

function abrirChat(chat) {
  const chatBox = document.getElementById("chatBox");

  chatBox.innerHTML = "";

  const msgUser = document.createElement("div");
  msgUser.classList.add("mensagem", "usuario");
  msgUser.innerText = chat.pergunta;
  chatBox.appendChild(msgUser);

  const msgIA = document.createElement("div");
  msgIA.classList.add("mensagem", "ia");
  msgIA.innerText = chat.resposta;
  chatBox.appendChild(msgIA);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function novoChat() {
  const chatBox = document.getElementById("chatBox");

  chatBox.innerHTML = `
    <div class="mensagem ia">Qual sua dúvida? 👇</div>
  `;
}

carregarHistorico();