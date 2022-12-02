import {RopeDto} from "../../dtos";
import {IElement} from "./IElement";

export class Rope {
  ropeDto: RopeDto

  constructor(ropeDto: RopeDto) {
    this.ropeDto = ropeDto;
  }
}
