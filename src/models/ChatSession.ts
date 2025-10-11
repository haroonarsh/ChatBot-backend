import { Schema, model } from 'mongoose';
import { IChatSession } from '../interfaces/IChatSession';

const chatSessionSchema = new Schema<IChatSession>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
  }],
}, { timestamps: true });

export default model<IChatSession>('ChatSession', chatSessionSchema);