import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/connection";
import roomRouter from "./routes/room.routes";
import authRouter from "./routes/auth.routes";
import { Piece } from "./pieces";
import Room from "./models/room.model";
import mapBoard from "./utils/mapBoard";

dotenv.config();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chess-game-front.vercel.app"],
  },
});

const corsOptions = {
  origin: ["http://localhost:5173", "https://chess-game-front.vercel.app"],
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions)); // adding cors policy
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to access the cookies
app.use(express.static("public")); // serve static files

// Routes
app.use("/api/room", roomRouter);
app.use("/api/auth", authRouter);

app.use("/", () => {
  console.log("hello");
});

server.listen(5000, () => {
  connectToMongoDB();
  console.log("Server running on 5000");
});

const userSocketMap: {
  [key: string]: string;
} = {};

export const getReceiverSocketId = (receiverId: string): string => {
  return userSocketMap[receiverId];
};

export { io };

io.on("connection", socket => {
  const userId = socket.handshake.query.userId as string;

  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on(
    "new_move",
    async (
      roomId: string,
      board: (Piece | null)[][],
      piece: Piece | null,
      position: number[]
    ) => {
      board = mapBoard(board);
      const userId = socket.handshake.query.userId as string;
      if (!piece) return { error: "Invalid move" };
      piece = board[piece?.position[0]][piece.position[1]];
      if (!piece) return { error: "Invalid move" };
      const room = await Room.findById(roomId);
      if (!room) return { error: "Room does not exist" };
      const newBoard = piece.moveToSquare(board, position);
      room.overwrite({
        board: newBoard,
        activeUser:
          room.white?._id.toString() === userId ? room.black : room.white,
        white: room.white,
        black: room.black,
      });
      if (room.white)
        io.to(userSocketMap[room.white?._id.toString()]).emit(
          "move_made",
          room.board
        );
      if (room.black)
        io.to(userSocketMap[room.black?._id.toString()]).emit(
          "move_made",
          room.board
        );
      await room.save();
    }
  );
});

io.on("disconnect", socket => {
  const userId = socket.handshake.query.userId as string;
  delete userSocketMap[userId];
  console.log(socket.id);
});
