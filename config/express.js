const express = require('express');

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const serveFavicon = require('serve-favicon');
const serveStatic = require('serve-static');
const logger = require('morgan');
const cors = require('cors');
const handlerError = require('errorhandler');

module.exports.init = (api, port) => {
    const app = express();

    app.set('port', port);

    app.use(serveFavicon('public/favicon.png'));
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(serveStatic('public'));

    this.loadRoutes(app, api);

    return app;
}

module.exports.loadRoutes = (app, api) => {
    let Generic = api.util.generic;
    let routesNames = Object.keys(api.routes);
    let modelsNames = Object.keys(api.models);

    app.use(cors());

    routesNames.forEach(routeName => {
        app.use('/api/' + routeName, api.routes[routeName]);
    });

    modelsNames.filter(modelName => !routesNames.includes(modelName))
    .forEach(modelName => {
        app.use('/api/' + modelName, Generic.getRouter(api, modelName));
    });

    if (app.get('env') === 'development') {
        app.use(handlerError());
    }
}