import { Server } from 'socket.io';
import UUID from 'node-uuid';
import logger from '../logger';

import gameService from './gameService';


export function setupSocketIO(server) {
    logger.info('Setting up socket.io..')
    const sio = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    sio.sockets.on('connection', function(socket) {
        const user = {
            id: UUID.v4(),
            socket: socket
        }

        const game = gameService.getOrCreateAvailableGame();
        game.addPlayer(user);

        logger.info('socket.io: player ' + user.id + ' connected')
        socket.on('state', function(socket, ackFn) {
            logger.info(`socket.io: player ${user.id} requested state`)
            ackFn(game);
        });

        socket.on('disconnect', function() {
            logger.info(`socket.io: player ${user.id} disconnected`)
            game.removePlayer(user.id);
        });
    });
    return sio;
}
