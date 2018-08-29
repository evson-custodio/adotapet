let defaultAbrigo = {
    "fotoPerfil": "5b82fb5f624db51c0c1f6cf4",
    "nome": "Abrigo de Testes",
    "email": "testeunitario@gmail.com",
    "telefone": "2733218600",
    "descrição": "Este é um abrigo criado pelo teste funcional.",
    "endereço": {
        "longradouro": "Rua Vasco Coutinho",
        "número": "878",
        "bairro": "Praia de Itaparica",
        "cidade": "Vila Velha",
        "uf": "ES",
        "país": "Brasil",
        "complemento": "Perto do Posto Ipiranga"
    },
    "responsável": {
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
                    assert.equal(defaultAbrigo.descrição, res.body.descrição);                  
                    assert.equal(defaultAbrigo.email, res.body.email);                  
                   
                    assert.equal(defaultAbrigo.endereço.bairro, res.body.endereço.bairro);                  
                    assert.equal(defaultAbrigo.endereço.cidade, res.body.endereço.cidade);                  
                    assert.equal(defaultAbrigo.endereço.complemento, res.body.endereço.complemento);                  
                    assert.equal(defaultAbrigo.endereço.longradouro, res.body.endereço.longradouro);                  
                    assert.equal(defaultAbrigo.endereço.número, res.body.endereço.número);                  
                    assert.equal(defaultAbrigo.endereço.país, res.body.endereço.país);                  
                    assert.equal(defaultAbrigo.endereço.uf, res.body.endereço.uf);                  
                  
                    assert.equal(defaultAbrigo.fotoPerfil, res.body.fotoPerfil);                  
                    assert.equal(defaultAbrigo.nome, res.body.nome);                  
                    
                    assert.equal(defaultAbrigo.responsável.email, res.body.responsável.email);                  
                    assert.equal(defaultAbrigo.responsável.nome, res.body.responsável.nome);                  
                    assert.equal(defaultAbrigo.responsável.telefone, res.body.responsável.telefone);   
                    
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
            defaultAbrigo.descrição = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";            
            request
            .put('/api/abrigo/' + ultimoAbrigoInseridoId)
            .send(defaultAbrigo)
            .end((err, res) => {
                assert.equal(res.body.nome, defaultAbrigo.nome);                  
                assert.equal(res.body.descrição, defaultAbrigo.descrição);                  
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