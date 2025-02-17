import { Request, Response } from "express";
import User from "../models/User"; 

export const login = async (req: Request, res: Response) => {
    try {
        const newUser = new User({
            "name": "willians henrique",
            "email": "teste@teste.com",
            "password": "123",
            "role": "superUsuario"
        });

        await newUser.save(); // Salva o novo usuário no banco de dados
        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário', error });
    }
};
