// Types
import { Color, GameStatus } from "../enums";
import { King, Piece } from "../pieces";
import getPossibleOppositionMoves from "./getPossibleOppositionMoves";

// utils
import validateMove from "./validateMove";

export default function (
  board: (Piece | null)[][],
  currentUser: Color
): GameStatus {
  if (board.length === 0) return GameStatus.ONGOING;
  for (const row of board) {
    for (const piece of row) {
      if (piece && piece.color === currentUser) {
        const result: number[][] = validateMove(
          piece.position,
          board,
          currentUser
        );
        if (result.length > 0) return GameStatus.ONGOING;
      }
    }
  }
  // NO MOVES TO PLAY
  var currentKing: King | null = null;
  for (const row of board) {
    for (const piece of row) {
      if (piece?.color === currentUser && piece instanceof King) {
        currentKing = piece;
        break;
      }
    }
  }

  const possibleOppositionMoves: number[][][] = getPossibleOppositionMoves(
    board,
    currentUser
  );

  if (currentKing) {
    for (const row of possibleOppositionMoves) {
      for (const position of row) {
        if (
          position[0] === currentKing.position[0] &&
          position[1] === currentKing.position[1]
        ) {
          return GameStatus.END;
        }
      }
    }
  }

  return GameStatus.DRAW;
}
