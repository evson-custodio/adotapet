const debug = require('debug')('adotapet:api:controllers:medicamento');

module.exports = (api) => {
    const Medicamento = api.models.medicamento;
    // const Medicamento = require('mongoose').model('Medicamento');

    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Medicamento.create(req.body)
            .then(medicamento => {
                res.json(medicamento);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Medicamento.findOne({_id: req.id})
            .exec()
            .then(medicamento => {
                res.json(medicamento);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Medicamento.findOneAndUpdate({_id: req.id}, req.body, {runValidators: true, context: 'query', new: true})
            .exec()
            .then(medicamento => {
                res.json(medicamento);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Medicamento.findOneAndRemove({_id: req.id})
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
            .then(medicamentos => {
                res.json(medicamentos);
            })
            .catch(error => {
                res.json(error);
            });
        }
    }
}