document.addEventListener("DOMContentLoaded", () => {

  const respostaContainer = document.getElementById("respostaContainer");
  const respostaDiv = document.getElementById("resposta");
  const botaoEnviar = document.getElementById("botaoEnviar");
  const inputPergunta = document.getElementById("inputPergunta");
  const numProcessoDiv = document.getElementById("numProcesso");
  const detalhesDiv = document.getElementById("detalhesProcesso");

  if (!botaoEnviar || !inputPergunta) return;

  // 🔹 Número do processo da URL
  const urlParams = new URLSearchParams(window.location.search);
  const numProcesso = urlParams.get("processo");

  // 🔹 Variável global para guardar o processo completo
  let processoAtual = null;

  if (numProcessoDiv && detalhesDiv) {
    if (numProcesso) {
      numProcessoDiv.innerText = `🗂️ Processo em análise: ${numProcesso}`;
      carregarProcesso(numProcesso); // carrega e salva em processoAtual
    } else {
      numProcessoDiv.innerText = "Nenhum processo selecionado";
      detalhesDiv.innerText = "Retorne à página anterior e selecione um processo.";
    }
  }

  // 🔹 Eventos de envio
  botaoEnviar.addEventListener("click", () => {
    const pergunta = inputPergunta.value.trim();
    if (!pergunta) {
      mostrarResposta("⚠️ Digite uma pergunta!");
      return;
    }
    enviarPergunta(pergunta);
    inputPergunta.value = "";
  });

  inputPergunta.addEventListener("keydown", (event) => {
    if (event.key === "Enter") botaoEnviar.click();
  });

  // 🔹 Funções
  function mostrarResposta(texto) {
    if (respostaContainer) respostaContainer.classList.add("mostrar");
    respostaDiv.innerText = texto;
  }

  async function carregarProcesso(numero) {
    try {
      const response = await fetch("/processos.json");
      if (!response.ok) throw new Error("Arquivo JSON não encontrado");

      const processos = await response.json();
      processoAtual = processos.find(p => p.numero === numero);

      if (processoAtual) {
        detalhesDiv.innerText =
          `👤 Cliente: ${processoAtual.nome}\n` +
          `📂 Processo: ${processoAtual.numero}\n` +
          `📄 Descrição: ${processoAtual.descricao}`;
      } else {
        detalhesDiv.innerText = "❌ Processo não encontrado.";
      }

    } catch (error) {
      detalhesDiv.innerText = `❌ Erro ao carregar processo: ${error.message}`;
      console.error(error);
    }
  }

  async function enviarPergunta(pergunta) {
    if (!processoAtual) {
      mostrarResposta("❌ Nenhum processo carregado para fornecer contexto.");
      return;
    }

    mostrarResposta("⏳ Analisando sua pergunta...");

    try {
      const response = await fetch(
        "http://localhost:3000/api/chatbot/perguntar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pergunta,
            processo: processoAtual // envia todo o objeto
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        mostrarResposta(`💡 ${data.resposta}`);
      } else {
        mostrarResposta(`❌ ${data.erro || response.statusText}`);
      }

    } catch (error) {
      mostrarResposta(`❌ Erro na conexão: ${error.message}`);
    }
  }

});