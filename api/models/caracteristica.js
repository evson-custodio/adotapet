const messageValidator = require('./../plugins/messageValidator');
const validator = require('./../util/validator');

module.exports = (api) => {
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

    const schema = new Schema({
        grauBrincalhao: {
            type: Number,
            required: true,
            unique: false
        },
        grauEnergia: {
            type: Number,
            required: true,
            unique: false
        },
        grauAmizadeComAnimais: {
            type: Number,
            required: true,
            unique: false
        },
        grauAmizadoComCriancas: {
            type: Number,
            required: true,
            unique: false
        },
        grauAmizadeComDesconhecidos: {
            type: Number,
            required: true,
            unique: false
        },
        grauProtecao: {
            type: Number,
            required: true,
            unique: false
        },
        grauAgressividade: {
            type: Number,
            required: true,
            unique: false
        },
        grauFobiaAoRuido: {
            type: Number,
            required: true,
            unique: false
        }
    });

    schema.plugin(messageValidator);

    return Mongoose.model('Caracteristica', schema);
}