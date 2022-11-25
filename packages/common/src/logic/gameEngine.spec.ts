import { GameStateDto, AstroidDto, PlayerDto } from "../dtos";

import { iterateGameState } from "./gameEngine";

import { gameConstants } from "./GameConstants";

describe('gameEngine', () => {
  describe('iterateGameState', () => {

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

  });
});
