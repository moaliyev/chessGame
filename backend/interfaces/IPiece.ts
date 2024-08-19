import { Color } from "../enums";
import Piece from "../pieces/Piece";

export default interface IPiece {
  color: Color;
  image: string;
  position: number[];
  getPossibleMoves: (board: (Piece | null)[][]) => number[][];
  moveToSquare: (
    board: (Piece | null)[][],
    position: number[]
  ) => (Piece | null)[][];
  // getAllMoves: (board: (Piece | null)[][]) => number[][];
}
