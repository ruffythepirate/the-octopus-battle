import express from 'express';
import gameRoutes from './games/routes.mjs';
import http from 'http';
import { setupSocketIO } from './games/socketController.mjs';

import logger from './logger.mjs';

const gameport = process.env.PORT || 3030

let app = null;

const server = setupExpressServer();
setupSocketIO(server);
startListening();


function startListening() {

    server.listen(gameport);
    logger.info('Express: Listening on port ' + gameport);

}

function setupExpressServer() {
    app = express();
    const server = http.Server(app);

    app.use('/games', gameRoutes);

    //By default, we forward the / path to index.html automatically.
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/*', function(req, res, next) {
        var file = req.params[0];
        logger.verbose('Express: file requested : ' + file);
        res.sendFile(__dirname + '/' + file);

    });

    return server;
}

