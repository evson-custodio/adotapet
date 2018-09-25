const uniqueValidator = require('mongoose-unique-validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const MedicamentoSchema = new Schema({
        usoContinuo: {
            type: Boolean,
            required: true,
            unique: false
        },
        nome: {
            type: String,
            required: true,
            unique: true
        },
        apresentacao: {
            type: String,
            required: true,
            unique: false
        },
        dosagem: {
            type: String,
            required: true,
            unique: false
        }
    });

    MedicamentoSchema.plugin(uniqueValidator);

    return Mongoose.model('Medicamento', MedicamentoSchema);
}