import {IPoint} from "../logic/rope/IPoint";

export class VectorDto implements IPoint  {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}
