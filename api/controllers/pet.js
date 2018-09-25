const debug = require('debug')('leva-eu:api:controllers:pet');

module.exports = (api) =>{
    const Pet = api.models.pet;
    const Abrigo = api.models.abrigo;
    // const Pet = require('mongoose').model('Pet');
    return{
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            req.body.porte = req.body.porte.trim();
            req.body.porte = req.body.porte.toLocaleLowerCase();
            Pet.create(req.body)
            .then(pet => {
                Abrigo.findOne({_id: pet.abrigo})
                .exec()
                .then(abrigo => {
                    abrigo.pets.push(pet._id);
                    Abrigo.findOneAndUpdate({_id: abrigo._id}, abrigo, {runValidators: true, context: 'query', new: true})
                    .exec()
                    .then(abrigo => {
                        res.json(pet);
                    })
                    .catch(error => {
                        res.json(error);
                    });
                })
                .catch(error => {
                    res.json(error);
                });
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Pet.findOne({_id: req.id})
            .populate('abrigo')
            .populate('medicamentos')
            .populate('vacinacao')
            .populate('caracteristica')
            .exec()
            .then(pet => {
                res.json(pet);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Pet.findOneAndUpdate({_id: req.id}, req.body, {runValidators: true, context: 'query', new: true})
            .exec()
            .then(pet => {
                res.json(pet);
            })
            .catch(error => {
                res.json(error);
            });
        },
        delete: (req, res, next) => {
            Pet.findOneAndRemove({_id: req.id})
            .exec()
            .then(pet => {
                res.json(pet);
            })
            .catch(error => {
                res.json(error);
            });
        },
        list: (req, res, next) => {
            Pet.find(req.query)
            .populate('abrigo')
            .populate('medicamentos')
            .populate('vacinacao')
            .populate('caracteristica')
            .exec()
            .then(pets => {
                res.json(pets);
            })
            .catch(error => {
                res.json(error);
            });
        }
    }
}