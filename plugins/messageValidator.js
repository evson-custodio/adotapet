module.exports = (schema, options) => {
    schema.eachPath((path, type) => {
        let minlength = type.validators.find(value => value.type == 'minlength');
        let maxlength = type.validators.find(value => value.type == 'maxlength');
        let required = type.validators.find(value => value.type == 'required');
        let unique = type.validators.find(value => value.type == 'unique');

        if (minlength != null && maxlength != null) {
            let message = null;
            if (minlength.minlength == maxlength.maxlength) {
                message = `A propriedade '${path}' deve possuir exatamente ${minlength.minlength} caracteres!`;
            }
            else {
                message = `A propriedade '${path}' deve possuir entre ${minlength.minlength} e ${maxlength.maxlength} caracteres!`;
            }
            minlength.message = message;
            maxlength.message = message;
        }
        else if (minlength != null) {
            let message = `A propriedade '${path}' deve possuir no mínimo ${minlength.minlength} caracteres!`;
            minlength.message = message;
        }
        else if (maxlength != null) {
            let message = `A propriedade '${path}' deve possuir no mínimo ${maxlength.maxlength} caracteres!`;
            maxlength.message = message;
        }

        if (required != null) {
            let message = `A propriedade '${path}' é obrigatória!`;
            required.message = message;
        }

        if (unique != null) {
            let message = `A propriedade '${path}' deve ser única!`;
            unique.message = message;
        }
    });

    schema.pluginNames = schema.pluginNames || [];
    schema.pluginNames.push('messageValidator');
}