import { Request, Response } from "express";
import Room from "./../models/room.model";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { getReceiverSocketId, io } from "..";

export class RoomController {
  public static async createRoomController(req: Request, res: Response) {
    // todo: Set white and black user ids
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "secret_key"
    );
    if (!decoded)
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const room = await Room.create({ white: user._id, isActive: true });
    return res.status(200).json(room._id);
  }
  public static async getRoomController(req: Request, res: Response) {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "secret_key"
    );
    if (!decoded)
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(400).json({ error: "Invalid room id" });
    if (
      !room.black &&
      room.white?._id &&
      room.white?._id.toString() !== user._id.toString()
    ) {
      room.black = user._id;
      const firstPlayer = getReceiverSocketId(user._id.toString());
      const secondPlayer = getReceiverSocketId(room.white?._id.toString());
      io.to(firstPlayer).emit("game_ready");
      io.to(secondPlayer).emit("game_ready");
    }
    await room.save();
    return res.status(200).json(room);
  }
}
