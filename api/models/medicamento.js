module.exports = (api) => {
    const Validator = api.util.validator;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        usoContinuo: {
            type: Boolean,
            required: true,
            unique: false
        },
        nome: {
            type: String,
            trim: true,
            maxlenght: 64,
            required: true,
            unique: false,            
        },
        apresentacao: {
            type: String,
            trim: true,
            required: true, 
            unique: false
        },
        dosagem: {
            type: String,
            trim: true,
            maxlenght: 64,
            required: true,
            unique: false
        }
    });

    return mongoose.model('Medicamento', schema);
}