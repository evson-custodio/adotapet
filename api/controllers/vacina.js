const debug = require('debug')('leva-eu:api:controllers:vacina');

module.exports = (api) => {
    const Vacina = api.models.vacina;
    // const Vacina = require('mongoose').model('Vacina');

    return {
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Vacina.create(req.body)
            .then(vacina => {
                res.json(vacina);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Vacina.findOne({_id: req.id})
            .exec()
            .then(vacina => {
                res.json(vacina);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Vacina.findOneAndUpdate({_id: req.id}, req.body, {runValidators: true, context: 'query', new: true})
            .exec()
            .then(Vacina => {
                res.json(Vacina);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Vacina.findOneAndRemove({_id: req.id})
            .exec()
            .then(vacina => {
                res.json(vacina);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Vacina.find(req.query)
            .exec()
            .then(vacinas => {
                res.json(vacinas);
            })
            .catch(error => {
                res.json(error);
            });
        }
    }
}