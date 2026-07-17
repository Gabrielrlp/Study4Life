// perguntas quiz física mecânica
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O que a mecânica estuda na Física?",
    respostas: [
      "As reações químicas",
      "O movimento e as forças",
      "A estrutura celular",
      "A luz e as cores",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é a unidade de medida da força no Sistema Internacional?",
    respostas: ["Joule", "Pascal", "Newton", "Watt"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual cientista formulou as Leis de Newton?",
    respostas: [
      "Albert Einstein",
      "Galileu Galilei",
      "Isaac Newton",
      "Nikola Tesla",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1170&auto=format&fit=crop",
    pergunta: "A Primeira Lei de Newton também é conhecida como:",
    respostas: [
      "Lei da Gravitação",
      "Lei da Inércia",
      "Lei da Ação e Reação",
      "Lei da Velocidade",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quando um corpo muda sua velocidade, dizemos que ele possui:",
    respostas: ["Energia térmica", "Aceleração", "Pressão", "Volume"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual fórmula representa a Segunda Lei de Newton?",
    respostas: ["E = mc²", "F = m . a", "V = d/t", "P = m . g"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1516900557549-41557d405adf?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O que acontece quando duas forças possuem mesma intensidade e sentidos opostos?",
    respostas: [
      "A força aumenta",
      "O corpo acelera",
      "As forças se anulam",
      "O corpo explode",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1170&auto=format&fit=crop",
    pergunta: "A velocidade é calculada pela fórmula:",
    respostas: ["v = d/t", "F = m.a", "P = m.g", "E = m.c²"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é a força responsável por puxar os corpos para a Terra?",
    respostas: [
      "Força elétrica",
      "Força nuclear",
      "Gravidade",
      "Magnetismo",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Na Terceira Lei de Newton, toda ação possui:",
    respostas: [
      "Uma aceleração",
      "Uma velocidade",
      "Uma reação de mesma intensidade e sentido contrário",
      "Uma gravidade diferente",
    ],
    correta: 2,
  },
];

const QUIZ_ID = "fisica-mecanica-lvl-1";

let atual = 0;
let acertos = 0;

function carregarQuestao() {
  const q = questoes[atual];

  document.getElementById("imagemQuestao").src = q.imagem;
  document.getElementById("pergunta").textContent = q.pergunta;
  document.getElementById("contador").textContent =
    `${atual + 1}/${questoes.length}`;

  const progresso = ((atual + 1) / questoes.length) * 100;
  document.getElementById("barra").style.width = progresso + "%";

  const area = document.getElementById("respostas");
  area.innerHTML = "";

  q.respostas.forEach((texto, indice) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.onclick = () => responder(btn, indice);
    area.appendChild(btn);
  });
}

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
    botoes[correta].classList.add("correta");
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

async function finalizarQuiz() {
  const aprovado = acertos >= 7;

  let xpGanho = 0;
  let mensagemXp = "";

  if (aprovado) {
    xpGanho = acertos * 100;
    mensagemXp = await adicionarXpQuiz(xpGanho, QUIZ_ID);

    await registrarEventoMissao("responder_quiz");
    await registrarEventoMissao("estudar_fisica");

    if (acertos >= 10) {
      await registrarEventoMissao("acertar_10_perguntas");
    }
  }

  document.getElementById("conteudoQuiz").innerHTML = `
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

  document.getElementById("contador").textContent =
    `${questoes.length}/${questoes.length}`;
  document.getElementById("barra").style.width = "100%";
}

function voltarFases() {
  window.location.href = "quizFisica.html";
}

function reiniciarQuiz() {
  atual = 0;
  acertos = 0;

  document.getElementById("conteudoQuiz").innerHTML = `
    <div class="area-img">
      <img id="imagemQuestao" src="" alt="Imagem da questão">
    </div>

    <div class="pergunta" id="pergunta"></div>

    <div class="respostas" id="respostas"></div>
  `;

  carregarQuestao();
}

carregarQuestao();