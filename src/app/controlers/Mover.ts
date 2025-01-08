import Figure, { FigureConstructor } from "../figures/Figure";
import Glass from "../glass/Glass";
import Coordinate2D from "../setaps/vector-math/Coordinate2D";

class Mover {
  private glass: Glass;

  constructor(glass: Glass) {
    this.glass = glass;
  }

  public canMoveRight(position: Coordinate2D) {
    return !this.glass.isRightWoll(position.toAdd({ x: 1, y: 0 }));
  }

  public canMoveLeft(position: Coordinate2D) {
    return !this.glass.isLeftWoll(position.toAdd({ x: -1, y: 0 }));
  }

  public canBe(position: Coordinate2D) {
    return (
      !this.glass.isLeftWoll(position) && !this.glass.isRightWoll(position)
    );
  }

  public canRotate(figur: FigureConstructor[]) {
    return figur.reduce<boolean>((result, item) => {
      if (!result) {
        return result;
      }
      return this.canBe(item.position);
    }, true);
  }

  public move(figur: Figure, pressed: string) {
    if (pressed === "ArrowLeft" && this.canMoveLeft(figur.getLeftEnd())) {
      figur.move("Left");
    } else if (
      pressed === "ArrowRight" &&
      this.canMoveRight(figur.getRightEnd())
    ) {
      figur.move("Right");
    }
  }

  public rotate(figur: Figure, pressed: string) {
    if (pressed === "Space") {
      const nextState = figur.getNextRelate();
      if (this.canRotate(nextState)) {
        figur.rotate();
      }
    }
  }
}

export default Mover;
