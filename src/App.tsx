import { useEffect, useState } from "react";

// CSS
import "./assets/css/App.css";

// Types
import Piece from "./pieces/BasePiece";
import Pawn from "./pieces/Pawn";
import { Color } from "./enums";

// Components
import Cell from "./components/Cell";

// Custom hooks
import useInitializeBoard from "./hooks/useInitializeBoard";

function App() {
  const { board, setBoard } = useInitializeBoard();

  return (
    <>
      <div className="container">
        {board.map((row, firstIndex) =>
          row.map((piece, secondIndex) => (
            <Cell
              key={firstIndex + secondIndex}
              count={firstIndex + secondIndex}
              image={piece?.image}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
