import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const token = await authService.register(name, email, password);
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        res.cookie('token', token, { httpOnly: true }); 
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}