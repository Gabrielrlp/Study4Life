// alert dos termos
function aceitar() {
  const check = document.getElementById("check");

  if (check.checked) {
    alert("Termos aceitos!");
    window.location.href = "index.html";
  } else {
    alert("Você precisa aceitar os termos.");
  }
}