const validator = require('./../api/util/validator');

const testes = [
    // 'evson.custodio',
    // 'evsoncustodiooli@gmail.com',
    // 'evson custodio',
    // 'évson_custódio',
    // '123Minha1_senha123',
    // '27998547031',
    // '27 998547031',
    // '(27)998547031',
    // '(27) 998547031',
    // '(27) 99854-7031',
    // '(27) 9854-7031'
    '11.222.333/4444-22',
    '22.333.333/4444-22'
]

function printRegEx(name) {
    console.log(`\n<< ${name} >>`);
    testes.forEach(value => console.log(`${value}: ${validator.regex[name].test(value)} - Match: ${value.match(validator.regex[name])}`));
}

function printValidate(name) {
    console.log(`\n<< ${name} >>`);
    testes.forEach(value => console.log(`${value}: ${validator.validate[name].validator(value)}`));
}

Object.keys(validator.regex).forEach(name => printRegEx(name));
Object.keys(validator.validate).forEach(name => printValidate(name));

// let reg = new RegExp('^[a-z]{2}[0-9]{2}$');

// let myUsername = 'MeuUsername';
// let myUsername2 = 'Username2Meu';
// let error = '123Invalido';

// console.log(myUsername.match(validator.regex.username));
// console.log(myUsername2.match(validator.regex.username));
// console.log(error.match(validator.regex.username));

// console.log(validator.regex.username.test(myUsername2));
// console.log(validator.regex.username.test(myUsername));
// console.log(validator.regex.username.test(error));

// let a = 'ab12';
// let b = 'cd34';

// console.log(a.match(reg));
// console.log(b.match(reg));

// console.log(reg.test(a));
// console.log(reg.test(b));

// Object.keys(validator.regex).forEach(name => console.log(validator.regex[name].source));