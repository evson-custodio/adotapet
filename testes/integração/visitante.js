let defaultVisitante = {
    "usuario" : null,
    "nome" : "Tobias",
    "dataNascimento" : "2018-01-01T02:00:00.000Z"
}

let defaultSolicitacaoAdocao = {
    "adotante" : null,
    "pet": null,
    "data" : "2018-01-01T02:00:00.000Z",    
    "questionario": {
        "rendaMensal": 3200,
        "teveAnimais" : true,
        "temAnimais" : true,
        "temCriancas": false,
        "viajaFrequentemente" : false,
        "resideEm" : true,
        "redeProtecao" : true,
        "razao" : "YYY"	,
        "rotina" : "XYZ"
    }
}

let ultimoVisitanteInseridoId;

describe('Rota: Visitante', function() {    
    describe('POST /visitante', () => {
        it('insere um visitante', done => {
            defaultVisitante.usuario = ultimoUsuarioInseridoId;
            request
                .post('/api/visitante')               
                .send(defaultVisitante)
                .end((err, res) => {                
                    assert.isTrue(isSubset(res.body, defaultVisitante));                                         
                    ultimoVisitanteInseridoId = res.body._id;
                    done(err);
            });
        });
    });

    describe('POST /usuario', () => {
        it('retorna mensagem de erro caso houver campo obrigatório não preenchido', done => {
            request
                .post('/api/usuario')               
                .send({})
                .end((err, res) => {                                    
                    assert.include(res.body.message, "validation failed"); 
                    done(err);
                });
        });
    });     
  
    describe('GET /visitante/{id}', () => {
        it('retorna um visitante por id', done => {
            request
                .get('/api/visitante/'+ ultimoVisitanteInseridoId)
                .end((err, res) => {
                    assert.isTrue(isSubset(res.body, defaultVisitante));                                         
                    done(err);
            });
        });
    });

    describe('GET /visitante', () => {
        it('retorna uma lista de visitantes', done => {
            request
                .get('/api/visitante/')
                .end(function(err, res){
                    let visitantes = res.body;
                    let u = visitantes.filter(a => a._id == ultimoVisitanteInseridoId);
                    assert.equal(u[0].nome, defaultVisitante.nome);                                                     
                    done(err);
            });
        });
    });

    describe('PUT /visitante/{id}', () => {
        it('atualiza um visitante', done => {
            defaultVisitante.nome = "Tobias Melo";
            request
                .put('/api/visitante/' + ultimoVisitanteInseridoId)
                .send(defaultVisitante)
                .end((err, res) => {
                    assert.equal(res.body.nome, defaultVisitante.nome);                           
                    done(err);
            });
        });
    });

    describe('POST /solicitacao/{id}', () => {
        it('adotante solicita adoção desde que todos os campos estejam válidos', done => {
            defaultSolicitacaoAdocao.adotante = ultimoVisitanteInseridoId;
            defaultSolicitacaoAdocao.pet = ultimoPetInseridoId;
            request
                .post('/api/solicitacao/')
                .send(defaultSolicitacaoAdocao)
                .end((err, res) => {
                    assert.isTrue(isSubset(res.body, defaultSolicitacaoAdocao));                                         
                    done(err);
            });
        });
    });

});