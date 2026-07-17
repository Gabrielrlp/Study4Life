// =========================
// CONFIGURAÇÃO DA API
// =========================

// Se você está salvando no Railway, deixe assim:
// const API_BASE_PERGUNTAS = "https://study-4life-production-c3a4.up.railway.app";

// Se estiver testando com o back-end local, use esta linha no lugar da de cima:
const API_BASE_PERGUNTAS = "";


// =========================
// PERGUNTAS QUIZ PORTUGUÊS
// =========================

const questoes = [
  {
    imagem:
      "https://plus.unsplash.com/premium_photo-1725075086642-584ef254b39c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual palavra é um substantivo?",
    respostas: ["Correr", "Bonito", "Casa", "Rapidamente"],
    correta: 2,
  },
  {
    imagem:
      "https://plus.unsplash.com/premium_photo-1663040081470-397e31e4b2a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual palavra é um verbo?",
    respostas: ["Escola", "Estudar", "Azul", "Feliz"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkc3xlbnwwfHwwfHx8MA%3D%3D",
    pergunta: "Em qual frase o uso do plural está correto?",
    respostas: [
      "Os menino brinca.",
      "As casa são grandes.",
      "Os meninos brincam.",
      "A meninas canta.",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1695238668015-7bc526956af7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual palavra é um adjetivo?",
    respostas: ["Mesa", "Belo", "Andar", "Ontem"],
    correta: 1,
  },
  {
    imagem:
      "https://plus.unsplash.com/premium_photo-1705018501151-4045c97658a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual é o pronome da frase: “Ela chegou cedo”?",
    respostas: ["Chegou", "Cedo", "Ela", "Frase"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1525255946160-aac47911684e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvYXJkfGVufDB8fDB8fHww",
    pergunta: "Qual palavra está escrita corretamente?",
    respostas: ["Exceção", "Eseção", "Exessão", "Excessão"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1558487085-3602292ea018?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual frase está pontuada corretamente?",
    respostas: [
      "João tudo bem?",
      "João, tudo bem?",
      "João tudo, bem?",
      "João tudo bem.",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta:
      "Em “Os alunos inteligentes estudam bastante”, qual palavra é artigo?",
    respostas: ["Exceção", "Inteligentes", "Os", "Estudam"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1635372722656-389f87a941b7?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual frase está no tempo passado?",
    respostas: [
      "Eu estudo matemática.",
      "Eu estudarei matemática.",
      "Eu estudei matemática.",
      "Eu estudaria matemática.",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://thumbs.dreamstime.com/b/texto-do-advérbio-nos-cubos-156294976.jpg",
    pergunta: "Qual frase contém um advérbio?",
    respostas: [
      "O carro vermelho chegou.",
      "Ela canta bem.",
      "Pedro comprou pão.",
      "A menina sorriu.",
    ],
    correta: 1,
  },
];


// =========================
// ID DO QUIZ
// Precisa ser igual ao id da fase no scriptMapaQuizPortugues.js
// =========================

const QUIZ_ID = "portugues-gramatica-lvl-1";


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
    const resposta = await fetch(`${API_BASE_PERGUNTAS}/quiz/concluir`, {
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

    const dados = await resposta.json();

    console.log("Resposta ao concluir quiz:", dados);

    return dados;

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
    await fetch(`${API_BASE_PERGUNTAS}/missao/evento`, {
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

// =========================
// FINALIZAR QUIZ
// =========================

async function finalizarQuiz() {
  const aprovado = acertos >= 7;

  let xpGanho = 0;
  let mensagemXp = "";

  if (aprovado) {
    xpGanho = acertos * 100;

    const estrelas = calcularEstrelas(acertos);

    const resultadoQuiz = await concluirQuizNoBanco(
      QUIZ_ID,
      xpGanho,
      estrelas
    );

    mensagemXp = resultadoQuiz.mensagem || "Quiz concluído.";

    await registrarEventoMissaoSeguro("estudar_portugues");

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
              ${
                mensagemXp === "Quiz concluído com sucesso." ||
                mensagemXp === "XP Quiz atualizado com sucesso." ||
                mensagemXp === "XP atualizado com sucesso."
                  ? `Você ganhou ${xpGanho} XP Quiz.`
                  : mensagemXp
              }
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
  window.location.href = "quizPortugues.html";
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