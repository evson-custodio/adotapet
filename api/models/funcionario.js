const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

module.exports = (api) => {
    const Mongoose = api.mongoose.Mongoose;
    const Schema = api.mongoose.Mongoose.Schema;

    const FuncionarioSchema = new Schema({
        usuario: {
            type: 'ObjectId',
            ref: 'Usuario'
        },
        nome: {
            type: String,
            required: [true, 'A propriedade "nome" é obrigatória!']
        }
    });

    FuncionarioSchema.plugin(uniqueValidator);

    return Mongoose.model('Funcionario', FuncionarioSchema);
}