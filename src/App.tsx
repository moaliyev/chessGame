// Hooks
import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// CSS
import "./assets/css/App.css";

// Types
import { Piece } from "./pieces";
import { Color } from "./enums";

// Components
import Cell from "./components/Cell";

// Custom hooks
import useInitializeBoard from "./hooks/useInitializeBoard";

// Utils
import validateMove from "./utils/validateMove";
import checkWin from "./utils/checkWin";

function App() {
  const { board, setBoard } = useInitializeBoard();
  const [activeMoves, setActiveMoves] = useState<number[][]>([]);
  const [activePiece, setActivePiece] = useState<Piece | null>();
  const [isWin, setIsWin] = useState<boolean>();
  const [user, setUser] = useState<Color>(Color.WHITE);

  useEffect(() => {
    if (checkWin(board, user)) setIsWin(true);
  }, [user]);

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
    if (piece === null) return;

    if (piece.color === user) {
      setActivePiece(piece);

      const validatedMoves: number[][] = validateMove(
        piece.position,
        board,
        user
      );

      setActiveMoves(validatedMoves);
    }
  };

  return (
    <>
      <SpeedInsights />
      {isWin ? (
        <div className="modal">
          <div className="content">
            <h3 className="title">End!</h3>
            <p>{user === Color.BLACK ? "White" : "Black"} won!</p>
          </div>
        </div>
      ) : (
        ""
      )}
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
