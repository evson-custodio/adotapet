const express = require('express');

module.exports = (api) => {
    const PetController = api.controllers.pet;

    const Generic = api.util.generic;
    const router = express.Router();

    // router.get('/authenticate', SolicitacaoController.authenticate);

    router.use('/', Generic.getRouter(api, 'pet'));

    return router;
}