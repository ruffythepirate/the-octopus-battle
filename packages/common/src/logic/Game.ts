import { GameEventType, GameEventDto, PlayerControlsEventDto, PlayerDto, GameStateDto, AstroidDto, AstroidSpawnedEventDto, PlayerRespawnedEventDto } from '../dtos';
import {PlayerHitEventDto, PlayerKilledEventDto, PickUpAstroidEventDto} from '../dtos';
import { EventObserver } from './EventObserver';
import { PlayerState, AstroidState } from '../dtos';

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

            case GameEventType.PLAYER_HIT:
                const playerHitEvent = event as PlayerHitEventDto;
                const player = this.gameState.players.find(p => p.id === playerHitEvent.playerId);
                if(player) {
                    player.health -= 20;
                }
                break;
            case GameEventType.PLAYER_KILLED:
                const playerKilledEvent = event as PlayerKilledEventDto;
                const playerKilled = this.gameState.players.find(p => p.id === playerKilledEvent.playerId);
                if(playerKilled) {
                    playerKilled.state = PlayerState.Dead;
                }
                break;
            case GameEventType.PLAYER_RESPAWNED:
                const playerRespawnedEvent = event as PlayerRespawnedEventDto;
                const playerRespawned = this.gameState.players.find(p => p.id === playerRespawnedEvent.playerId);
                if(playerRespawned) {
                    playerRespawned.state = PlayerState.Alive;
                }
                break;

            case GameEventType.PICK_UP_ASTROID:
                const pickUpAstroidEvent = event as PickUpAstroidEventDto;
                this.handlePickUpAstroidEvent(pickUpAstroidEvent);

                break;
            default:
                console.error('Unknown event type: ' + event.type);
        }
    }

    handlePickUpAstroidEvent(pickUpAstroidEvent: PickUpAstroidEventDto) {
        const player = this.gameState.players.find(p => p.id === pickUpAstroidEvent.playerId);
        if(player) {
            const astroid = this.gameState.astroids.find(a => a.id === pickUpAstroidEvent.astroidId);
            if(astroid) {
                player.carriedAstroid = astroid.id;
                astroid.carriedByPlayerId = player.id;
                astroid.state = AstroidState.Attached;
            }
        }
    }
}
