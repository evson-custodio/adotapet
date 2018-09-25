const uniqueValidator = require('mongoose-unique-validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    
    const PetSchema = new Schema({
        foto: {
            type: 'ObjectId',
            ref: 'File'
        },                
        nome: {
            type: String,
            required: true,
            unique: false
        },
        idade: {
            type: String,
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
            required: false,
            unique: false
        },
        pelagem: {
            type: String,
            required: false,
            unique: false
        },
        peso: {
            type: String,
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
        medicamentoEspecifico: {
            type: Boolean,
            required: true,
            unique: false   
        },
        medicamentos: [
            {
                type: 'ObjectId',
                ref: 'Medicamento'
            }
        ],        
        alimentacaoEspecifica: {
            type: Boolean,
            required: true,
            unique: false
        },
        alimentacoes: [
            {
                type: String,
                required: true,
                unique: false
            }
        ],
        disponivelAdocao: {
            type: Boolean,
            required: true,
            unique: false
        },
        deficienciaDoenca: {
            type: String,
            required: false,
            unique: false
        },
        vacinacao: [
            {
                type: 'ObjectId',
                ref: 'Vacina'
            }
        ],
        caracteristica: {
            type: 'ObjectId',
            ref: 'Caracteristica'
        }
    });

    PetSchema.plugin(uniqueValidator);

    return Mongoose.model('Pet', PetSchema);
}