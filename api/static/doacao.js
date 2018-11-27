function Doacao() {
    this.status = [
        'Aguardando',
        'Finalizada',
        'Cancelada'
    ],
    this.item = [
        {
            nome: 'Ração para Cães',
            categoria: 'Alimentação'
        },
        {
            nome: 'Ração para Gatos',
            categoria: 'Alimentação'
        },
        {
            nome: 'Biscoito',
            categoria: 'Alimentação'
        },
        {
            nome: 'Petisco',
            categoria: 'Alimentação'
        },
        {
            nome: 'Remédios',
            categoria: 'Medicamento'
        },
        {
            nome: 'Vacina',
            categoria: 'Medicamento'
        },
        {
            nome: 'Bolinha',
            categoria: 'Brinquedos'
        },
        {
            nome: 'Pelúcia',
            categoria: 'Brinquedos'
        },
        {
            nome: 'Osso',
            categoria: 'Brinquedos'
        },
        {
            nome: 'Roupa para Cães',
            categoria: 'Agasalho'
        },
        {
            nome: 'Roupa para Gatos',
            categoria: 'Agasalho'
        },
        {
            nome: 'Cama',
            categoria: 'Agasalho'
        },
        {
            nome: 'Manta',
            categoria: 'Agasalho'
        },
        {
            nome: 'Comedouro',
            categoria: 'Acessório'
        },
        {
            nome: 'Coleira',
            categoria: 'Acessório'
        },
        {
            nome: 'Vassoura',
            categoria: 'Limpeza'
        },
        {
            nome: 'Sabão em Pó',
            categoria: 'Limpeza'
        },
        {
            nome: 'Detergente',
            categoria: 'Limpeza'
        },
        {
            nome: 'Desinfetante',
            categoria: 'Limpeza'
        },
        {
            nome: 'Outros',
            categoria: 'Diversos'
        },
        {
            nome: 'Dinheiro',
            categoria: 'Diversos'
        }
    ],
    this.default = {
        status: this.status[0]
    }
}

module.exports = new Doacao