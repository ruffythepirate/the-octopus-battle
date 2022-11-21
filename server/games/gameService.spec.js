import { joinGame, cleanGames } from './gameService';

describe('gameService', () => {
    describe('joinGame', () => {
        beforeEach(() => {
            cleanGames();
        });

        it('should join a game', () => {
            let game = joinGame();
            
            expect(game).toBeDefined();
        });

        it('should create a new game if no game is available', () => {
            let game = joinGame();
            
            expect(game.players.length).toBe(1);
        });

        it('should join existing game if available', () => {
            let game = joinGame();
            joinGame();
            
            expect(game.players.length).toBe(2);
        });
    });
});
