import gameService from './gameService';

describe('gameService', () => {
    describe('getOrCreateAvailableGame', () => {
        beforeEach(() => {
            gameService.clearGames();
        });

        it('should return a gameDto', () => {
            const game = gameService.getOrCreateAvailableGame();
            expect(game).toBeDefined();
        });
    });
});
