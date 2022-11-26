import { Game } from './Game';


describe('Game', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    it('should create an instance', () => {
        expect(game).toBeTruthy();
    });

    it('should add player when calling join', () => {
        game.addPlayer(() => {});
        expect(game.gameState.players.length).toBe(1);
    });

    it('should remove player when calling leave', () => {
        const player = game.addPlayer(() => {});
        game.removePlayer(player.id);
        expect(game.gameState.players.length).toBe(0);
    });
});
