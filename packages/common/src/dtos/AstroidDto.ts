import { AstroidState } from "../consts/AstroidEnum";

export class AstroidDto {
  x: number;

  y: number;
  vx: number = 0.0;
  vy: number = 0.0;
  state: AstroidState = AstroidState.Unattached;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
