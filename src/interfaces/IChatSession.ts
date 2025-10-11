import { Document, Types } from "mongoose";
import { IMessage } from "./IMessage";

export interface IChatSession extends Document {
    user: Types.ObjectId; // User ID
    messages: IMessage[];
}