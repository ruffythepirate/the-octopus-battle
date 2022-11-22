import { v4 as uuid } from 'uuid';

export default class Game {
    constructor() {
        this.players = [];
        this.id = uuid();
    }
    
    addPlayer() {
        const player = {
            id: this.players.length + 1,
            name: 'Player ' + (this.players.length + 1),
            score: 0
        };
        this.players.push(player);
    }
    
    getPlayers() {
        return this.players;
    }
}
