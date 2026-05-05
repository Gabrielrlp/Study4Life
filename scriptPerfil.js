// menu lateral
const menu = document.getElementById("menuLateral");
const menuIcon = document.querySelector(".menu-icon");

// abrir menu
function openMenu() {
    menu.classList.add("active");
}

// fechar menu
function closeMenu() {
    menu.classList.remove("active");
}

// fechar ao clicar fora
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
        menu.classList.remove("active");
    }
});

let xp = 3400;
let xpMeta = 4000;
let nivel = 13;
let feitas = 0;

const avatares = ["🧑‍🎓", "👨‍💻", "👩‍💻", "🧠", "🚀", "😎"];
let avatarAtual = 0;

function atualizarBarra() {
  let porcentagem = (xp / xpMeta) * 100;
  if (porcentagem > 100) porcentagem = 100;

  document.getElementById("barraXp").style.width = porcentagem + "%";
  document.getElementById("xpAtual").textContent = xp;
}

function concluirMeta(valorXP) {
  xp += valorXP;
  feitas++;

  if (xp >= xpMeta) {
    xp -= xpMeta;
    nivel++;

    document.getElementById("boxNivel").textContent = nivel;
    document.getElementById("nivelMini").textContent = nivel;
  }

  document.getElementById("feitas").textContent = feitas;
  atualizarBarra();
}

function trocarAvatar() {
  avatarAtual++;

  if (avatarAtual >= avatares.length) {
    avatarAtual = 0;
  }

  document.getElementById("avatarBtn").textContent = avatares[avatarAtual];
}

atualizarBarra();

function toggleConfig() {
  const menu = document.getElementById("menuConfig");
  const btn = document.querySelector(".btn-config");
  const seta = document.getElementById("setaConfig");

  menu.classList.toggle("ativo");
  btn.classList.toggle("aberto");

  if (menu.classList.contains("ativo")) {
    seta.textContent = "▴";
  } else {
    seta.textContent = "▾";
  }
}