import dotenv from 'dotenv';
import path from 'path';

const envPath = process.env.NODE_ENV === 'development' ? '.env' : path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

function required(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required environment variable: ${key}`);
    return value;
}

export default {
    port: process.env.PORT || 5000,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || required('GEMINI_API_KEY'),
}