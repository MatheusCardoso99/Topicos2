console.log("Servidor inicializando...");

// Usando o Express
const express = require('express');
const app = express();
app.use(express.json()); //Para tratar o json

app.listen(3000, () =>{
    console.log('Rodando em http://localhost.3000')   
})

// prerarar para responder ao GET
app.get('/', (req, res) => {
    res.send('Atendida a requisição GET!!');
   }); 

// rotas para animais
const animais = require('./animais');
animais(app); 