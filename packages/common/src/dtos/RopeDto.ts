
class PointDto {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class VectorDto {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class ParticleDto {
    position: PointDto;
    velocity: VectorDto;
    acceleration: VectorDto;

    constructor(position: PointDto, velocity: VectorDto, acceleration: VectorDto) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
}

export default class RopeDto {
    particles: ParticleDto[] = [];
}
