import { setupSocketIO } from "./socketController";
import Client from "socket.io-client";
import { createServer } from "http";

describe('socketController', () => {

    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        httpServer.listen(() => {
            const address = httpServer.address() as any;
            const port = address.port;
            io = setupSocketIO(httpServer);
            clientSocket = Client(`http://localhost:${port}`);
            clientSocket.on("connect", () => {
                serverSocket = io.sockets.sockets[clientSocket.id];
                done();
            });
        });
    });

    afterAll(async () => {
        await io.close();
        await clientSocket.close();
    });

    it('should respond to state request', (done) => {

        clientSocket.emit('state', (state) => {
            expect(state).toBeDefined();
            done();
        });
    });

    it('should join 2nd player to same game', (done) => {
        done();
    });
});
