console.log("Servidor inicializando...");

// Usando o Express
const express = require('express');
const app = express();
app.use(express.json()); //Para tratar o json

// conexão com mongoBD
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb://localhost:27018/base";


MongoClient.connect(uri, (err, client) => {
 if (err)
 return console.log(err);
 db = client.db('admin');
 app.listen(3000, function() { // subir serviço da api na porta 3000
 console.log('API rodando na porta 3000');
 console.log('Testar por http://localhost:3000');
 });
 });

// prerarar para responder ao GET
app.get('/', (req, res) => {
    res.send('Atendida a requisição GET!!');
   }); 

// rotas para rua
const rua = require('./rua');
rua(app); 