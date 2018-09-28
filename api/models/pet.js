const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    // const Mongoose = require('mongoose');
    const Schema = api.mongoose.Mongoose.Schema;
    // const Schema = Mongoose.Schema;
    
    const PetSchema = new Schema({
        foto: {
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
            required: [true, 'A propriedade "nome" é obrigatória!'],
            unique: false
        },
        idade: {
            type: String,
            required: [true, 'A propriedade "idade" é obrigatória!'],
            unique: false
        },
        especie: {
            type: String,
            required: [true, 'A propriedade "especie" é obrigatória!'],
            unique: false
        },
        raca: {
            type: Boolean,
            required: [true, 'A propriedade "raca" é obrigatória!'],
            unique: false
        },
        pelagem: {
            type: String,
            required: [true, 'A propriedade "pelagem" é obrigatória!'],
            unique: false
        },
        peso: {
            type: String,
            required: [true, 'A propriedade "peso" é obrigatória!'],
            unique: false
        },
        porte: {
            type: String,
            required: [true, 'A propriedade "porte" é obrigatória!'],
            unique: false,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v) => {
                    return /pequeno|médio|grande/.test(v);
                },
                message: props => `${props.value} não é um "porte" valido!`
            }
        },
        historia: {
            type: String,
            required: false,
            unique: false
        },
        sexo: {
            type: Boolean,
            required: [true, 'A propriedade "sexo" é obrigatória!'],
            unique: false
        },
        castrado: {
            type: Boolean,
            required: [true, 'A propriedade "castrado" é obrigatória!'],
            unique: false
        },
        medicamentoEspecifico: {
            type: Boolean,
            required: [true, 'A propriedade "medicamentoEspecifico" é obrigatória!'],
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
            required: [true, 'A propriedade "alimentacaoEspecifica" é obrigatória!'],
            unique: false
        },
        alimentacoes: [
            {
                type: String,
                unique: false
            }
        ],
        disponivelAdocao: {
            type: Boolean,
            required: [true, 'A propriedade "disponivelAdocao" é obrigatória!'],
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