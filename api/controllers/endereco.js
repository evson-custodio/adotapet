const debug = require('debug')('adotapet:api:controllers:endereco');

module.exports = (api) => {
    const Endereco = api.models.endereco;
    // const Endereco = require('mongoose').model('Endereco');
    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Endereco.create(req.body)
            .then(endereco => {
                res.json(endereco);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Endereco.findOne({_id: req.id})
            .exec()
            .then(endereco => {
                res.json(endereco);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Endereco.findOneAndUpdate({_id: req.id}, req.body, {runValidators: true, context: 'query', new: true})
            .exec()
            .then(endereco => {
                res.json(endereco);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Endereco.findOneAndRemove({_id: req.id})
            .exec()
            .then(endereco => {
                res.json(endereco);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Endereco.find(req.query)
            .exec()
            .then(enderecos => {
                res.json(enderecos);
            })
            .catch(error => {
                res.json(error);
            });
        }
    }
}