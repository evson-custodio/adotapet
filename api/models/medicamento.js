const messageValidator = require('./../plugins/messageValidator');
const validator = require('./../util/validator');

module.exports = (api) => {
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

    const schema = new Schema({
        usoContinuo: {
            type: Boolean,
            required: true,
            unique: false
        },
        nome: {
            type: String,
            trim: true,
            maxlenght: 64,
            required: true,
            unique: false,            
        },
        apresentacao: {
            type: String,
            trim: true,
            required: true, 
            unique: false
        },
        dosagem: {
            type: String,
            trim: true,
            maxlenght: 64,
            required: true,
            unique: false
        }
    });

    schema.plugin(messageValidator);

    return Mongoose.model('Medicamento', schema);
}