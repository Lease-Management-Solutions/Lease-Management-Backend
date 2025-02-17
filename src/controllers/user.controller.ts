import { Request, Response } from "express";
import User from '../models/User'

export const addUser = async (req: Request, res: Response) => {

    try {

        const { name, email, password, role } = req.body;

        const newUser = new User();

            newUser.name = name,
            newUser.email = email,
            newUser. password = password,
            newUser.role = role
        

        await newUser.save(); // Salva o novo usuário no banco de dados
        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário', error });
    }
};

export const users = async (req: Request, res: Response) => {

        
    const usersList = await User.find({});
    res.status(201).json({ message: 'lista de usuários!', user: usersList });

        
}