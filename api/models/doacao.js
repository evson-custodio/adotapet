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
            ref: 'Visitante'
        },
        status: {
            type: 'String',
            trim: true,
            enum: Static.status,
            default: Static.default.status
        },
        quantidade: {
            type: 'Number',
            min: 1,
            max: 1000,
            required: true
        },
        item: {
            nome: {
                type: 'String',
                trim: true,
                enum: Static.item.map(value => value.nome),
                required: true
            },
            categoria: {
                type: 'String',
                trim: true,
                enum: Static.item.map(value => value.categoria).filter((value, index, array) => array.indexOf(value) == index),
                required: true
            }
        },
        descricao: {
            type: 'String',
            trim: true,
            maxlength: 256
        }
    });

    return mongoose.model('Doacao', schema);
}