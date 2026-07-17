// perguntas quiz biologia - citologia
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual é a unidade básica da vida?",
    respostas: ["Átomo", "Molécula", "Célula", "Tecido"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual organela é responsável pela respiração celular?",
    respostas: [
      "Ribossomo",
      "Mitocôndria",
      "Complexo de Golgi",
      "Lisossomo",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual estrutura controla as atividades da célula?",
    respostas: ["Membrana", "Citoplasma", "Núcleo", "Vacúolo"],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual organela realiza a produção de proteínas?",
    respostas: ["Ribossomo", "Mitocôndria", "Lisossomo", "Centríolo"],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1170&auto=format&fit=crop",
    pergunta: "O citoplasma está localizado:",
    respostas: [
      "Dentro do núcleo",
      "Entre a membrana e o núcleo",
      "Fora da célula",
      "Somente em células vegetais",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual organela é responsável pela digestão celular?",
    respostas: [
      "Retículo endoplasmático",
      "Lisossomo",
      "Mitocôndria",
      "Cloroplasto",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1532634726-8b9fb99825c6?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Os cloroplastos são encontrados em:",
    respostas: [
      "Células animais",
      "Bactérias",
      "Células vegetais",
      "Vírus",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual estrutura envolve e protege a célula?",
    respostas: [
      "Citoplasma",
      "Núcleo",
      "Membrana plasmática",
      "DNA",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1170&auto=format&fit=crop",
    pergunta: "A fotossíntese ocorre em qual organela?",
    respostas: [
      "Mitocôndria",
      "Lisossomo",
      "Cloroplasto",
      "Ribossomo",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual tipo celular NÃO possui núcleo definido?",
    respostas: [
      "Eucarionte",
      "Animal",
      "Vegetal",
      "Procarionte",
    ],
    correta: 3,
  },
];

const QUIZ_ID = "biologia-citologia-lvl-1";

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
    await registrarEventoMissao("estudar_biologia");

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
  window.location.href = "quizBiologia.html";
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