let defaultAbrigo = {
    "fotoPerfil": "5b82fb5f624db51c0c1f6cf4",
    "nome": "Abrigo de Testes",
    "email": "testeunitario@gmail.com",
    "telefone": "2733218600",
    "descricao": "Este é um abrigo criado pelo teste funcional.",
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
        "email": "willgmail.com",
        "telefone": "27998681478"
    }
}

let ultimoAbrigoInseridoId;

describe('Route: Abrigo', function() {    
    describe('POST /abrigo', () => {
        it('insere um abrigo', function(done) {
            request
                .post('/api/abrigo')               
                .send(defaultAbrigo)
                .end((err, res) => {                                    
                    assert.equal(defaultAbrigo.descricao, res.body.descricao);                  
                    assert.equal(defaultAbrigo.email, res.body.email);                  
                   
                    assert.equal(defaultAbrigo.endereco.bairro, res.body.endereco.bairro);                  
                    assert.equal(defaultAbrigo.endereco.cidade, res.body.endereco.cidade);                  
                    assert.equal(defaultAbrigo.endereco.complemento, res.body.endereco.complemento);                  
                    assert.equal(defaultAbrigo.endereco.logradouro, res.body.endereco.logradouro);                  
                    assert.equal(defaultAbrigo.endereco.numero, res.body.endereco.numero);                  
                    assert.equal(defaultAbrigo.endereco.pais, res.body.endereco.pais);                  
                    assert.equal(defaultAbrigo.endereco.uf, res.body.endereco.uf);                  
                  
                    assert.equal(defaultAbrigo.fotoPerfil, res.body.fotoPerfil);                  
                    assert.equal(defaultAbrigo.nome, res.body.nome);                  
                    
                    assert.equal(defaultAbrigo.responsavel.email, res.body.responsavel.email);                  
                    assert.equal(defaultAbrigo.responsavel.nome, res.body.responsavel.nome);                  
                    assert.equal(defaultAbrigo.responsavel.telefone, res.body.responsavel.telefone);   
                    
                    assert.equal(defaultAbrigo.telefone, res.body.telefone);          
                    
                    ultimoAbrigoInseridoId = res.body._id;

                    done(err);
                });
        });
    });
  
    describe('GET /abrigo/{id}', () => {
        it('retorna um abrigo por id', function(done)  {
            request
                .get('/api/abrigo/'+ ultimoAbrigoInseridoId)
                .end((err, res) => {
                    assert.equal(res.body.nome, defaultAbrigo.nome);                  
                    assert.equal(res.body.email, defaultAbrigo.email);  
                    done(err);
                });
        });
    });

    describe('GET /abrigo', function() {
        it('retorna uma lista de abrigos', function(done) {
            request
                .get('/api/abrigo/')
                .end(function(err, res){
                    let abrigos = JSON.parse(JSON.stringify(res.body));                    
                    let abrigoRecuperado = abrigos.filter(a => a._id == ultimoAbrigoInseridoId);
                    assert.equal(abrigoRecuperado[0].nome, defaultAbrigo.nome);                  
                    assert.equal(abrigoRecuperado[0].email, defaultAbrigo.email);                  
                    done(err);
                });
        });
    });

    describe('PUT /users/{id}', () => {
        it('atualiza um abrigo', done => {
            defaultAbrigo.nome = "DogHouse";
            defaultAbrigo.descricao = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";            
            request
            .put('/api/abrigo/' + ultimoAbrigoInseridoId)
            .send(defaultAbrigo)
            .end((err, res) => {
                assert.equal(res.body.nome, defaultAbrigo.nome);                  
                assert.equal(res.body.descricao, defaultAbrigo.descricao);                  
                done(err);
            });
        });
    });    

    describe('DELETE /abrigo/{id}', () => {
        it('deleta um abrigo', function(done) {
            request
                .delete('/api/abrigo/' + ultimoAbrigoInseridoId)
                .end((err, res) => {
                    assert.equal(res.body.email, defaultAbrigo.email); 
                    done(err);
                });
        });
      });    

});