import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatSession from "../models/ChatSession";
import { IMessage } from "../interfaces/IMessage";
import config from "../config";


const getAI = new GoogleGenerativeAI(config.GEMINI_API_KEY as string);

// console.log("GoogleGenerativeAI instance:", config.GEMINI_API_KEY);


export const ChatService = {
    constructor(): void {
        // Initialization if needed
        
    },
    async getResponse(userId: string, message: string): Promise<string> {
        try {
            let session = await ChatSession.findOne({ user: userId });
            if (!session) {
                session = new ChatSession({ user: userId, messages: [] });
            }
    
            // Push user message
            session.messages.push({ role: 'user', content: message });
    
            const model = getAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // free model
    
            // Map chat history to Gemini AI format
            const history = session.messages.slice(0, -1).map((msg: IMessage) => ({
                role: msg.role === 'assistant' ? 'model' : 'user', // Map roles to Gemini AI expected roles
                parts: [{ text: msg.content }],
            }));
    
            const chat = model.startChat({ history });
    
            const result = await chat.sendMessage(message); // Send the latest user message
    
            const botResponse = result.response.text();
    
            session.messages.push({ role: 'assistant', content: botResponse });
            await session.save();
    
            return botResponse;
        } catch (error) {
            console.error("Error in ChatService.getResponse:", error);
            throw new Error("Failed to get response from AI service.");
        }
    },

    async getHistory(userId: string): Promise<IMessage[]> {
        const session = await ChatSession.findOne({ user: userId });
        return session?.messages || [];
    }
}