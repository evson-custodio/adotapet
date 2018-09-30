module.exports = (api) => {
    const FuncionarioController = api.controllers.funcionario;
    const router = require('express').Router();

    router.param('id', FuncionarioController.id);

    router.route('/')
    .get(FuncionarioController.list)
    .post(FuncionarioController.create);

    router.route('/:id')
    .get(FuncionarioController.read)
    .put(FuncionarioController.update)
    .delete(FuncionarioController.delete);

    return router;
}