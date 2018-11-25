let defaultAbrigo = {
    "fotoPerfil": "5b82fb5f624db51c0c1f6cf4",
    "nome": "Abrigo de Testes",
    "email": "testes@adotapet.com",
    "telefone": "(27) 9986-1478",
    "cnpj": "43.165.473/0001-51",
    "responsavel": {
        "nome": "Will Smith",
        "email": "will@gmail.com",
        "telefone": "(27) 9986-1478"
    },
    "endereco" : null
}

let enderecoAbrigo = {
    "logradouro": "Rua Vasco Coutinho",
    "numero": "878",
    "bairro": "Praia de Itaparica",
    "cidade": "Vila Velha",
    "uf": "ES",
    "pais": "Brasil",
    "complemento": "Perto do Posto Ipiranga",
	"cep" : "29.931-730"
}

let ultimoEnderecoInseridoId;

describe('Rota: Endereco', function() {
    describe('POST /endereco', () => {
        it('insere um endereco', done => {
            request
                .post('/api/endereco')               
                .send(enderecoAbrigo)
                .end((err, res) => {   
                    a = res.body;           
                    assert.isTrue(isSubset(a, enderecoAbrigo));     
                    ultimoEnderecoInseridoId = a._id;      
                    defaultAbrigo.endereco = ultimoEnderecoInseridoId;                                   
                    done(err);
                });
        });
    });    
});

describe('Rota: Abrigo', function() {
    describe('POST /abrigo', () => {
        it('insere um abrigo', done => {
            request
                .post('/api/abrigo')               
                .send(defaultAbrigo)
                .end((err, res) => {   
                    a = res.body;
                    assert.isTrue(isSubset(a, defaultAbrigo));
                                            
                    ultimoAbrigoInseridoId = a._id;
                    done(err);
                });
        });
    });
    
    describe('POST /abrigo', () => {
        it('impede o registro de um abrigo caso o usuário insira um valor em um campo único que já esteja cadastrado (Ex: CNPJ)', done => {
            request
                .post('/api/abrigo')               
                .send(defaultAbrigo)
                .end((err, res) => {                                    
                    assert.equal(res.body.errors.nome.kind, "unique");                                                                              
                    done(err);
                });
        });
    });    
  
    describe('GET /abrigo/{id}', () => {
        it('retorna um abrigo por id', done => {
            request
                .get('/api/abrigo/'+ ultimoAbrigoInseridoId)
                .end((err, res) => {
                    assert.equal(res.body.nome, defaultAbrigo.nome);                  
                    assert.equal(res.body.email, defaultAbrigo.email);  
                    done(err);
                });
        });
    });

    describe('GET /abrigo', () => {
        it('retorna uma lista de abrigos', done => {
            request
                .get('/api/abrigo/')
                .end(function(err, res){
                    let abrigos = res.body;                    
                    let abrigoRecuperado = abrigos.filter(a => a._id == ultimoAbrigoInseridoId);
                    assert.equal(abrigoRecuperado[0].nome, defaultAbrigo.nome);                  
                    assert.equal(abrigoRecuperado[0].email, defaultAbrigo.email);                  
                    done(err);
                });
        });
    });

    describe('PUT /abrigo/{id}', () => {
        it('edita um abrigo', done => {            
            defaultAbrigo.nome = "DogHouse";
            defaultAbrigo.email = "email@doghouse.com";        
            request
                .put('/api/abrigo/' + ultimoAbrigoInseridoId)
                .send(defaultAbrigo)
                .end((err, res) => {
                    assert.equal(res.body.nome, defaultAbrigo.nome);                  
                    assert.equal(res.body.email, defaultAbrigo.email); 
                    done(err);
                });
        });
    });

    describe('POST /abrigo', () => {
        it('impede a inserção de um abrigo faltando campo obrigatório', done => {
            request
                .post('/api/abrigo')               
                .send({})
                .end((err, res) => {                                    
                    assert.equal(res.body._message, "Abrigo validation failed"); 
                    assert.include(res.body.message, "é obrigatória!"); 
                    done(err);
                });
        });
    });

    describe('POST /abrigo', () => {
        it('impede a adição de um email inválido no cadastro do abrigo', done => {
            abrigo = defaultAbrigo;
            abrigo.email = "xyzw#@com";
            abrigo.responsavel.email ="qwerty@.com"
            request
                .put('/api/abrigo/' + ultimoAbrigoInseridoId)
                .send(abrigo)
                .end((err, res) => {                                    
                    assert.notEqual(res.body.errors, abrigo);
                    done(err);
                });
        });
    });

    describe('POST /abrigo', () => {
        it('impede a adição de um telefone inválido no cadastro abrigo', done => {
            abrigo = defaultAbrigo;
            abrigo.telefone = "a!@#$%¨&*()_+";
            request
                .put('/api/abrigo/' + ultimoAbrigoInseridoId)
                .send(abrigo)
                .end((err, res) => {                                    
                    assert.notEqual(res.body.telefone, abrigo.telefone);
                    done(err);
                });
        });
    });

    describe('POST /abrigo', () => {
        it('impede a adição de CNPJ inválido no cadastro do abrigo', done => {
            abrigo = defaultAbrigo;
            abrigo.cnpj = "123";
            request
                .put('/api/abrigo/' + ultimoAbrigoInseridoId)
                .send(abrigo)
                .end((err, res) => {                                    
                    assert.notEqual(res.body.cnpj, abrigo.cnpj);
                    done(err);
                });
        });
    });

    describe('GET /abrigo', () => {
        it('retorna a busca de um abrigo dado seu nome', done => {
            request
                .get('/api/abrigo?nome=' + defaultAbrigo.nome)
                .end(function(err, res){
                    let abrigos = res.body;                    
                    assert.equal(abrigos[0].nome, defaultAbrigo.nome);                  
                    done(err);
                });
        }); 
    });

});