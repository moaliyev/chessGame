import { Direction, Color } from "../enums";
import Piece from "../pieces/BasePiece";

export default interface IPiece {
  color: Color;
  image: string;
  position: number[];
  direction: Direction;
  getPossibleMoves: (board: Piece[][]) => number[][];
  getAllMoves: (board: Piece[][]) => number[][];
}
