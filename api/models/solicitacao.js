module.exports = (api) => {
    const Validator = api.util.validator;

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
                enum: [
                    'Menos que R% 400,00',
                    'R$ 400,00 à 600,00',
                    'R$ 600,00 à 1.200,00',
                    'R$ 1.200,00 à 1.600,00',
                    'R$ 1.600,00 à 2.600,00',
                    'Mais de R$ 2.600,00',
                ],
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
            default: Date.now
        },
        status: {
            type: 'String',
            trim: true,
            enum: [
                'Pendente',
                'Avaliando',
                'Aceita',
                'Recusada'
            ],
            default: 'Pendente'
        },
        motivo: {
            type: 'String',
            trim: true,
            maxlength: 256
        }
    });

    return mongoose.model('Solicitacao', schema);
}