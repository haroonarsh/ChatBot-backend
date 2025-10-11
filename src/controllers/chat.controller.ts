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