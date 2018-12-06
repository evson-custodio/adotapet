const express = require('express');

module.exports = (api) => {
    const AppController = api.controllers.app;

    const router = express.Router();

    router.get('/qrcode', AppController.qrcode);
    router.get('/download', AppController.download);

    return router;
}