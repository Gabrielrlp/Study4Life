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

// btns mensal e semanal
const btnSemanal = document.getElementById("btnSemanal");
const btnMensal = document.getElementById("btnMensal");
const titulo = document.getElementById("tituloRanking");

btnMensal.addEventListener("click", () => {
  btnMensal.classList.add("ativo");
  btnSemanal.classList.remove("ativo");
  titulo.textContent = "Ranking Mensal";
});

btnSemanal.addEventListener("click", () => {
  btnSemanal.classList.add("ativo");
  btnMensal.classList.remove("ativo");
  titulo.textContent = "Ranking Semanal";
});

// ranking dinâmico
const podioRanking = document.getElementById("podioRanking");
const listaRanking = document.getElementById("listaRanking");

const usuarioLogadoId = Number(localStorage.getItem("usuario_id"));

function medalha(posicao) {
  if (posicao === 1) return "🥇";
  if (posicao === 2) return "🥈";
  if (posicao === 3) return "🥉";
  return posicao;
}

function classePodio(posicao) {
  if (posicao === 1) return "primeiro";
  if (posicao === 2) return "segundo";
  if (posicao === 3) return "terceiro";
}

function classeBlocoPodio(posicao) {
  if (posicao === 1) return "ouro";
  if (posicao === 2) return "prata";
  if (posicao === 3) return "bronze";
}

function textoDias(dias) {
  return dias === 1 ? "dia" : "dias";
}

async function carregarRanking() {
  const resposta = await fetch("/ranking");
  const ranking = await resposta.json();

  podioRanking.innerHTML = "";
  listaRanking.innerHTML = "";

  const top3 = ranking.slice(0, 3);

  const ordemPodio = [
    top3[1],
    top3[0],
    top3[2]
  ].filter(Boolean);

  ordemPodio.forEach((usuario) => {
    podioRanking.innerHTML += `
      <article class="podio-item ${classePodio(usuario.posicao)}">
        <div class="avatar">${usuario.avatar}</div>
        <h2>${usuario.nome}</h2>
        <p>${usuario.xp} XP</p>
        <div class="bloco-podio ${classeBlocoPodio(usuario.posicao)}">
          ${medalha(usuario.posicao)}
        </div>
      </article>
    `;
  });

  ranking.forEach((usuario) => {
    const souEu = usuario.usuario_id === usuarioLogadoId;

    listaRanking.innerHTML += `
      <article class="ranking-card ${souEu ? "voce" : ""}">
        <div class="ranking-esquerda">
          <span class="posicao ${usuario.posicao <= 3 ? "medalha" : ""}">
            ${medalha(usuario.posicao)}
          </span>

          <span class="avatar-lista">${usuario.avatar}</span>

          <div class="ranking-info">
            <h3>${souEu ? "Você" : usuario.nome}</h3>
            <p>
              Nível ${usuario.nivel} · 🔥 ${usuario.dias_consecutivos} ${textoDias(usuario.dias_consecutivos)}
            </p>
          </div>
        </div>

        <span class="pontuacao">${usuario.xp} XP</span>
      </article>
    `;
  });
}

carregarRanking();