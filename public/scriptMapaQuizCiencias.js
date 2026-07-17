// =========================
// MENU LATERAL
// =========================

const menu = document.getElementById("menuLateral");
const menuIcon = document.querySelector(".menu-icon");

function openMenu() {
  if (menu) {
    menu.classList.add("active");
  }
}

function closeMenu() {
  if (menu) {
    menu.classList.remove("active");
  }
}

document.addEventListener("click", (e) => {
  if (
    menu &&
    menuIcon &&
    !menu.contains(e.target) &&
    !menuIcon.contains(e.target)
  ) {
    menu.classList.remove("active");
  }
});


// =========================
// CONFIGURAÇÃO DA API
// =========================

// Se você está salvando no Railway, deixe assim:
// const API_BASE_QUIZ = "https://study-4life-production-c3a4.up.railway.app";

// Se estiver testando com o back-end local, use esta linha no lugar da de cima:
const API_BASE_QUIZ = "";


// =========================
// PROGRESSO VINDO DO BANCO
// =========================

let progressoQuiz = {
  xp_quiz: 0,
  fases_concluidas: 0,
  estrelas: 0,
  rank: "Aprendiz",
  quizzes_concluidos: [],
};


// =========================
// MAPA DE FASES - CIÊNCIAS
// =========================

const mundosQuiz = [
  {
    capitulo: "Capítulo 1",
    titulo: "Biologia na Ciência",
    descricao:
      "Aprenda sobre seres vivos, células, corpo humano, meio ambiente e método científico.",
    fases: [
      {
        id: "ciencias-biologia-lvl-1",
        titulo: "Seres Vivos",
        descricao: "Características dos seres vivos e organização da vida.",
        icone: "🧬",
        xp: 1000,
        url: "indexPerguntasCiencias.html",
      },
      {
        id: "ciencias-biologia-lvl-2",
        titulo: "Células",
        descricao: "Entenda células, organelas e funções básicas.",
        icone: "🔬",
        xp: 1200,
        url: "#",
      },
      {
        id: "ciencias-biologia-lvl-3",
        titulo: "Corpo Humano",
        descricao: "Sistemas do corpo humano e suas funções.",
        icone: "🫀",
        xp: 1500,
        url: "#",
      },
      {
        id: "ciencias-biologia-boss",
        titulo: "Chefão Biológico",
        descricao: "Desafio final de biologia.",
        icone: "👑",
        xp: 2000,
        url: "#",
      },
    ],
  },
  {
    capitulo: "Capítulo 2",
    titulo: "Física na Ciência",
    descricao:
      "Treine conceitos de movimento, força, energia, calor, luz e fenômenos físicos.",
    fases: [
      {
        id: "ciencias-fisica-lvl-1",
        titulo: "Movimento",
        descricao: "Velocidade, deslocamento e noções de movimento.",
        icone: "🚀",
        xp: 1000,
        url: "#",
      },
      {
        id: "ciencias-fisica-lvl-2",
        titulo: "Força",
        descricao: "Entenda força, peso, massa e interação entre corpos.",
        icone: "💪",
        xp: 1200,
        url: "#",
      },
      {
        id: "ciencias-fisica-lvl-3",
        titulo: "Energia",
        descricao: "Aprenda tipos de energia e transformações energéticas.",
        icone: "⚡",
        xp: 1500,
        url: "#",
      },
      {
        id: "ciencias-fisica-boss",
        titulo: "Chefão Físico",
        descricao: "Desafio final de física.",
        icone: "🏆",
        xp: 2000,
        url: "#",
      },
    ],
  },
];


// =========================
// ELEMENTOS DA TELA
// =========================

const mapaQuiz = document.getElementById("mapaQuiz");
const xpQuizTela = document.getElementById("xpQuizTela");
const fasesConcluidasTela = document.getElementById("fasesConcluidasTela");
const estrelasTela = document.getElementById("estrelasTela");
const statusGeral = document.getElementById("statusGeral");


// =========================
// PEGAR USUÁRIO LOGADO
// =========================

function pegarUsuarioId() {
  const usuarioSalvo =
    localStorage.getItem("usuario") ||
    localStorage.getItem("usuarioLogado");

  if (usuarioSalvo) {
    try {
      const usuario = JSON.parse(usuarioSalvo);
      return usuario.id || usuario.usuario_id;
    } catch (erro) {
      console.error("Erro ao ler usuário do localStorage:", erro);
    }
  }

  return localStorage.getItem("usuario_id");
}


// =========================
// CARREGAR PROGRESSO DO BANCO
// =========================

async function carregarProgressoQuiz() {
  const usuario_id = pegarUsuarioId();

  console.log("ID do usuário usado na tela de fases:", usuario_id);

  if (!usuario_id) {
    mostrarAviso("Usuário não encontrado. Faça login novamente.");
    desenharMapa();
    return;
  }

  try {
    const resposta = await fetch(`${API_BASE_QUIZ}/quiz/progresso/${usuario_id}`);
    const dados = await resposta.json();

    console.log("Resposta do progresso do quiz:", dados);

    if (!dados.sucesso) {
      mostrarAviso(dados.mensagem || "Erro ao carregar progresso.");
      desenharMapa();
      return;
    }

    progressoQuiz = dados.progresso;

    desenharMapa();

  } catch (erro) {
    console.error("Erro ao carregar progresso do quiz:", erro);
    mostrarAviso("Erro de comunicação com o servidor.");
    desenharMapa();
  }
}


