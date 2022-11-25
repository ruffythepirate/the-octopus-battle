import { GameStateDto, AstroidDto } from "../dtos";

import { iterateGameState } from "./gameEngine";

describe('gameEngine', () => {
  describe('iterateGameState', () => {

    it('should make astroids move', () => {
      const gameState = new GameStateDto();
      const astroid = new AstroidDto(5, 5);
      gameState.astroids.push(astroid);

      const [newGameState] = iterateGameState(gameState);

      expect(newGameState.astroids[0].x).toBe(5);
      expect(newGameState.astroids[0].y).toBe(5);
      expect(newGameState.astroids[0].vy).toBeGreaterThan(0);
    });

  });
});
