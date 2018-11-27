process.env.DEBUG = 'adotapet:*';

const express = require('express');
const router = express.Router();

const Generic = require('./../api/util/generic');

Generic.getStaticEndpoints(router, {
    nome: 'Meu nome',
    pedidos: [
        {
            item: 'Item0',
            categoria: 'Categoria0'
        },
        {
            item: 'Item1',
            categoria: 'Categoria1'
        }
    ]
});