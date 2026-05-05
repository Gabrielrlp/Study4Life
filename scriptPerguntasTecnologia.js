// perguntas quiz tecnologia
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1656863492763-23732b72ea4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "O que significa HTML?",
    respostas: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Modern Language",
      "Home Tool Markup Language",
    ],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1569323112699-e222ee4916e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual linguagem é usada para estilizar páginas web?",
    respostas: ["Python", "CSS", "Java", "C++"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual linguagem é usada para interatividade em sites?",
    respostas: ["JavaScript", "SQL", "PHP", "C#"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta:
      "Qual símbolo é usado para comentários em JavaScript de uma linha?",
    respostas: ["<!-- -->", "##", "//", "**"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1774901128283-64c62117216a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "O que o comando console.log() faz em JavaScript?",
    respostas: [
      "Cria um botão",
      "Mostra mensagens no console",
      "Fecha o navegador",
      "Cria um banco de dados",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual tag HTML cria um link?",
    respostas: ["<img>", "<p>", "<a>", "<div>"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "O que significa CSS?",
    respostas: [
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Syntax",
      "Computer Style Sheets",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://plus.unsplash.com/premium_photo-1681487942927-e1a2786e6036?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual desses é um banco de dados?",
    respostas: ["MySQL", "Photoshop", "Chrome", "Figma"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual estrutura é usada para repetir ações no código?",
    respostas: ["Loop", "Link.", "Input", "Array"],
    correta: 0,
  },
  {
    imagem:
      "https://plus.unsplash.com/premium_photo-1678565999332-1cde462f7b24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "O que faz o comando if em programação?",
    respostas: [
      "Repete o código infinitamente",
      "Faz uma condição/decisão",
      "Cria imagens",
      "Apaga arquivos",
    ],
    correta: 1,
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
  window.location.href = "quizTecnologia.html";
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
