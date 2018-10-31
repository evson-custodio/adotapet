let defaultUsuario = {
    "email": "fm@gmail.com",
    "username": "fabio",
    "password": "@A123456789x"
}

describe('Rota: Usuario', function() {    
    describe('POST /usuario', () => {
        it('insere um usuario', done => {
            request
                .post('/api/usuario')               
                .send(defaultUsuario)
                .end((err, res) => {                
                    let u = res.body;
                    assert.equal(u.email, defaultUsuario.email);                                         
                    assert.equal(u.username, defaultUsuario.username);                                         
                    
                    ultimoUsuarioInseridoId = u._id;
                    done(err);
                });
        });
    });

    describe('POST /usuario', () => {
        it('impede o registro de um usuário caso insira um valor em um campo único que já esteja cadastrado (Ex: Email, Username)', done => {
            request
                .post('/api/usuario')               
                .send(defaultUsuario)
                .end((err, res) => {                                    
                    assert.equal(res.body.errors.email.kind, "unique");                                                         
                    assert.equal(res.body.errors.username.kind, "unique");                                                         
                    done(err);
                });
        });
    });
  
    describe('GET /usuario/{id}', () => {
        it('retorna um usuario por id', done => {
            request
                .get('/api/usuario/'+ ultimoUsuarioInseridoId)
                .end((err, res) => {
                    let u = res.body;
                    assert.equal(u.nome, defaultUsuario.nome);                                         
                    assert.equal(u.email, defaultUsuario.email);                                         
                    assert.equal(u.username, defaultUsuario.username);  
                    done(err);
                });
        });
    });

    describe('GET /usuario', () => {
        it('retorna uma lista de usuarios', done => {
            request
                .get('/api/usuario/')
                .end(function(err, res){
                    let usuarios = res.body;
                    let u = usuarios.filter(a => a._id == ultimoUsuarioInseridoId);
                    assert.equal(u[0].email, defaultUsuario.email);                                         
                    assert.equal(u[0].username, defaultUsuario.username);                  
                    done(err);
                });
        });
    });

    describe('PUT /usuario/{id}', () => {
        it('atualiza um usuario', done => {
            defaultUsuario.email = "fms@gmail.com";   
            request
                .put('/api/usuario/' + ultimoUsuarioInseridoId)
                .send(defaultUsuario)
                .end((err, res) => {
                    assert.equal(res.body.email, defaultUsuario.email);                           
                    done(err);
                });
        });
    });
    
    describe('DELETE /usuario/{id}', () => {
        it('deleta um usuario', done => {
            request
                .delete('/api/usuario/' + ultimoUsuarioInseridoId)
                .end((err, res) => {
                    assert.equal(res.body.email, defaultUsuario.email);                                         
                    done(err);
                });
        });
    });


});