import { Request, Response } from "express";
import User, {UserType} from '../models/User'

import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");

export const addUser = async (req: Request, res: Response) => {

    try {
        
        const { name, email, password, role, avatar } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);          // Criptografa a senha

        // Cria o usuário
        const newUser = new User();
            newUser.name = name,
            newUser.email = email,
            newUser. password = hashedPassword,
            newUser.role = role
            newUser.avatar = avatar
            newUser.status = 'active'
        
        // Salva o novo usuário no banco de dados
        await newUser.save(); 
        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário', error });
    }
};

export const users = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;

        // Condição para filtrar por status, se fornecido
        const filter = status ? { status } : {};

        const usersList = await User.find(filter);

        res.status(200).json({ message: 'Lista de usuários!', users: usersList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao recuperar usuários', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        

        res.status(200).json({ message: 'Usuário encontrado', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar o usuário', error });
    }
};


export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }

        res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir o usuário", error });
    }
};

export const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, avatar, status } = req.body;

        const updateData: Partial<UserType> = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, saltRounds);
        if (role) updateData.role = role;
        if (avatar) updateData.avatar = avatar;
        if (status) updateData.status = status;

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }

        res.status(200).json({ message: "Usuário atualizado com sucesso", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar o usuário", error });
    }
};


