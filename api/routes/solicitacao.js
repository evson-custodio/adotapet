const express = require('express');

module.exports = (api) => {
    const SolicitacaoController = api.controllers.solicitacao;

    const Generic = api.util.generic;
    const router = express.Router();

    // router.get('/authenticate', SolicitacaoController.authenticate);

    router.use('/', Generic.getRouter(api, 'solicitacao'));

    return router;
}