import {IElement} from "./IElement";
import {IPoint} from "./IPoint";

export class Constraint {
  element: IElement | IPoint;
  distance: number;

  constructor(element: IElement | IPoint, distance: number) {
    this.element = element;
    this.distance = distance;
  }


}

