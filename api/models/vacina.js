module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    const SchemaTypes = api.mongoose.Mongoose.SchemaTypes;

    const Vacina = new Schema({
        nome: {
            type: String,
            required: true,
            unique: false
        },
        descricao: {
            type: String,
            required: true,
            unique: false
        },
        data: {
            type: String,
            required: true,
            unique: false
        },
        aplicada: {
            type: Boolean,
            required: true,
            unique: false
        }
    })
}