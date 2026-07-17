// perguntas quiz inglês básico
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Qual é a tradução de "Hello"?',
    respostas: ["Tchau", "Obrigado", "Olá", "Boa noite"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Qual é a tradução de "Book"?',
    respostas: ["Mesa", "Livro", "Caneta", "Caderno"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Como se diz "Bom dia" em inglês?',
    respostas: ["Good afternoon", "Good evening", "Good night", "Good morning"],
    correta: 3,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Qual é a tradução de "Dog"?',
    respostas: ["Gato", "Pássaro", "Cachorro", "Peixe"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Qual dessas palavras significa "Água"?',
    respostas: ["Milk", "Juice", "Water", "Bread"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Como se diz "Obrigado" em inglês?',
    respostas: ["Please", "Sorry", "Thanks", "Welcome"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Qual é a tradução de "House"?',
    respostas: ["Escola", "Carro", "Janela", "Casa"],
    correta: 3,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Qual pronome significa "Eu"?',
    respostas: ["You", "He", "I", "They"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Como se diz "Escola" em inglês?',
    respostas: ["School", "Street", "Teacher", "Student"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1170&auto=format&fit=crop",
    pergunta: 'Qual é a tradução de "Apple"?',
    respostas: ["Banana", "Maçã", "Laranja", "Uva"],
    correta: 1,
  },
];

const QUIZ_ID = "ingles-basico-lvl-1";

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
    await registrarEventoMissao("estudar_ingles");

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
  window.location.href = "quizLinguagens.html";
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