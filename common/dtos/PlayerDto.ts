import RopeDto from './RopeDto';

/**
 * DTO class that represents an active player in the game. This is the necessary information to know where a player should be rendered.
 */
export default class PlayerDto {
  /**
   * The player's unique id.
   * @type {number}
   * @memberof PlayerDto
   * @example 1
   */
  id: number;
  /**
   * The x coordinate of the player
   */
  x: number;
  /**
   * The y coordinate of the player
   */
  y: number;
  /**
   * The x velocity of the player
   */
  vx: number;
  /**
   * The y velocity of the player
   */
  vy: number;
  /**
   * The x acceleration of the player
   */
  ax: number;
  /**
   * The y acceleration of the player
   */
  ay: number;

  /**
   * The player's rope.
   */
  rope: RopeDto;
}
