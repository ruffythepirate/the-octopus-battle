import {GameStateDto} from "../dtos";
import { GameEventDto } from "./events/GameEventDto";
import {GameConstants} from "./GameConstants";



export function iterateGameState(gameState: GameStateDto,  gameConstants: GameConstants, pendingEvents: GameEventDto[] = []): [GameStateDto, GameEventDto[]] {
  gameState.astroids.forEach(astroid => astroid.vy += gameConstants.g);

  updateControls(gameState, gameConstants);

  gameState.players.forEach(player => {player.x += player.vx; player.y += player.vy;});

  gameState.iteration++;

  return [gameState, pendingEvents];
}

function updateControls(gameState: GameStateDto, gameConstants: GameConstants) {
  gameState.players.forEach(player => {
    let controls = player.controls;
    if (controls) {
      if (controls.up) {
        player.ay -= gameConstants.vAcceleration;
      }
      if (controls.down) {
        player.ay += gameConstants.vAcceleration;
      } 
      if( controls.left) {
        player.ax -= gameConstants.hAcceleration;
      }
      if (controls.right) {
        player.ax += gameConstants.hAcceleration;
      }
    }
  });
}
