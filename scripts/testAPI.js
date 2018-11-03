process.env.DEBUG = 'testAPI';
let debug = require('debug')('testAPI');

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

require('./../api')(require('./../config/env')['development'])
.then(api => {
    let ObjectId = api.mongoose.Types.ObjectId;
    let Usuario = api.models.usuario;
    let Funcionario = api.models.funcionario;

    let funcionarios = [
        {
            nome: 'Paulo Siqueira 1',
            telefone: '(27) 99999-4949'
        },
        {
            usuario: '2',
            nome: 'Paulo Siqueira 2',
            telefone: '(27) 99999-4949'
        },
        {
            usuario: 'a1b2c3d4e5f6',
            nome: 'Paulo Siqueira 3',
            telefone: '(27) 99999-4949'
        },
        {
            usuario: '5bdd7a3ebb468b1c6c8a15bf',
            nome: 'Paulo Siqueira 4',
            telefone: '(27) 99999-4949'
        },
        {
            usuario: '5bdd7a3ebb468b1c6c8a15bf',
            nome: 'Paulo Siqueira 5',
            telefone: '(27) 99999-4949'
        }
    ]

    // debug(Funcionario);
    // process.exit(0);

    createMany(Funcionario, funcionarios, true)
    .then(results => {
        debug(results.errors[1].errors);
        process.exit(0);
    })
    .catch(error => {
        debug(error);
        process.exit(0);
    });
})
.catch(error => {
    debug(error);
    process.exit(1);
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