// typeware effect
function typeWriter(elementId, texto, velocidade = 50) {
  let index = 0;
  const elemento = document.getElementById(elementId);

  function escrever() {
    if (index < texto.length) {
      elemento.textContent += texto.charAt(index);
      index++;
      setTimeout(escrever, velocidade);
    }
  }

  escrever();
}

// pega o nome salvo no login
const nomeUsuario = localStorage.getItem("usuario_nome");

// se não existir nome
const nomeFinal = nomeUsuario || "Aluno";

// escreve o texto
typeWriter("typing-text", `Bem-vindo ${nomeFinal}!`, 50);


// carregar dados do perfil na home
async function carregarDadosHome() {
  const usuarioId = localStorage.getItem("usuario_id");

  if (!usuarioId) {
    return;
  }

  const resposta = await fetch(`/perfil/${usuarioId}`);
  const dados = await resposta.json();

  const nivel = String(dados.nivel).padStart(2, "0");
  const horas = Math.floor(dados.horas_totais);
  const horasFormatadas = String(horas).padStart(2, "0");
  const dias = dados.dias_consecutivos;

  document.getElementById("nivelHome").textContent = nivel;
  document.getElementById("horasHome").textContent = horasFormatadas;
  document.getElementById("diasHome").textContent = dias;

  if (horas === 1) {
    document.getElementById("textoHorasHome").textContent = "hora";
  } else {
    document.getElementById("textoHorasHome").textContent = "horas";
  }

  if (dias === 1) {
    document.getElementById("textoDiasHome").textContent = "dia";
  } else {
    document.getElementById("textoDiasHome").textContent = "dias";
  }
}

carregarDadosHome();


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