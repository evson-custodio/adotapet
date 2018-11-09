module.exports = (schema, options) => {
    // console.log(schema);
    // schema.plugin(require('./queryableAndPopulable'));

    let modelSchema = {
        object: schema.obj,
        populable: schema.populable
    }

    removePaths(modelSchema.object);
    schema.modelSchema = modelSchema;

    function removePaths(obj) {
        let query = obj;
        let prototype = Object.getPrototypeOf(obj);
    
        if (prototype == Array.prototype) {
            query = obj[0];
        }
        if (prototype == Object.prototype || prototype == Array.prototype) {
            Object.keys(query).forEach(path => {
                if (path === 'trim' || path === 'validate') {
                    delete query[path];
                }
                else {
                    removePaths(query[path]);
                }
            });
        }
    
        return obj;
    }
}