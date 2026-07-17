// menu lateral
const menu = document.getElementById("menuLateral");
const menuIcon = document.querySelector(".menu-icon");

// abrir menu
function openMenu() {
  menu.classList.add("active");
}

// fechar menu
function closeMenu() {
  menu.classList.remove("active");
}

// fechar ao clicar fora
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
    menu.classList.remove("active");
  }
});

// concluídos em tela
const listaConcluidos = document.getElementById("listaConcluidos");
const buscarConcluidos = document.getElementById("buscarConcluidos");
const limparConcluidos = document.getElementById("limparConcluidos");

function pegarConcluidos() {
  return JSON.parse(localStorage.getItem("concluidos")) || [];
}

function salvarConcluidos(lista) {
  localStorage.setItem("concluidos", JSON.stringify(lista));
}

function criarCardConcluido(item) {
  return `
    <article class="card-favorito">
      <img src="${item.imagem}" alt="${item.titulo}">

      <div class="info-favorito">
        <h2>${item.titulo}</h2>
        <p class="autor">${item.autor}</p>
        <p class="resumo">${item.resumo}</p>

        <div class="tags">
          <span>${item.categoria1}</span>
          <span>${item.categoria2}</span>
        </div>

        <div class="botoes-card">
          <a href="${item.link}" target="_blank">Acessar</a>
          <button onclick="removerConcluido('${item.id}')">Remover</button>
        </div>
      </div>
    </article>
  `;
}

function mostrarConcluidos(lista = pegarConcluidos()) {
  if (lista.length === 0) {
    listaConcluidos.innerHTML = `
      <div class="mensagem-vazia">
        <h2>Nenhum conteúdo concluído ainda :(</h2>
        <p>Volte para a biblioteca e marque conteúdos como concluídos.</p>
        <a href="indexBiblioteca.html">Ir para Biblioteca</a>
      </div>
    `;
    return;
  }

  listaConcluidos.innerHTML = lista.map(criarCardConcluido).join("");
}

function removerConcluido(id) {
  const concluidos = pegarConcluidos();
  const novaLista = concluidos.filter((item) => item.id !== id);

  salvarConcluidos(novaLista);
  mostrarConcluidos(novaLista);
}

buscarConcluidos.addEventListener("input", () => {
  const termo = buscarConcluidos.value.toLowerCase();
  const concluidos = pegarConcluidos();

  const filtrados = concluidos.filter((item) => {
    return (
      item.titulo.toLowerCase().includes(termo) ||
      item.autor.toLowerCase().includes(termo) ||
      item.categoria1.toLowerCase().includes(termo) ||
      item.categoria2.toLowerCase().includes(termo)
    );
  });

  mostrarConcluidos(filtrados);
});

limparConcluidos.addEventListener("click", () => {
  localStorage.removeItem("concluidos");
  mostrarConcluidos([]);
});

mostrarConcluidos();