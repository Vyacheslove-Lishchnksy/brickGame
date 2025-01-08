import { backgroundColor, coordinate } from "../../surse/intefases";
import Matrix from "../../surse/Matrix";
import drawByTemplate from "../setaps/drawer/drawByTemplate";
import Coordinate2D from "../setaps/vector-math/Coordinate2D";
import Vector2D from "../setaps/vector-math/Vector2D";

class Figure {
  public forms: number[][][] = [];
  public currentForm: number = 0;
  public position: Coordinate2D;
  public fill: backgroundColor;
  public isFoling: boolean = true;
  public direction: Vector2D = new Vector2D({ x: 0, y: 1 });

  constructor({ x, y }: coordinate, fill: backgroundColor) {
    this.position = new Coordinate2D({ x, y });
    this.fill = fill;
  }

  public frreze() {
    this.isFoling = false;
  }

  public unfrreze() {
    this.isFoling = true;
  }

  public goDown() {
    if (this.isFoling) {
      this.position = this.position.toAdd(this.direction);
    }
  }

  public draw(matrix: Matrix) {
    drawByTemplate(matrix, this.forms[this.currentForm], {
      position: this.position,
      fill: this.fill,
    });
  }

  public getState(): FigureConstructor[] {
    const result: FigureConstructor[] = [];
    this.forms[this.currentForm].map((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          result.push({
            position: new Coordinate2D({ x, y }).toAdd(this.position),
            fill: this.fill,
          });
        }
      });
    });

    return result;
  }
  public rotate() {
    if (this.isFoling) {
      this.currentForm = (this.currentForm + 1) % this.forms.length;
    }
  }

  public move(pressed: "Left" | "Right") {
    if (pressed === "Left") {
      this.position = this.position.toAdd(new Vector2D({ x: -1, y: 0 }));
    } else if (pressed === "Right") {
      this.position = this.position.toAdd(new Vector2D({ x: 1, y: 0 }));
    }
  }

  public getBottomEnd(): Coordinate2D {
    let result = { x: -1, y: -1 };
    this.forms[this.currentForm].forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          result = { x, y };
        }
      });
    });
    return new Coordinate2D(result).toAdd(this.position);
  }

  public getRightEnd(): Coordinate2D {
    let result = { x: -1, y: -1 };
    let currentX = result.x;
    this.forms[this.currentForm].forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          if (x >= currentX) {
            currentX = x;
            result = { x, y };
          }
        }
      });
    });
    return new Coordinate2D(result).toAdd(this.position);
  }

  public getLeftEnd(): Coordinate2D {
    let result = { x: 5, y: 5 };
    let currentX = result.x;

    this.forms[this.currentForm].forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          if (x <= currentX) {
            currentX = x;
            result = { x, y };
          }
        }
      });
    });
    return new Coordinate2D(result).toAdd(this.position);
  }

  public nextStep(): FigureConstructor[] {
    if (this.isFoling) {
      return this.getState().map<FigureConstructor>((cell) => {
        return {
          position: cell.position.toAdd(this.direction),
          fill: cell.fill,
        };
      });
    } else {
      return this.getState();
    }
  }

  public getNextRelate(): FigureConstructor[] {
    const result: FigureConstructor[] = [];
    this.forms[(this.currentForm + 1) % this.forms.length].map((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          result.push({
            position: new Coordinate2D({ x, y }).toAdd(this.position),
            fill: this.fill,
          });
        }
      });
    });

    return result;
  }
}

export interface FigureConstructor extends Record<string, unknown> {
  position: Coordinate2D;
  fill: backgroundColor;
}

export default Figure;
