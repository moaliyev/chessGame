import { Color } from "../enums";
import { COLS, ROWS } from "../utils/constants";
import Piece from "./Piece";

export default class Knight extends Piece {
  constructor(color: Color, image: string, position: number[]) {
    super(color, image, position);
  }

  private checkSquareAndAddToPossibleMoves(
    board: (Piece | null)[][],
    rowIndex: number,
    colIndex: number,
    possibleMoves: number[][]
  ): void {
    const currentPiece: Piece | null = board[rowIndex][colIndex];
    if (currentPiece?.color !== this.color || !currentPiece)
      possibleMoves.push([rowIndex, colIndex]);
  }

  public getPossibleMoves(board: (Piece | null)[][]): number[][] {
    const possibleMoves: number[][] = [];
    let rowIndex: number;
    let colIndex: number;

    // Checking top-right
    rowIndex = this.position[0] - 2;
    colIndex = this.position[1] + 1;
    if (rowIndex >= 0 && colIndex < COLS) {
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (currentPiece?.color !== this.color || !currentPiece)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Checking right-top
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1] + 2;
    if (rowIndex >= 0 && colIndex < COLS) {
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (currentPiece?.color !== this.color || !currentPiece)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check right-bottom
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1] + 2;
    if (rowIndex < ROWS && colIndex < COLS) {
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (currentPiece?.color !== this.color || !currentPiece)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check bottom-right
    rowIndex = this.position[0] + 2;
    colIndex = this.position[1] + 1;
    if (rowIndex < ROWS && colIndex < COLS) {
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (currentPiece?.color !== this.color || !currentPiece)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check bottom-left
    rowIndex = this.position[0] + 2;
    colIndex = this.position[1] - 1;
    if (rowIndex < ROWS && colIndex >= 0) {
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (currentPiece?.color !== this.color || !currentPiece)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check left-bottom
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1] - 2;
    if (rowIndex < ROWS && colIndex >= 0) {
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (currentPiece?.color !== this.color || !currentPiece)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check left-top
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1] - 2;
    if (rowIndex >= 0 && colIndex >= 0) {
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (currentPiece?.color !== this.color || !currentPiece)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check top-left
    rowIndex = this.position[0] - 2;
    colIndex = this.position[1] - 1;
    if (rowIndex >= 0 && colIndex >= 0) {
      const currentPiece: Piece | null = board[rowIndex][colIndex];
      if (currentPiece?.color !== this.color || !currentPiece)
        possibleMoves.push([rowIndex, colIndex]);
    }

    return possibleMoves;
  }
}
