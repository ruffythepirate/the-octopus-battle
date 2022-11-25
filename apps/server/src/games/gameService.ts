
import { Game } from './Game';

import { GameStateDto } from '@the-octopus-battle/common';

import { MAX_ONLINE_PLAYERS } from '@the-octopus-battle/common';

class GameService {
    games: Game[];

    constructor() {
        this.games = [];
    }

    clearGames() {
        this.games = [];
    }

    getOrCreateAvailableGame(): Game {
        let game = this.games.find((game) => game.players.length < MAX_ONLINE_PLAYERS);

        if (!game) {
            game = new Game();
            this.games.push(game);
        }
        return game;
    }
}

export default new GameService();
