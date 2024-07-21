import { Color } from "../enums";

import IPiece from "../interfaces/IPiece";

export default abstract class Piece implements IPiece {
  color: Color;
  image: string;
  position: number[];

  constructor(color: Color, image: string, position: number[]) {
    this.color = color;
    this.image = image;
    this.position = position;
  }

  public abstract getPossibleMoves(board: (Piece | null)[][]): number[][];

  public moveToSquare = (
    board: (Piece | null)[][],
    position: number[]
  ): (Piece | null)[][] => {
    // Remove piece from the previous position
    const newBoard: (Piece | null)[][] = [...board];
    newBoard[this.position[0]][this.position[1]] = null;

    // Add piece to the new position
    this.position = position;
    newBoard[position[0]][position[1]] = this;

    return newBoard;
  };
}
