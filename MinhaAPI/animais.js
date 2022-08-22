module.exports = (app) => {
    // colocar aqui as rotas para requisições de animais
   

   app.get('/animais', (req, res) => {
    res.send({"Res":"ok"});
   }); 
}