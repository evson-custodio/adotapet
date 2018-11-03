module.exports = (api) => {
    const Validator = api.util.validator;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        adotante: {
            type: 'ObjectId',
            ref: 'Visitante'
        },
        pet: {
            type: 'ObjectId',
            ref: 'Pet'
        },
        questionario: {
            
        },
        data: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: 'Em Espera'
        },
        motivo: {
            type: String,
            trim: true,
            maxlength: 256
        }
    });

    return mongoose.model('Solicitacao', schema);
}