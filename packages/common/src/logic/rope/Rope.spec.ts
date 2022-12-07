import {RopeDto} from "../../dtos";
import {IPoint} from "./IPoint";
import {Point} from "./Point";
import {Rope} from "./Rope";

describe('Rope', () => {

  let anchorPoint: IPoint;

  beforeEach(() => {
    anchorPoint = new Point(0, 0);
  });

  describe('State', () => {

    it('Should be updatable from a Dto', () => {
      const ropeDto = new RopeDto(15);

      const rope = new Rope(anchorPoint, ropeDto);

      expect(rope.particles.length).toBe(15);
    });

    it('Should add constraints when constructing rope', () => {
      const ropeDto = new RopeDto(15);

      const rope = new Rope(anchorPoint, ropeDto);

      expect(rope.particles[1].constraints.length).toBeGreaterThan(0);
    });
  });

  describe('Update', () => {
    it('Should update all particles with verlet calc', () => {
      const ropeDto = new RopeDto(15);

      const rope = new Rope(anchorPoint, ropeDto);

      rope.update();

      // Interesting to test. I don't want to move business logic into the test.
      // I rather just want to see that the verlet calculation is called.
      // The mistake here is that the Rope creates the Particles themselves and hence
      // Doesn't make well for mocking them or the logic in them.
      // The construction of the Rope could have been done in a RopeFactory which would have opened up more possibilities with the testing. Being able to test the verlet calculation being called should not require you knowing anything about its internals.
    });

    it('Should ensure that constraints are kept.', () => {
      anchorPoint = new Point(0, 0);
      const ropeDto = new RopeDto(15);

      const rope = new Rope(anchorPoint, ropeDto);

      rope.update();

      // we expect the anchor point to be at 0,0
      //expect(rope.particles[0].currentPosition.getX()).toBe(0);
      //expect(rope.particles[0].currentPosition.getY()).toBe(0);
    });
  });
});
