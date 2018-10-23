const validator = require('validator');

module.exports = new function() {
    this.caracteres = {
        space: ' ',
        point: '.',
        underscore: '_',
        symbols: '!@#$%&',
        digits: '0-9',
        lowercase: 'a-zç',
        uppercase: 'A-ZÇ',
        lowercaseAccented: 'áéíóúâêîôûàèìòùäëïöüãõ',
        uppercaseAccented: 'ÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÃÕ'
    },
    this.message = {
        notValid: prop => `O valor "${prop.value}" não é um "${prop.path}" válido!`
    },
    this.regex = {
        lowercase: new RegExp('['
            + this.caracteres.lowercase + ''
            + this.caracteres.lowercaseAccented +
        ']+', 'g'),
        uppercase: new RegExp('['
            + this.caracteres.uppercase + ''
            + this.caracteres.uppercaseAccented +
        ']+', 'g'),
        digits: new RegExp('['
            + this.caracteres.digits + 
        ']+', 'g'),
        username: new RegExp('^['
            + this.caracteres.lowercase + ''
            + this.caracteres.lowercaseAccented + ''
            + this.caracteres.uppercase + ''
            + this.caracteres.uppercaseAccented +
        ']['
            + this.caracteres.lowercase + ''
            + this.caracteres.lowercaseAccented + ''
            + this.caracteres.uppercase + ''
            + this.caracteres.uppercaseAccented + ''
            + this.caracteres.digits + ''
            + this.caracteres.underscore + ''
            + this.caracteres.point +
        ']*$', 'g'),
        password: new RegExp('^['
            + this.caracteres.lowercase + ''
            + this.caracteres.lowercaseAccented + ''
            + this.caracteres.uppercase + ''
            + this.caracteres.uppercaseAccented + ''
            + this.caracteres.digits + ''
            + this.caracteres.symbols + ''
            + this.caracteres.underscore + ''
            + this.caracteres.point +
        ']*$', 'g'),
        cep: new RegExp('^['
            + this.caracteres.digits + ']{2}\\'
            + this.caracteres.point + '['
            + this.caracteres.digits + ']{3}-['
            + this.caracteres.digits + ']{3}'
        , 'g'),
        telefone: new RegExp('^['
            + this.caracteres.digits + ']{2}['
            + this.caracteres.digits + ']?['
            + this.caracteres.digits + ']{4}-['
            + this.caracteres.digits + ']{4}'
        , 'g')
    },
    this.validate = {
        isEmail: {
            validator: validator.isEmail,
            message: this.message.notValid
        },
        isUsername: {
            validator: value => this.regex.username.test(value),
            message: this.message.notValid
        },
        isPassword: {
            validator: value => value.match(this.regex.lowercase) != null &&
                                value.match(this.regex.uppercase) != null &&
                                value.match(this.regex.digits) != null &&
                                this.regex.password.test(value),
            message: this.message.notValid
        },
        isNumero: {
            validator: value => value === 'S/N' || this.regex.digits.test(value),
            message: this.message.notValid
        },
        isCEP: {
            validator: value => value === 'Não Informado' || this.regex.cep.test(value),
            message: this.message.notValid
        },
        isTelefone: {
            validator: value => this.regex.telefone.test(value),
            message: this.message.notValid
        }
    }
}