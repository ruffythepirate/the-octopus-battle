import {PlayerControls, PlayerControlsEventDto, RopeDto} from "../../dtos";
import {IPoint} from "../rope/IPoint";
import {Point} from "../rope/Point";
import {Rope} from "../rope/Rope";


/**
 * This class should be able to update acceleration etc of a player. It should also be 
 * able to update the rope of the player. It should know if the player is dead or not. Basically
 * it should do everything except rendering of the player.
 */
export class Player implements IPoint {

  id: number;
  position: IPoint;
  velocity: IPoint;
  rope: Rope;
  playerControls: PlayerControls;

  constructor(id) {
    const ropeDto = new RopeDto(15);

    this.id = id;
    this.position = new Point(0, 0);
    this.velocity = new Point(0, 0);
    this.rope = new Rope(this, ropeDto);
    this.playerControls = new PlayerControls();
  }

  applyControlEvent(event: PlayerControlsEventDto) {
    this.playerControls.applyEvent(event);
  }

  getX(): number {
    return this.position.getX();
  }

  getY(): number {
    return this.position.getY();
  }


  update(canvas: HTMLCanvasElement) {
    this.rope.update();
  }

}
