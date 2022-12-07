import {ParticleDto} from "../../dtos";
import {Constraint} from "./Constraint";
import {IElement} from "./IElement";
import {IVector} from "./IVector";
import {Point} from "./Point";

export class Particle  implements IElement {
  currentPosition: Point;
  lastPosition: Point;

  forceVectorPerStep = new Point(0, 9 * 0.4 * 0.4);

  constraints: Constraint[] = [];

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

  addConstraint(constraint: Constraint): void {
    this.constraints.push(constraint);
  }

  satifyConstraints(): void {
    this.constraints.forEach(constraint => {
      const dv = this.currentPosition.clone();
      dv.subtract(constraint.element);
      const d1 = dv.abs();
      let d2 = 0;
      if (d1 != 0) {
         d2 = 0.5 * (d1 - constraint.distance) / d1;
       }
       dv.scale(d2);
       this.currentPosition.subtract(dv);
       if ((constraint.element as IElement).applyDelta !== undefined) {
         (constraint.element as IElement).applyDelta(dv);
       } else {
         this.currentPosition.subtract(dv);
       }
    });
  }

  applyDelta(vector: IVector): void {
    this.currentPosition.add(vector);
  }

  getX(): number {
    return this.currentPosition.getX();
  }

  getY(): number {
    return this.currentPosition.getY();
  }
}
