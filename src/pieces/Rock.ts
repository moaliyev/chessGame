import Piece from "./Piece";
import { Color } from "../enums";
import { COLS, ROWS } from "../utils/constants";

export default class Rock extends Piece {
  constructor(color: Color, image: string, position: number[]) {
    super(color, image, position);
  }
  public getPossibleMoves(board: (Piece | null)[][]): number[][] {
    const possibleMoves: number[][] = [];

    // Get the possible moves in the current row
    for (let i = this.position[1] + 1; i < COLS; i++) {
      const currentPiece: Piece | null = board[this.position[0]][i];
      if (!currentPiece) possibleMoves.push([this.position[0], i]);
      else if (currentPiece.color === this.color) break;
      else {
        possibleMoves.push([this.position[0], i]);
        break;
      }
    }

    for (let i = this.position[1] - 1; i >= 0; i--) {
      const currentPiece: Piece | null = board[this.position[0]][i];
      if (!currentPiece) possibleMoves.push([this.position[0], i]);
      else if (currentPiece.color === this.color) break;
      else {
        possibleMoves.push([this.position[0], i]);
        break;
      }
    }

    // Get the possible moves in the current column
    for (let i = this.position[0] + 1; i < ROWS; i++) {
      const currentPiece: Piece | null = board[i][this.position[1]];
      if (!currentPiece) possibleMoves.push([i, this.position[1]]);
      else if (currentPiece.color === this.color) break;
      else {
        possibleMoves.push([i, this.position[1]]);
        break;
      }
    }

    for (let i = this.position[0] - 1; i >= 0; i--) {
      const currentPiece: Piece | null = board[i][this.position[1]];
      if (!currentPiece) possibleMoves.push([i, this.position[1]]);
      else if (currentPiece.color === this.color) break;
      else {
        possibleMoves.push([i, this.position[1]]);
        break;
      }
    }

    return possibleMoves;
  }
}
