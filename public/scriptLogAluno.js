const formLoginAluno = document.getElementById("formLoginAluno");

formLoginAluno.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const dados = {
    email: email,
    senha: senha
  };

  try {
    const resposta = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      console.log("Erro do backend:", erro);
      alert("Erro ao conectar com o servidor.");
      return;
    }

    const resultado = await resposta.json();

    if (resultado.sucesso) {
      localStorage.setItem("usuario_logado", "true");
      localStorage.setItem("usuario_id", resultado.usuario.id);
      localStorage.setItem("usuario_nome", resultado.usuario.nome);

      alert("Login realizado com sucesso!");
      window.location.href = "indexHome.html";
    } else {
      alert(resultado.mensagem);
    }

  } catch (erro) {
    console.log("Erro na conexão:", erro);
    alert("Não foi possível conectar ao servidor.");
  }
});