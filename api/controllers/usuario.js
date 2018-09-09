const debug = require('debug')('leva-eu:api:controllers:usuario');

module.exports = (api) => {
    // const Usuario = api.models.usuario;
    const Usuario = require('mongoose').model('Usuario');
    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Usuario.create(req.body)
            .then(usuario => {
                res.json(usuario);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Usuario.findOne({_id: req.id})
            .exec()
            .then(usuario => {
                res.json(usuario);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Usuario.findOneAndUpdate({_id: req.id}, req.body, {new: true})
            .exec()
            .then(usuario => {
                res.json(usuario);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Usuario.findOneAndRemove({_id: req.id})
            .exec()
            .then(usuario => {
                res.json(usuario);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Usuario.find(req.query)
            .exec()
            .then(usuarios => {
                res.json(usuarios);
            })
            .catch(error => {
                res.json(error);
            });
        },
        authenticate: (req, res, next) => {
            Usuario.findOne({
                // password: req.headers.password,
                $or: [
                    {
                        username: req.headers['username-email']
                    },
                    {
                        email: req.headers['username-email']
                    }
                ]
            })
            .exec()
            .then(usuario => {
                if (usuario == null) {
                    res.status(404).json({
                        message: 'Nome de Usuario ou E-mail não encontrados.'
                    });
                }
                else if (usuario.password !== req.headers.password) {
                    res.json({
                        message: 'Senha Incorreta.'
                    });
                }
                else {
                    res.json(usuario);
                }
            })
            .catch(error => {
                res.json(error);
            });
        }
    }
}