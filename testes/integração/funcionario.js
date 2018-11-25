let defaultFuncionario = {
    "nome" : "Fábio de Melo",
    "usuario" : null,
    "telefone" : "(27) 9986-1478"
}

let ultimoFuncionarioInseridoId;

describe('Rota: Funcionario', function() {    
    describe('POST /funcionario', () => {
        it('insere um funcionario', done => {
            defaultFuncionario.usuario = ultimoUsuarioInseridoId;
            request
                .post('/api/funcionario')               
                .send(defaultFuncionario)
                .end((err, res) => {                 
                    let r = res.body;                   
                    assert.isTrue(isSubset(r, defaultFuncionario));                                         
                    ultimoFuncionarioInseridoId = r._id;
                    done(err);
                });
        });
    });
  
    describe('GET /funcionario/{id}', () => {
        it('retorna um funcionario por id', done => {
            request
                .get('/api/funcionario/'+ ultimoFuncionarioInseridoId)
                .end((err, res) => {
                    assert.isTrue(isSubset(res.body, defaultFuncionario));                                          
                    done(err);
                });
        });
    });

    describe('GET /funcionario', () => {
        it('retorna uma lista de funcionarios', done => {
            request
                .get('/api/funcionario/')
                .end(function(err, res){
                    let funcionarios = res.body;
                    let u = funcionarios.filter(a => a._id == ultimoFuncionarioInseridoId);
                    assert.equal(u[0].nome, defaultFuncionario.nome);       
                    done(err);
                });
        });
    });

    describe('PUT /funcionario/{id}', () => {
        it('atualiza um funcionario', done => {
            defaultFuncionario.nome = "Fabio de Melo dos Santos";
            request
                .put('/api/funcionario/' + ultimoFuncionarioInseridoId)
                .send(defaultFuncionario)
                .end((err, res) => {
                    assert.isTrue(isSubset(res.body, defaultFuncionario));                                                            
                    done(err);
                });
        });
    });
    
    describe('DELETE /funcionario/{id}', () => {
        it('deleta um funcionario', done => {
            request
                .delete('/api/funcionario/' + ultimoFuncionarioInseridoId)
                .end((err, res) => {
                    assert.isTrue(isSubset(res.body, defaultFuncionario));                                                            
                    done(err);
                });
        });
    });

});
