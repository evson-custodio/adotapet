const uniqueValidator = require('mongoose-unique-validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const AbrigoSchema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },
        usuarios: [
            {
                type: 'ObjectId',
                ref: 'Usuario'
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
            unique: true
        },
        telefone: {
            type: String,
            required: [true, 'A propriedade "telefone" é obrigatória!'],
            unique: true
        },
        cnpj: {
            type: String,
            required: [true, 'A propriedade "cnpj" é obrigatória!'],
            unique: true
        },
        descricao: {
            type: String
        },
        endereco: {
            logradouro: {
                type: String,
                required: [true, 'A propriedade "endereco.logradouro" é obrigatória!']
            },
            numero: {
                type: String,
                default: 's/n'
            },
            bairro: {
                type: String,
                required: [true, 'A propriedade "endereco.bairro" é obrigatória!']
            },
            cidade: {
                type: String,
                required: [true, 'A propriedade "endereco.cidade" é obrigatória!']
            },
            uf: {
                type: String,
                required: [true, 'A propriedade "endereco.uf" é obrigatória!']
            },
            pais: {
                type: String,
                required: [true, 'A propriedade "endereco.pais" é obrigatória!']
            },
            complemento: {
                type: String
            }
        },
        responsavel: {
            nome: {
                type: String,
                required: [true, 'A propriedade "responsavel.nome" é obrigatória!'],
            },
            email: {
                type: String,
                required: [true, 'A propriedade "responsavel.email" é obrigatória!'],
                unique: true
            },
            telefone: {
                type: String,
                required: [true, 'A propriedade "responsavel.telefone" é obrigatória!'],
                unique: true
            }
        }
    });

    AbrigoSchema.plugin(uniqueValidator);

    return Mongoose.model('Abrigo', AbrigoSchema);
}