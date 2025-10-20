import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";

const chatService = ChatService;

console.log("ChatService:", chatService);


export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const userId = (req as any).userId;
        const response = await chatService.getResponse(userId, message);
        res.status(200).json({ response });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getHistory = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const history = await chatService.getHistory(userId);
        res.status(200).json({ history });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createNewSession = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const sessionId = await chatService.createNewSession(userId);
        res.status(201).json({ sessionId });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSessions = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const sessions = await chatService.getSessions(userId);
        res.status(200).json({ sessions });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSessionMessages = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const messages = await chatService.getSessionMessages(sessionId);
        res.status(200).json({ messages });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};