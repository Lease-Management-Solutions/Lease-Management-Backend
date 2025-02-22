import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import dotenv from 'dotenv';
dotenv.config();


export async function initializeAdminUser() {
    const existingUser = await UserModel.findOne();
    if (!existingUser) {
      const userEmail = process.env.USER_EMAIL as string;
      const userPassword = process.env.USER_PASSWORD as string;
      const salt = Number(process.env.SALT_ROUNDS);
      const name = process.env.USER_NAME;
      const hashedPassword = await bcrypt.hash(userPassword, salt);
      await UserModel.create({

        name: name,
        email: userEmail,
        password: hashedPassword, 
        role: "SuperUsuario", 
        status: "active",
      });
      console.log("Usuário admin criado com sucesso.");
    }
  }
