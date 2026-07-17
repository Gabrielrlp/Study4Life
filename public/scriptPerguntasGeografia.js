// perguntas quiz geografia física
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é a camada gasosa que envolve a Terra?",
    respostas: ["Litosfera", "Atmosfera", "Hidrosfera", "Biosfera"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual bioma brasileiro possui clima quente e úmido durante quase todo o ano?",
    respostas: ["Caatinga", "Pampa", "Amazônia", "Pantanal"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O processo de desgaste das rochas causado pela água e vento é chamado de:",
    respostas: ["Sedimentação", "Erosão", "Urbanização", "Evaporação"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é o nome das grandes massas de água salgada da Terra?",
    respostas: ["Rios", "Lagos", "Oceanos", "Lençóis freáticos"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual fenômeno ocorre quando o vapor de água se transforma em chuva?",
    respostas: ["Evaporação", "Condensação", "Precipitação", "Infiltração"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1170&auto=format&fit=crop",
    pergunta: "As montanhas são exemplos de:",
    respostas: ["Relevo", "Vegetação", "Clima", "Hidrografia"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual camada da Terra é formada pelas águas do planeta?",
    respostas: ["Atmosfera", "Litosfera", "Hidrosfera", "Troposfera"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual tipo climático apresenta temperaturas muito baixas durante quase todo o ano?",
    respostas: ["Tropical", "Equatorial", "Polar", "Desértico"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O magma expelido pelos vulcões quando chega à superfície é chamado de:",
    respostas: ["Lava", "Rocha", "Mineral", "Solo"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é o nome do movimento das placas tectônicas que pode causar terremotos?",
    respostas: [
      "Sedimentação",
      "Deriva continental",
      "Movimento tectônico",
      "Intemperismo",
    ],
    correta: 2,
  },
];

const QUIZ_ID = "geografia-fisica-lvl-1";

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
    await registrarEventoMissao("estudar_geografia");

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
  window.location.href = "quizGeografia.html";
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