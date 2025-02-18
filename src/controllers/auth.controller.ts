import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/User";

dotenv.config();
export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        // Procura o usuário pelo email
        let user = await User.findOne({ email });

        if (user) {
            // Compara a senha fornecida com a senha armazenada no banco
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = JWT.sign(
                    { id: user.id, role: user.role },
                    process.env.JWT_SECRET_KEY as string,
                    { expiresIn: '6h' }
                );


                res.json({ status: true, token });
                return;
            }
        }
    }
    res.status(400).json({ status: false });
};
