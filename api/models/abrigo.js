module.exports = (api) => {
    const Validator = api.util.validator;
    
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },
        funcionarios: [
            {
                type: 'ObjectId',
                ref: 'Funcionario'
            }
        ],
        pets: [
            {
                type: 'ObjectId',
                ref: 'Pet'
            }
        ],
        nome: {
            type: String,
            required: true,
            maxlenght: 16,
            unique: true
        },
        email: {
            type: String,
            required: true,
            maxlenght: 64,
            unique: true,
            validate: Validator.validate.isEmail
        },
        telefone: {
            type: String,
            required: true, 
            unique: true,
            validate: Validator.validate.isTelefone
        },
        cnpj: {
            type: String,
            required: true, 
            unique: true
        },
        historia: {
            type: String,
            required: false,
            maxlenght: 512,
            unique: false
        },
        endereco: {
            type: 'ObjectId',
            ref: 'Endereco'
        },
        responsavel: {
            nome: {
                type: String,
                required: true,
                unique: false,
                maxlenght: 64
            },
            email: {
                type: String,
                required: true,
                maxlenght: 64,
                unique: false,
                validate: Validator.validate.isEmail
            },
            telefone: {
                type: String,
                required: true,
                unique: false,                
                validate: Validator.validate.isTelefone
            }
        }
    });

    return mongoose.model('Abrigo', schema);
}