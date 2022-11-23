
class PointDto {
    x: number;
    y: number;
}

class VectorDto {
    x: number;
    y: number;
}

class ParticleDto {
    position: PointDto;
    velocity: VectorDto;
    acceleration: VectorDto;
}

export default class RopeDto {
    particles: ParticleDto[];
}
