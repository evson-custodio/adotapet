module.exports = (api) => {
    const Validator = api.util.validator;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        abrigo: {
            type: 'ObjectId',
            ref: 'Abrigo',
            required: true
        },
        doador: {
            type: 'ObjectId',
            ref: 'Visitante',
            required: true
        },
        status: {
            type: 'String',
            enum: [
                'Aguardando',
                'Finalizada',
                'Cancelada'
            ],
            default: 'Aguardando'
        },
        quantidade: {
            type: 'Number',
            min: 1,
            max: 1000
        }
    });

    return mongoose.model('Doacao', schema);
}