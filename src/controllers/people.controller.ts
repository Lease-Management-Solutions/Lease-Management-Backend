import { Request, Response } from "express";
import User from "../models/User"; // 

export const peopleAdd = async (req: Request, res: Response) => {
    try {
        const newUser = new User({
            email: 'teste@teste.com',
            age: 30,
            interests: ['Tecnologia', 'Música'],
            name: {
                firstName: 'João',
                lastName: 'Silva'
            }
        });

        await newUser.save(); // Salva o novo usuário no banco de dados
        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário', error });
    }
};
