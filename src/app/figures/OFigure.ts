import { backgroundColor, coordinate } from "../../surse/intefases";
import Figure from "./Figure";

class OFigure extends Figure {
  constructor({ x, y }: coordinate, fill: backgroundColor) {
    super({ x, y }, fill);
    this.forms = [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
      ],
    ];
  }
}

export default OFigure;
