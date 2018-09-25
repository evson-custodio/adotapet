const uniqueValidator = require('mongoose-unique-validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const UsuarioSchema = new Schema({
        nome: {
            type: String,
            required: [true, 'A propriedade "nome" é obrigatória!'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'A propriedade "email" é obrigatória!'],
        },
        username: {
            type: String,
            unique: true,
            required: [true, 'A propriedade "username" é obrigatória!'],
        },
        password: {
            type: String,
            required: [true, 'A propriedade "password" é obrigatória!'],
        }
    });

    UsuarioSchema.plugin(uniqueValidator);

    return Mongoose.model('Usuario', UsuarioSchema);
}