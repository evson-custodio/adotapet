const validator = require('./../api/util/validator');

const testes = [
    'evson.custodio',
    'evsoncustodiooli@gmail.com',
    'evson custodio',
    'évson_custódio',
    '123Minha1_senha123'
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

// Object.keys(validator.regex).forEach(name => console.log(validator.regex[name].source));