module.exports = (api) => {
    const Usuario = api.models.usuario;
    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Usuario.create(req.body)
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Usuario.findOne({_id: req.id})
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Usuario.findOneAndUpdate({_id: req.id}, req.body, {new: true})
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Usuario.findOneAndRemove({_id: req.id})
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Usuario.find()
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