module.exports = (api) => {
    const UsuarioController = api.controllers.usuario;
    const router = require('express').Router();

    router.param('id', UsuarioController.id);

    router.route('/')
    .get(UsuarioController.list)
    .post(UsuarioController.create);

    router.route('/:id')
    .get(UsuarioController.read)
    .put(UsuarioController.update)
    .delete(UsuarioController.delete);

    return router;
}