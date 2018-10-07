const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    // const Mongoose = require('mongoose');
    const Schema = api.mongoose.Mongoose.Schema;
    // const Schema = Mongoose.Schema;
    
    const PetSchema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },                
        abrigo: {
            type: 'ObjectId',
            ref: 'Abrigo',
            required: [true, 'A propriedade "abrigo" é obrigatória!']
        },
        nome: {
            type: String,
            required: [true, 'A propriedade "nome" é obrigatória!']
        },
        idade: {
            type: String,
            required: [true, 'A propriedade "idade" é obrigatória!']
        },
        especie: {
            type: String,
            required: [true, 'A propriedade "especie" é obrigatória!']
        },
        raca: {
            type: Boolean,
            required: [true, 'A propriedade "raca" é obrigatória!']
        },
        pelagem: {
            type: String,
            required: [true, 'A propriedade "pelagem" é obrigatória!']
        },
        peso: {
            type: String,
            required: [true, 'A propriedade "peso" é obrigatória!']
        },
        porte: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'A propriedade "porte" é obrigatória!'],
            validate: {
                validator: (v) => {
                    return /pequeno|médio|grande/.test(v);
                },
                message: props => `${props.value} não é um "porte" valido!`
            }
        },
        historia: {
            type: String,
            required: false
        },
        sexo: {
            type: Boolean,
            required: [true, 'A propriedade "sexo" é obrigatória!']
        },
        castrado: {
            type: Boolean,
            required: [true, 'A propriedade "castrado" é obrigatória!']
        },
        medicamentoEspecifico: {
            type: Boolean,
            required: [true, 'A propriedade "medicamentoEspecifico" é obrigatória!']
        },
        medicamentos: [
            {
                type: 'ObjectId',
                ref: 'Medicamento'
            }
        ],        
        alimentacaoEspecifica: {
            type: Boolean,
            required: [true, 'A propriedade "alimentacaoEspecifica" é obrigatória!']
        },
        alimentacoes: [
            {
                type: String,
            }
        ],
        disponivelAdocao: {
            type: Boolean,
            required: [true, 'A propriedade "disponivelAdocao" é obrigatória!']
        },
        deficienciaDoenca: {
            type: String,
            required: false,
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