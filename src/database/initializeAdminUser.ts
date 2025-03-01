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
        const name = process.env.USER_NAME as string;
        const createdBy = "System";
        const updatedBy = "System";
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        await UserModel.create({
            name:name,
            email: userEmail,
            password: hashedPassword, 
            role: "SuperUsuario", 
            status: "active",
            mustChangePassword: true,
            createdAt: new Date(),
            createdBy,
            updatedAt: new Date(),
            updatedBy,
            address: {
                street: "Default Street",
                number: "000",
                neighborhood: "Default Neighborhood",
                city: "Default City",
                state: "Default State",
                country: "Default Country"
            },
            cpf: "000.000.000-00",
            rg: "00.000.000-0",
            issuingAuthority:"000/00",
            rgIssuingState: "SP",
            maritalStatus: "Single",
            nationality: "Default Nationality",
            phones: 
            [ 
                {
                "type": "mobile",
                "number": "11987654321"
                }
            ]
        });

        console.log(`Usuário ${name} criado com sucesso.`);
    }
}
