const debug = require('debug')('adotapet:api:util:generic');
const express = require('express');

function Generic() {
    this.getStaticHandler = (static) => (req, res, next) => {
        res.status(200).json(static);
    },
    this.getStaticEndpoints = (base, router, static) => {
        if (typeof static == 'object') {
            const staticKeys = Object.keys(static);
            staticKeys.forEach(key => this.getStaticEndpoints(base + key + '/', router, static[key]));
        }
        router.get(base, this.getStaticHandler(static));
    },
    this.getStaticRouter = (api, staticName) => {
        const static = api.static[staticName.toLocaleLowerCase()];

        const router = express.Router();

        this.getStaticEndpoints('/', router, static);

        return router;
    },
    this.getController = (api, modelName) => {
        const Model = api.models[modelName.toLocaleLowerCase()];
        return {
            _id: (req, res, next, _id) => {
                req._id = _id;
                next();
            },
            create: (req, res, next) => {
                Model.create(req.body)
                .then(doc => {
                    res.status(201).json(doc);
                })
                .catch(error => {
                    res.status(400).json(error);
                })
            },
            read: (req, res, next) => {
                Model.findOne({ _id: req._id })
                .populate(Model.schema.populable.join(' '))
                .exec()
                .then(doc => {
                    if (doc) {
                        res.status(200).json(doc);
                    }
                    else {
                        res.status(404).json({
                            message: modelName + ' não encontrado!'
                        });
                    }
                })
                .catch(error => {
                    res.status(400).json(error);
                });
            },
            update: (req, res, next) => {
                Model.findOneAndUpdate({ _id: req._id }, req.body, { runValidators: true, context: 'query', new: true })
                .exec()
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(error => {
                    res.status(409).json(error);
                });
            },
            patch: (req, res, next) => {
                Model.findOneAndUpdate({ _id: req._id }, req.body, { runValidators: true, context: 'query', new: true })
                .exec()
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(error => {
                    res.status(409).json(error);
                });
            },
            delete: (req, res, next) => {
                Model.findOneAndRemove({ _id: req._id })
                .exec()
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
            },
            list: (req, res, next) => {
                let queryable = Model.schema.queryable;
                queryable.forEach(path => {
                    if (req.query[path]) {
                        req.query[path] = {
                            $in: req.query[path]
                        }
                    }
                });

                Model.find(req.query)
                .populate(Model.schema.populable.join(' '))
                .exec()
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
            },
            schema: (req, res, next) => {
                if (!Model.schema.pluginNames.includes('modelSchema')) {
                    res.status(400).json({
                        message: "Funcionalidade desativada para o Model '" + Model.modelName + "': Certifique-se de ativar o plugin 'modelSchema'."
                    });
                }
                else {
                    res.status(200).json(Model.schema.modelSchema);
                }
            }
        }
    },
    this.getRouter = (api, modelName) => {
        let Controller = null;

        if (Object.keys(api.controllers).includes(modelName)) {
            Controller = api.controllers[modelName];
        }
        else {
            Controller = this.getController(api, modelName);
        }

        const router = express.Router();

        router.param('_id', Controller._id);

        router.get('/schema', Controller.schema);

        router.route('/')
        .get(Controller.list)
        .post(Controller.create);

        router.route('/:_id')
        .get(Controller.read)
        .put(Controller.update)
        .delete(Controller.delete)
        .patch(Controller.patch);

        return router;
    },
    this.rest = (app, api) => {
        let staticNames = Object.keys(api.static);
        let routesNames = Object.keys(api.routes);
        let modelsNames = Object.keys(api.models);

        staticNames.forEach(staticName => {
            app.use('/api/' + staticName + '/static', this.getStaticRouter(api, staticName));
        });
    
        routesNames.forEach(routeName => {
            app.use('/api/' + routeName, api.routes[routeName]);
        });
    
        modelsNames.filter(modelName => !routesNames.includes(modelName))
        .forEach(modelName => {
            app.use('/api/' + modelName, this.getRouter(api, modelName));
        });
    }
}

module.exports = new Generic;