// menu lateal
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

//  config de tempo
let tempoTotalFoco = 25 * 60;
let tempoTotalDescanso = 5 * 60;

let tempoFoco = tempoTotalFoco;
let tempoDescanso = tempoTotalDescanso;

let modo = "foco";
let intervalo = null;

// FORMATAR 
function formatarTempo(segundos) {
  let min = Math.floor(segundos / 60);
  let sec = segundos % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// progresso
function atualizarProgresso() {
  let grausFoco = (tempoFoco / tempoTotalFoco) * 360;
  let grausDescanso = (tempoDescanso / tempoTotalDescanso) * 360;

  const focoEl = document.getElementById("progressoFoco");
  const descansoEl = document.getElementById("progressoDescanso");

  if (focoEl) {
    focoEl.style.background =
      `conic-gradient(#7ed957 ${grausFoco}deg, #2a2a2a 0deg)`;
  }

  if (descansoEl) {
    descansoEl.style.background =
      `conic-gradient(#7ed957 ${grausDescanso}deg, #2a2a2a 0deg)`;
  }
}

function atualizarTela() {
  const foco = document.getElementById("tempoFoco");
  const descanso = document.getElementById("tempoDescanso");

  if (foco) foco.innerText = formatarTempo(tempoFoco);
  if (descanso) descanso.innerText = formatarTempo(tempoDescanso);

  atualizarProgresso();
}

function tocarAlarme() {
  const audio = document.getElementById("alarme");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// salvar
function salvarEstado() {
  localStorage.setItem("modo", modo);
  localStorage.setItem("fim", Date.now() + getTempoAtual() * 1000);
}

// tempo atual
function getTempoAtual() {
  return modo === "foco" ? tempoFoco : tempoDescanso;
}

function iniciarTimer() {
  if (intervalo) return;

  salvarEstado();

  intervalo = setInterval(() => {

    if (modo === "foco") {
      if (tempoFoco > 0) {
        tempoFoco--;
      } else {
        tocarAlarme();

        setTimeout(() => {
          alert("Tempo de foco acabou! Hora do descanso!");
        }, 500);

        modo = "descanso";
        tempoDescanso = tempoTotalDescanso;
        salvarEstado();
      }
    }

    else {
      if (tempoDescanso > 0) {
        tempoDescanso--;
      } else {
        tocarAlarme();

        setTimeout(() => {
          alert("Descanso acabou! Volte ao foco!");
        }, 500);

        modo = "foco";
        tempoFoco = tempoTotalFoco;
        salvarEstado();
      }
    }
    atualizarTela();

  }, 1000);
}

// btns
function iniciarFoco() {
  modo = "foco";
  iniciarTimer();
}

function iniciarDescanso() {
  modo = "descanso";
  iniciarTimer();
}

function pausar() {
  clearInterval(intervalo);
  intervalo = null;
  localStorage.removeItem("fim");
}

function resetar() {
  clearInterval(intervalo);
  intervalo = null;

  tempoFoco = tempoTotalFoco;
  tempoDescanso = tempoTotalDescanso;
  modo = "foco";

  localStorage.clear();
  atualizarTela();
}

function recuperarEstado() {
  const fim = localStorage.getItem("fim");
  const modoSalvo = localStorage.getItem("modo");

  if (!fim || !modoSalvo) return;

  let restante = Math.floor((fim - Date.now()) / 1000);

  if (restante <= 0) {
    localStorage.clear();
    return;
  }

  modo = modoSalvo;

  if (modo === "foco") {
    tempoFoco = restante;
  } else {
    tempoDescanso = restante;
  }

  iniciarTimer();
}

recuperarEstado();
atualizarTela();