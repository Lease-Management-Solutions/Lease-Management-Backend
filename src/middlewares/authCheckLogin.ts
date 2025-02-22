import {Request, Response, NextFunction} from 'express';
import JWT  from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/User";

dotenv.config();

export const checkMustChangePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
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

        await next();
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
