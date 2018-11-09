module.exports = (api) => {
    const Validator = api.util.validator;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        logradouro: {
            type: 'String',
            trim: true,
            maxlength: 64,
            required: true
        },
        numero: {
            type: 'String',
            trim: true,
            uppercase: true,
            maxlength: 6,
            default: 'S/N',
            validate: Validator.validate.isNumero
        },
        bairro: {
            type: 'String',
            trim: true,
            maxlength: 32,
            required: true
        },
        cidade: {
            type: 'String',
            trim: true,
            maxlength: 32,
            required: true
        },
        uf: {
            type: 'String',
            trim: true,
            uppercase: true,
            minlength: 2,
            maxlength: 2,
            required: true
        },
        pais: {
            type: 'String',
            trim: true,
            maxlength: 32,
            required: true
        },
        cep: {
            type: 'String',
            trim: true,
            default: 'Não Informado',
            validate: Validator.validate.isCEP
        },
        complemento: {
            type: 'String',
            trim: true,
            maxlength: 64
        }
    });

    return mongoose.model('Endereco', schema);
}