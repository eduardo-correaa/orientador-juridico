const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./backend/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  try {
    // Verifica se já existe
    db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      async (err, results) => {

        if (results.length > 0) {
          return res.status(400).json({ erro: "Email já cadastrado." });
        }

        const hashSenha = await bcrypt.hash(senha, 10);

        db.query(
          "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
          [nome, email, hashSenha],
          (err) => {
            if (err) return res.status(500).json({ erro: err.message });

            return res.status(201).json({ sucesso: "Cadastro realizado com sucesso!" });
          }
        );
      }
    );

  } catch (err) {
    res.status(500).json({ erro: "Erro no servidor." });
  }
});

/* LOGIN */
router.post("/login_front", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  try {
    const [results] = await db.promise().query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (results.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    const usuario = results[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    return res.status(200).json({ sucesso: "Login realizado com sucesso!" });

  } catch (erro) {
    console.log("ERRO LOGIN:", erro);
    return res.status(500).json({ erro: "Erro no servidor." });
  }
});


module.exports = router;