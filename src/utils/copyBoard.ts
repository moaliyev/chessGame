import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from "../pieces";

export default function (board: (Piece | null)[][]): (Piece | null)[][] {
  const boardCopy: (Piece | null)[][] = [];
  for (const row of board) {
    const newRow: (Piece | null)[] = [];
    for (const piece of row) {
      if (piece === null) {
        newRow.push(null);
      } else if (piece instanceof Pawn) {
        newRow.push(
          new Pawn(piece.color, piece.image, piece.position, piece.isMoved)
        );
      } else if (piece instanceof Knight) {
        newRow.push(new Knight(piece.color, piece.image, piece.position));
      } else if (piece instanceof Rook) {
        newRow.push(new Rook(piece.color, piece.image, piece.position));
      } else if (piece instanceof King) {
        newRow.push(new King(piece.color, piece.image, piece.position));
      } else if (piece instanceof Bishop) {
        newRow.push(new Bishop(piece.color, piece.image, piece.position));
      } else if (piece instanceof Queen) {
        newRow.push(new Queen(piece.color, piece.image, piece.position));
      }
    }
    boardCopy.push(newRow);
  }
  return boardCopy;
}
