
import Game from './Game';

let games: Game[] = [];

export function cleanGames() {
    games = [];
}

export function joinGame(): Game {
    let game = games.find(game => game.players.length < 6);
    if(!game) {
        game = new Game();
        games.push(game);
    }
    return game;
}
