import { drawFunctionArgumants } from "../components/AppBody";
import getNewFigur from "./controlers/getNewFigur";
import Mover from "./controlers/Mover";
import getDeepUniqValue from "./equal/getDeepUniqValue";
import isDeepEqualInBy from "./equal/isDeepEqualInBy";
import Figure, { FigureConstructor } from "./figures/Figure";
import Glass from "./glass/Glass";
import Render from "./render/Render";

export const before = ({ matrix }: drawFunctionArgumants) => {
  matrix.off();
  glass = new Glass(matrix);
  mover = new Mover(glass);
  render = new Render(matrix);
};

let glass: Glass;
let mover: Mover;
let render: Render;
let isPause: boolean;
let pixelsInGlass: FigureConstructor[] = [];
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

      if (pressNow === "KeyP") {
        if (isPause) {
          figur.unfrreze();
          isPause = false;
        } else {
          figur.frreze();
          isPause = true;
        }
      }

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
  render.getAllFullRows(pixelsInGlass);
  // console.log(render.getAllFullRows(pixelsInGlass));

  pixelsInGlass.forEach((cell) => {
    matrix.drawer.drawPixel(cell.position, cell.fill);
  });
};
