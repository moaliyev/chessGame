import { Color, Direction } from "../enums";
import Piece from "./Piece";

export default class Pawn extends Piece {
  public isMoved: boolean;
  public direction: Direction;

  constructor(
    color: Color,
    image: string,
    position: number[],
    isMoved: boolean = false
  ) {
    super(color, image, position);
    this.isMoved = isMoved;
    this.direction = color === Color.BLACK ? Direction.DOWN : Direction.UP;
  }

  public override getPossibleMoves = (board: (Piece | null)[][]) => {
    const possibleMoves: number[][] = [];

    const row: number = this.position[0];
    const column: number = this.position[1];

    // Check front to move
    try {
      if (!board[row + this.direction][column])
        possibleMoves.push([row + this.direction, column]);

      if (!this.isMoved)
        if (!board[row + 2 * this.direction][column])
          possibleMoves.push([row + 2 * this.direction, column]);
    } catch (err) {
      console.log(err);
    }

    // Check diagonals to beat opponent piece
    try {
      if (
        board[row + this.direction][column + this.direction]?.color ===
        (this.color === Color.BLACK ? Color.WHITE : Color.BLACK)
      )
        possibleMoves.push([row + this.direction, column + this.direction]);

      if (
        board[row + this.direction][column - this.direction]?.color ===
        (this.color === Color.BLACK ? Color.WHITE : Color.BLACK)
      )
        possibleMoves.push([row + this.direction, column - this.direction]);
    } catch (err) {
      console.log(err);
    }

    return possibleMoves;
  };

  public moveToSquare = (
    board: (Piece | null)[][],
    position: number[]
  ): (Piece | null)[][] => {
    // Mark this pawn as moved so that it can only move one square
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
