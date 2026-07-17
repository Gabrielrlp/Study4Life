const API_URL = "";

async function enviarPergunta() {
    const input = document.getElementById("pergunta");
    const chatBox = document.getElementById("chatBox");

    const pergunta = input.value.trim();

    if (pergunta === "") {
        return;
    }

    adicionarMensagem(pergunta, "user");

    input.value = "";
    input.focus();

    const digitando = adicionarMensagem("Digitando resposta...", "bot", true);

    try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const usuario_id = usuario ? usuario.id : 1;

        const respostaServidor = await fetch(`${API_URL}/ajuda`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: usuario_id,
                pergunta: pergunta
            })
        });

        const dados = await respostaServidor.json();

        digitando.remove();

        if (dados.resposta) {
            adicionarMensagem(dados.resposta, "bot");
        } else {
            adicionarMensagem("Não encontrei uma resposta para essa dúvida.", "bot");
        }

    } catch (erro) {
        digitando.remove();
        adicionarMensagem("Não consegui conectar com o suporte agora. Verifique se o backend está rodando.", "bot");
        console.log(erro);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function adicionarMensagem(texto, tipo, digitando = false) {
    const chatBox = document.getElementById("chatBox");

    const div = document.createElement("div");
    div.classList.add("mensagem", tipo);

    if (digitando) {
        div.classList.add("digitando");
    }

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");
    avatar.innerText = tipo === "user" ? "👤" : "🤖";

    const conteudo = document.createElement("div");
    conteudo.classList.add("texto");
    conteudo.innerText = texto;

    div.appendChild(avatar);
    div.appendChild(conteudo);

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}

function perguntaRapida(texto) {
    const input = document.getElementById("pergunta");
    input.value = texto;
    enviarPergunta();
}

document.getElementById("pergunta").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        enviarPergunta();
    }
});

function openMenu() {
    document.getElementById("menuLateral").classList.add("active");
}

function closeMenu() {
    document.getElementById("menuLateral").classList.remove("active");
}