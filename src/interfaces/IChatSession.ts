import { Document, Types } from "mongoose";
import { IMessage } from "./IMessage";

export interface IChatSession extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId; // User ID
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}