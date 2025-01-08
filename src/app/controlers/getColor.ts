import { backgroundColor, coordinate } from "../../surse/intefases";
import Matrix from "../../surse/Matrix";

function getColor(matrix: Matrix, position: coordinate): backgroundColor {
  return matrix.body[matrix.adaptCoordinate(position)];
}

export default getColor;
