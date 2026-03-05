const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pages')));


const processosApi = require('./backend/processos-api');
const chatbotApi = require('./backend/chatbot-api');
const loginRoutes = require("./login.js");



app.use('/api/processos', processosApi);
app.use('/api/chatbot', chatbotApi);
app.use("/api", loginRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
