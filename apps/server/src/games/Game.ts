import {GameEventType, GameStateDto, PlayerDto} from '@the-octopus-battle/common';
import { v4 as uuid } from 'uuid';
import {PlayerCallbacks} from './PlayerCallbacks';

import { GameEventDto } from '@the-octopus-battle/common';

export class Game {
    playerCallbacks: PlayerCallbacks[];
    id: string;

    gameState: GameStateDto;

    constructor() {
        this.playerCallbacks = [];
        this.id = uuid();
        this.gameState = new GameStateDto();
    }

    removePlayer(playerId) {
        this.gameState.removePlayer(playerId);
        this.playerCallbacks = this.playerCallbacks.filter(player => player.playerId !== playerId);
    }

    getGameState() {
        return this.gameState;
    }
    
    addPlayer(eventCallback): PlayerDto {
        const id = this.gameState.players.length;
        const player = new PlayerDto(id);
        this.gameState.addPlayer(player);
        this.playerCallbacks.push(new PlayerCallbacks(id, eventCallback));
        return player;
    }

    getNumPlayers(): number {
        return this.gameState.players.length;
    }

    applyEvent(event: GameEventDto) {
        throw new Error('Not implemented');
    }
}
