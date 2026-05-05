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