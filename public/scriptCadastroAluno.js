const formCadastroAluno = document.getElementById("formCadastroAluno");

formCadastroAluno.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const cpf = document.getElementById("cpf").value;
  const termos = document.getElementById("termos").checked;

  if (!termos) {
    alert("Você precisa aceitar os termos de uso.");
    return;
  }

  const dados = {
    nome: nome,
    email: email,
    senha: senha,
    confirmar_senha: confirmarSenha,
    cpf: cpf
  };

  try {
    const resposta = await fetch("/cadastro", {
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

    alert(resultado.mensagem);

    if (resultado.mensagem.toLowerCase().includes("sucesso")) {
      window.location.assign("indexLogaluno.html");
    }

  } catch (erro) {
    console.log("Erro na conexão:", erro);
    alert("Não foi possível conectar ao servidor.");
  }
});