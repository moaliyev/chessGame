import { Color } from "../enums";
import King from "../pieces/King";
import Pawn from "../pieces/Pawn";
import Piece from "../pieces/Piece";

function validateMove(
  originalPosition: number[],
  board: (Piece | null)[][],
  currentUser: Color
): boolean {
  const piece: Piece | null = board[originalPosition[0]][originalPosition[1]];
  if (piece) {
    var currentKing: King | null = null;
    const possibleMoves: number[][] = piece.getPossibleMoves(board);
    for (const move of possibleMoves) {
      const newBoard: (Piece | null)[][] = piece.moveToSquare(board, move);
      // Finding the position of king
      for (const row of newBoard) {
        for (const piece of row) {
          if (piece?.color === currentUser && piece instanceof King) {
            currentKing = piece;
            break;
          }
        }
      }
      const possibleOppositionMoves: number[][][] = [];
      // Getting all the possible moves of the opposition pieces
      for (const row of newBoard) {
        for (const piece of row) {
          if (piece?.color !== currentUser && piece) {
            possibleOppositionMoves.push(piece.getPossibleMoves(newBoard));
          }
        }
      }
      const isMoved: boolean = piece instanceof Pawn ? piece.isMoved : false;
      if (currentKing)
        for (const row of possibleOppositionMoves) {
          for (const position of row) {
            if (
              position[0] === currentKing.position[0] &&
              position[1] === currentKing.position[1]
            ) {
              piece.moveToSquare(board, originalPosition);
              if (piece instanceof Pawn) {
                piece.isMoved = isMoved;
              }
              return false;
            }
          }
        }
      piece.moveToSquare(board, originalPosition);
      if (piece instanceof Pawn) {
        piece.isMoved = isMoved;
      }
      return true;
    }
    if (piece instanceof Pawn) {
      piece.isMoved = false;
    }
    return true;
  }
  return true;
}

export default validateMove;
