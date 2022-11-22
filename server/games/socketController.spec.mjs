import { setupSocketIO } from "./socketController.mjs";
import Client from "socket.io-client";
import { createServer } from "http";


describe('socketController', () => {

    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        httpServer.listen(() => {
            const port = httpServer.address().port;
            io = new Server(httpServer);
            setupSocketIO(io);
            clientSocket = new Client(`http://localhost:${port}`);
            clientSocket.on("connect", () => {
                serverSocket = io.sockets.sockets[clientSocket.id];
                done();
            });
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    it('should respond to state request', (done) => {
        clientSocket.emit('state', (state) => {
            expect(state).toEqual({ beat: 1 });
            done();
        });
    });

    it('should join 2nd player to same game', (done) => {
    });
}
