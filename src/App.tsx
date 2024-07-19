import { useState } from "react";

// CSS
import "./assets/css/App.css";

// Types
import Piece from "./pieces/Piece";

// Components
import Cell from "./components/Cell";

// Custom hooks
import useInitializeBoard from "./hooks/useInitializeBoard";
import { Color } from "./enums";
import validateMove from "./utils/validateMove";

function App() {
  const { board, setBoard } = useInitializeBoard();
  const [activeMoves, setActiveMoves] = useState<number[][]>([]);
  const [activePiece, setActivePiece] = useState<Piece | null>();
  const [user, setUser] = useState<Color>(Color.WHITE);

  const onMoveToSquare = (position: number[]) => {
    if (!activePiece) return;

    // Get the new board with the piece moves to the given square
    const newBoard = activePiece.moveToSquare(board, position);

    // Update the board
    setBoard(newBoard);

    // Change user
    setUser(user === Color.WHITE ? Color.BLACK : Color.WHITE);

    // Return to default
    setActivePiece(null);
    setActiveMoves([]);
  };

  const handlePieceClick = (piece: Piece | null): void => {
    if (piece === null) {
      return;
    }
    if (piece.color === user) {
      setActivePiece(piece);

      const possibleMoves: number[][] = piece.getPossibleMoves(board);
      const validatedMoves: number[][] = [];

      const boardCopy: (Piece | null)[][] = [...board];

      for (const position of possibleMoves) {
        if (validateMove(piece.position, boardCopy, user))
          validatedMoves.push(position);
      }
      setActiveMoves(validatedMoves);
    }
  };

  return (
    <>
      <div className="container">
        {board.map((row, firstIndex) =>
          row.map((piece, secondIndex) => (
            <Cell
              key={firstIndex + secondIndex}
              count={firstIndex + secondIndex}
              position={[firstIndex, secondIndex]}
              active={Boolean(
                activeMoves.find(
                  item => item[0] === firstIndex && item[1] === secondIndex
                )
              )}
              piece={piece ?? undefined}
              handleClick={handlePieceClick}
              handleMove={onMoveToSquare}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
