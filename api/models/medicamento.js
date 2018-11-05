module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        usoContinuo: {
            type: Boolean,
            required: true
        },
        nome: {
            type: String,
            trim: true,
            maxlenght: 64,
            required: true
        },
        apresentacao: {
            type: String,
            trim: true,
            required: true
        },
        dosagem: {
            type: String,
            trim: true,
            maxlenght: 64,
            required: true
        }
    });

    return mongoose.model('Medicamento', schema);
}