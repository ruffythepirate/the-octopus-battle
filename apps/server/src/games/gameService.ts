
import Game from './Game';

import { GameStateDto } from '@the-octopus-battle/common';

import { MAX_ONLINE_PLAYERS } from '@the-octopus-battle/common';

class GameService {
    games: Game[];
    gameDtos: GameStateDto[];

    constructor() {
        this.games = [];
        this.gameDtos = [];
    }

    clearGames() {
        this.games = [];
        this.gameDtos = [];
    }

    joinGame(): Game {
        let game = this.games.find(game => game.players.length < MAX_ONLINE_PLAYERS);
        if (!game) {
            game = new Game();
            this.games.push(game);
        }
        game.addPlayer();
        return game;
    }

    getOrCreateAvailableGame(): GameStateDto | undefined {
        let gameDto = this.gameDtos.find((gameDto) => gameDto.players.length < MAX_ONLINE_PLAYERS);

        if (!gameDto) {
            gameDto = new GameStateDto();
            this.gameDtos.push(gameDto);
        }
        return gameDto;
    }
}

export default new GameService();
