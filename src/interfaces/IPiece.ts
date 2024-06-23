import { Direction, Color } from "../enums";
import Piece from "../pieces/BasePiece";

export default interface IPiece {
  color: Color;
  image: string;
  position: number[];
  direction: Direction;
  getPossibleMoves: (board: (Piece | null)[][]) => number[][];
  moveToSquare: (
    board: (Piece | null)[][],
    position: number[]
  ) => (Piece | null)[][];
  // getAllMoves: (board: (Piece | null)[][]) => number[][];
}
