// perguntas quiz filosofia ética
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O que a ética estuda principalmente?",
    respostas: [
      "As leis da física",
      "O comportamento moral e as ações humanas",
      "A formação das rochas",
      "A estrutura das palavras",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é a diferença básica entre ética e moral?",
    respostas: [
      "Ética é reflexão sobre a moral; moral são costumes e normas",
      "Ética é religião; moral é ciência",
      "Ética é política; moral é geografia",
      "Ética e moral não possuem relação",
    ],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Uma atitude ética geralmente busca:",
    respostas: [
      "Prejudicar outras pessoas",
      "Agir apenas por interesse próprio",
      "Refletir sobre o que é justo e correto",
      "Ignorar as consequências das ações",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Na filosofia, a liberdade está ligada principalmente à capacidade de:",
    respostas: [
      "Fazer qualquer coisa sem consequências",
      "Escolher e assumir responsabilidade pelos atos",
      "Obedecer sem pensar",
      "Evitar decisões importantes",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O que significa responsabilidade moral?",
    respostas: [
      "Ser obrigado a concordar com todos",
      "Assumir as consequências das próprias ações",
      "Evitar qualquer tipo de regra",
      "Agir sem pensar no outro",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual filósofo grego relacionava a virtude ao conhecimento?",
    respostas: ["Sócrates", "Maquiavel", "Descartes", "Karl Marx"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Para Aristóteles, a ética estava ligada à busca pela:",
    respostas: ["Riqueza", "Felicidade", "Guerra", "Fama"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O que é uma virtude?",
    respostas: [
      "Um hábito considerado bom ou correto",
      "Uma regra matemática",
      "Um tipo de governo",
      "Uma forma de relevo",
    ],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Uma decisão ética deve considerar:",
    respostas: [
      "Apenas o lucro pessoal",
      "Somente a opinião da maioria",
      "As consequências e o respeito ao outro",
      "A aparência da pessoa",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quando alguém age com justiça, essa pessoa busca:",
    respostas: [
      "Tratar todos de forma correta e equilibrada",
      "Ter vantagem em qualquer situação",
      "Ignorar direitos dos outros",
      "Evitar responsabilidade",
    ],
    correta: 0,
  },
];

const QUIZ_ID = "filosofia-etica-lvl-1";

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
    await registrarEventoMissao("estudar_filosofia");

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
  window.location.href = "quizFilosofia.html";
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