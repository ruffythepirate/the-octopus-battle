import {Point} from "./Point";

describe('Point', () => {

  it('should initialize', () => {
    const point = new Point(1, 2);

    expect(point.getX()).toBe(1);
    expect(point.getY()).toBe(2);
  });

  it('should add', () => {
    const point = new Point(1, 2);
    point.add(new Point(2, 3));

    expect(point.getX()).toBe(3);
    expect(point.getY()).toBe(5);
  });

  it('should subtract', () => {
    const point = new Point(1, 2);
    point.subtract(new Point(2, 3));

    expect(point.getX()).toBe(-1);
    expect(point.getY()).toBe(-1);
  });

  it('should scale', () => {
    const point = new Point(1, 2);
    point.scale(2);

    expect(point.getX()).toBe(2);
    expect(point.getY()).toBe(4);
  });

  it('should calculate abs', () => {
    const point = new Point(3, 4);
    expect(point.abs()).toBe(5);
  });

  it('should copy', () => {
    const point = new Point(1, 2);
    point.copy(new Point(2, 3));

    expect(point.getX()).toBe(2);
    expect(point.getY()).toBe(3);
  });

  it('should clone', () => {
    const point = new Point(1, 2);
    const clone = point.clone();
    const point2 = new Point(2, 3);
    point.copy(point2);

    expect(clone.getX()).toBe(1);
    expect(clone.getY()).toBe(2);
  });
});
