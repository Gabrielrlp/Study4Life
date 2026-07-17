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

// favoritos em tela
const listaFavoritos = document.getElementById("listaFavoritos");
const buscarFavoritos = document.getElementById("buscarFavoritos");
const limparFavoritos = document.getElementById("limparFavoritos");

function pegarFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function salvarFavoritos(lista) {
  localStorage.setItem("favoritos", JSON.stringify(lista));
}

function criarCardFavorito(item) {
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
          <button onclick="removerFavorito('${item.id}')">Remover</button>
        </div>
      </div>
    </article>
  `;
}

function mostrarFavoritos(lista = pegarFavoritos()) {
  if (lista.length === 0) {
    listaFavoritos.innerHTML = `
      <div class="mensagem-vazia">
        <h2>Nenhum conteúdo favoritado ainda :(</h2>
        <p>Volte para a biblioteca e favorite seus conteúdos preferidos.</p>
        <a href="indexBiblioteca.html">Ir para Biblioteca</a>
      </div>
    `;
    return;
  }

  listaFavoritos.innerHTML = lista.map(criarCardFavorito).join("");
}

function removerFavorito(id) {
  const favoritos = pegarFavoritos();
  const novaLista = favoritos.filter((item) => item.id !== id);

  salvarFavoritos(novaLista);
  mostrarFavoritos(novaLista);
}

buscarFavoritos.addEventListener("input", () => {
  const termo = buscarFavoritos.value.toLowerCase();
  const favoritos = pegarFavoritos();

  const filtrados = favoritos.filter((item) => {
    return (
      item.titulo.toLowerCase().includes(termo) ||
      item.autor.toLowerCase().includes(termo) ||
      item.categoria1.toLowerCase().includes(termo) ||
      item.categoria2.toLowerCase().includes(termo)
    );
  });

  mostrarFavoritos(filtrados);
});

limparFavoritos.addEventListener("click", () => {
  localStorage.removeItem("favoritos");
  mostrarFavoritos([]);
});

mostrarFavoritos();