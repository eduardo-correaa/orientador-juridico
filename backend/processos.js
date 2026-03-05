const express = require('express');
const router = express.Router();
const path = require('path');
const processos = require('../data/processos.json');

router.get('/buscar-processo/:documento', (req, res) => {
    const documento = req.params.documento;

    const processo = processos.find(p => 
        p.cpf === documento || p.rg === documento
    );

    if (processo) {
        res.json(processo);
    } else {
        res.status(404).json({ erro: 'Processo não encontrado.' });
    }
});

module.exports = router;
