import { Server } from 'socket.io';
import UUID from 'node-uuid';

const logLevel = {
        verbose: true,
        info: true
    };

function log(level, message) {
    if (logLevel[level]) {
        console.log(message);
    }
}

export function setupSocketIO(server) {
    console.log('Setting up socket.io..')
    var sio = new Server(server, {
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
        }

        log('info', 'socket.io: player ' + user.id + ' connected')
        socket.emit('', user);

        socket.on('disconnect', function() {
            log('info', 'socket.io: client disconnected ' + socket.userid)
            clearInterval(handle);
        });
    });

}

