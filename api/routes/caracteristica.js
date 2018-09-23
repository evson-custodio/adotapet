module.exports = (api) => {
    const CaracteristicaController = api.controllers.caracteristica;
    const router = require('express').Router();

    router.param('id', CaracteristicaController.id);

    router.route('/')
    .get(CaracteristicaController.list)
    .post(CaracteristicaController.create);

    router.route('/:id')
    .get(CaracteristicaController.read)
    .put(CaracteristicaController.update)
    .delete(CaracteristicaController.delete);

    return router;
}