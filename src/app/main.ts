import { drawFunctionArgumants } from "../components/AppBody";
import getNewFigur from "./controlers/getNewFigur";
import Mover from "./controlers/Mover";
import isDeepEqualInBy from "./equal/isDeepEqualInBy";
import Figure, { FigureConstructor } from "./figures/Figure";
import Glass from "./glass/Glass";

export const before = ({ matrix }: drawFunctionArgumants) => {
  matrix.off();
  glass = new Glass(matrix);
  mover = new Mover(glass);
};

let glass: Glass;
let mover: Mover;
const pixelsInGlass: FigureConstructor[] = [];
const fallingFigures: Figure[] = [];

export const draw = ({ matrix, pressNow }: drawFunctionArgumants) => {
  matrix.off();

  if (fallingFigures.length === 0) {
    fallingFigures.push(getNewFigur());
  }

  fallingFigures.forEach((figur) => {
    figur.goDown();
    const currentFigur = figur.getState();
    currentFigur.forEach((cell) => {
      matrix.drawer.drawPixel(cell.position, cell.fill);
    });

    if (pressNow) {
      mover.move(figur, pressNow);

      mover.rotate(figur, pressNow);
    }

    const nextState = figur.nextStep();

    nextState.forEach((cell) => {
      if (
        glass.isFloor(cell.position) ||
        isDeepEqualInBy(pixelsInGlass, cell, ["position"])
      ) {
        currentFigur.forEach((cell) => {
          pixelsInGlass.push(cell);
        });
        fallingFigures.pop();
      }
    });
  });

  pixelsInGlass.forEach((cell) => {
    matrix.drawer.drawPixel(cell.position, cell.fill);
  });
};
