let itens = [
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
]

let result = itens.map((value) => {
    return value.categoria;
});

console.log(itens.map((value) => value.categoria).filter((value, index, array) => array.indexOf(value) == index));