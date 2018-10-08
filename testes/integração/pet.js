let defaultPet = {    
    "nome": "Biscoito",
    "idade": "6",
    "especie": "Cachorro",
    "raca": "doberman",
    "pelagem": "Escura",
    "peso": "15",
    "porte": "Médio",
    "sexo": true,
    "castrado": false,
    "medicamentoEspecifico": true,
    "alimentacaoEspecifica": false,
    "disponivelAdocao": true,
    "disponivelAdocao": true,
    "alimentacoes" : ["Cucuz (Somente após a janta)"],
    "medicamentos" : [],
    "vacinacao" : [],
    "abrigo" : null
}

let defaultMedicamento = {
    "usoContinuo": false,
    "nome": "Inibidor Enzimático Dechra Vetoryl",
    "apresentacao" : "N/A",
    "dosagem" : "3"
}
let defaultVacina = {
    "nome" : "Leptospirose canina",
    "descricao" : "Os sintomas da leptospirose canina podem ser agudos ou crónicos. Nos casos agudos, a leptospiremia massiva origina uma vasculite e, inclusive, uma CID.",
    "data" : "18/05/2018",
    "aplicada": true    
}

let ultimoMedicamentoInseridoId;
let ultimaVacinaInseridaId;
let ultimoPetInseridoId;


describe('Rota: Medicamento', function() {
    describe('POST /medicamento', () => {
        it('insere um medicamento', done => {
            request
                .post('/api/medicamento')               
                .send(defaultMedicamento)
                .end((err, res) => {   
                    a = res.body;           
                    assert.isTrue(isSubset(a, defaultMedicamento));
                    ultimoMedicamentoInseridoId = a._id;      
                    defaultPet.medicamentos.push(ultimoMedicamentoInseridoId);             
                    done(err);
                });
        });
    });    

    describe('POST /medicamento', () => {
        it('retorna mensagem de erro caso houver campo obrigatório não preenchido', done => {
            request
                .post('/api/medicamento')               
                .send({})
                .end((err, res) => {                                    
                    assert.equal(res.body._message, "Medicamento validation failed"); 
                    assert.include(res.body.message, "é obrigatória!"); 
                    done(err);
                });
        });
    });     
});

describe('Rota: Vacina', function() {
    describe('POST /vacina', () => {
        it('insere uma vacina', done => {
            request
                .post('/api/vacina')               
                .send(defaultVacina)
                .end((err, res) => {   
                    r = res.body;           
                    assert.isTrue(isSubset(r, defaultVacina));            
                    ultimaVacinaInseridaId = r._id;       
                    defaultPet.vacinacao.push(ultimaVacinaInseridaId);
                    done(err);
                });
        });
    });

    /*describe('POST /vacina', () => {
        it('retorna mensagem de erro ao inserir uma data incorreta no campo -Data da Aplicação da Vacina-', done => {
            let vacina = defaultVacina;
            vacina.data = "32/18/2015"
            request
                .put('/api/vacina/' + ultimaVacinaInseridaId)
                .send(vacina)
                .end((err, res) => {   
                    r = res.body;           
                    assert.notEqual(r.data, vacina.data);            
                    done(err);
                });
        });
    });*/

    describe('POST /vacina', () => {
        it('retorna mensagem de erro caso houver campo obrigatório não preenchido', done => {
            request
                .post('/api/vacina')               
                .send({})
                .end((err, res) => {                                    
                    assert.equal(res.body._message, "Vacina validation failed"); 
                    assert.include(res.body.message, "é obrigatória!");
                    done(err);
                });
        });
    });    

});


