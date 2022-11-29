import { PlayerControlsEventDto } from '../dtos';
import { Game } from './Game';
import { AstroidSpawnedEventDto, GameEventType, PickUpAstroidEventDto, PlayerAction, PlayerHitEventDto, PlayerKilledEventDto, PlayerRespawnedEventDto } from './events/GameEventDto';
import { PlayerState } from '../dtos';
import { SpawnAstroid } from './commands/GameCommands';


describe('Game', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    describe('Init', () => {
        it('should create an instance', () => {
            expect(game).toBeTruthy();
        });
    });

    describe('Direct Calls', () => {
        it('should add player when calling join', () => {
            game.addPlayer(() => { });
            expect(game.gameState.players.length).toBe(1);
        });

        it('should remove player when calling leave', () => {
            const playerId = game.addPlayer(() => { });
            game.removePlayer(playerId);
            expect(game.gameState.players.length).toBe(0);
        });
    });

    describe('Iterate', () => {
        it('Should spawn Astroid', () => {
            const command = new SpawnAstroid(5, 5)
            const events = game.applyCommand(command);
            expect(events.length).toBe(1);
            expect(events[0].type).toBe(GameEventType.ASTROID_SPAWNED);
        });

        it('Should apply pending events on iterate', () => {
            const command = new SpawnAstroid(5, 5)
            game.applyCommand(command);

            const events = game.iterate();
            expect(events.length).toBe(1);
            expect(events[0].type).toBe(GameEventType.ASTROID_SPAWNED);
        });

        it('Should clear pending events after iterate', () => {
            const command = new SpawnAstroid(5, 5)
            game.applyCommand(command);

            // return one event
            game.iterate();
            // Should be empty
            const events = game.iterate();
            expect(events.length).toBe(0);
        });
    });


    describe('Events', () => {
        it('should apply player controls event', () => {
            const playerId = game.addPlayer(() => { });
            const event = new PlayerControlsEventDto(playerId, PlayerAction.UP, true);
            expect(game.gameState.players[0].controls.up).toBe(false);
        });

        it('should apply astroid spawned event', () => {
            const event = new AstroidSpawnedEventDto(1, 5, 5);
            game.applyEvent(event);
            expect(game.gameState.astroids.length).toBe(1);
        });

        it('should apply player hit event', () => {
            const playerId = game.addPlayer(() => { });
            const astroid = new AstroidSpawnedEventDto(1, 5, 5);
            game.applyEvent(astroid);
            expect(game.gameState.players[0].health).toBe(100);
            const playerHitEvent = new PlayerHitEventDto(playerId, 1);
            game.applyEvent(playerHitEvent);
            expect(game.gameState.players[0].health).toBeLessThan(100);
        });

        it('should update player state when dead', () => {
            const playerId = game.addPlayer(() => { });
            const playerKilledEvent = new PlayerKilledEventDto(playerId);
            game.applyEvent(playerKilledEvent);
            expect(game.gameState.players[0].state).toBe(PlayerState.Dead);
        });

        it('should set player state to alive when respawned', () => {
            const playerId = game.addPlayer(() => { });
            const playerKilledEvent = new PlayerKilledEventDto(playerId);
            game.applyEvent(playerKilledEvent);
            expect(game.gameState.players[0].state).toBe(PlayerState.Dead);
            const playerRespawnedEvent = new PlayerRespawnedEventDto(playerId);
            game.applyEvent(playerRespawnedEvent);
            expect(game.gameState.players[0].state).toBe(PlayerState.Alive);
        });

        it('should update carried astroid when player picks up', () => {
            const playerId = game.addPlayer(() => { });
            const astroid = new AstroidSpawnedEventDto(1, 5, 5);
            game.applyEvent(astroid);
            const pickUpEvent = new PickUpAstroidEventDto(playerId, 1);
            game.applyEvent(pickUpEvent);
            expect(game.gameState.players[0].carriedAstroid).toBe(1);
            expect(game.gameState.astroids[0].carriedByPlayerId).toBe(playerId);
        });
    });
});
