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
  x: number = 0.0;
  /**
   * The y coordinate of the player
   */
  y: number = 0.0;
  /**
   * The x velocity of the player
   */
  vx: number = 0.0;
  /**
   * The y velocity of the player
   */
  vy: number = 0.0;
  /**
   * The x acceleration of the player
   */
  ax: number = 0.0;
  /**
   * The y acceleration of the player
   */
  ay: number = 0.0;

  /**
   * The player's rope.
   */
  rope: RopeDto = new RopeDto();

  constructor(id: number) {
    this.id = id;

  }
}
