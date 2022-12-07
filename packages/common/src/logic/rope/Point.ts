import { IPoint } from './IPoint';

export class Point implements IPoint {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(point: IPoint): void {
    this.x += point.getX();
    this.y += point.getY();
  }

  subtract(point: IPoint): void {
    this.x -= point.getX();
    this.y -= point.getY();
  }

  scale(multiplier): void {
    this.x *= multiplier;
    this.y *= multiplier;
  }

  abs(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  copy(point): void {
    this.x = point.x;
    this.y = point.y;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  static origo(): Point {
    return new Point(0, 0);
  }

  static fromPoint(point: IPoint): Point {
    return new Point(point.getX(), point.getY());
  } 

}
