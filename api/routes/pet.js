module.exports = (api) => {
    const PetController = api.controllers.pet;
    const router = require('express').Router();

    router.param('id', PetController.id);

    router.route('/')
    .get(PetController.list)
    .post(PetController.create);

    router.route('/:id')
    .get(PetController.read)
    .put(PetController.update)
    .delete(PetController.delete);

    return router;
}