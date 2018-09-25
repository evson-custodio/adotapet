const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const VacinaSchema = new Schema({
        nome: {
            type: String,
            required: [true, 'A propriedade "nome" é obrigatória!'],
            unique: false
        },
        descricao: {
            type: String,
            required: [true, 'A propriedade "descricao" é obrigatória!'],
            unique: false
        },
        data: {
            type: String,
            required: false,
            unique: false
        },
        aplicada: {
            type: Boolean,
            required: [true, 'A propriedade "aplicada" é obrigatória!'],
            unique: false
        }
    });

    VacinaSchema.plugin(uniqueValidator);

    return Mongoose.model('Vacina', VacinaSchema);
}