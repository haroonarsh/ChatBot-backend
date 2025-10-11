import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { sendMessage } from "../controllers/chat.controller";

const router = Router();

router.post('/', authMiddleware, sendMessage);

export default router;