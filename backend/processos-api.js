const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/buscar/:numero', (req, res) => {
    const numero = req.params.numero;
    const processosPath = path.join(__dirname, '../data/processos.json');

    fs.readFile(processosPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler processos:', err);
            return res.status(500).json({ erro: 'Erro no servidor' });
        }

        const processos = JSON.parse(data);
        const processo = processos.find(p => p.numero === numero);

        if (!processo) {
            return res.status(404).json({ erro: 'Processo não encontrado' });
        }

        res.json(processo);
    });
});

module.exports = router;
