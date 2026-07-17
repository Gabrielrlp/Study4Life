// menu lateral
const menu = document.getElementById("menuLateral");
const menuIcon = document.querySelector(".menu-icon");

function openMenu() {
  menu.classList.add("active");
}

function closeMenu() {
  menu.classList.remove("active");
}

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
    menu.classList.remove("active");
  }
});

// catálogo
const wrappers = document.querySelectorAll(".trilho-wrapper");

wrappers.forEach((wrapper) => {
  const trilho = wrapper.querySelector(".trilho");
  const janela = wrapper.querySelector(".janela-carrossel");
  const btnEsquerda = wrapper.querySelector(".seta-esquerda");
  const btnDireita = wrapper.querySelector(".seta-direita");
  const card = wrapper.querySelector(".card");

  let posicaoAtual = 0;

  function larguraDoCard() {
    const estilo = window.getComputedStyle(trilho);
    const gap = parseInt(estilo.columnGap || estilo.gap || 0);
    return card.offsetWidth + gap;
  }

  function maximoDeslocamento() {
    return Math.max(0, trilho.scrollWidth - janela.clientWidth);
  }

  function atualizarCarrossel() {
    trilho.style.transform = `translateX(-${posicaoAtual}px)`;
  }

  btnDireita.addEventListener("click", () => {
    posicaoAtual += larguraDoCard();

    const limite = maximoDeslocamento();

    if (posicaoAtual > limite) {
      posicaoAtual = limite;
    }

    atualizarCarrossel();
  });

  btnEsquerda.addEventListener("click", () => {
    posicaoAtual -= larguraDoCard();

    if (posicaoAtual < 0) {
      posicaoAtual = 0;
    }

    atualizarCarrossel();
  });

  window.addEventListener("resize", () => {
    const limite = maximoDeslocamento();

    if (posicaoAtual > limite) {
      posicaoAtual = limite;
    }

    atualizarCarrossel();
  });
});

// menu lateral das categorias
const menuCategorias = document.getElementById("menuCategorias");

function openCategorias() {
  menuCategorias.classList.add("active");
}

function closeCategorias() {
  menuCategorias.classList.remove("active");
}

document.addEventListener("click", (e) => {
  const botaoCategorias = document.querySelector('[onclick="openCategorias()"]');

  if (
    menuCategorias &&
    !menuCategorias.contains(e.target) &&
    botaoCategorias &&
    !botaoCategorias.contains(e.target)
  ) {
    menuCategorias.classList.remove("active");
  }
});

document.querySelectorAll("#menuCategorias a").forEach((link) => {
  link.addEventListener("click", () => {
    closeCategorias();
  });
});

// modal reutilizável
const modalOverlay = document.getElementById("modalOverlay");
const fecharModal = document.getElementById("fecharModal");

const modalImagem = document.getElementById("modalImagem");
const modalTitulo = document.getElementById("modalTitulo");
const modalAutor = document.getElementById("modalAutor");
const modalResumo = document.getElementById("modalResumo");
const modalCategoria1 = document.getElementById("modalCategoria1");
const modalCategoria2 = document.getElementById("modalCategoria2");
const modalLink = document.getElementById("modalLink");
const btnFavoritar = document.getElementById("btnFavoritar");
const btnConcluir = document.getElementById("btnConcluir");

const cardsModal = document.querySelectorAll(".abrir-modal");

let conteudoAtual = null;

function pegarLista(nomeLista) {
  return JSON.parse(localStorage.getItem(nomeLista)) || [];
}

function salvarLista(nomeLista, lista) {
  localStorage.setItem(nomeLista, JSON.stringify(lista));
}

function salvarSemDuplicar(nomeLista, conteudo) {
  const lista = pegarLista(nomeLista);

  const jaExiste = lista.some((item) => item.id === conteudo.id);

  if (!jaExiste) {
    lista.push(conteudo);
    salvarLista(nomeLista, lista);
  }

  return !jaExiste;
}

