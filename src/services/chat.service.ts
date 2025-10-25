import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatSession from "../models/ChatSession";
import { IMessage } from "../interfaces/IMessage";
import config from "../config";
import { HydratedDocument } from "mongoose";
import { IChatSession } from "../interfaces/IChatSession";


const getAI = new GoogleGenerativeAI(config.GEMINI_API_KEY as string);

// console.log("GoogleGenerativeAI instance:", config.GEMINI_API_KEY);


export const ChatService = {
    constructor(): void {
        // Initialization if needed
        
    },
    async getResponse(sessionId: string, message: string): Promise<string> {
        try {
            let session = await ChatSession.findById(sessionId);  // Find by sessionId only
            if (!session) {
                throw new Error('Session not found');
            }

            session.messages.push({ role: 'user', content: message });
    
            const model = getAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // free model
    
            // Map chat history to Gemini AI format
            const history = session.messages.slice(0, -1).map((msg: IMessage) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            }));

            const chat = model.startChat({ history });

            const result = await chat.sendMessage(message);

            const botResponse = result.response.text();

            session.messages.push({ role: 'assistant', content: botResponse });
            await session.save();
            console.log(`Message appended to session ${sessionId}`);  // Debug log

            return botResponse;
        } catch (error) {
            console.error("Error in ChatService.getResponse:", error);
            throw new Error("Failed to get response from AI service.");
        }
    },

    async createNewSession(userId: string): Promise<void> {
        const session = new ChatSession({ user: userId, messages: [] });
        await session.save();
        return session.id.toString(); // Return the session ID
    },

    async getSessions(userId: string): Promise<{ id: string; title: string; updatedAt: Date }[]> {  // New: List sessions
    const sessions: HydratedDocument<IChatSession>[] = await ChatSession.find({ user: userId }).sort({ updatedAt: -1 });
    return sessions.map((s) => ({
      id: s._id.toString(),
      title: s.messages[0]?.content.substring(0, 20) + '...' || `New Chat - ${s.updatedAt.toLocaleDateString()}`,
      updatedAt: s.updatedAt,
    }));
    },
    
    async getSessionMessages(sessionId: string): Promise<IMessage[]> {  // New: Get messages for a specific session
        const session = await ChatSession.findById(sessionId);
        return session?.messages || [];
    }
}