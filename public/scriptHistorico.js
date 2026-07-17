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

// historico em tela
const listaHistorico = document.getElementById("listaHistorico");
const buscarHistorico = document.getElementById("buscarHistorico");
const limparHistorico = document.getElementById("limparHistorico");

function pegarHistorico() {
  return JSON.parse(localStorage.getItem("historico")) || [];
}

function salvarHistorico(lista) {
  localStorage.setItem("historico", JSON.stringify(lista));
}

function criarCardHistorico(item) {
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
          <button onclick="removerHistorico('${item.id}')">Remover</button>
        </div>
      </div>
    </article>
  `;
}

function mostrarHistorico(lista = pegarHistorico()) {
  if (lista.length === 0) {
    listaHistorico.innerHTML = `
      <div class="mensagem-vazia">
        <h2>Nenhum conteúdo acessado ainda :(</h2>
        <p>Volte para a biblioteca e acesse algum conteúdo.</p>
        <a href="indexBiblioteca.html">Ir para Biblioteca</a>
      </div>
    `;
    return;
  }

  listaHistorico.innerHTML = lista.map(criarCardHistorico).join("");
}

function removerHistorico(id) {
  const historico = pegarHistorico();
  const novaLista = historico.filter((item) => item.id !== id);

  salvarHistorico(novaLista);
  mostrarHistorico(novaLista);
}

buscarHistorico.addEventListener("input", () => {
  const termo = buscarHistorico.value.toLowerCase();
  const historico = pegarHistorico();

  const filtrados = historico.filter((item) => {
    return (
      item.titulo.toLowerCase().includes(termo) ||
      item.autor.toLowerCase().includes(termo) ||
      item.categoria1.toLowerCase().includes(termo) ||
      item.categoria2.toLowerCase().includes(termo)
    );
  });

  mostrarHistorico(filtrados);
});

limparHistorico.addEventListener("click", () => {
  localStorage.removeItem("historico");
  mostrarHistorico([]);
});

mostrarHistorico();