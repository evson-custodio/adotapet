module.exports = (api) => {
    const Abrigo = api.models.abrigo;
    // const Abrigo = require('mongoose').model('Abrigo');
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
            .populate('pets')
            .exec()
            .then(abrigo => {
                res.json(abrigo);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Abrigo.findOneAndUpdate({_id: req.id}, req.body, {runValidators: true, context: 'query', new: true})
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
            let keys = Object.keys(req.query);
            if (keys.length > 0) {
                if (keys.includes('usuarios')) {
                    req.query.usuarios = {
                        $in: req.query.usuarios
                    }
                }
                if (keys.includes('pets')) {
                    req.query.pets = {
                        $in: req.query.pets
                    }
                }
            }
            Abrigo.find(req.query)
            .populate('usuarios')
            .populate('pets')
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