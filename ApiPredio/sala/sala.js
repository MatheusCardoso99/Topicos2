const { ObjectId } = require("mongodb");

module.exports = (app) => {
    // colocar aqui as rotas para requisições de sala

    app.get('/sala', (req, res) => {
        db.collection('sala').find().toArray((err, result) => {
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
    
    app.get('/sala/:id', (req, res) => {
        // console.log(req.params.id);
        var id = ObjectId(req.params.id);
        db.collection('sala').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    app.delete('/sala/deleta/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('sala').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });


    app.put('/sala/atualizar', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                nome: req.body.nome,
                capacidade: req.body.capacidade,
                andar: req.body.andar,
                localizacao: req.body.localizacao

            }
        };
        db.collection('sala').updateOne(
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


