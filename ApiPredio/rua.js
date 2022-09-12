const ObjectId = require('mongodb').ObjectId;

module.exports = (app) => {
    // colocar aqui as rotas para requisições de rua
   app.get('/rua', (req, res) => {
    //res.send({"Res":"ok"});
    db.collection('rua').find().toArray((err, results)=>{
        if (err) throw err;
        res.json(results);
        });       
   });
}