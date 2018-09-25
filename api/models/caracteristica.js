const uniqueValidator = require('mongoose-unique-validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const CaracteristicaSchema = new Schema({
        pergunta: {
            type: String,
            required: [true, 'A propriedade "pergunta" é obrigatória!'],
            unique: false
        },
        resposta: {
            type: String,
            required: [true, 'A propriedade "resposta" é obrigatória!'],
            unique: false
        }
    });

    // CaracteristicaSchema.plugin(uniqueValidator);

    return Mongoose.model('Caracteristica', CaracteristicaSchema);
}