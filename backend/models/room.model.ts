import mongoose from "mongoose";
import useInitializeBoard from "../hooks/useInitializeBoard";

const roomSchema = new mongoose.Schema(
  {
    board: {
      type: [[{ type: mongoose.Schema.Types.Mixed }]],
      default: useInitializeBoard(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    white: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    black: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    activeUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
