// typeware effect
function typeWriter(elementId, texto, velocidade = 50) {
    let index = 0;
    const elemento = document.getElementById(elementId);

    function escrever() {
        if (index < texto.length) {
            elemento.textContent += texto.charAt(index);
            index++;
            setTimeout(escrever, velocidade);
        }
    }
    escrever();
}

typeWriter("typing-text", 'Bem-Vindo "nome do usuario"', 50);

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