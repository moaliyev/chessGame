import Piece from "./Piece";
import { Color } from "../enums";
import { COLS, ROWS } from "../utils/constants";

export default class Rook extends Piece {
  public isMoved: boolean;

  constructor(
    color: Color,
    image: string,
    position: number[],
    isMoved: boolean = false
  ) {
    super(color, image, position);
    this.isMoved = isMoved;
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

  public override moveToSquare = (
    board: (Piece | null)[][],
    position: number[]
  ): (Piece | null)[][] => {
    // Mark this rook as moved so that it cannot be used for kisa rok kanki
    this.isMoved = true;

    // Remove piece from the previous position
    const newBoard: (Piece | null)[][] = [...board];
    newBoard[this.position[0]][this.position[1]] = null;

    // Add piece to the new position
    this.position = position;
    newBoard[position[0]][position[1]] = this;

    return newBoard;
  };
}
