console.log("Servidor inicializando...");

// Usando o Express
const express = require('express');
const app = express();
app.use(express.json()); //Para tratar o json


// conexão com mongoBD
const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb://admin:admin@localhost:27018/base01?authSource=meuteste ";
const uri = "mongodb://localhost:27018/base01 ";
//const uri = "mongodb+srv://admin<admin>@cluster0.m9erniu.mongodb.net/?retryWrites=true&w=majority";
MongoClient.connect(uri, (err, client) => {
 if (err)
 return console.log(err);
 db = client.db('aula01');
 app.listen(3000, function() { // subir serviço da api na porta 3000
 console.log('API rodando na porta 3000');
 console.log('Testar por http://localhost:3000');
 });
 });

// Liberar origens para requisições
var cors = require('cors');
app.use(cors({origin: '*'}));
//routes.use(cors({origin: 'http://localhost:3001'}));

// prerarar para responder ao GET
app.get('/', (req, res) => {
    res.send('Atendida a requisição GET!!');
   }); 

// rotas para animais  usuarios
const animais = require('./animais');
animais(app); 

const usuario = require('./usuario');
usuario(app); 

