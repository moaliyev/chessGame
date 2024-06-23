import { useState } from "react";

// CSS
import "./assets/css/App.css";

// Types
import Piece from "./pieces/BasePiece";

// Components
import Cell from "./components/Cell";

// Custom hooks
import useInitializeBoard from "./hooks/useInitializeBoard";

function App() {
  const { board, setBoard } = useInitializeBoard();
  const [activeMoves, setActiveMoves] = useState<number[][]>([]);
  const [activePiece, setActivePiece] = useState<Piece | null>();

  const onMoveToSquare = (position: number[]) => {
    if (!activePiece) return;

    // Get the new board with the piece moves to the given square
    const newBoard = activePiece.moveToSquare(board, position);

    // Update the board
    setBoard(newBoard);

    // Return to default
    setActivePiece(null);
    setActiveMoves([]);
  };

  const onPieceClick = (piece: Piece | null): void => {
    if (piece === null) {
      return;
    }
    setActivePiece(piece);
    setActiveMoves(piece.getPossibleMoves(board));
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
              handleClick={onPieceClick}
              handleMove={onMoveToSquare}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
