module.exports = function(api) {
    this._api = api,
    this.getController = (modelName) => {
        const Model = this._api.models[modelName];
        return {
            id: (req, res, next, _id) => {
                req._id = _id;
                next();
            },
            create: (req, res, next) => {
                Model.create(req.body)
                .then(doc => {
                    res.status(202).json(doc);
                })
                .catch(error => {
                    res.json(error);
                })
            },
            read: (req, res, next) => {
                Model.findOne({ _id: req._id })
                .exec()
                .then(doc => {
                    res.json(doc);
                })
                .catch(error => {
                    res.json(error);
                });
            },
            update: (req, res, next) => {
                Model.findOneAndUpdate({ _id: req._id }, req.body, { runValidators: true, context: 'query', new: true })
                .exec()
                .then(doc => {
                    res.json(doc);
                })
                .catch(error => {
                    res.json(error);
                });
            },
            patch: (req, res, next) => {
                Model.findOneAndUpdate({ _id: req._id }, req.body, { runValidators: true, context: 'query', new: true })
                .exec()
                .then(doc => {
                    res.json(doc);
                })
                .catch(error => {
                    res.json(error);
                });
            },
            delete: (req, res, next) => {
                Model.findOneAndRemove({ _id: req._id })
                .exec()
                .then(doc => {
                    res.json(pet);
                })
                .catch(error => {
                    res.json(error);
                });
            },
            list: (req, res, next) => {
                Model.find(req.query)
                .exec()
                .then(docs => {
                    res.json(docs);
                })
                .catch(error => {
                    res.json(error);
                });
            }
        }
    },
    this.getRouter = (modelName) => {
        const Controller = this._api.controllers[modelName];
        const router = require('express').Router();

        router.param('_id', Controller._id);

        router.route('/')
        .get(Controller.list)
        .post(Controller.create);

        router.route('/:id')
        .get(Controller.read)
        .put(Controller.update)
        .delete(Controller.delete)
        .patch(Controller.patch);

        return router;
    }
}