import {ParticleDto} from "../../dtos";
import {Point} from "./Point";

export class Particle {
  currentPosition: Point;
  lastPosition: Point;

  forceVectorPerStep = new Point(0, 9 * 0.4 * 0.4);



  constructor(particleDto: ParticleDto) {
    this.currentPosition = Point.fromPoint(particleDto.currentPosition);
    this.lastPosition = Point.fromPoint(particleDto.lastPosition);
  }

  /**
   * Updates the positions based on verlet calculation.
   */
  verlet(): void {
    let tempPoint = new Point(0, 0);

    tempPoint = Point.fromPoint(this.currentPosition);

    const velocityVector = this.currentPosition.clone();
    velocityVector.subtract(this.lastPosition);

    this.currentPosition.add(velocityVector);
    this.currentPosition.add(this.forceVectorPerStep);
    this.lastPosition.copy(tempPoint);
  }

}
