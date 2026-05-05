// perguntas quiz ciencias
const questoes = [
  {
    imagem: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dttps://picsum.photos/900/400?1",
    pergunta: "Qual é a unidade básica da vida?",
    respostas: ["Átomo", "Célula", "Molécula", "Tecido"],
    correta: 1,
  },
  {
    imagem: "https://plus.unsplash.com/premium_photo-1722707492894-2839a324624e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'ttps://picsum.photos/900/400?2",
    pergunta: "Qual órgão do corpo humano bombeia o sangue?",
    respostas: ["Pulmão", "Fígado", "Coração", "Rim"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual gás as plantas absorvem na fotossíntese?",
    respostas: ["Oxigênio", "Nitrogênio", "Gás carbônico", "Hidrogênio"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1523825086357-39d9158d4ba8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual parte da planta fixa o vegetal no solo?",
    respostas: ["Flor", "Folha", "Raiz", "Fruto"],
    correta: 2,
  },
  {
    imagem: "https://plus.unsplash.com/premium_photo-1722947097108-9af829cf1ded?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual sistema do corpo humano é responsável pela respiração?",
    respostas: ["Digestório", "Respiratório", "Nervoso", "Circulatório"],
    correta: 1,
  },
  {
    imagem: "https://images.unsplash.com/photo-1581323463131-327617e6962c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual animal é mamífero?",
    respostas: ["Galinha", "Sapo", "Baleia", "Peixe"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1641903202531-bfa6bf0c6419?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Onde fica armazenado o material genético da célula?",
    respostas: ["Membrana", "Citoplasma", "Núcleo", "Parede celular"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1615752592676-f6bd84f9419d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual vitamina é produzida com ajuda da luz solar?",
    respostas: ["Vitamina A", "Vitamina C", "Vitamina D", "Vitamina K"],
    correta: 2,
  },
  {
    imagem: "https://images.unsplash.com/photo-1586726370832-3440a511e479?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "Qual é o maior órgão do corpo humano?",
    respostas: ["Pulmão", "Pele", "Cérebro", "Estômago"],
    correta: 1,
  },
  {
    imagem: "https://plus.unsplash.com/premium_photo-1661713818588-8210ce5880e5?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pergunta: "O que os seres vivos precisam para sobreviver?",
    respostas: ["Apenas luz", "Apenas água", "Energia e recursos do ambiente", "Apenas ar"],
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
            <p class="aprovado">Parabéns! Você concluiu esse level</p>

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
  window.location.href = "quizCiencias.html";
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
