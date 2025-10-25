import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createNewSession, getSessionMessages, getSessions, sendMessage } from "../controllers/chat.controller";

const router = Router();

router.post('/', authMiddleware, sendMessage);
router.post('/new', authMiddleware, createNewSession);
router.get('/sessions', authMiddleware, getSessions);
router.get('/session/:sessionId', authMiddleware, getSessionMessages)
// router.get('/history', authMiddleware, getHistory);

export default router;