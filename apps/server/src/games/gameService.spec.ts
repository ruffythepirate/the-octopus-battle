import gameService from './gameService';

describe('gameService', () => {
    describe('getOrCreateAvailableGame', () => {
        beforeEach(() => {
        });

        it('should return a gameDto', () => {
            const game = gameService.getOrCreateAvailableGame();
            expect(game).toBeDefined();
        });
    });

    describe('joinGame', () => {
        beforeEach(() => {
            gameService.clearGames();
        });

        it('should join a game', () => {
            let game = gameService.joinGame();
            
            expect(game).toBeDefined();
        });

        it('should create a new game if no game is available', () => {
            let game = gameService.joinGame();
            
            expect(game.players.length).toBe(1);
        });

        it('should join existing game if available', () => {
            let game = gameService.joinGame();
            gameService.joinGame();
            
            expect(game.players.length).toBe(2);
        });
    });
});
