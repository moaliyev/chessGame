import { Color } from "../enums";
import { COLS, ROWS } from "../utils/constants";
import Piece from "./Piece";

export default class King extends Piece {
  constructor(color: Color, image: string, position: number[]) {
    super(color, image, position);
  }
  public getPossibleMoves(board: (Piece | null)[][]): number[][] {
    const possibleMoves: number[][] = [];
    let rowIndex: number;
    let colIndex: number;
    let currentPiece: Piece | null;

    // Check top
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1];
    if (rowIndex >= 0) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check top right
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1] + 1;
    if (rowIndex >= 0 && colIndex < COLS) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check right
    rowIndex = this.position[0];
    colIndex = this.position[1] + 1;
    if (colIndex < COLS) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check bottom right
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1] + 1;
    if (rowIndex < ROWS && colIndex < COLS) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check bottom left
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1] - 1;
    if (rowIndex < ROWS && colIndex >= 0) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check bottom
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1];
    if (rowIndex < ROWS) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check left
    rowIndex = this.position[0];
    colIndex = this.position[1] - 1;
    if (colIndex >= 0) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check top left
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1] - 1;
    if (rowIndex >= 0 && colIndex >= 0) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    return possibleMoves;
  }
}
