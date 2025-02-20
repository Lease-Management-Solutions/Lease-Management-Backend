import bcrypt from 'bcrypt';
import UserModel from '../models/User';


export async function initializeAdminUser() {
    const existingUser = await UserModel.findOne();
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await UserModel.create({
        name: "Admin", // Adicionado
        email: "admin@admin.com",
        password: hashedPassword,
        role: "SuperUsuario", // Corrigido para a forma exata do enum
        status: "active",
      });
      console.log("Usuário admin criado com sucesso.");
    }
  }
  