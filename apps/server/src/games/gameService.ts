import { GameDto } from '../../../common/src/dtos/gameDto';

let games: GameDto[] = [];

export function cleanGames() {
    games = [];
}

export function getAvailableGame(): GameDto {
    let game = games.find(game => game.players.length < 6);
    if(!game) {
        game = new Game();
        games.push(game);
    }
    return game;
}
