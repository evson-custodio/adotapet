module.exports = (api) => {
    const VacinaController = api.controllers.vacina;
    const router = require('express').Router();

    router.param('id', VacinaController.id);

    router.route('/')
    .get(VacinaController.list)
    .post(VacinaController.create);

    router.route('/:id')
    .get(VacinaController.read)
    .put(VacinaController.update)
    .delete(VacinaController.delete);

    return router;
}