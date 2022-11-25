import {GameStateDto} from "../dtos";
import { GameEventDto } from "../dtos/GameEventDto";
import {GameConstants} from "./GameConstants";



export function iterateGameState(gameState: GameStateDto, gameConstants: GameConstants): [GameStateDto, GameEventDto[]] {
  gameState.astroids.forEach(astroid => astroid.vy += gameConstants.g);

  gameState.players.forEach(player => {player.x += player.vx; player.y += player.vy;});

  return [gameState, []];
}
