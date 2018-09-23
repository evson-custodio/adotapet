module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    const SchemaTypes = api.mongoose.Mongoose.SchemaTypes;

    const PetSchema = new Schema({
        fotoPerfil: {
            type: SchemaTypes.ObjectId,
            ref: 'File'
        },                
        nome: {
            type: String,
            required: true,
            unique: false
        },
        idade: {
            type: float,
            required: true,
            unique: false
        },
        especie: {
            type: String,
            required = true,
            unique: false
        },
        raca: {
            type: String,
            required: false,
            unique: false
        },
        pelagem: {
            type: String,
            required: false,
            unique: false
        },
        peso: {
            type: String,
            required: true,
            unique: false
        },
        porte: {
            type: String,
            required: true,
            unique: false
        },
        historia: {
            type: String,
            required: false,
            unique: false
        },
        sexo: {
            type: boolean,
            required: true,
            unique: false
        },
        castrado: {
            type: boolean,
            required: true,
            unique: false
        },
        medicacaoEspecifica: {
            type: boolean,
            required: true,
            unique: false
        },
        alimentacaoEspecifica: {
            type: boolean,
            required: true,
            unique: false
        },
        alimentacoes: [
            {
                type: String,
                required: true,
                unique: false
            }
        ],
        disponivel: {
            type: boolean,
            required: true,
            unique: false
        },
        deficiencia: {
            type: String,
            required: false,
            unique: false
        }
    })
}