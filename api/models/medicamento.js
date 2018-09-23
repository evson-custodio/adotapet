module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    const SchemaTypes = api.mongoose.Mongoose.SchemaTypes;

    const MedicamentoSchema = new Schema({
        usoContinuo: {
            type: Boolean,
            required: true,
            unique: false
        },
        nome: {
            type: String,
            required: true,
            unique: true
        },
        apresentacao: {
            type: String,
            required: true,
            unique: false
        },
        dosagem: {
            type: String,
            required: true,
            unique: false
        }
    });

    return Mongoose.model('Medicamento', MedicamentoSchema);
}