import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getHistory, sendMessage } from "../controllers/chat.controller";

const router = Router();

router.post('/', authMiddleware, sendMessage);
router.get('/history', authMiddleware, getHistory);

export default router;