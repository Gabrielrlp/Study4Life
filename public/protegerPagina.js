// verifica se o usuário está logado
const usuarioLogado = localStorage.getItem("usuario_logado");

// se não estiver logado
if (usuarioLogado !== "true") {

  alert("Você precisa fazer login para acessar esta página.");

  // redireciona para a tela de login
  window.location.href = "indexLogaluno.html";

}