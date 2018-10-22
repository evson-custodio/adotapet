const messageValidator = require('./../plugins/messageValidator');
const validator = require('./../util/validator');

module.exports = (api) => {
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

    const schema = new Schema({
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
            required: true,
            maxlenght: 16,
            unique: true
        },
        email: {
            type: String,
            required: true,
            maxlenght: 64,
            unique: true,
            validate: validator.validate.isEmail
        },
        telefone: {
            type: String,
            required: true, 
            unique: true,
            validate: validator.validate.isTelefone
        },
        cnpj: {
            type: String,
            required: true, 
            unique: true
        },
        historia: {
            type: String,
            required: false,
            maxlenght: 512,
            unique: false
        },
        endereco: {
            type: 'ObjectId',
            ref: 'Endereco'
        },
        responsavel: {
            nome: {
                type: String,
                required: true,
                unique: false,
                maxlenght: 64
            },
            email: {
                type: String,
                required: true,
                maxlenght: 64,
                unique: false,
                validate: validator.validate.isEmail
            },
            telefone: {
                type: String,
                required: true,
                unique: false,                
                validate: validator.validate.isTelefone
            }
        }
    });

    schema.plugin(uniqueValidator);
    schema.plugin(messageValidator);

    return Mongoose.model('Abrigo', schema);
}