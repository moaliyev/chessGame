import { Color } from "../enums";
import Piece from "./BasePiece";

export default class Pawn extends Piece {
  constructor(color: Color, image: string, position: number[]) {
    super(color, image, position);
  }

  override getPossibleMoves = (board: Piece[][]) => {
    const possibleMoves: number[][] = [];

    const row: number = this.position[0];
    const column: number = this.position[1];

    // Check front to move
    try {
      if (!board[row + this.direction][column])
        possibleMoves.push([row + this.direction, column]);

      if (!board[row + 2 * this.direction][column])
        possibleMoves.push([row + 2 * this.direction, column]);
    } catch (err) {
      console.log(err);
    }

    // Check diagonals to beat opponent piece
    try {
      if (
        board[row + this.direction][column + this.direction].color ===
        (this.color === Color.BLACK ? Color.WHITE : Color.BLACK)
      )
        possibleMoves.push([row, column + this.direction]);

      if (
        board[row + this.direction][column - this.direction].color ===
        (this.color === Color.BLACK ? Color.WHITE : Color.BLACK)
      )
        possibleMoves.push([row, column - this.direction]);
    } catch (err) {
      console.log(err);
    }

    return possibleMoves;
  };
}
