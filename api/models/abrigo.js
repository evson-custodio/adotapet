const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const AbrigoSchema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },
        funcionarios: [
            {
                type: 'ObjectId',
                ref: 'Funcionario'
            }
        ],
        pets: [
            {
                type: 'ObjectId',
                ref: 'Pet'
            }
        ],
        nome: {
            type: String,
            required: [true, 'A propriedade "nome" é obrigatória!'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'A propriedade "email" é obrigatória!'],
            unique: true,
            validate: {
                validator: (v) => validator.isEmail(v),
                message: props => `${props.value} não é um "email" valido!`
            }
        },
        telefone: {
            type: String,
            required: [true, 'A propriedade "telefone" é obrigatória!'],
            unique: true,
            validate: {
                validator: (v) => {
                    return /\(\d{2}\)\d?\d{4}-\d{4}/.test(v);
                },
                message: props => `${props.value} não é um "telefone" valido!`
            }
        },
        cnpj: {
            type: String,
            required: [true, 'A propriedade "cnpj" é obrigatória!'],
            unique: true,
            // xx.xxx.xxx/xxxx-xx
            validate: {
                validator: (v) => {
                    return /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(v);
                },
                message: props => `${props.value} não é um "cnpj" valido!`
            }
        },
        descricao: {
            type: String
        },
        endereco: {
            type: 'ObjectId',
            ref: 'Endereco'
        },
        responsavel: {
            nome: {
                type: String,
                required: [true, 'A propriedade "responsavel.nome" é obrigatória!'],
            },
            email: {
                type: String,
                required: [true, 'A propriedade "responsavel.email" é obrigatória!'],
                validate: {
                    validator: (v) => validator.isEmail(v),
                    message: props => `${props.value} não é um "responsavel.email" valido!`
                }
            },
            telefone: {
                type: String,
                required: [true, 'A propriedade "responsavel.telefone" é obrigatória!'],
                validate: {
                    validator: (v) => {
                        return /\(\d{2}\)\d?\d{4}-\d{4}/.test(v);
                    },
                    message: props => `${props.value} não é um "responsavel.telefone" valido!`
                }
            }
        }
    });

    AbrigoSchema.plugin(uniqueValidator);

    return Mongoose.model('Abrigo', AbrigoSchema);
}