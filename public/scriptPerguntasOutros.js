// =========================
// CONFIGURAÇÃO DA API
// =========================

// Se você está salvando no Railway, deixe assim:
// const API_BASE_PERGUNTAS = "https://study-4life-production-c3a4.up.railway.app";

// Se estiver testando com o back-end local, use esta linha no lugar da de cima:
const API_BASE_PERGUNTAS = "";


// =========================
// PERGUNTAS QUIZ GIT E GITHUB
// =========================

const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é a principal função do Git?",
    respostas: [
      "Editar imagens",
      "Controlar versões de código",
      "Criar bancos de dados",
      "Hospedar vídeos",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual comando inicializa um repositório Git?",
    respostas: ["git start", "git init", "git create", "git push"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual plataforma é usada para hospedar repositórios Git online?",
    respostas: ["Photoshop", "GitHub", "Figma", "Word"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop",
    pergunta: "Qual comando envia alterações para o GitHub?",
    respostas: ["git pull", "git add", "git push", "git merge"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual comando adiciona arquivos para preparação de commit?",
    respostas: ["git stage", "git add", "git upload", "git save"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O que é um commit no Git?",
    respostas: [
      "Um erro no código",
      "Uma cópia de segurança do computador",
      "Um registro de alterações no projeto",
      "Um site hospedado",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual comando baixa alterações do repositório remoto?",
    respostas: ["git clone", "git branch", "git pull", "git commit"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Para que serve uma branch no Git?",
    respostas: [
      "Hospedar imagens",
      "Criar versões paralelas do projeto",
      "Apagar commits",
      "Editar banco de dados",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1515876305430-f06edab8282a?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual comando cria uma cópia de um repositório remoto?",
    respostas: ["git clone", "git fork", "git copy", "git branch"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual comando mostra o estado atual dos arquivos no Git?",
    respostas: ["git check", "git files", "git status", "git state"],
    correta: 2,
  },
];


// =========================
// ID DO QUIZ
// Precisa ser igual ao id da fase no scriptMapaQuizOutros.js
// =========================

const QUIZ_ID = "outros-gitgithub-lvl-1";


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

    await registrarEventoMissaoSeguro("responder_quiz");

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
  window.location.href = "quizOutros.html";
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