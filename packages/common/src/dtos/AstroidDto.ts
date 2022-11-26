import { AstroidSpawnedEventDto } from "./GameEventDto";


export enum AstroidState {
  Unattached = 0,
  Attached = 1,
  Fired = 2,
}

export class AstroidDto {
  id: number = 0;
  x: number;
  y: number;
  vx: number = 0.0;
  vy: number = 0.0;
  carriedByPlayerId: number | null = null;
  state: AstroidState = AstroidState.Unattached;

  static fromEvent(event: AstroidSpawnedEventDto): AstroidDto {
    const astroid = new AstroidDto(event.x, event.y);
    astroid.id = event.astroidId;

    return astroid;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
