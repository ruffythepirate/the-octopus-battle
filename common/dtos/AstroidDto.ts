import { AstroidState } from "../consts/AstroidEnum";

export default class AstroidDto {
  x: number;

  y: number;
  vx: number;
  vy: number;
  state: AstroidState;
}
