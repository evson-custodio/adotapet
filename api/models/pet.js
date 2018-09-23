module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    const SchemaTypes = api.mongoose.Mongoose.SchemaTypes;

    const Medicamento = api.models.medicamento;
    const Vacina = api.models.vacina;
    const Caracteristica = api.models.caracteristica;

    const PetSchema = new Schema({
        foto: {
            type: SchemaTypes.ObjectId,
            ref: 'File'
        },                
        nome: {
            type: String,
            required: true,
            unique: false
        },
        idade: {
            type: String,
            required: true,
            unique: false
        },
        especie: {
            type: String,
            required: true,
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
            type: Boolean,
            required: true,
            unique: false
        },
        castrado: {
            type: Boolean,
            required: true,
            unique: false
        },
        medicamentoEspecifico: {
            type: Boolean,
            required: true,
            unique: false   
        },        
        alimentacaoEspecifica: {
            type: Boolean,
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
        disponivelAdocao: {
            type: Boolean,
            required: true,
            unique: false
        },
        deficienciaDoenca: {
            type: String,
            required: false,
            unique: false
        }
    })
}