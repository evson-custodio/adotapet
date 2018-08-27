module.exports = (api) => {
    const UsuárioController = api.controllers.usuario;
    const router = require('express').Router();

    router.param('id', UsuárioController.id);

    router.route('/')
    .get(UsuárioController.list)
    .post(UsuárioController.create);

    router.route('/:id')
    .get(UsuárioController.read)
    .put(UsuárioController.update)
    .delete(UsuárioController.delete);

    return router;
}