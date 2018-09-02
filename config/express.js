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
    app.use(cors());

    Object.keys(api.routes).forEach(routeName => {
        app.use('/api/' + routeName, api.routes[routeName]);
    });

    if (app.get('env') === 'development') {
        app.use(handlerError());
    }
}