describe('Rota: Pet', function() {
    describe('POST /pet', () => {
        it('insere um pet', done => {
            defaultPet.abrigo = ultimoAbrigoInseridoId;
            request
                .post('/api/pet')               
                .send(defaultPet)
                .end((err, res) => {   
                    a = res.body;                    
                    assert.isTrue(isSubset(a, defaultPet));  //isSubset não ingnora case-sensitive  
                    ultimoPetInseridoId = a._id;                
                    done(err);
                });
        });
    });

    describe('GET /pet/{id}', () => {
        it('retorna um pet por id', done => {
            request
                .get('/api/pet/'+ ultimoPetInseridoId)
                .end((err, res) => {
                    let r = res.body;
                    assert.equal(r._id, ultimoPetInseridoId);      
                    assert.equal(r.nome, defaultPet.nome);      
                    done(err);
                });
        });
    });

    describe('GET /pet', () => {
        it('retorna uma lista de pets', done => {
            request
                .get('/api/pet/')
                .end(function(err, res){
                    let pets = res.body;                    
                    let petRecuperado = pets.filter(a => a._id == ultimoPetInseridoId);
                    assert.equal(petRecuperado[0].nome, defaultPet.nome);                  
                    assert.equal(petRecuperado[0].email, defaultPet.email);                  
                    done(err);
                });
        });
    });

    describe('PUT /pet/{id}', () => {
        it('edita um pet', done => {            
            defaultPet.nome = "Chocolate";
            defaultPet.idade = "9";            
            defaultPet.peso = "20";            
            request
                .put('/api/pet/' + ultimoPetInseridoId)
                .send(defaultPet)
                .end((err, res) => {
                    let r = res.body;
                    assert.isTrue(isSubset(r, defaultPet));      
                    done(err);
                });
        });
    });

    /*describe('POST /pet', () => {
        it('retorna mensagem de erro ao vincular um peso com valor negativo ao pet', done => {
            let pet = defaultPet;
            pet.peso = -1;
            request
                .put('/api/pet/' + ultimoPetInseridoId)               
                .send(pet)
                .end((err, res) => {                 
                    assert.isAbove(parseFloat(res.body.peso), 0);     
                    done(err);
                });
        });
    });
    */

    describe('POST /pet', () => {
        it('retorna mensagem de erro ao vincular um porte que não esteja pré-cadastrado no sistema ao pet', done => {
            let pet = defaultPet;
            pet.porte = "Muito Muito Grande";
            request
                .put('/api/pet/' + ultimoPetInseridoId)               
                .send(pet)
                .end((err, res) => {                 
                    assert.equal(res.body.errors.porte.name, "ValidatorError"); 
                    done(err);
                });
        });
    }); 

    describe('POST /pet', () => {
        it('retorna mensagem de erro caso houver campo obrigatório não preenchido', done => {
            request
                .post('/api/pet')               
                .send({porte : "médio"})
                .end((err, res) => {                                    
                    assert.equal(res.body._message, "Pet validation failed"); 
                    assert.include(res.body.message, "é obrigatória!");             
                    done(err);
                });
        });
    });

    describe('GET /abrigo', () => {
        it('retorna a busca de um pet dado seu nome', done => {
            request
                .get('/api/pet?nome=' + defaultPet.nome)
                .end(function(err, res){
                    let pets = res.body;                    
                    assert.equal(pets[0].nome, defaultPet.nome);                  
                    done(err);
                });
        }); 
    });
    
    describe('Deleta um medicamento vinculado ao pet', function() {        
        describe('PUT /pet/{id}', () => {
            it('remove o vínculo do medicamento com o pet', done => {            
                let pet = defaultPet;        
                pet.medicamentos = [];
                request
                    .put('/api/pet/' + ultimoPetInseridoId)
                    .send(pet)
                    .end((err, res) => {
                        let r = res.body;
                        assert.equal(r.medicamentos.length, 0);      
                        done(err);
                    });
            });
        });
        describe('DELETE /medicamento/{id}', () => {
            it('remove o medicamento da base de dados', done => {
                request
                    .delete('/api/medicamento/' + ultimoMedicamentoInseridoId)
                    .end((err, res) => {
                        assert.equal(res.body.nome, defaultMedicamento.nome); 
                        done(err);
                    });
            });
        });                    
    });

    describe('Deleta uma vacina vinculada ao pet', function() {        
        describe('PUT /pet/{id}', () => {
            it('remove o vínculo da vacina com o pet', done => {            
                let pet = defaultPet;        
                pet.medicamentos = [];
                request
                    .put('/api/pet/' + ultimoPetInseridoId)
                    .send(pet)
                    .end((err, res) => {
                        let r = res.body;
                        assert.equal(r.medicamentos.length, 0);      
                        done(err);
                    });
            });
        });
        describe('DELETE /vacina/{id}', () => {
            it('remove a vacina da base de dados', done => {
                request
                    .delete('/api/vacina/' + ultimaVacinaInseridaId)
                    .end((err, res) => {
                        assert.equal(res.body.nome, defaultVacina.nome); 
                        done(err);
                    });
            });
        });                    
    });    

    describe('DELETE /pet/{id}', () => {
        it('deleta um pet', done => {
            request
                .delete('/api/pet/' + ultimoPetInseridoId)
                .end((err, res) => {
                    assert.equal(res.body.email, defaultPet.email); 
                    done(err);
                });
        });
    });

    describe('DELETE /pet/{id}', () => {
        it('retorna mensagem de erro ao deletar um pet inexistente', done => {
            request
                .delete('/api/pet/' + -1)
                .end((err, res) => {
                    assert.equal(res.body.name, "CastError"); 
                    assert.isAbove(res.body.message.length, 0); 
                    done(err);
                });
        });
    });    

});