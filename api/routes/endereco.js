module.exports = (api) => {
    const EnderecoController = api.controllers.endereco;
    const router = require('express').Router();

    router.param('id', EnderecoController.id);

    router.route('/')
    .get(EnderecoController.list)
    .post(EnderecoController.create);

    router.route('/:id')
    .get(EnderecoController.read)
    .put(EnderecoController.update)
    .delete(EnderecoController.delete);

    return router;
}