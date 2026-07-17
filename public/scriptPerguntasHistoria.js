// perguntas quiz história antiga
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual civilização construiu as pirâmides de Gizé?",
    respostas: ["Romanos", "Egípcios", "Gregos", "Fenícios"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O rio mais importante para o desenvolvimento do Egito Antigo foi:",
    respostas: ["Rio Tigre", "Rio Nilo", "Rio Eufrates", "Rio Jordão"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1565378437776-93b2674e830e?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual povo da Antiguidade ficou conhecido por criar a democracia em Atenas?",
    respostas: ["Gregos", "Persas", "Egípcios", "Hebreus"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1605209989526-6fb4c1beff2d?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Na Roma Antiga, quem era o principal grupo formado por cidadãos ricos e poderosos?",
    respostas: ["Plebeus", "Escravizados", "Patrícios", "Gladiadores"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual foi uma das principais contribuições dos fenícios?",
    respostas: [
      "Criação do alfabeto",
      "Construção das pirâmides",
      "Invenção da pólvora",
      "Criação do feudalismo",
    ],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?q=80&w=1170&auto=format&fit=crop",
    pergunta: "A Mesopotâmia ficava localizada entre quais rios?",
    respostas: [
      "Nilo e Jordão",
      "Tigre e Eufrates",
      "Amazonas e Paraná",
      "Danúbio e Reno",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual povo antigo é conhecido pelo Código de Hamurábi?",
    respostas: ["Babilônios", "Gregos", "Romanos", "Fenícios"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Na Grécia Antiga, as cidades independentes eram chamadas de:",
    respostas: ["Feudos", "Impérios", "Pólis", "Províncias"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1569511166187-97eb6e387e19?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual cidade-estado grega era conhecida pela formação militar rígida?",
    respostas: ["Atenas", "Esparta", "Corinto", "Tebas"],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O Coliseu é uma construção associada a qual civilização antiga?",
    respostas: ["Egípcia", "Grega", "Romana", "Persa"],
    correta: 2,
  },
];

const QUIZ_ID = "historia-antiga-lvl-1";

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
    await registrarEventoMissao("estudar_historia");

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
  window.location.href = "quizHistoria.html";
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