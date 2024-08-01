// Types
import { Color } from "../enums";
import { Piece } from "../pieces";

// utils
import validateMove from "./validateMove";

export default function (
  board: (Piece | null)[][],
  currentUser: Color
): boolean {
  if (board.length === 0) return false;
  for (const row of board) {
    for (const piece of row) {
      if (piece && piece?.color === currentUser) {
        const result: number[][] = validateMove(
          piece.position,
          board,
          currentUser
        );
        if (result.length > 0) return false;
      }
    }
  }
  return true;
}