// =========================
// FUNÇÕES DE PROGRESSO
// =========================

function faseFoiConcluida(id) {
  return progressoQuiz.quizzes_concluidos.some((quiz) => quiz.quiz_id === id);
}

function pegarEstrelas(id) {
  const quiz = progressoQuiz.quizzes_concluidos.find(
    (quiz) => quiz.quiz_id === id
  );

  return quiz ? Number(quiz.estrelas) : 0;
}

function faseEstaDesbloqueada(fases, indice) {
  if (indice === 0) return true;

  const faseAnterior = fases[indice - 1];

  return faseFoiConcluida(faseAnterior.id);
}


// =========================
// DESENHAR MAPA NA TELA
// =========================

function desenharMapa() {
  if (!mapaQuiz) return;

  mapaQuiz.innerHTML = "";

  let totalFases = 0;
  let totalConcluidas = 0;
  let totalEstrelas = 0;

  mundosQuiz.forEach((mundo) => {
    totalFases += mundo.fases.length;

    const concluidasNoMundo = mundo.fases.filter((fase) =>
      faseFoiConcluida(fase.id)
    ).length;

    totalConcluidas += concluidasNoMundo;

    const porcentagem = (concluidasNoMundo / mundo.fases.length) * 100;

    const mundoCard = document.createElement("section");
    mundoCard.classList.add("mundo-card");

    mundoCard.innerHTML = `
      <div class="mundo-topo">
        <div>
          <span class="mundo-tag">${mundo.capitulo}</span>
          <h2>${mundo.titulo}</h2>
          <p>${mundo.descricao}</p>
        </div>

        <div class="mundo-progresso">
          <p>${concluidasNoMundo}/${mundo.fases.length} fases concluídas</p>
          <div class="barra-progresso">
            <span style="width: ${porcentagem}%"></span>
          </div>
        </div>
      </div>

      <div class="trilha-game"></div>
    `;

    const trilha = mundoCard.querySelector(".trilha-game");

    mundo.fases.forEach((fase, indice) => {
      const concluida = faseFoiConcluida(fase.id);
      const desbloqueada = faseEstaDesbloqueada(mundo.fases, indice);
      const estrelas = pegarEstrelas(fase.id);

      totalEstrelas += estrelas;

      const botao = document.createElement("button");
      botao.classList.add("fase-game");

      if (concluida) {
        botao.classList.add("concluida");
      } else if (desbloqueada) {
        botao.classList.add("atual");
      } else {
        botao.classList.add("bloqueada");
      }

      botao.innerHTML = `
        ${!desbloqueada ? `<span class="cadeado">🔒</span>` : ""}
        <div class="fase-numero">${concluida ? "✅" : fase.icone}</div>
        <h3>${fase.titulo}</h3>
        <p>${fase.descricao}</p>

        <div class="fase-recompensa">
          <span>+${fase.xp} XP</span>
          <span class="estrelas">${montarEstrelas(estrelas)}</span>
        </div>
      `;

      botao.addEventListener("click", () => {
        abrirFase(fase, desbloqueada);
      });

      trilha.appendChild(botao);
    });

    mapaQuiz.appendChild(mundoCard);
  });

  atualizarCardsSuperiores(totalConcluidas, totalFases, totalEstrelas);
  atualizarRank();
}


// =========================
// ATUALIZAR CARDS SUPERIORES
// =========================

function atualizarCardsSuperiores(totalConcluidas, totalFases, totalEstrelas) {
  if (xpQuizTela) {
    xpQuizTela.textContent = progressoQuiz.xp_quiz || 0;
  }

  if (fasesConcluidasTela) {
    fasesConcluidasTela.textContent = `${totalConcluidas}/${totalFases}`;
  }

  if (estrelasTela) {
    estrelasTela.textContent = totalEstrelas;
  }

  if (statusGeral) {
    statusGeral.textContent = `${totalConcluidas} fases concluídas`;
  }
}


// =========================
// ESTRELAS
// =========================

function montarEstrelas(quantidade) {
  let estrelas = "";

  for (let i = 1; i <= 3; i++) {
    estrelas += i <= quantidade ? "⭐" : "☆";
  }

  return estrelas;
}


// =========================
// RANK
// =========================

function atualizarRank() {
  const rank = document.querySelector(".rank-card strong");

  if (rank) {
    rank.textContent = progressoQuiz.rank || "Aprendiz";
  }
}


// =========================
// ABRIR FASE
// =========================

function abrirFase(fase, desbloqueada) {
  if (!desbloqueada) {
    mostrarAviso("Conclua a fase anterior para desbloquear esta.");
    return;
  }

  if (fase.url === "#") {
    mostrarAviso("Essa fase ainda está em desenvolvimento.");
    return;
  }

  window.location.href = fase.url;
}


// =========================
// AVISO
// =========================

function mostrarAviso(texto) {
  let aviso = document.querySelector(".aviso-bloqueado");

  if (!aviso) {
    aviso = document.createElement("div");
    aviso.classList.add("aviso-bloqueado");
    document.body.appendChild(aviso);
  }

  aviso.textContent = texto;
  aviso.classList.add("ativo");

  setTimeout(() => {
    aviso.classList.remove("ativo");
  }, 2200);
}


// =========================
// INICIAR
// =========================

carregarProgressoQuiz();