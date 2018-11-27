module.exports = (api) => {
    const Validator = api.util.validator;
    
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        fotoPerfil: {
            type: 'ObjectId',
            ref: 'File'
        },
        endereco: {
            type: 'ObjectId',
            ref: 'Endereco'
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
        solicitacoes: [
            {
                type: 'ObjectId',
                ref: 'Solicitacao'
            }
        ],
        doacoes: [
            {
                type: 'ObjectId',
                ref: 'Doacao'
            }
        ],
        nome: {
            type: 'String',
            trim: true,
            maxlength: 64,
            required: true,
            unique: true
        },
        email: {
            type: 'String',
            trim: true,
            maxlength: 64,
            required: true,
            unique: true,
            validate: Validator.validate.isEmail
        },
        telefone: {
            type: 'String',
            trim: true,
            required: true, 
            unique: true,
            validate: Validator.validate.isTelefone
        },
        cnpj: {
            type: 'String',
            trim: true,
            required: true, 
            unique: true,
            validate: Validator.validate.isCNPJ
        },
        historia: {
            type: 'String',
            trim: true,
            maxlength: 512,
        },
        responsavel: {
            nome: {
                type: 'String',
                trim: true,
                maxlength: 64,
                required: true
            },
            email: {
                type: 'String',
                trim: true,
                maxlength: 64,
                required: true,
                validate: Validator.validate.isEmail
            },
            telefone: {
                type: 'String',
                trim: true,
                required: true,
                validate: Validator.validate.isTelefone
            }
        }
    });

    return mongoose.model('Abrigo', schema);
}