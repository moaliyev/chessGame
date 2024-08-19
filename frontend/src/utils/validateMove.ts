// Types
import { Color } from "../enums";
import { King, Piece } from "../pieces";

// Utils
import copyBoard from "./copyBoard";

export default function (
  originalPosition: number[],
  board: (Piece | null)[][],
  currentUser: Color
): number[][] {
  let piece: Piece | null = board[originalPosition[0]][originalPosition[1]];
  let validatedMoves: number[][] = [];

  if (piece) {
    validatedMoves = piece.getPossibleMoves(board);

    var currentKing: King | null = null;
    const possibleMoves: number[][] = piece.getPossibleMoves(board);

    for (const move of possibleMoves) {
      // Copy of the actual board
      const replicaBoard: (Piece | null)[][] = copyBoard(board);
      piece = replicaBoard[originalPosition[0]][originalPosition[1]];
      if (!piece) return [];
      // Board after the piece is moved to the specified square
      const newBoard: (Piece | null)[][] = piece.moveToSquare(
        replicaBoard,
        move
      );

      // Finding the position of king
      for (const row of newBoard) {
        for (const piece of row) {
          if (piece?.color === currentUser && piece instanceof King) {
            currentKing = piece;
            break;
          }
        }
      }

      // Getting all the possible moves of the opposition pieces
      const possibleOppositionMoves: number[][][] = [];

      for (const row of newBoard) {
        for (const piece of row) {
          if (piece?.color !== currentUser && piece) {
            possibleOppositionMoves.push(piece.getPossibleMoves(newBoard));
          }
        }
      }
      if (currentKing) {
        for (const row of possibleOppositionMoves) {
          for (const position of row) {
            if (
              position[0] === currentKing.position[0] &&
              position[1] === currentKing.position[1]
            ) {
              validatedMoves = validatedMoves.filter(
                m => m[0] !== move[0] || m[1] !== move[1]
              );
            }
          }
        }
      }
    }
  }
  return validatedMoves;
}
