import {PlayerControlsEventDto} from '../dtos';
import { Game } from './Game';
import { AstroidSpawnedEventDto, PlayerAction } from '../dtos/GameEventDto';


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
        const playerId = game.addPlayer(() => {});
        game.removePlayer(playerId);
        expect(game.gameState.players.length).toBe(0);
    });


    describe('Events', () => {
        it('should apply player controls event', () => {
            const playerId = game.addPlayer(() => {});
            const event = new PlayerControlsEventDto(playerId, PlayerAction.UP, true);
            expect(game.gameState.players[0].controls.up).toBe(false);
        });

        it('should apply astroid spawned event', () => {
            const event = new AstroidSpawnedEventDto(1, 5, 5);
            game.applyEvent(event);
            expect(game.gameState.astroids.length).toBe(1);
        });
    });
});
