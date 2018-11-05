module.exports = (api) => {
    const Validator = api.util.validator;
    
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;
    
    const schema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },   
        vacinacoes: [
            {
                type: 'ObjectId',
                ref: 'Vacina'
            }
        ],         
        medicamentosEspecificos: [
            {
                type: 'ObjectId',
                ref: 'Medicamento'
            }
        ],
        alimentacoesEspecificas: [
            {
                type: String,
                trim: true
            }
        ],
        deficienciasOuDoencas: [
            {
                type: String,
                trim: true
            }
        ],
        nome: {
            type: String,
            trim: true,
            maxlenght: 16,
            required: true
        },
        dataNascimento: {
            type: Date,
            required: true
        },
        especie: {
            type: String,
            trim: true,
            required: true
        },
        raca: {
            type: String,
            trim: true,
            required: true
        },
        pelagem: {
            type: String,
            trim: true,
            required: true
        },
        peso: {
            type: Number,
            required: true
        },
        porte: {
            type: String,
            trim: true,
            required: true
        },
        historia: {
            type: String,
            trim: true,
            maxlenght: 512
        },
        sexo: {
            type: Boolean,
            required: true
        },
        castrado: {
            type: Boolean,
            required: true
        },
        estado: {
            type: String,
            trim: true,
            required: true
        },
        caracteristicas: {
            grauBrincalhao: {
                type: Number,
                required: true
            },
            grauEnergia: {
                type: Number,
                required: true
            },
            grauAmizadeComAnimais: {
                type: Number,
                required: true
            },
            grauAmizadoComCriancas: {
                type: Number,
                required: true
            },
            grauAmizadeComDesconhecidos: {
                type: Number,
                required: true
            },
            grauProtecao: {
                type: Number,
                required: true
            },
            grauAgressividade: {
                type: Number,
                required: true
            },
            grauFobiaAoRuido: {
                type: Number,
                required: true
            }
        }
    });

    return mongoose.model('Pet', schema);
}