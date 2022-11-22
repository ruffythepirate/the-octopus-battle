import { Server } from 'socket.io';
import UUID from 'node-uuid';
import logger from '../logger';

import { joinGame } from './gameService';


export function setupSocketIO(server) {
    logger.info('Setting up socket.io..')
    const sio = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    sio.sockets.on('connection', function(socket) {
        const handle = setInterval( function() {
            socket.emit('heartbeat', {beat: 1});
        }, 1000);
        const user = {
            id: UUID.v4(),
            socket: socket
        }

        const game = joinGame();

        logger.info('socket.io: player ' + user.id + ' connected')
        socket.on('state', function(socket, ackFn) {
            logger.info(`socket.io: player ${user.id} requested state`)
            logger.info(`ackFn: ${ackFn}. game: ${game}`)
            ackFn(game);
        });

        socket.on('disconnect', function() {
            logger.info('socket.io: player ' + user.id + ' disconnected')
            clearInterval(handle);
        });
    });
    return sio;
}
