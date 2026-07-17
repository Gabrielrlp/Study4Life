// perguntas quiz química geral
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é o símbolo químico do oxigênio?",
    respostas: ["Ox", "O", "Og", "Om"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual partícula possui carga negativa?",
    respostas: ["Próton", "Nêutron", "Elétron", "Núcleo"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1170&auto=format&fit=crop",
    pergunta: "A água é formada por quais elementos químicos?",
    respostas: [
      "Hidrogênio e Oxigênio",
      "Carbono e Oxigênio",
      "Nitrogênio e Hidrogênio",
      "Sódio e Cloro",
    ],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é o número atômico do carbono?",
    respostas: ["6", "8", "12", "14"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual estado físico possui forma e volume definidos?",
    respostas: ["Gasoso", "Líquido", "Plasma", "Sólido"],
    correta: 3,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1532634993-15f421e42ec0?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual elemento químico é conhecido pelo símbolo Na?",
    respostas: ["Nitrogênio", "Níquel", "Sódio", "Neônio"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Quando duas substâncias se misturam e formam uma nova substância ocorre:",
    respostas: [
      "Mudança física",
      "Fenômeno óptico",
      "Reação química",
      "Evaporação",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual gás é essencial para a respiração humana?",
    respostas: ["Hidrogênio", "Nitrogênio", "Oxigênio", "Hélio"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é o pH aproximado de uma substância neutra?",
    respostas: ["0", "3", "7", "14"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1532634726-8b9fb99825c6?q=80&w=1170&auto=format&fit=crop",
    pergunta: "A tabela periódica organiza os elementos principalmente de acordo com:",
    respostas: [
      "Massa corporal",
      "Número atômico",
      "Volume",
      "Cor dos elementos",
    ],
    correta: 1,
  },
];

const QUIZ_ID = "quimica-geral-lvl-1";

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
    await registrarEventoMissao("estudar_quimica");

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
  window.location.href = "quizQuimica.html";
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