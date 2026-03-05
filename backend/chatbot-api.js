require("dotenv").config();
const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/perguntar", async (req, res) => {
  const { pergunta } = req.body;

  if (!pergunta) {
    return res.status(400).json({ erro: "Pergunta não enviada." });
  }

  const contexto = `
Você é um assistente jurídico brasileiro.
Explique termos legais de forma simples.
Se não souber, diga que não possui informações suficientes.
Nunca invente dados processuais.
`;

  const promptFinal = `${contexto}\n\nPergunta do cliente: ${pergunta}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptFinal
    });

    res.json({ resposta: response.text });

  } catch (error) {
    console.error("Erro Gemini:", error);
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;