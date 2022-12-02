import {IVector} from "./IVector";

export interface IElement {
  getX(): number;
  getY(): number;
  applyDelta(vector: IVector) : void;
}
