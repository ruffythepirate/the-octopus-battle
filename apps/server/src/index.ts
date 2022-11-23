import express from 'express';
import gameRoutes from './games/routes';
import http from 'http';
import { setupSocketIO } from './games/socketController';

import logger from './logger';

const gameport = process.env.PORT || 3030

let app = express();

const server = setupExpressServer(app);
setupSocketIO(server);
startListening();


function startListening() {
    server.listen(gameport);
    logger.info('Express: Listening on port ' + gameport);
}

function setupExpressServer(app) {
    const server = new http.Server(app);

    app.use('/games', gameRoutes);

    //By default, we forward the / path to index.html automatically.
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/*', function(req, res, next) {
        var file = req.params[0];
        logger.debug('Express: file requested : ' + file);
        res.sendFile(__dirname + '/' + file);

    });

    return server;
}

