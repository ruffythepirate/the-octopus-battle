import { RopeDto } from "./RopeDto";

describe("RopeDto", () => {
  it("should create a rope", () => {
    const rope = new RopeDto(15);

    expect(rope.particles.length).toBe(15);
  });
});
