const uniqueValidator = require('mongoose-unique-validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const VacinaSchema = new Schema({
        nome: {
            type: String,
            required: true,
            unique: false
        },
        descricao: {
            type: String,
            required: true,
            unique: false
        },
        data: {
            type: String,
            required: false,
            unique: false
        },
        aplicada: {
            type: Boolean,
            required: true,
            unique: false
        }
    });

    VacinaSchema.plugin(uniqueValidator);

    return Mongoose.model('Vacina', VacinaSchema);
}