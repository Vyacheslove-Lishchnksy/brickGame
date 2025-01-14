import Matrix from "../../surse/Matrix";
import getDeepUniqValue from "../equal/getDeepUniqValue";
import { FigureConstructor } from "../figures/Figure";

class Render {
  private matrix: Matrix;

  constructor(matrix: Matrix) {
    this.matrix = matrix;
  }

  public getAllFullRows(glass: FigureConstructor[]) {
    const result: number[] = [];
    const unicGlass = getDeepUniqValue<FigureConstructor>(glass);
    console.log(unicGlass);

    for (let y = 0; y < this.matrix.rows - 1; y++) {
      const activePixels: FigureConstructor[] = [];
      activePixels.push(
        ...unicGlass.filter((value) => {
          return value.position.y === y;
        })
      );
      if (activePixels.length > this.matrix.columns) {
        console.log(activePixels);

        result.push(y);
      }
    }
    return result;
  }
}

export default Render;
