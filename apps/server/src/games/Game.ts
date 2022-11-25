import {GameStateDto, PlayerDto} from '@the-octopus-battle/common/src';
import { v4 as uuid } from 'uuid';

export class Game {
    players: any[];
    id: string;

    gameState: GameStateDto;

    constructor() {
        this.players = [];
        this.id = uuid();
        this.gameState = new GameStateDto();
    }

    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    getGameState() {
        return this.gameState;
    }
    
    addPlayer(eventCallback) {
        const id = this.gameState.players.length;
        const player = new PlayerDto(id);
        this.gameState.addPlayer(player);
        this.players.push(player);
    }
    
    getPlayers() {
        return this.players;
    }
}
