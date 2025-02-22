import { Request, Response } from "express";
import User from '../models/User'
import JWT from 'jsonwebtoken';
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
            newUser.name = name;
            newUser.email = email;
            newUser. password = hashedPassword;
            newUser.role = role;
            newUser.avatar = avatar;
            newUser.status = 'active';
            newUser.mustChangePassword = true;
        
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


export const changePassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const token = req.headers.authorization?.split(' ')[1];  // Token no formato "Bearer <token>"

    if (!token || !newPassword) {
        res.status(400).json({ error: "Token and new password are required" });
        return;
    }

    try {
        // Verifica e decodifica o token
        JWT.verify(token, process.env.JWT_SECRET_KEY as string, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }

            // Pega o email do token
            const email = (decoded as any).email;

            // Encontra o usuário pelo email
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Criptografa a nova senha
            const hashedPassword = await bcrypt.hash(newPassword, 10); // A chave de salt pode ser configurada

            // Atualiza a senha no banco de dados
            user.password = hashedPassword;
            user.mustChangePassword = false;  // Desmarca a necessidade de trocar a senha
            await user.save();

            res.status(200).json({ message: "Password updated successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const changePasswordById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const  newpassword  = "trocar"; 
  
   
      const hashedPassword = await bcrypt.hash(newpassword, saltRounds); 
  
      const user = await User.findById(id);
  
      if (!user) {
         res.status(404).json({ message: "Usuário não encontrado" });
         return;
      }
  
      user.password = hashedPassword;
      user.mustChangePassword = true; // Define mustChangePassword como true
      await user.save();
  
      res.status(200).json({ message: "Senha do usuário atualizada com sucesso", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar a senha do usuário", error });
    }
  };

  export const toggleUserStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return ;
      }
  
      // Alterna o status entre 'active' e 'inactive'
      user.status = user.status === 'active' ? 'inactive' : 'active';
      
      await user.save();
  
      res.status(200).json({ message: "Status do usuário alterado com sucesso", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao alterar o status do usuário", error });
    }
  };