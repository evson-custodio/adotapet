module.exports = (api) => {
    const Usuário = api.models.usuario;
    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Usuário.create(req.body)
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Usuário.findOne({_id: req.id})
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Usuário.findOneAndUpdate({_id: req.id}, req.body, {new: true})
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Usuário.findOneAndRemove({_id: req.id})
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Usuário.find()
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