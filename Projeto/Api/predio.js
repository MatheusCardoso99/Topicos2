const { ObjectId } = require("mongodb");

module.exports = (app) => {
    // colocar aqui as rotas para requisições de rua

    app.get('/predio/:id', (req, res) => {
        // console.log(req.params.id);
        var id = ObjectId(req.params.id);
        db.collection('rua').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.post('/predio', (req, res, next) => {
        db.collection('predio').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });

    app.put('/predio/:id', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {$set:{
        nome: req.body.nome,
        sigla: req.body.sigla,
        andares: req.body.sigla
        }};
        db.collection('predio').updateOne(
        {_id: id},
        newvalues,
        (err, result) => {
        if (err) throw err;
        if (result.modifiedCount < 1)
        return res.json({aviso: "Nada alterado."});
        res.json({success: "Alterado com sucesso."});
        })
       });

    app.delete('/predio/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('predio').deleteOne({_id: id}, (err, result)=>{
        if (err) throw err;
        if (result.deletedCount < 1)
        return res.json({aviso: "Nada excluído." });
        res.json({success: "Excluído com sucesso." });
        });
       });
}

