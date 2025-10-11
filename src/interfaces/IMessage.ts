export interface IMessage {
    content: string;
    role: 'user' | 'model' | 'assistant';
}
