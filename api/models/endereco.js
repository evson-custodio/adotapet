const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const EnderecoSchema = new Schema({
        logradouro: {
            type: String,
            required: [true, 'A propriedade "logradouro" é obrigatória!']
        },
        numero: {
            type: String,
            default: 's/n'
        },
        bairro: {
            type: String,
            required: [true, 'A propriedade "bairro" é obrigatória!']
        },
        cidade: {
            type: String,
            required: [true, 'A propriedade "cidade" é obrigatória!']
        },
        uf: {
            type: String,
            required: [true, 'A propriedade "uf" é obrigatória!']
        },
        pais: {
            type: String,
            required: [true, 'A propriedade "pais" é obrigatória!']
        },
        cep: {
            type: String,
            default: 'Não Informado',
            validate: {
                validator: (v) => {
                    return /\d{2}\.\d{3}-\d{3}/.test(v);
                },
                message: props => `${props.value} não é um "cep" valido!`
            }
        },
        complemento: {
            type: String
        }
    });

    EnderecoSchema.plugin(uniqueValidator);

    return Mongoose.model('Endereco', EnderecoSchema);
}