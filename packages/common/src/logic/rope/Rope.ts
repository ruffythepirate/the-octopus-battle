import {RopeDto} from "../../dtos";
import {Constraint} from "./Constraint";
import {IElement} from "./IElement";
import {IPoint} from "./IPoint";
import {Particle} from "./Particle";

export class Rope {

  particles: Particle[] = [];
  anchorPoint: IPoint;

  constructor(anchorPoint: IPoint, ropeDto: RopeDto) {
    this.particles = ropeDto.particles.map(particleDto => new Particle(particleDto));
    this.anchorPoint = anchorPoint;

    this.particles.forEach((particle, index) => {
      if (index > 0) {
        particle.addConstraint(new Constraint(this.particles[index - 1], 8));
      } else {
        particle.addConstraint(new Constraint(this.anchorPoint, 4));
      }
    });
  }


  update(): void {
    this.particles.forEach(particle => particle.verlet());
    // apply constraint calculation 17 times.
    for (let i = 0; i < 17; i++) {
      this.particles.forEach(particle => particle.satifyConstraints());
    }
  }
}
