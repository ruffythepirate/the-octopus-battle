import request from 'supertest';
import express from  'express' ;
import { cleanGames } from  './gameService' ;

let app = express();
app.use('/games', require('./routes'));

describe("games routes", () => {
    beforeEach(() => {
        cleanGames();
    });

    describe("POST /games/online-players", () => {
        it("should return 200 OK", () => {
            return request(app)
                .post("/games/online-players")
                .expect(200).then(response => {
                    expect(response.body.players).toBeDefined();
                });
        });
    });
});
