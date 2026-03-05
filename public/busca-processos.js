document.addEventListener("DOMContentLoaded", () => {

    const inputBusca = document.getElementById("inputBusca");
    const botaoBuscar = document.getElementById("botaoBuscar");
    const resultadoDiv = document.getElementById("resultado");
    const loadingDiv = document.getElementById("loading");

    if (!inputBusca || !resultadoDiv) return;

    // Adiciona id dinamicamente se não existir
    if (!botaoBuscar) {
        const botao = document.querySelector(".input-group button");
        botao.id = "botaoBuscar";
    }

    document.getElementById("botaoBuscar").addEventListener("click", buscarProcesso);

    async function buscarProcesso() {

    const cpf = inputBusca.value.trim();

    if (!cpf) {
        resultadoDiv.innerText = "⚠️ Digite um CPF!";
        return;
    }

    loadingDiv.style.display = "block";
    resultadoDiv.innerHTML = "";

    try {

        const response = await fetch("/processos.json");

        if (!response.ok) {
            throw new Error("Arquivo JSON não encontrado");
        }

        const processos = await response.json();

        loadingDiv.style.display = "none";

        const filtrados = processos.filter(p => p.cpf === cpf);

        if (filtrados.length === 0) {
            resultadoDiv.innerText = "❌ Nenhum processo encontrado.";
            return;
        }

        filtrados.forEach(proc => {

            const div = document.createElement("div");
            div.classList.add("processo-item");

            div.innerHTML = `
                <strong>📂 Processo:</strong> ${proc.numero}<br>
                <strong>📄 Descrição:</strong> ${proc.descricao}<br>
                <button onclick="window.location.href='chatbot.html?processo=${proc.numero}'">
                    Abrir Chat
                </button>
                <hr>
            `;

            resultadoDiv.appendChild(div);
        });

    } catch (error) {
        loadingDiv.style.display = "none";
        resultadoDiv.innerText = "❌ Erro ao carregar os processos.";
        console.error(error);
    }
}
});