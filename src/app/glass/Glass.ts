import { coordinate } from "../../surse/intefases";
import Matrix from "../../surse/Matrix";
import Coordinate2D from "../setaps/vector-math/Coordinate2D";
import IWolls from "./IWolls";

class Glass {
  public wolls: IWolls;
  constructor(matrix: Matrix) {
    this.wolls = {
      right: matrix.columns,
      left: 0,
      down: matrix.rows,
      up: 0,
    };
  }

  public isFloor(position: Coordinate2D | coordinate): boolean {
    return position.y >= this.wolls.down;
  }

  public isRightWoll(position: Coordinate2D | coordinate): boolean {
    return position.x >= this.wolls.right;
  }

  public isLeftWoll(position: Coordinate2D | coordinate): boolean {
    return position.x < this.wolls.left;
  }
}

export default Glass;
