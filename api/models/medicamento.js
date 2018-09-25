const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const MedicamentoSchema = new Schema({
        usoContinuo: {
            type: Boolean,
            required: [true, 'A propriedade "usoContinuo" é obrigatória!'],
            unique: false
        },
        nome: {
            type: String,
            required: [true, 'A propriedade "nome" é obrigatória!'],
            unique: true
        },
        apresentacao: {
            type: String,
            required: [true, 'A propriedade "apresentacao" é obrigatória!'],
            unique: false
        },
        dosagem: {
            type: String,
            required: [true, 'A propriedade "dosagem" é obrigatória!'],
            unique: false
        }
    });

    MedicamentoSchema.plugin(uniqueValidator);

    return Mongoose.model('Medicamento', MedicamentoSchema);
}