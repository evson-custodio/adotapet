module.exports = (api) => {
    const Validator = api.util.validator;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },
        abrigo: {
            type: 'ObjectId',
            ref: 'Abrigo'
        },
        usuario: {
            type: 'ObjectId',
            ref: 'Usuario'
        },
        endereco: {
            type: 'ObjectId',
            ref: 'Endereco'
        },
        nome: {
            type: String,
            trim: true,
            maxlenght: 64,
            required: true
        },
        telefone: {
            type: String,
            trim: true,
            required: true,
            validate: Validator.validate.isTelefone
        }
    });

    return mongoose.model('Funcionario', schema);
}