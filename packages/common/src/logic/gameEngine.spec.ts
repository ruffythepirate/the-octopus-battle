import { GameStateDto, AstroidDto, PlayerDto, PlayerControlsEventDto, PlayerAction } from "../dtos";

import { iterateGameState } from "./gameEngine";

import { gameConstants } from "./GameConstants";
import {PlayerControls} from "../dtos/PlayerControls";

describe('gameEngine', () => {
  describe('iterateGameState', () => {

    it('should iterate game state iteration', () => {
      const gameState = new GameStateDto();
      const oldIteration = gameState.iteration;

      const [newGameState] = iterateGameState(gameState, gameConstants);

      expect(newGameState.iteration).toBeGreaterThan(oldIteration);
    });


    it('should make astroids move', () => {
      const gameState = new GameStateDto();
      const astroid = new AstroidDto(5, 5);
      gameState.astroids.push(astroid);

      const [newGameState] = iterateGameState(gameState, gameConstants);

      expect(newGameState.astroids[0].x).toBe(5);
      expect(newGameState.astroids[0].y).toBe(5);
      expect(newGameState.astroids[0].vy).toBeGreaterThan(0);
    });

    it('should move players', () => {
      const gameState = new GameStateDto();
      const player = new PlayerDto(5);
      player.x = 10;
      player.y = 10;
      player.vx = 1;
      player.vy = -1;

      gameState.players.push(player);

      const [newGameState] = iterateGameState(gameState, gameConstants);

      expect(newGameState.players[0].x).toBe(11);
      expect(newGameState.players[0].y).toBe(9);
    });

    it('should apply player controls', () => {
      const gameState = new GameStateDto();
      const player = new PlayerDto(5);
      player.applyControlEvent(new PlayerControlsEventDto(5, PlayerAction.UP, true));
      player.applyControlEvent(new PlayerControlsEventDto(5, PlayerAction.RIGHT, true));
      gameState.addPlayer(player);
      player.x = 10;
      player.y = 10;

      gameState.players.push(player);

      const [newGameState] = iterateGameState(gameState, gameConstants);

      expect(newGameState.players[0].ax).toBeGreaterThan(0);
      expect(newGameState.players[0].ay).toBeLessThan(0);
    });
  });
});
