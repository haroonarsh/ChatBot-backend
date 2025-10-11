import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";

export class AuthService {
    async register(name: string, email: string, password: string): Promise<string> {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });
    }

    async login(email: string, password: string): Promise<string> {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        return jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });
    }
}