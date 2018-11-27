function Pet() {
    this.adocao = {
        status: [
            'Não Disponível para Adoção',
            'Disponível para Adoação',
            'Avaliando os Candidatos à Adoção',
            'Adotado'
        ]
    },
    this.default = {
        adocao: {
            status: this.adocao.status[0]
        }
    }
}

module.exports = new Pet