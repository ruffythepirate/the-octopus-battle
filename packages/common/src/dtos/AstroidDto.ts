import { AstroidState } from "../consts/AstroidEnum";
import { AstroidSpawnedEventDto } from "./GameEventDto";

export class AstroidDto {
  id: number = 0;
  x: number;
  y: number;
  vx: number = 0.0;
  vy: number = 0.0;
  state: AstroidState = AstroidState.Unattached;

  static fromEvent(event: AstroidSpawnedEventDto): AstroidDto {
    const astroid = new AstroidDto(event.x, event.y);

    return astroid;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
