const { ObjectId } = require("mongodb");

module.exports = (app) => {
    // colocar aqui as rotas para requisições de rua

    app.get('/sala/:id', (req, res) => {
        // console.log(req.params.id);
        var id = ObjectId(req.params.id);
        db.collection('rua').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.post('/sala', (req, res, next) => {
        db.collection('sala').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });

    app.put('/sala/:id', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {$set:{
        descricao: req.body.descricao,
        capacidade: req.body.capacidade,
        andar: req.body.andar,
        localizacao: req.body.localizacao
        }};
        db.collection('sala').updateOne(
        {_id: id},
        newvalues,
        (err, result) => {
        if (err) throw err;
        if (result.modifiedCount < 1)
        return res.json({aviso: "Nada alterado."});
        res.json({success: "Alterado com sucesso."});
        })
       });

    app.delete('/sala/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('sala').deleteOne({_id: id}, (err, result)=>{
        if (err) throw err;
        if (result.deletedCount < 1)
        return res.json({aviso: "Nada excluído." });
        res.json({success: "Excluído com sucesso." });
        });
       });
}

