const messageValidator = require('./../plugins/messageValidator');
const validator = require('./../util/validator');

module.exports = (api) => {
    //const Mongoose = api.mongoose.Mongoose;
    //const Schema = api.mongoose.Mongoose.Schema;
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

    const schema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },
        abrigo: {
            type: 'ObjectId',
            ref: 'Abrigo'
        },
        usuario: {
            type: 'ObjectId',
            ref: 'Usuario'
        },
        endereco: {
            type: 'ObjectId',
            ref: 'Endereco'
        },
        nome: {
            type: String,
            trim: true,
            maxlenght: 64,
            required: true
        },
        telefone: {
            type: String,
            trim: true,
            required: true,
            validate: validator.validate.isTelefone
        }
    });

    schema.plugin(messageValidator);

    return Mongoose.model('Funcionario', schema);
}