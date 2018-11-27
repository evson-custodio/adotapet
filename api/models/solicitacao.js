module.exports = (api) => {
    const Validator = api.util.validator;
    const Static = api.static.solicitacao;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        adotante: {
            type: 'ObjectId',
            ref: 'Visitante',
            required: true
        },
        pet: {
            type: 'ObjectId',
            ref: 'Pet',
            required: true
        },
        questionario: {
            faixaSalarial: {
                type: 'String',
                trim: true,
                enum: Static.questionario.faixaSalarial,
                required: true
            },
            teveAnimais: {
                type: 'Boolean',
                required: true
            },
            temAnimais: {
                type: 'Boolean',
                required: true
            },
            temCriancas: {
                type: 'Boolean',
                required: true
            },
            viajaFrequentemente: {
                type: 'Boolean',
                required: true
            },
            resideEm: {
                type: 'Boolean',
                required: true
            },
            redeProtecao: {
                type: 'Boolean',
                required: true
            },
            razao: {
                type: 'String',
                trim: true,
                required: true
            },
            rotina: {
                type: 'String',
                trim: true,
                required: true
            }
        },
        data: {
            type: 'Date',
            default: Static.default.data
        },
        status: {
            type: 'String',
            trim: true,
            enum: Static.status,
            default: Static.default.status
        },
        motivo: {
            type: 'String',
            trim: true,
            maxlength: 256
        }
    });

    return mongoose.model('Solicitacao', schema);
}