cardsModal.forEach((card) => {
  card.addEventListener("click", () => {
    conteudoAtual = {
      id: card.dataset.id,
      titulo: card.dataset.titulo,
      autor: card.dataset.autor,
      resumo: card.dataset.resumo,
      imagem: card.dataset.imagem,
      categoria1: card.dataset.categoria1,
      categoria2: card.dataset.categoria2,
      link: card.dataset.link,
    };

    modalImagem.src = conteudoAtual.imagem;
    modalImagem.alt = conteudoAtual.titulo;
    modalTitulo.textContent = conteudoAtual.titulo;
    modalAutor.textContent = conteudoAtual.autor;
    modalResumo.textContent = conteudoAtual.resumo;
    modalCategoria1.textContent = conteudoAtual.categoria1;
    modalCategoria2.textContent = conteudoAtual.categoria2;
    modalLink.href = conteudoAtual.link;

    btnFavoritar.innerHTML = "★ Favoritar";

    const estaConcluido = localStorage.getItem(
      "concluido_" + conteudoAtual.id
    );

    if (estaConcluido === "true") {
      btnConcluir.innerHTML = "✓ Concluído";
    } else {
      btnConcluir.innerHTML = "Concluir";
    }

    modalOverlay.classList.add("ativo");
    document.body.classList.add("modal-aberto");
  });
});

// favoritar conteúdo
btnFavoritar.addEventListener("click", () => {
  if (conteudoAtual) {
    const salvouAgora = salvarSemDuplicar(
      "favoritos",
      conteudoAtual
    );

    btnFavoritar.innerHTML = "★ Favoritado";

    if (salvouAgora) {
      registrarEventoMissao("favoritar_conteudo");
    }

    alert("Favoritado com Sucesso");
  }
});

// acessar conteúdo
modalLink.addEventListener("click", () => {
  if (conteudoAtual) {
    salvarSemDuplicar("historico", conteudoAtual);

    fecharModalFuncao();
  }
});

// botão concluir
btnConcluir.addEventListener("click", () => {
  if (!conteudoAtual) return;

  // salva nos concluídos sem duplicar
  const salvouAgora = salvarSemDuplicar(
    "concluidos",
    conteudoAtual
  );

  // altera visual do botão
  btnConcluir.innerHTML = "✓ Concluído";

  // salva estado individual
  localStorage.setItem(
    "concluido_" + conteudoAtual.id,
    "true"
  );

  // missão
  if (salvouAgora) {
    registrarEventoMissao("concluir_1_aula");
  }

  alert("Concluído com Sucesso");
});

function fecharModalFuncao() {
  modalOverlay.classList.remove("ativo");
  document.body.classList.remove("modal-aberto");
}

fecharModal.addEventListener("click", fecharModalFuncao);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    fecharModalFuncao();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("ativo")) {
    fecharModalFuncao();
  }
});

// barra de pesquisa funcional
const formPesquisa = document.querySelector(".form");
const inputPesquisa = document.querySelector(".input");
const cardsPesquisa = document.querySelectorAll(".card.abrir-modal");

formPesquisa.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputPesquisa.addEventListener("input", () => {
  const termo = inputPesquisa.value.toLowerCase().trim();

  cardsPesquisa.forEach((card) => {
    const titulo = card.dataset.titulo?.toLowerCase() || "";
    const autor = card.dataset.autor?.toLowerCase() || "";
    const resumo = card.dataset.resumo?.toLowerCase() || "";
    const categoria1 = card.dataset.categoria1?.toLowerCase() || "";
    const categoria2 = card.dataset.categoria2?.toLowerCase() || "";
    const textoCard = card.innerText.toLowerCase();

    const encontrou =
      titulo.includes(termo) ||
      autor.includes(termo) ||
      resumo.includes(termo) ||
      categoria1.includes(termo) ||
      categoria2.includes(termo) ||
      textoCard.includes(termo);

    card.style.display = encontrou ? "block" : "none";
  });

  atualizarSecoesCatalogo();
});

formPesquisa.addEventListener("reset", () => {
  setTimeout(() => {
    cardsPesquisa.forEach((card) => {
      card.style.display = "block";
    });

    atualizarSecoesCatalogo();
  }, 0);
});

function atualizarSecoesCatalogo() {
  const catalogos = document.querySelectorAll(".catalogo");

  catalogos.forEach((catalogo) => {
    const cardsVisiveis = catalogo.querySelectorAll(
      ".card.abrir-modal:not([style*='display: none'])"
    );

    const tituloSection = catalogo.previousElementSibling;

    if (cardsVisiveis.length === 0) {
      catalogo.style.display = "none";

      if (tituloSection) {
        tituloSection.style.display = "none";
      }
    } else {
      catalogo.style.display = "block";

      if (tituloSection) {
        tituloSection.style.display = "block";
      }
    }
  });
}