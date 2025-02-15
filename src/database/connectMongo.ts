import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export const mongoConnect = async () => {
    try {
        console.log('Conectando ao MongoDB...');
        const mongoURL = process.env.MONGO_URL || 'mongodb://admin:secret@mongodb:27017/lease-management';
        await connect(mongoURL);
        console.log("Mongo conectado com sucesso...")

    } catch (error) {
        console.log("Erro de conexão ao MongoDB:", error);
    }
}