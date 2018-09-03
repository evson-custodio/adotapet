module.exports = (api) => {
    const Abrigo = api.models.abrigo;
    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Abrigo.create(req.body)
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Abrigo.findOne({_id: req.id})
            .populate('usuarios')
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Abrigo.findOneAndUpdate({_id: req.id}, req.body, {new: true})
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Abrigo.findOneAndRemove({_id: req.id})
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Abrigo.find()
            .populate('usuarios')
            .exec()
            .then(abrigos => {
                res.json(abrigos);
            })
            .catch(error => {
                res.json(error);
            });
        }
    }
}