const ObjectId = require('mongodb').ObjectId;
module.exports = (app) => {
    // colocar aqui as rotas para requisiÃ§Ãµes de usuarios     

    app.get('/usuarios', (req, res) => {
        db.collection('usuarios').find().toArray((err, results)=>{
           if (err) throw err;
           res.json(results);
        });
    });

    app.post('/usuarios', (req, res, next) => {
        db.collection('usuarios').insertOne(req.body, (err, results)=>{
           if (err) throw err;
           res.json({success: "IncluÃ­do"});
        });
    });
 
    app.put('/usuarios', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {$set:{
           nome: req.body.nome,
           email: req.body.email,
           celular: req.body.celular
        }};
        db.collection('usuarios').updateOne(
           {_id: id}, 
           newvalues, 
           (err, result) => {
              if (err) throw err;
              if (result.modifiedCount < 1)
                 return res.json({aviso: "Nada alterado."});
              res.json({success: "Alterado com sucesso."});
        })
     });

     app.delete('/usuarios/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('usuarios').deleteOne({_id: id}, (err, result)=>{
           if (err) throw err;
           if (result.deletedCount < 1)
              return res.json({aviso: "Nada excluÃ­do."});
           res.json({success: "ExcluÃ­do com sucesso."});
        });
     });
     
     
     app.get('/usuarios/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('usuarios').findOne({_id: id}, (err, result)=>{
           if (err) throw err;
           res.json(result);
        });
     });

     app.get('/usuarios/filtro/:valor', (req, res) => {
        db.collection('usuarios').find({
         $or: [
           { nome: { $regex: req.params.valor, $options: "i" } },
           { email: { $regex: req.params.valor, $options: "i" } },
         ],
       }).toArray((err, results)=>{
           if (err) throw err;
           res.json(results);
        });
      });
      
     


 }