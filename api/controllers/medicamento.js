const debug = require('debug')('leva-eu:api:controllers:medicamento');

module.exports = (api) => {
    const Medicamento = require('mongoose').model('Medicamento');

    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Usuario.create(req.body)
            .then(usuario => {
                res.json(medicamento);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Usuario.findOne({_id: req.id})
            .exec()
            .then(medicamento => {
                res.json(medicamento);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Usuario.findOneAndUpdate({_id: req.id}, req.body, {new: true})
            .exec()
            .then(medicamento => {
                res.json(medicamento);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Usuario.findOneAndRemove({_id: req.id})
            .exec()
            .then(medicamento => {
                res.json(medicamento);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Medicamento.find(req.query)
            .exec()
            .then(usuarios => {
                res.json(medicamentos);
            })
            .catch(error => {
                res.json(error);
            });
        }
    }
}