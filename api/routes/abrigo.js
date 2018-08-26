module.exports = (api) => {
    const AbrigoController = api.controllers.abrigo;
    const router = require('express').Router();

    router.param('id', AbrigoController.id);

    router.route('/')
    .get(AbrigoController.list)
    .post(AbrigoController.create);

    router.route('/:id')
    .get(AbrigoController.read)
    .put(AbrigoController.update)
    .delete(AbrigoController.delete);

    return router;
}