module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    const SchemaTypes = api.mongoose.Mongoose.SchemaTypes;

    const AbrigoSchema = new Schema({
        fotoPerfil: {
            type: SchemaTypes.ObjectId,
            ref: 'File'
        },
        usuários: [
            {
                type: SchemaTypes.ObjectId,
                ref: 'Usuário'
            }
        ],
        nome: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        telefone: {
            type: String,
            required: true,
            unique: true
        },
        descrição: {
            type: String
        },
        endereço: {
            longradouro: {
                type: String,
                required: true
            },
            número: {
                type: String,
                default: 's/n'
            },
            bairro: {
                type: String,
                required: true
            },
            cidade: {
                type: String,
                required: true
            },
            uf: {
                type: String,
                required: true
            },
            país: {
                type: String,
                required: true
            },
            complemento: {
                type: String
            }
        },
        responsável: {
            nome: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            telefone: {
                type: String,
                required: true,
                unique: true
            }
        }
    });

    return Mongoose.model('Abrigo', AbrigoSchema);
}