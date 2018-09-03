module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    const SchemaTypes = api.mongoose.Mongoose.SchemaTypes;

    const AbrigoSchema = new Schema({
        fotoPerfil: {
            type: SchemaTypes.ObjectId,
            ref: 'File'
        },
        usuarios: [
            {
                type: SchemaTypes.ObjectId,
                ref: 'Usuario'
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
        descricao: {
            type: String
        },
        endereco: {
            logradouro: {
                type: String,
                required: true
            },
            numero: {
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
            pais: {
                type: String,
                required: true
            },
            complemento: {
                type: String
            }
        },
        responsavel: {
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