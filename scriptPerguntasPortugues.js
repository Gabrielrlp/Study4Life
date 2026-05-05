// perguntas quiz portugues
const questoes = [
  {
    imagem: "https://plus.unsplash.com/premium_photo-1725075086642-584ef254b39c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual palavra é um substantivo?",
    respostas: ["Correr", "Bonito", "Casa", "Rapidamente"],
    correta: 2,
  },
  {
    imagem: "https://plus.unsplash.com/premium_photo-1663040081470-397e31e4b2a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual palavra é um verbo?",
    respostas: ["Escola", "Estudar", "Azul", "Feliz"],
    correta: 1,
  },
  {
    imagem: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkc3xlbnwwfHwwfHx8MA%3D%3D",
    pergunta: "Em qual frase o uso do plural está correto?",
    respostas: ["Os menino brinca.", "As casa são grandes.", "Os meninos brincam.", "A meninas canta."],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1695238668015-7bc526956af7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual palavra é um adjetivo?",
    respostas: ["Mesa", "Belo", "Andar", "Ontem"],
    correta: 1,
  },
  {
    imagem: "https://plus.unsplash.com/premium_photo-1705018501151-4045c97658a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual é o pronome da frase: “Ela chegou cedo”?",
    respostas: ["Chegou", "Cedo", "Ela", "Frase"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1525255946160-aac47911684e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvYXJkfGVufDB8fDB8fHww",
    pergunta: "Qual palavra está escrita corretamente?",
    respostas: ["Exceção", "Eseção", "Exessão", "Excessão"],
    correta: 0,
  },
  {
    imagem: "https://images.unsplash.com/photo-1558487085-3602292ea018?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual frase está pontuada corretamente?",
    respostas: ["João tudo bem?", "João, tudo bem?", "João tudo, bem?", "João tudo bem."],
    correta: 1,
  },
  {
    imagem: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Em “Os alunos inteligentes estudam bastante”, qual palavra é artigo?",
    respostas: ["Exceção", "Inteligentes", "Os", "Estudam"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1635372722656-389f87a941b7?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual frase está no tempo passado?",
    respostas: ["Eu estudo matemática.", "Eu estudarei matemática.", "Eu estudei matemática.", "Eu estudaria matemática."],
    correta: 2,
  },
  {
    imagem: "https://thumbs.dreamstime.com/b/texto-do-advérbio-nos-cubos-156294976.jpg",
    pergunta: "Qual frase contém um advérbio?",
    respostas: ["O carro vermelho chegou.", "Ela canta bem.", "Pedro comprou pão.", "A menina sorriu."],
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
  window.location.href = "quizPortugues.html";
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
