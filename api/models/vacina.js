module.exports = (api) => {
    const Validator = api.util.validator;
    
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        nome: {
            type: String,
            maxlenght: 32,
            required: true,
            unique: false
        },
        descricao: {
            type: String,
            maxlenght: 256,
            required: true,
            unique: false
        },
        data: {
            type: Date,
            required: false,
            unique: false
        },
        aplicada: {
            type: Boolean,
            required: false,
            unique: false
        }
    });

    return mongoose.model('Vacina', schema);
}