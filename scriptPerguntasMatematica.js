// perguntas quiz matematica
const questoes = [
  {
    imagem: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Quanto é 25 + 17?",
    respostas: ["40", "42", "43", "45"],
    correta: 1,
  },
  {
    imagem: "https://images.unsplash.com/photo-1601397922721-4326ae07bbc5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Quanto é 56 - 29?",
    respostas: ["25", "26", "27", "28"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Quanto é 8 x 7?",
    respostas: ["54", "58", "56", "64"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Quanto é 81 ÷ 9?",
    respostas: ["8", "7", "9", "6"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1609155035300-15e1ffa95f12?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual é a metade de 50?",
    respostas: ["20", "25", "35", "15"],
    correta: 1,
  },
  {
    imagem: "https://plus.unsplash.com/premium_photo-1724266846347-bd10efdd330e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Quanto é 15 + 9 - 4?",
    respostas: ["24", "22", "18", "20"],
    correta: 3,
  },
  {
    imagem: "https://images.unsplash.com/photo-1708011271935-3e109df56fe0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Quanto é 6 × 5 + 3?",
    respostas: ["33", "30", "35", "28"],
    correta: 0,
  },
  {
    imagem: "https://images.unsplash.com/photo-1648201188793-418f2b9b4b32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Quanto é 100 - 37?",
    respostas: ["67", "63", "73", "57"],
    correta: 1,
  },
  {
    imagem: "https://plus.unsplash.com/premium_photo-1733342496376-79a1ad8c30ad?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta:
      "Se você tem 4 grupos de 6 objetos, quantos objetos tem no total?",
    respostas: ["20", "24", "22", "26"],
    correta: 1,
  },
  {
    imagem: "https://images.unsplash.com/photo-1700773429986-1c28ed71b1d8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual é o dobro de 18?",
    respostas: ["38", "32", "36", "28"],
    correta: 2,
  },
];

let atual = 0;
let acertos = 0;

function carregarQuestao() {
  const q = questoes[atual];

  document.getElementById("imagemQuestao").src = q.imagem;
  document.getElementById("pergunta").textContent = q.pergunta;
  document.getElementById("contador").textContent = `${atual + 1}/10`;

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

function finalizarQuiz() {
  const aprovado = acertos >= 7;

  document.getElementById("conteudoQuiz").innerHTML = `
    <div class="final">
      <h2>Quiz Finalizado 🎉</h2>
      <p>Você acertou ${acertos} de ${questoes.length} questões.</p>

      ${
        aprovado
          ? `
            <p class="aprovado">Parabéns! Você concluiu esse level.</p>

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

  document.getElementById("contador").textContent = "10/10";
  document.getElementById("barra").style.width = "100%";
}

function voltarFases() {
  window.location.href = "quizMatematica.html";
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
