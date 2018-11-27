const debug = require('debug')('adotapet:plugins:relationshipValidator');

module.exports = (schema, api) => {
    schema.relationship = {};
    schema.eachPath((path, type) => {
        if ('ref' in type.options) {
            schema.relationship[path] = api.models[type.options.ref.toLowerCase()];
        }
        else if (Array.isArray(type.options.type) && 'ref' in type.options.type[0]) {
            schema.relationship[path] = api.models[type.options.type[0].ref.toLowerCase()];
        }
        
        if (path in schema.relationship) {
            type.validate(value => new Promise(resolve => {
                if (value != '' && value != null) {
                    schema.relationship[path]
                    .findOne({_id: value})
                    .exec()
                    .then(doc => {
                        if (doc) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    })
                    .catch(error => {
                        resolve(false);
                    });
                }
                else {
                    resolve(true);
                }
            }), prop => `Não foi encontrado nenhum '${schema.relationship[path].modelName}' com o ObjectId '${prop.value}' para a propriedade '${path}'.`, 'relationship');
        }
    });
}