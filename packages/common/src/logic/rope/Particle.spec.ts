import {ParticleDto, PointDto} from "../../dtos";
import {Particle} from "./Particle";

describe('Particle', () => {

  let particleDto: ParticleDto;

  beforeEach(() => {
    particleDto = new ParticleDto(new PointDto(1, 2), new PointDto(3, 4));
  });

  it('should initialize', () => {
    const particle = new Particle(particleDto);

    expect(particle.currentPosition.getX()).toBe(1);
    expect(particle.currentPosition.getY()).toBe(2);
    expect(particle.lastPosition.getX()).toBe(3);
    expect(particle.lastPosition.getY()).toBe(4);
  });

  it('should execute verlet calculation with acceleration', () => {
    particleDto = new ParticleDto(new PointDto(0, 0), new PointDto(0, 0));

    const particle = new Particle(particleDto);
    particle.verlet();

    expect(particle.currentPosition.getX()).toBe(0);
    expect(particle.currentPosition.getY()).toBeGreaterThan(0);
    expect(particle.lastPosition.getX()).toBe(0);
    expect(particle.lastPosition.getY()).toBe(0);
  });

  it('should execute verlet calculation with velocity', () => {
    particleDto = new ParticleDto(new PointDto(0, 0), new PointDto(-1, 0));

    const particle = new Particle(particleDto);
    particle.verlet();

    expect(particle.currentPosition.getX()).toBeGreaterThan(0);
    expect(particle.currentPosition.getY()).toBeGreaterThan(0);
    expect(particle.lastPosition.getX()).toBe(0);
    expect(particle.lastPosition.getY()).toBe(0);
  });
});
