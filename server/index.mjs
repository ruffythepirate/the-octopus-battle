import express from 'express';
import gameRoutes from './games/routes.mjs';
import http from 'http';
import { setupSocketIO } from './games/socketController.mjs';

const gameport = process.env.PORT || 3030


const logLevel = {
        verbose: true,
        info: true
    };

let app = null,
    server = null;

setupExpressServer();
setupSocketIO(server);
startListening();


function log(level, message) {
    if (logLevel[level]) {
        console.log(message);
    }
}

function startListening() {

    server.listen(gameport);
    console.log('Express: Listening on port ' + gameport);

}

function setupExpressServer() {
    app = express();
    server = http.Server(app);

    app.use('/games', gameRoutes);

    //By default, we forward the / path to index.html automatically.
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/*', function(req, res, next) {
        var file = req.params[0];
        log('verbose', 'Express: file requested : ' + file)
        res.sendFile(__dirname + '/' + file);

    });
}

