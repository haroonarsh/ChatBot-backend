import express , { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from './routes/auth.route';
import chatRoutes from './routes/chat.route';
import { errorHandler } from './middleware/error.middleware';

dotenv.config({ path: __dirname + '/../.env' });

const app: Express = express();


app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Error Handler
app.use(errorHandler);

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));

export default app;