const express = require('express');

module.exports = (api) => {
    const UsuarioController = api.controllers.usuario;

    const Generic = api.util.generic;
    const router = express.Router();

    router.get('/authenticate', UsuarioController.authenticate);

    router.use('/', Generic.getRouter(api, 'usuario'));

    return router;
}