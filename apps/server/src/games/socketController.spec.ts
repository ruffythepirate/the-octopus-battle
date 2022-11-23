import { setupSocketIO } from "./socketController";
import Client from "socket.io-client";
import { createServer } from "http";

describe('socketController', () => {

    let io, serverSocket, clientSocket, port;

    beforeAll((done) => {
        const httpServer = createServer();
        httpServer.listen(() => {
            const address = httpServer.address() as any;
            port = address.port;
            io = setupSocketIO(httpServer);
            done();
        });
    });

    async function connectClientSocket(port): Promise<any> {
        const clientSocket = Client(`http://localhost:${port}`);
        return new Promise((resolve) => {
            clientSocket.on("connect", () => {
                resolve(clientSocket);
            });
        });
    }

    afterAll(async () => {
        await io.close();
    });

    it('should respond to state request', async () => {
        const clientSocket = await connectClientSocket(port)
        await new Promise((resolve) => {
            clientSocket.emit('state', {}, (state) => {
                console.log('state', state);
                expect(state.players.length).toBe(1);
                resolve({});
            })
        });
        clientSocket.close();
    });

    it('should join 2nd player to same game', async () => {
        const firstClientSocket = await connectClientSocket(port)
        const secondClientSocket = await connectClientSocket(port)

        await new Promise((resolve) => {
            secondClientSocket.emit('state', {}, (state) => {
                console.log('state', state);
                expect(state.players.length).toBe(2);
                resolve({});
            })
        });

        await firstClientSocket.close();
        await secondClientSocket.close();
    });
});
