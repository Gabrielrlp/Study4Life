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

const API_BASE_PERGUNTAS_MAT = "";


// =========================
// ID DO QUIZ
// precisa ser igual ao id da fase no mapa
// =========================

const QUIZ_ID = "matematica-aritmetica-lvl-1";


// =========================
// PERGUNTAS DO QUIZ MATEMÁTICA
// =========================

const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quanto é 8 + 7?",
    respostas: ["13", "14", "15", "16"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quanto é 12 - 5?",
    respostas: ["5", "6", "7", "8"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quanto é 6 x 4?",
    respostas: ["20", "22", "24", "26"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quanto é 36 ÷ 6?",
    respostas: ["4", "5", "6", "7"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual número é par?",
    respostas: ["13", "25", "32", "47"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é o dobro de 9?",
    respostas: ["16", "17", "18", "19"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é a metade de 50?",
    respostas: ["20", "25", "30", "35"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1584697964190-7383cbee8277?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quanto é 10% de 100?",
    respostas: ["1", "5", "10", "20"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual fração representa metade?",
    respostas: ["1/2", "1/3", "1/4", "2/3"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quanto é 5²?",
    respostas: ["10", "15", "20", "25"],
    correta: 3,
  },
];


// =========================
// VARIÁVEIS DO QUIZ
// =========================

let atual = 0;
let acertos = 0;


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
// CALCULAR ESTRELAS
// =========================

function calcularEstrelas(acertos) {
  if (acertos >= 10) return 3;
  if (acertos >= 8) return 2;
  if (acertos >= 7) return 1;
  return 0;
}


// =========================
// CONCLUIR QUIZ NO BANCO
// =========================

async function concluirQuizNoBanco(quiz_id, xp_ganho, estrelas) {
  const usuario_id = pegarUsuarioId();

  if (!usuario_id) {
    return {
      sucesso: false,
      mensagem: "Usuário não encontrado. Faça login novamente.",
    };
  }

  try {
    const resposta = await fetch(`${API_BASE_PERGUNTAS_MAT}/quiz/concluir`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id,
        quiz_id,
        xp_ganho,
        estrelas,
      }),
    });

    return await resposta.json();

  } catch (erro) {
    console.error("Erro ao concluir quiz:", erro);

    return {
      sucesso: false,
      mensagem: "Erro de comunicação com o servidor.",
    };
  }
}


// =========================
// REGISTRAR MISSÃO POR EVENTO
// =========================

async function registrarEventoMissaoSeguro(evento) {
  const usuario_id = pegarUsuarioId();

  if (!usuario_id) return;

  try {
    await fetch(`${API_BASE_PERGUNTAS_MAT}/missao/evento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id,
        evento,
      }),
    });
  } catch (erro) {
    console.error("Erro ao registrar missão:", erro);
  }
}


// =========================
// CARREGAR QUESTÃO
// =========================

function carregarQuestao() {
  const q = questoes[atual];

  const imagemQuestao = document.getElementById("imagemQuestao");
  const pergunta = document.getElementById("pergunta");
  const contador = document.getElementById("contador");
  const barra = document.getElementById("barra");
  const area = document.getElementById("respostas");

  if (!imagemQuestao || !pergunta || !contador || !barra || !area) {
    console.error("Elementos do quiz não encontrados no HTML.");
    return;
  }

  imagemQuestao.src = q.imagem;
  imagemQuestao.alt = q.pergunta;

  pergunta.textContent = q.pergunta;

  contador.textContent = `${atual + 1}/${questoes.length}`;

  const progresso = ((atual + 1) / questoes.length) * 100;
  barra.style.width = progresso + "%";

  area.innerHTML = "";

  q.respostas.forEach((texto, indice) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.onclick = () => responder(btn, indice);
    area.appendChild(btn);
  });
}


// =========================
// RESPONDER
// =========================

function responder(botao, indice) {
  const correta = questoes[atual].correta;
  const botoes = document.querySelectorAll(".respostas button");

  botoes.forEach((btn) => {
    btn.disabled = true;
  });

  if (indice === correta) {
    botao.classList.add("correta");
    acertos++;
  } else {
    botao.classList.add("errada");

    if (botoes[correta]) {
      botoes[correta].classList.add("correta");
    }
  }

  setTimeout(() => {
    atual++;

    if (atual < questoes.length) {
      carregarQuestao();
    } else {
      finalizarQuiz();
    }
  }, 1000);
}


// =========================
// FINALIZAR QUIZ
// =========================

async function finalizarQuiz() {
  const aprovado = acertos >= 7;

  let xpGanho = 0;
  let estrelas = 0;
  let mensagemXp = "";

  if (aprovado) {
    xpGanho = acertos * 100;
    estrelas = calcularEstrelas(acertos);

    const resultadoQuiz = await concluirQuizNoBanco(
      QUIZ_ID,
      xpGanho,
      estrelas
    );

    mensagemXp = resultadoQuiz.mensagem || "Quiz concluído.";

    await registrarEventoMissaoSeguro("estudar_matematica");

    if (acertos >= 10) {
      await registrarEventoMissaoSeguro("acertar_10_perguntas");
    }
  }

  const conteudoQuiz = document.getElementById("conteudoQuiz");
  const contador = document.getElementById("contador");
  const barra = document.getElementById("barra");

  if (!conteudoQuiz) return;

  conteudoQuiz.innerHTML = `
    <div class="final">
      <h2>Quiz Finalizado 🎉</h2>
      <p>Você acertou ${acertos} de ${questoes.length} questões.</p>

      ${
        aprovado
          ? `
            <p class="aprovado">
              Parabéns! Você concluiu esse level.
            </p>

            <p class="aprovado">
              Você ganhou ${estrelas} estrela${estrelas === 1 ? "" : "s"}.
            </p>

            <p class="aprovado">
              ${mensagemXp}
            </p>

            <button class="btn-voltar" onclick="voltarFases()">
              Voltar para Fases
            </button>
          `
          : `
            <p class="reprovado">
              Você precisa acertar pelo menos 7 questões para concluir.
            </p>

            <div class="acoes-finais">
              <button class="btn-retry" onclick="reiniciarQuiz()">
                Tentar Novamente
              </button>

              <button class="btn-voltar" onclick="voltarFases()">
                Voltar para Fases
              </button>
            </div>
          `
      }
    </div>
  `;

  if (contador) {
    contador.textContent = `${questoes.length}/${questoes.length}`;
  }

  if (barra) {
    barra.style.width = "100%";
  }
}


// =========================
// VOLTAR PARA FASES
// =========================

function voltarFases() {
  window.location.href = "quizMatematica.html";
}


// =========================
// REINICIAR QUIZ
// =========================

function reiniciarQuiz() {
  atual = 0;
  acertos = 0;

  const conteudoQuiz = document.getElementById("conteudoQuiz");

  if (!conteudoQuiz) return;

  conteudoQuiz.innerHTML = `
    <div class="area-img">
      <img id="imagemQuestao" src="" alt="Imagem da questão">
    </div>

    <div class="pergunta" id="pergunta"></div>

    <div class="respostas" id="respostas"></div>
  `;

  carregarQuestao();
}


// =========================
// INICIAR
// =========================

carregarQuestao();