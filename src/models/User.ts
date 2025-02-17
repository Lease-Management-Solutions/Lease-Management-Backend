import { Schema, model, connection, Document, Model } from 'mongoose';

interface UserType extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

const schema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

const modelName = 'User';

const User: Model<UserType> = connection.models[modelName] 
    ? connection.models[modelName] as Model<UserType>
    : model<UserType>(modelName, schema);

export default User;
