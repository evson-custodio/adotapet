module.exports = (api) => {
    const Validator = api.util.validator;

    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },
        usuario: {
            type: 'ObjectId',
            ref: 'Usuario',
            required: true,
            unique: true
        },
        endereco: {
            type: 'ObjectId',
            ref: 'Endereco'
        },
        solicitacoes: [
            {
                type: 'ObjectId',
                ref: 'Solicitacao'
            }
        ],
        nome: {
            type: 'String',
            trim: true,
            maxlength: 64,
            required: true
        },
        dataNascimento: {
            type: 'Date'
        }
    });

    return mongoose.model('Visitante', schema);
}