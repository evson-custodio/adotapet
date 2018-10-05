const debug = require('debug')('adotapet:api:controllers:funcionario');

module.exports = (api) => {
    const Funcionario = api.models.funcionario;
    // const Funcionario = require('mongoose').model('Funcionario');
    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Funcionario.create(req.body)
            .then(funcionario => {
                res.json(funcionario);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Funcionario.findOne({_id: req.id})
            .exec()
            .then(funcionario => {
                res.json(funcionario);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Funcionario.findOneAndUpdate({_id: req.id}, req.body, {runValidators: true, context: 'query', new: true})
            .exec()
            .then(funcionario => {
                res.json(funcionario);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Funcionario.findOneAndRemove({_id: req.id})
            .exec()
            .then(funcionario => {
                res.json(funcionario);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Funcionario.find(req.query)
            .exec()
            .then(funcionarios => {
                res.json(funcionarios);
            })
            .catch(error => {
                res.json(error);
            });
        }
    }
}