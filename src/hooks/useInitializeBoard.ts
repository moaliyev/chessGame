import { useEffect, useState } from "react";

// Constants
import { COLS, ROWS } from "../utils/constants";

// Types
import { Color } from "../enums";

// Pieces
import Piece from "../pieces/Piece";
import Pawn from "../pieces/Pawn";
import Rock from "../pieces/Rock";
import Bishop from "../pieces/Bishop";
import Knight from "../pieces/Knight";
import Queen from "../pieces/Queen";

// Images
import WhitePawn from "../assets/images/white/pawn.webp";
import BlackPawn from "../assets/images/black/pawn.webp";
import WhiteRock from "../assets/images/white/rock.png";
import BlackRock from "../assets/images/black/rock.webp";
import BlackBishop from "../assets/images/black/bishop.webp";
import WhiteBishop from "../assets/images/white/bishop.webp";
import BlackKnight from "../assets/images/black/knight.png";
import WhiteKnight from "../assets/images/white/knight.png";
import BlackQueen from "../assets/images/black/queen.webp";
import WhiteQueen from "../assets/images/white/queen.jpeg";
import BlackKing from "../assets/images/black/king.jpeg";
import WhiteKing from "../assets/images/white/king.webp";
import King from "../pieces/King";

interface BoardState {
  board: (Piece | null)[][];
  setBoard: React.Dispatch<React.SetStateAction<(Piece | null)[][]>>;
}

const useInitializeBoard = (): BoardState => {
  const [board, setBoard] = useState<(Piece | null)[][]>([]);

  useEffect(() => {
    const newBoard: (Piece | null)[][] = [];

    // Initializing an empty board
    for (let i = 0; i < COLS; i++) {
      const newRow: (Piece | null)[] = [];
      for (let j = 0; j < ROWS; j++) {
        newRow.push(null);
      }
      newBoard.push(newRow);
    }

    // Adding the black pawns
    {
      const newRow: Pawn[] = [];
      for (let i = 0; i < COLS; i++) {
        newRow.push(new Pawn(Color.BLACK, BlackPawn, [1, i]));
      }
      newBoard[1] = newRow;
    }

    // Adding the white pawns
    {
      const newRow: Pawn[] = [];
      for (let i = 0; i < COLS; i++) {
        newRow.push(new Pawn(Color.WHITE, WhitePawn, [6, i]));
      }
      newBoard[6] = newRow;
    }

    // Adding the black Rocks
    newBoard[0][0] = new Rock(Color.BLACK, BlackRock, [0, 0]);
    newBoard[0][COLS - 1] = new Rock(Color.BLACK, BlackRock, [0, COLS - 1]);

    // Adding the white Rocks
    newBoard[ROWS - 1][0] = new Rock(Color.WHITE, WhiteRock, [ROWS - 1, 0]);
    newBoard[ROWS - 1][COLS - 1] = new Rock(Color.WHITE, WhiteRock, [
      ROWS - 1,
      COLS - 1,
    ]);

    // Adding the black bishops
    newBoard[0][2] = new Bishop(Color.BLACK, BlackBishop, [0, 2]);
    newBoard[0][COLS - 3] = new Bishop(Color.BLACK, BlackBishop, [0, COLS - 3]);

    // Adding the white bishops
    newBoard[ROWS - 1][2] = new Bishop(Color.WHITE, WhiteBishop, [ROWS - 1, 2]);
    newBoard[ROWS - 1][COLS - 3] = new Bishop(Color.WHITE, WhiteBishop, [
      ROWS - 1,
      COLS - 3,
    ]);

    // Adding the black knights
    newBoard[0][1] = new Knight(Color.BLACK, BlackKnight, [0, 1]);
    newBoard[0][COLS - 2] = new Knight(Color.BLACK, BlackKnight, [0, COLS - 2]);

    // Adding the white knights
    newBoard[ROWS - 1][1] = new Knight(Color.WHITE, WhiteKnight, [ROWS - 1, 1]);
    newBoard[ROWS - 1][COLS - 2] = new Knight(Color.WHITE, WhiteKnight, [
      ROWS - 1,
      COLS - 2,
    ]);

    // Adding the black queen
    newBoard[0][3] = new Queen(Color.BLACK, BlackQueen, [0, 3]);

    // Adding the white queen
    newBoard[ROWS - 1][3] = new Queen(Color.WHITE, WhiteQueen, [ROWS - 1, 3]);

    // Adding the black king
    newBoard[0][4] = new King(Color.BLACK, BlackKing, [0, 4]);

    // Adding the white king
    newBoard[ROWS - 1][4] = new King(Color.WHITE, WhiteKing, [ROWS - 1, 4]);

    setBoard(newBoard);
  }, []);
  return { board, setBoard };
};

export default useInitializeBoard;
