const { ObjectId } = require("mongodb");

module.exports = (app) => {
    // colocar aqui as rotas para requisições de rua

    app.get('/rua/:id', (req, res) => {
        // console.log(req.params.id);
        var id = ObjectId(req.params.id);
        db.collection('rua').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.post('/rua', (req, res, next) => {
        db.collection('rua').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });

    app.put('/rua/:id', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {$set:{
        nome: req.body.nome
        }};
        db.collection('rua').updateOne(
        {_id: id},
        newvalues,
        (err, result) => {
        if (err) throw err;
        if (result.modifiedCount < 1)
        return res.json({aviso: "Nada alterado."});
        res.json({success: "Alterado com sucesso."});
        })
       });

    app.delete('/rua/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('rua').deleteOne({_id: id}, (err, result)=>{
        if (err) throw err;
        if (result.deletedCount < 1)
        return res.json({aviso: "Nada excluído." });
        res.json({success: "Excluído com sucesso." });
        });
       });
}

