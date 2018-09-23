module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;
    const SchemaTypes = api.mongoose.Mongoose.SchemaTypes;

    const Caracteristica = new Schema({
        pergunta: {
            type: String,
            required: true,
            unique: false
        },
        resposta: {
            type: String,
            required: true,
            unique: false
        }
    })
}