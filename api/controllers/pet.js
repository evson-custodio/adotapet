const debug = require('debug')('leva-eu:api:controllers:pet');

module.exports = (api) =>{
    const Pet = require('mongoose').model('Pet');
    return{
        id: (req, res, next, id) => {
            req.id = id;
            next();
        },
        create: (req, res, next) => {
            Pet.create(req.body)
            .then(pet => {
                res.json(pet);
            })
            .catch(error => {
                res.json(error);
            });
        },
        read: (req, res, next) => {
            Pet.findOne({_id: req.id})
            .exec()
            .then(pet => {
                res.json(pet);
            })
            .catch(error => {
                res.json(error);
            });
        },
        update: (req, res, next) => {
            Pet.findOneAndUpdate({_id: req.id}, req.body, {new: true})
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