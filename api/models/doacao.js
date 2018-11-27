module.exports = (api) => {
    const Validator = api.util.validator;
    const Static = api.static.doacao;

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
            trim: true,
            enum: Static.status.values,
            default: Static.status.default
        },
        quantidade: {
            type: 'Number',
            min: 1,
            max: 1000,
            required: true
        },
        item: {
            type: 'String',
            trim: true,
            enum: Static.item.values,
            required: true
        }
    });

    return mongoose.model('Doacao', schema);
}