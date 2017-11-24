   var gameport        = process.env.PORT || 3000,

        io              = require('socket.io'),
        express         = require('express'),
        UUID         = require('node-uuid'),

        logLevel = {
            verbose: true,
            info: true
        };

        var app = null,
        server = null;

setupExpressServer();
setupSocketIO();
startListening();

function log(level, message) {
    if(logLevel[level]) {
        console.log(message);
    }
}

function startListening() {

   server.listen( gameport );
        //Log something so we know that it succeeded.
    console.log('Express: Listening on port ' + gameport );

}

function setupExpressServer() {
    app = express();
    server = require('http').createServer(app);

         //By default, we forward the / path to index.html automatically.
    app.get( '/', function( req, res ){ 
        res.sendFile( __dirname + '/index.html' );
    });

    app.get( '/*' , function( req, res, next ) {
        var file = req.params[0]; 
        log('verbose','Express: file requested : ' + file )
        res.sendFile( __dirname + '/' + file );

    });
}

function setupSocketIO() {
    var sio = io.listen(server);

    sio.sockets.on('connection', function (client) {
        client.userid = UUID();
        client.emit('onconnected', { id: client.userid } );
        log('info', 'socket.io: player ' + client.userid + ' connected')
        
        client.on('disconnect', function () {
            log('info', 'socket.io: client disconnected ' + client.userid)
        }); 
    }); 
}
