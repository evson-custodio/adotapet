function Solicitacao() {
    this.questionario = {
        faixaSalarial: [
            'Menos que R% 400,00',
            'R$ 400,00 à 600,00',
            'R$ 600,00 à 1.200,00',
            'R$ 1.200,00 à 1.600,00',
            'R$ 1.600,00 à 2.600,00',
            'Mais de R$ 2.600,00',
        ]
    },
    this.status = [
        'Pendente',
        'Avaliando',
        'Aceita',
        'Recusada'
    ],
    this.default = {
        data: new Date(Date.now()),
        status: this.status[0]
    }
}

module.exports = new Solicitacao