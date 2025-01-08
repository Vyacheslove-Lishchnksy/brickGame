import { figures } from "../figures";
import Figure from "../figures/Figure";
import { blue, green, red, white } from "../setaps/colorama/colors";
import { getRandom } from "../setaps/ramdom";

const colors = [white, red, blue, green];

function getNewFigur(): Figure {
  return new figures[getRandom(0, figures.length)](
    { x: 2, y: -6 },
    colors[getRandom(0, colors.length)]
  );
}

export default getNewFigur;
