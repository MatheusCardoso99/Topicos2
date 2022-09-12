console.log("Servidor inicializando...");


// Usando o Express
const express = require('express');
const app = express();
app.use(express.json()); //Para tratar o json

// app.listen(3000, () =>{
//     console.log('Rodando em http://localhost.3000')   
// })

// conexão com mongoBD
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27018/Base ";
MongoClient.connect(uri, (err, client) => {
 if (err)
 return console.log(err);
 db = client.db('aula01');
 app.listen(3001, function() { // subir serviço da api na porta 3000
 console.log('API rodando na porta 3001');
 console.log('Testar por http://localhost:3001');
 });
 });

// prerarar para responder ao GET
app.get('/', (req, res) => {
    res.send('Atendida a requisição GET!!');
   }); 

// rotas para rua
const rua = require('./rua');
rua(app); 
