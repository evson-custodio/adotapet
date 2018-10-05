const http = require('http');
const debug = require('debug')('adotapet:server');
const port = process.env.PORT || '1337';
const env = require('./config/env')[process.env.NODE_ENV || 'development'];

function createServer(port) {
    return new Promise((resolve, reject) => {
        require('./api')(env)
        .then(api => {
            let app = require('./config/express').init(api, port);
            let server = http.createServer(app);

            server.listen(app.get('port'), () => {
                debug('Listenning: http://localhost:' + app.get('port'));
                // Object.keys(api.routes).forEach(v => debug(v));
            });

            resolve(api);
        })
        .catch(error => {
            debug('Error: ' + error);
            reject(error);
        });
    });
}

function normalizePort(value) {
    let port = Number.parseInt(value, 10);
    
    if (Number.isNaN(port)) {
        return value;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

createServer(normalizePort(port));

module.exports.createServer = createServer;
module.exports.normalizePort = normalizePort;
