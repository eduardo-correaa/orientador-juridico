async function cadastrar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.erro);
      return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "/login.html";

  } catch (error) {
  console.log("ERRO REAL:", error);
  erroDiv.innerText = "Erro ao conectar com o servidor.";
}
}




async function fazerLogin() {
  console.log("Botão clicado");
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const erroDiv = document.getElementById("mensagemErro");

  erroDiv.innerText = "";

  try {
    console.log("Enviando requisição . . .");
    const response = await fetch("/api/login_front", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });
  console.log("Status:", response.status);

    const data = await response.json();

    if (!response.ok) {
      erroDiv.innerText = data.erro;
      return;
    }

    // 🔥 REDIRECIONAMENTO
    window.location.href = "/index.html";

  } catch (error) {
    erroDiv.innerText = "Erro ao conectar com o servidor.";
  }
}