const uniqueValidator = require('mongoose-unique-validator');
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
        vacinacoes: [
            {
                type: 'ObjectId',
                ref: 'Vacina'
            }
        ],         
        medicamentosEspecificos: [
            {
                type: 'ObjectId',
                ref: 'Medicamento'
            }
        ],
        alimentacoesEspecificas: [
            {
                type: String,
                unique: false,
                required: false
            }
        ],
        deficienciasOuDoencas: [
            {
                type: String,
                unique: false,
                required: false
            }
        ],
        nome: {
            type: String,
            maxlenght: 16,
            required: true,
            unique: false
        },
        dataNascimento: {
            type: Date,
            required: true,
            unique: false
        },
        especie: {
            type: String,
            required: true,
            unique: false
        },
        raca: {
            type: String,
            required: true,
            unique: false
        },
        pelagem: {
            type: String,
            required: true,
            unique: false
        },
        peso: {
            type: Number,
            required: true,
            unique: false
        },
        porte: {
            type: String,
            required: true,
            unique: false
        },
        historia: {
            type: String,
            maxlenght: 512,
            required: false,
            unique: false
        },
        sexo: {
            type: Boolean,
            required: true,
            unique: false
        },
        castrado: {
            type: Boolean,
            required: true,
            unique: false
        },
        estado: {
            type: String,
            required: true,
            unique: false
        },
        caracteristicas: {
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
        }
    });

    schema.plugin(uniqueValidator);
    schema.plugin(messageValidator);

    return Mongoose.model('Pet', schema);
}