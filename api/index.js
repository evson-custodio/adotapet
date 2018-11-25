const debug = require('debug')('adotapet:api:index');
const consign = require('consign');

const relationshipValidator = require('./../plugins/relationshipValidator');

module.exports = (config) => new Promise((resolve, reject) => {
    const api = {};

    require('./../config/mongoose')
    .connect(config)
    .then(mongoose => {
        api.mongoose = mongoose;

        consign({cwd: __dirname})
        .include('util')
        .then('static')
        .then('models')
        .then('controllers')
        .then('routes')
        .into(api);

        for (modelName in api.models) {
            let schema = api.models[modelName].schema;
            relationshipValidator(schema, api);
        }

        resolve(api);
    })
    .catch(error => {
        reject(error);
    });
});
