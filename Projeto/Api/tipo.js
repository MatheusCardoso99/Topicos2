const { ObjectId } = require("mongodb");

module.exports = (app) => {
    // colocar aqui as rotas para requisições de rua

    app.get('/tipo/:id', (req, res) => {
        // console.log(req.params.id);
        var id = ObjectId(req.params.id);
        db.collection('rua').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.post('/tipo', (req, res, next) => {
        db.collection('tipo').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });

    app.put('/tipo/:id', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {$set:{
        nome: req.body.nome
        }};
        db.collection('tipo').updateOne(
        {_id: id},
        newvalues,
        (err, result) => {
        if (err) throw err;
        if (result.modifiedCount < 1)
        return res.json({aviso: "Nada alterado."});
        res.json({success: "Alterado com sucesso."});
        })
       });

    app.delete('/tipo/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('tipo').deleteOne({_id: id}, (err, result)=>{
        if (err) throw err;
        if (result.deletedCount < 1)
        return res.json({aviso: "Nada excluído." });
        res.json({success: "Excluído com sucesso." });
        });
       });
}

