import { Schema, model, connection } from 'mongoose'

type UserType = {
    email: string,
    age: number,
    interests: [string],
    name: {
        firstName: string,
        lastName: string
    }
}

const schema = new Schema<UserType> ({
    email: String,
    age: Number,
    interests: [String],
    name: {
        firstName: String,
        lastName: String
    }
});

const modelName: string = 'User';

export default (connection && connection.models[modelName]) ?connection && connection.models[modelName] : model<UserType>(modelName, schema);