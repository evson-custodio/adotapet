module.exports = (api) => {
    const MedicamentoController = api.controllers.medicamento;
    const router = require('express').Router();

    router.param('id', MedicamentoController.id);

    router.route('/')
    .get(MedicamentoController.list)
    .post(MedicamentoController.create);

    router.route('/:id')
    .get(MedicamentoController.read)
    .put(MedicamentoController.update)
    .delete(MedicamentoController.delete);

    return router;
}