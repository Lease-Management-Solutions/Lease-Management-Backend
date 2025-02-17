import { Request, Response } from "express";
import User from '../models/User'
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");

export const addUser = async (req: Request, res: Response) => {

    try {
        
        const { name, email, password, role } = req.body;


        // Verifica se todos os campos foram preenchidos
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        // Verifica se o usuário já existe pelo email
        const hasUser = await User.findOne({ email });
        if (hasUser) {
            return res.status(400).json({ message: "Usuário já cadastrado." });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        // Cria o usuário
        const newUser = new User();
            newUser.name = name,
            newUser.email = email,
            newUser. password = hashedPassword,
            newUser.role = role
        
        // Salva o novo usuário no banco de dados
        await newUser.save(); 
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