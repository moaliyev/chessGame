import { useEffect, useState } from "react";

// Constants
import { COLS, ROWS } from "../utils/constants";

// Types
import { Color } from "../enums";

// Pieces
import Piece from "../pieces/BasePiece";
import Pawn from "../pieces/Pawn";

// Images
import WhitePawn from "../assets/images/white/pawn.jpeg";
import BlackPawn from "../assets/images/black/pawn.webp";

interface BoardState {
  board: (Piece | null)[][];
  setBoard: React.Dispatch<React.SetStateAction<(Piece | null)[][]>>;
}

const useInitializeBoard = (): BoardState => {
  const [board, setBoard] = useState<(Piece | null)[][]>([]);

  useEffect(() => {
    const newBoard: (Piece | null)[][] = [];

    for (let i = 0; i < COLS; i++) {
      const newRow: (Piece | null)[] = [];
      for (let j = 0; j < ROWS; j++) {
        newRow.push(null);
      }
      newBoard.push(newRow);
    }

    const newRow: Pawn[] = [];
    for (let i = 0; i < COLS; i++) {
      newRow.push(new Pawn(Color.BLACK, BlackPawn, [1, i]));
    }
    newBoard[1] = newRow;

    setBoard(newBoard);
  }, []);
  return { board, setBoard };
};

export default useInitializeBoard;
