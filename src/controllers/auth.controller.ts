import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

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
                res.json({ status: true });
                return;
            }
        }
    }
    res.status(400).json({ status: false });
};
