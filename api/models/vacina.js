module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        nome: {
            type: String,
            trim: true,
            maxlenght: 32,
            required: true
        },
        descricao: {
            type: String,
            trim: true,
            maxlenght: 256,
            required: true
        },
        data: {
            type: Date
        },
        aplicada: {
            type: Boolean,
            required: true
        }
    });

    return mongoose.model('Vacina', schema);
}