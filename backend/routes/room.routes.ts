import { Router } from "express";
import { RoomController } from "../controllers/room.controller";

const router = Router();

router.post("/", RoomController.createRoomController);
router.get("/:roomId", RoomController.getRoomController);

export default router;
