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
            rendaMensal: {
                type: Number,
                required: true
            },
            teveAnimais: {
                type: Boolean,
                required: true
            },
            temAnimais: {
                type: Boolean,
                required: true
            },
            temCriancas: {
                type: Boolean,
                required: true
            },
            viajaFrequentemente: {
                type: Boolean,
                required: true
            },
            resideEm: {
                type: Boolean,
                required: true
            },
            redeProtecao: {
                type: Boolean,
                required: true
            },
            razao: {
                type: String,
                trim: true,
                required: true
            },
            rotina: {
                type: String,
                trim: true,
                required: true
            }
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