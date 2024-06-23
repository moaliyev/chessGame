import "../assets/css/Cell.css";
import Piece from "../pieces/BasePiece";

const Cell: React.FC<PropType> = ({
  count,
  active,
  piece,
  position,
  handleClick,
  handleMove,
}: PropType) => {
  return (
    <>
      {active ? (
        <div
          className={`cell active ${count % 2 ? "green" : "white"}`}
          onClick={() => handleMove(position)}
        >
          {piece ? (
            <img
              src={piece.image}
              alt={piece.image.split(".")[0].split("/")[5]}
              onClick={() => handleClick(piece)}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={`cell ${count % 2 ? "green" : "white"}`}>
          {piece ? (
            <img
              src={piece.image}
              alt={piece.image.split(".")[0].split("/")[5]}
              onClick={() => handleClick(piece)}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

type PropType = {
  count: number;
  active: boolean;
  position: number[];
  piece?: Piece;
  handleClick: (piece: Piece) => void;
  handleMove: (position: number[]) => void;
};

export default Cell;
