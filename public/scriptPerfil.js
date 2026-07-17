// =========================
// NOME DO USUÁRIO LOGADO
// =========================
const nomeSalvo = localStorage.getItem("usuario_nome");
const nomeUsuario = document.getElementById("nomeUsuario");

if (nomeSalvo) {
  nomeUsuario.innerHTML = `<span>${nomeSalvo}</span>`;
} else {
  nomeUsuario.innerHTML = `<span>Estudante</span>`;
}


// =========================
// MENU LATERAL
// =========================
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


// =========================
// VARIÁVEIS PERFIL
// =========================
let xpNivel = 0;
let xpMeta = 100;
let nivel = 0;
let feitas = 0;


// =========================
// AVATARES
// =========================
const avatares = [
  "🧑‍🎓",
  "👨‍💻",
  "👩‍💻",
  "🧠",
  "🚀",
  "😎"
];

let avatarAtual = 0;


// =========================
// ATUALIZAR BARRA XP DE NÍVEL
// =========================
function atualizarBarra() {
  let xpNivelAtual = xpNivel % 100;
  let porcentagem = (xpNivelAtual / xpMeta) * 100;

  document.getElementById("barraXp").style.width = porcentagem + "%";
  document.getElementById("xpAtual").textContent = xpNivelAtual;
  document.getElementById("xpMeta").textContent = xpMeta;
}


// =========================
// TROCAR AVATAR E SALVAR NO BANCO
// =========================
async function trocarAvatar() {
  avatarAtual++;

  if (avatarAtual >= avatares.length) {
    avatarAtual = 0;
  }

  const novoAvatar = avatares[avatarAtual];
  const usuarioId = localStorage.getItem("usuario_id");

  document.getElementById("avatarBtn").textContent = novoAvatar;
  localStorage.setItem("usuario_avatar", novoAvatar);

  if (!usuarioId) {
    return;
  }

  await fetch("/avatar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario_id: usuarioId,
      avatar: novoAvatar
    })
  });
}


// =========================
// MENU CONFIG
// =========================
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


// =========================
// CARREGAR MISSÕES DIÁRIAS
// =========================
async function carregarMissoesDiarias() {
  const usuarioId = localStorage.getItem("usuario_id");
  const areaMissoes = document.getElementById("areaMissoes");

  if (!usuarioId || !areaMissoes) {
    return;
  }

  try {
    const resposta = await fetch(`/missoes/${usuarioId}`);

    if (!resposta.ok) {
      console.log("Erro ao buscar missões.");
      return;
    }

    const missoes = await resposta.json();

    areaMissoes.innerHTML = "";

    missoes.forEach((missao) => {
      const concluida = missao.concluida === 1;

      areaMissoes.innerHTML += `
        <div class="missao ${concluida ? "missao-concluida" : ""}">
          <div class="missao-left">
            <span>${concluida ? "✅" : ""} ${missao.titulo}</span>
          </div>

          <div class="recompensa">
            ${concluida ? "Concluída" : `+${missao.xp} XP`}
          </div>
        </div>
      `;
    });

  } catch (erro) {
    console.log("Erro ao carregar missões:", erro);
  }
}


// =========================
// CARREGAR DADOS PERFIL
// =========================
async function carregarProgressoUsuario() {
  const usuarioId = localStorage.getItem("usuario_id");

  if (!usuarioId) {
    return;
  }

  try {
    const resposta = await fetch(`/perfil/${usuarioId}`);

    if (!resposta.ok) {
      console.log("Erro ao buscar dados do perfil.");
      return;
    }

    const dados = await resposta.json();

    xpNivel = dados.xp_nivel;
    nivel = dados.nivel;
    feitas = dados.missoes_concluidas_hoje;

    if (dados.avatar) {
      document.getElementById("avatarBtn").textContent = dados.avatar;

      const indiceAvatar = avatares.indexOf(dados.avatar);

      if (indiceAvatar !== -1) {
        avatarAtual = indiceAvatar;
      }

      localStorage.setItem("usuario_avatar", dados.avatar);
    }

    document.getElementById("dias").textContent = dados.dias_consecutivos;
    document.getElementById("boxNivel").textContent = dados.nivel;

    const horasFormatadas = String(
      Math.floor(dados.horas_totais)
    ).padStart(2, "0");

    document.getElementById("horas").textContent = `${horasFormatadas}h`;
    document.getElementById("ranking").textContent = `#${dados.ranking}`;

    document.getElementById("feitas").textContent =
      dados.missoes_concluidas_hoje;

    if (document.getElementById("xpQuiz")) {
      document.getElementById("xpQuiz").textContent = dados.xp_quiz;
    }

    atualizarBarra();

  } catch (erro) {
    console.log("Erro ao carregar perfil:", erro);
  }
}


// =========================
// INICIAR
// =========================
async function iniciarPerfil() {
  await carregarProgressoUsuario();
  await carregarMissoesDiarias();
}

iniciarPerfil();