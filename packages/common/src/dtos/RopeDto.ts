import {IPoint} from "../logic/rope/IPoint";
import {VectorDto} from "./VectorDto";

export class PointDto implements IPoint {
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


export class ParticleDto {
  currentPosition: PointDto;
  lastPosition: PointDto;

  constructor(
    currentPosition: PointDto,
    lastPosition: PointDto
  ) {
    this.currentPosition = currentPosition;
    this.lastPosition = lastPosition;
  }
}

export class RopeDto {
  particles: ParticleDto[] = [];

  constructor(particleCount: number) {
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(
        new ParticleDto(
          new PointDto(0, 0),
          new VectorDto(0, 0),
        )
      );
    }
  }

  /**
   * Resets the rope based on this new position
   */
  resetRope(x: number, y: number) {
    this.particles[0].currentPosition = new PointDto(x, y);
    this.particles[0].lastPosition = new PointDto(x, y);

    for (let i = 1; i < this.particles.length; i++) {
      this.particles[i].currentPosition = new PointDto(x, y + i * 8);
    }
  }
}
