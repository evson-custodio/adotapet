module.exports = (api) => {
    const FileController = api.controllers.file;
    const router = require('express').Router();

    router.param('id', FileController.handlerId);
    router.param('name', FileController.handlerName);

    router.route('/')
    .post(FileController.create);

    router.route('/:id([a-f0-9]{12}|[a-f0-9]{24})')
    .get(FileController.getById)
    .delete(FileController.deleteById);

    router.route('/:name([\\wáéíóúâêîôûãõàèìòùüç%_]+.(png|jpg))')
    .get(FileController.getByName)
    .delete(FileController.deleteByName);

    return router;
}