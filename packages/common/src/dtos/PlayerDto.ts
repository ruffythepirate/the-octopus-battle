import {PlayerControls, applyControlEvent} from './PlayerControls';
import { RopeDto } from './RopeDto';
import { PlayerControlsEventDto } from '../logic/events/GameEventDto';

export enum PlayerState {
  Alive = 'Alive',
  Dead = 'Dead',
  JustHit = 'JustHit',
}

/**
 * DTO class that represents an active player in the game. This is the necessary information to know where a player should be rendered.
 */
export class PlayerDto {
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
   * Represents the current state of the player
   */
  state: PlayerState = PlayerState.Alive;

  health: number = 100;

  carriedAstroid: number | null = null;

  controls: PlayerControls = new PlayerControls();

  /**
   * The player's rope.
   */
  rope: RopeDto = new RopeDto();

  constructor(id: number) {
    this.id = id;
  }

  applyControlEvent(event: PlayerControlsEventDto) {
    this.controls = applyControlEvent(this.controls, event);
  }
}
