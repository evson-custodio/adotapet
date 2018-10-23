const uniqueValidator = require('mongoose-unique-validator');
const messageValidator = require('./../plugins/messageValidator');
const validator = require('./../util/validator');

module.exports = (api) => {
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

    const schema = new Schema({
        nome: {
            type: String,
            maxlenght: 32,
            required: true,
            unique: false
        },
        descricao: {
            type: String,
            maxlenght: 256,
            required: true,
            unique: false
        },
        data: {
            type: Date,
            required: false,
            unique: false
        },
        aplicada: {
            type: Boolean,
            required: false,
            unique: false
        }
    });

    schema.plugin(messageValidator);    

    return Mongoose.model('Vacina', schema);
}