import { GameEventType, GameEventDto, PlayerControlsEventDto, PlayerDto, GameStateDto, AstroidDto, AstroidSpawnedEventDto } from '../dtos';
import { EventObserver } from './EventObserver';

export class Game {
    eventObservers: EventObserver[] = [];
    gameState: GameStateDto;

    constructor() {
        this.gameState = new GameStateDto();
    }

    removePlayer(playerId) {
        this.gameState.removePlayer(playerId);
    }

    getGameState() {
        return this.gameState;
    }
    
    addPlayer(eventCallback): number {
        const id = this.gameState.players.length;
        const player = new PlayerDto(id);
        this.gameState.addPlayer(player);
        return player.id;
    }

    getNumPlayers(): number {
        return this.gameState.players.length;
    }

    applyEvent(event: GameEventDto) {
        switch (event.type) {
            case GameEventType.PLAYER_CONTROLS:
                const controlsEvent = event as PlayerControlsEventDto;
                break;
            case GameEventType.ASTROID_SPAWNED:
                const astroidSpawnedEvent = event as AstroidSpawnedEventDto;
                const astroid = AstroidDto.fromEvent(astroidSpawnedEvent);
                this.gameState.astroids.push(astroid);
                break;
            default:
                console.error('Unknown event type: ' + event.type);
        }
    }
}
