import { Schema, model, connection, Document, Model } from 'mongoose';

interface Address {
    street: string;  
    number: string;
    neighborhood: string;  
    city: string;  
    state: string;  
    country: string;  
}

interface UserType extends Document {
    name: string;
    cpf: string;
    rg: string;
    issuingAuthority: string;
    rgIssuingState: string;
    address: Address;
    email: string;
    password: string;
    maritalStatus: "Single"| "Married" |"Divorced" | "Widowed" | "Legally Separated"| "Stable Union";
    role: "Corretor" | "Administrativo" | "Financeiro" | "SuperUsuario";
    nationality: string;
    avatar?: string;
    status: "active" | "inactive";
    mustChangePassword: boolean;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}

export { UserType };


const AddressSchema = new Schema<Address>({
    street: { type: String, required: true }, 
    number: { type: String, required: true },  
    neighborhood: { type: String, required: true },  
    city: { type: String, required: true },  
    state: { type: String, required: true },  
    country: { type: String, required: true }  
});

const schema = new Schema<UserType>({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    issuingAuthority: {type: String, required: true},
    rgIssuingState: {type: String, required: true},
    address: { type: AddressSchema, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed", "Legally Separated", "Stable Union"], required: true },  
    role: { type: String, required: true, enum: ["Corretor", "Administrativo", "Financeiro", "SuperUsuario"] },
    nationality: { type: String, required: true },
    avatar: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" }, 
    mustChangePassword: {type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String, required: true }

});

const modelName = 'User';

const User: Model<UserType> = connection.models[modelName] 
    ? connection.models[modelName] as Model<UserType>
    : model<UserType>(modelName, schema);

export default User;
