module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    const SchemaTypes = api.mongoose.Mongoose.SchemaTypes;

    const VacinaSchema = new Schema({
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
    });

    return Mongoose.model('Vacina', VacinaSchema);
}