import {Request, Response, NextFunction} from 'express';
import JWT  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from "../models/User";

dotenv.config();

export const checkMustChangePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email is required" });
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: "Incorrect password" });
            return;
        }

        if (user.status !== "active") {
            res.status(403).json({ error: "Usuário desativado" });
            return;
        }
        
        if (user.mustChangePassword) {
            const tempToken = JWT.sign(
                { email: user.email },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "15m" }
            );
            res.status(403).json({ error: "Password change required", tempToken });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
