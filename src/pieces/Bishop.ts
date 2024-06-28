import Piece from "./Piece";
import { Color } from "../enums";
import { COLS, ROWS } from "../utils/constants";

export default class Bishop extends Piece {
  constructor(color: Color, image: string, position: number[]) {
    super(color, image, position);
  }

  public getPossibleMoves(board: (Piece | null)[][]): number[][] {
    const possibleMoves: number[][] = [];

    // Checking for the bottom right diagonal
    let rowIndex: number = this.position[0] + 1;
    let colIndex: number = this.position[1] + 1;
    while (true) {
      if (rowIndex >= ROWS || colIndex >= COLS) break;
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (!currentPiece) possibleMoves.push([rowIndex, colIndex]);
      else if (currentPiece.color === this.color) break;
      else {
        possibleMoves.push([rowIndex, colIndex]);
        break;
      }
      rowIndex++;
      colIndex++;
    }

    // Checking for the botom left diagonal
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1] - 1;
    while (true) {
      if (rowIndex >= ROWS || colIndex < 0) break;
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (!currentPiece) possibleMoves.push([rowIndex, colIndex]);
      else if (currentPiece.color === this.color) break;
      else {
        possibleMoves.push([rowIndex, colIndex]);
        break;
      }
      rowIndex++;
      colIndex--;
    }

    // Checking for the top right diagonal
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1] + 1;
    while (true) {
      if (rowIndex < 0 || colIndex >= COLS) break;
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (!currentPiece) possibleMoves.push([rowIndex, colIndex]);
      else if (currentPiece.color === this.color) break;
      else {
        possibleMoves.push([rowIndex, colIndex]);
        break;
      }
      rowIndex--;
      colIndex++;
    }

    // Checking for the top left diagonal
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1] - 1;
    while (true) {
      if (rowIndex < 0 || colIndex < 0) break;
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (!currentPiece) possibleMoves.push([rowIndex, colIndex]);
      else if (currentPiece.color === this.color) break;
      else {
        possibleMoves.push([rowIndex, colIndex]);
        break;
      }
      rowIndex--;
      colIndex--;
    }
    return possibleMoves;
  }
}
