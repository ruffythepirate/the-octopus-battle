import Game from './Game.mjs';



let games = [];

export function cleanGames() {
    games = [];
}

export function joinGame() {
    let game = games.find(game => game.players.length < 6);
    if(!game) {
        game = new Game();
        games.push(game);
    }
    game.addPlayer();
    return game;
}
