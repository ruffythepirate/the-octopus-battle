import {IPoint} from "../logic/rope/IPoint";

export class ParticleDto {
  currentPosition: IPoint;
  lastPosition: IPoint;

  constructor(
    currentPosition: IPoint,
    lastPosition: IPoint
  ) {
    this.currentPosition = currentPosition;
    this.lastPosition = lastPosition;
  }
}
