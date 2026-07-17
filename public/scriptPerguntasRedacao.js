// perguntas quiz redação - estrutura dissertativo-argumentativa
const questoes = [
  {
    imagem:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1170&auto=format&fit=crop",
    pergunta:
      "Qual é a principal característica de um texto dissertativo-argumentativo?",
    respostas: [
      "Narrar uma história fictícia",
      "Defender uma opinião com argumentos",
      "Descrever apenas paisagens",
      "Criar diálogos entre personagens",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1170&auto=format&fit=crop",
    pergunta: "Qual parte do texto apresenta o tema e a tese?",
    respostas: [
      "Conclusão",
      "Desenvolvimento",
      "Introdução",
      "Referência",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1170&auto=format&fit=crop",
    pergunta: "A tese em uma redação representa:",
    respostas: [
      "O título do texto",
      "A opinião defendida pelo autor",
      "A solução final do problema",
      "Uma citação obrigatória",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop",
    pergunta:
      "No desenvolvimento da redação, o autor deve principalmente:",
    respostas: [
      "Apresentar argumentos",
      "Criar personagens",
      "Fazer perguntas sem responder",
      "Narrar acontecimentos pessoais",
    ],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop",
    pergunta:
      "Qual elemento fortalece a argumentação em uma redação?",
    respostas: [
      "Achismos sem explicação",
      "Dados, exemplos e repertórios",
      "Gírias excessivas",
      "Humor exagerado",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1170&auto=format&fit=crop",
    pergunta:
      "A conclusão da redação deve principalmente:",
    respostas: [
      "Apresentar novos argumentos",
      "Finalizar a discussão e propor solução",
      "Contar uma história",
      "Repetir o título",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1170&auto=format&fit=crop",
    pergunta:
      "No ENEM, a proposta de intervenção aparece em qual parte do texto?",
    respostas: [
      "Introdução",
      "Desenvolvimento",
      "Conclusão",
      "Título",
    ],
    correta: 2,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1170&auto=format&fit=crop",
    pergunta:
      "Qual linguagem deve ser utilizada em uma redação dissertativo-argumentativa?",
    respostas: [
      "Informal e cheia de gírias",
      "Formal e objetiva",
      "Apenas poética",
      "Exclusivamente técnica",
    ],
    correta: 1,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop",
    pergunta:
      "O que são conectivos em uma redação?",
    respostas: [
      "Palavras que ligam ideias e organizam o texto",
      "Erros gramaticais",
      "Imagens utilizadas no texto",
      "Tipos de parágrafo",
    ],
    correta: 0,
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1170&auto=format&fit=crop",
    pergunta:
      "Qual das opções apresenta um exemplo de argumento?",
    respostas: [
      "Eu gosto desse tema.",
      "Segundo dados do IBGE, o problema aumentou nos últimos anos.",
      "Era uma vez uma sociedade.",
      "Talvez isso aconteça algum dia.",
    ],
    correta: 1,
  },
];

const QUIZ_ID = "redacao-dissertativa-lvl-1";

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
    await registrarEventoMissao("estudar_redacao");

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
  window.location.href = "quizRedacao.html";
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