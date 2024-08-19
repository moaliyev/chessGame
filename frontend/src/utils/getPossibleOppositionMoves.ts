import { Color } from "../enums";
import { Piece } from "../pieces";

export default function (
  board: (Piece | null)[][],
  currentUser: Color
): number[][][] {
  const possibleOppositionMoves: number[][][] = [];

  for (const row of board) {
    for (const piece of row) {
      if (piece?.color !== currentUser && piece) {
        possibleOppositionMoves.push(piece.getPossibleMoves(board));
      }
    }
  }
  return possibleOppositionMoves;
}
