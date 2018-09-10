let defaultAbrigo = {
    "fotoPerfil": "5b82fb5f624db51c0c1f6cf4",
    "nome": "Abrigo de Testes",
    "email": "testes@adotapet.com",
    "telefone": "2733218600",
    "descricao": "Este é um abrigo criado pelo teste de integração.",
    "cnpj": "17305639000188",
    "endereco": {
        "logradouro": "Rua Vasco Coutinho",
        "numero": "878",
        "bairro": "Praia de Itaparica",
        "cidade": "Vila Velha",
        "uf": "ES",
        "pais": "Brasil",
        "complemento": "Perto do Posto Ipiranga"
    },
    "responsavel": {
        "nome": "Will Smith",
        "email": "will@gmail.com",
        "telefone": "27998681478"
    }
}

let ultimoAbrigoInseridoId;

describe('Rota: Abrigo', function() {
    describe('POST /abrigo', () => {
        it('insere um abrigo', done => {
            request
                .post('/api/abrigo')               
                .send(defaultAbrigo)
                .end((err, res) => {   
                    a = res.body;
                    
                    assert.equal(a.descricao, defaultAbrigo.descricao);                  
                    assert.equal(a.email, defaultAbrigo.email);                  
                   
                    assert.equal(a.endereco.bairro, defaultAbrigo.endereco.bairro);                  
                    assert.equal(a.endereco.cidade, defaultAbrigo.endereco.cidade);                  
                    assert.equal(a.endereco.complemento, defaultAbrigo.endereco.complemento);                  
                    assert.equal(a.endereco.logradouro, defaultAbrigo.endereco.logradouro);                  
                    assert.equal(a.endereco.numero, defaultAbrigo.endereco.numero);                  
                    assert.equal(a.endereco.pais, defaultAbrigo.endereco.pais);                  
                    assert.equal( a.endereco.uf, defaultAbrigo.endereco.uf);                  
                  
                    assert.equal(a.fotoPerfil, defaultAbrigo.fotoPerfil);                  
                    assert.equal(a.nome, defaultAbrigo.nome);                  
                    
                    assert.equal(a.responsavel.email, defaultAbrigo.responsavel.email);                  
                    assert.equal(a.responsavel.nome, defaultAbrigo.responsavel.nome);                  
                    assert.equal(a.responsavel.telefone, defaultAbrigo.responsavel.telefone);   
                    
                    assert.equal(a.telefone, defaultAbrigo.telefone);          
                    
                    ultimoAbrigoInseridoId = a._id;
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
            defaultAbrigo.descricao = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";            
            request
                .put('/api/abrigo/' + ultimoAbrigoInseridoId)
                .send(defaultAbrigo)
                .end((err, res) => {
                    assert.equal(res.body.nome, defaultAbrigo.nome);                  
                    assert.equal(res.body.descricao, defaultAbrigo.descricao);    
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
                    erros = res.body.errors;
                    
                    assert.equal(Object.keys(erros).length, 11); // Quantidade de campos obrigatórios

                    assert.equal(erros["responsavel.telefone"].kind, "required"); 
                    assert.equal(erros["responsavel.email"].kind, "required"); 
                    assert.equal(erros["responsavel.nome"].kind, "required"); 
                    
                    assert.equal(erros["endereco.pais"].kind, "required"); 
                    assert.equal(erros["endereco.uf"].kind, "required"); 
                    assert.equal(erros["endereco.cidade"].kind, "required"); 
                    assert.equal(erros["endereco.bairro"].kind, "required"); 
                    assert.equal(erros["endereco.logradouro"].kind, "required"); 

                    assert.equal(erros.telefone.kind, "required");                     
                    assert.equal(erros.email.kind, "required"); 
                    assert.equal(erros.nome.kind, "required");                     
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
                    assert.notEqual(res.body.email, abrigo.email);
                    assert.notEqual(res.body.responsavel.email, abrigo.responsavel.email);
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
                .get('/api/abrigo/')
                .end(function(err, res){
                    let abrigos = res.body;                    
                    let abrigoRecuperado = abrigos.filter(a => a._id == ultimoAbrigoInseridoId);
                    assert.equal(abrigoRecuperado[0].nome, defaultAbrigo.nome);                  
                    done(err);
                });
        }); 
    });

    describe('DELETE /abrigo/{id}', () => {
        it('desativa um abrigo', done => {
            request
                .delete('/api/abrigo/' + ultimoAbrigoInseridoId)
                .end((err, res) => {
                    assert.equal(res.body.email, defaultAbrigo.email); 
                    done(err);
                });
        });
    });    

});