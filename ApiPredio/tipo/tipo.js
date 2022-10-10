const { ObjectId } = require("mongodb");

module.exports = (app) => {
   
    app.get('/tipo', (req, res) => {
        db.collection('tipo').find().toArray((err, result) => {
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


    app.get('/tipo/:id', (req, res) => {
        // console.log(req.params.id);
        var id = ObjectId(req.params.id);
        db.collection('tipo').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.delete('/tipo/deleta/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('tipo').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });


    app.put('/atualizar/tipo', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                descricao: req.body.descricao
            }
        };
        db.collection('tipo').updateOne(
            { _id: id },
            newvalues,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount < 1)
                    return res.json({ aviso: "Nada alterado." });
                res.json({ success: "Alterado com sucesso." });
            })
    });

}
