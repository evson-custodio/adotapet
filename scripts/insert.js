require('../config/mongoose')
.connect(require('../config/env')['development'])
.then(mongoose => {
    const Usuario = require('../api/models/usuario')({});
    // const Endereco = require('../api/models/endereco')({});

    let usuarios = [
        {
            email: 'email@valido.com',
            username: 'MeuUsername',
            password: 'Minha_senha123'
        },
        {
            email: 'meuemail@valido.com',
            username: 'MeuUsernameDenovo',
            password: 'Minha_senha123'
        }
    ]

    // let funcionarios = [
    //     {
            
    //     }
    // ]

    let enderecos = [
        {
            logradouro: 'Rua Olímpio Correa de Miranda',
            numero: '32',
            bairro: 'Centro',
            cidade: 'Vila Velha',
            uf: 'ES',
            pais: 'Brasil',
            cep: '29.103-880',
            complemento: 'Não sei onde estou!'
        },
        {
            logradouro: 'Rua 2',
            bairro: 'Centro',
            cidade: 'Vila Velha',
            uf: 'es',
            pais: 'Brasil',
            cep: '29.103.880',
        },
        {
            logradouro: 'Rua 3',
            bairro: 'Centro',
            cidade: 'Vila Velha',
            uf: 'es',
            pais: 'Brasil',
            cep: '29.103-88'
        },
        {
            logradouro: 'Rua 4',
            bairro: 'Centro',
            cidade: 'Vila Velha',
            uf: 'es',
            pais: 'Brasil'
        },
        {
            logradouro: 'Rua 5',
            bairro: 'Centro',
            cidade: 'Vila Velha',
            uf: 'e',
            pais: 'Brasil'
        }
    ]

    // process.exit(0);

    createMany(Usuario, usuarios, true)
    .then(results => {
        console.log(results);
        process.exit(0);
    })
    .catch(errors => {
        console.log(errors);
        process.exit(1);
    });
})
.catch(error => {
    console.log(error);
    process.exit(2);
});

function createMany(Model, docs, all) {
    return new Promise(async (resolve, reject) => {
        let results = [];
        let errors = [];

        for (let i = 0; i < docs.length; i++) {
            await Model.create(docs[i])
            .then(doc => {
                results.push(doc);
            })
            .catch(error => {
                errors.push(error);
            });
        }

        errors = formatErrors(errors);

        if (all) {
            resolve({
                results: results,
                errors: errors
            });
        }
        else if (errors.length > 0) {
            reject(errors);
        }
        else {
            resolve(results);
        }
    });
}

function formatErrors(errors) {
    let e = [];
    errors.forEach(error => {
        let err = {
            name: error.name,
            message: error.message,
            errors: []
        }
        Object.keys(error.errors).forEach(key => {
            err.errors.push({
                name: error.errors[key].name,
                message: error.errors[key].message,
                path: error.errors[key].path,
                value: error.errors[key].value
            });
        });
        e.push(err);
    });
    return e;
}