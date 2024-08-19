// Hooks
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

// Types
import { Piece } from ".././pieces";
import { Color, GameStatus } from ".././enums";

// Components
import Cell from ".././components/Cell";

// Utils
import validateMove from ".././utils/validateMove";
import checkEnd from ".././utils/checkEnd";
import mapBoard from "../../../backend/utils/mapBoard";
import { AuthContext } from "./../../context/AuthContext";
import toast from "react-hot-toast";

type GameData = {
  _id: string;
  board: (Piece | null)[][];
  black: string;
  white: string;
  isActive: boolean;
  activeUser: string;
};

const Game = () => {
  const [board, setBoard] = useState<(Piece | null)[][]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [activeMoves, setActiveMoves] = useState<number[][]>([]);
  const [activePiece, setActivePiece] = useState<Piece | null>();
  const [isEnd, setIsEnd] = useState<GameStatus>(GameStatus.ONGOING);
  const [user, setUser] = useState<Color>(Color.WHITE);
  const [currentUser, setCurrentUser] = useState<Color>(Color.WHITE);
  const [gameData, setGameData] = useState<GameData>();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const authUser = useContext(AuthContext);

  useEffect(() => {
    const getRoom = async () => {
      if (authUser?.user?._id) {
        const {
          data,
        }: {
          data: {
            _id: string;
            board: (Piece | null)[][];
            black: string;
            white: string;
            isActive: boolean;
            activeUser: string;
          };
        } = await axios.get(
          `https://chess-game-five-eta.vercel.app/api/room/${roomId}`,
          {
            withCredentials: true,
          }
        );
        setGameData(data);
        if (
          data.black !== authUser.user._id ||
          data.white !== authUser.user._id
        )
          return navigate("/");
        if (!data.black || !data.white) setIsEnd(GameStatus.NOT_READY);
        setBoard(mapBoard(data.board));
        setUser(data.activeUser === data.black ? Color.BLACK : Color.WHITE);
        setCurrentUser(
          data.white === authUser.user._id ? Color.WHITE : Color.BLACK
        );
      }
    };

    getRoom();
  }, [roomId, authUser, gameData]);

  useEffect(() => {
    setIsEnd(checkEnd(board, user));
  }, [user]);

  useEffect(() => {
    if (authUser?.user?._id) {
      const socket = io("https://chess-game-five-eta.vercel.app", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);
      socket.on("move_made", (board: (Piece | null)[][]) => {
        setBoard(mapBoard(board));
        setActiveMoves([]);
        setActivePiece(null);
        setUser(user === Color.WHITE ? Color.BLACK : Color.WHITE);
      });
      socket.on("game_ready", () => setIsEnd(GameStatus.ONGOING));
    } else {
      navigate("/signup");
    }
  }, [authUser]);

  const onMoveToSquare = (position: number[]) => {
    socket?.emit("new_move", roomId, board, activePiece, position);
  };

  const handlePieceClick = (piece: Piece | null): void => {
    if (piece === null) return;

    if (piece.color === user && user === currentUser) {
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
      {isEnd === GameStatus.END ? (
        <div className="modal">
          <div className="content">
            <h3 className="title">End!</h3>
            <p>{user === Color.BLACK ? "White" : "Black"} won!</p>
          </div>
        </div>
      ) : isEnd === GameStatus.DRAW ? (
        <div className="modal">
          <div className="content">
            <h3 className="title">End!</h3>
            <p>It's a draw</p>
          </div>
        </div>
      ) : isEnd === GameStatus.NOT_READY ? (
        <div className="modal">
          <div className="content">
            <h3 className="title">No opponent!</h3>
            <p>
              Invite someone by sharing the{" "}
              <span
                className="gameLink"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied!");
                }}
              >
                link
              </span>
            </p>
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
};

export default Game;
