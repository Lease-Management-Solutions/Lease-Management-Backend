import { Schema, model, connection, Document, Model } from 'mongoose';

// Definindo o tipo de endereço e telefone
interface Address {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
}

interface Phone {
    type: "mobile" | "home" | "work";
    number: string;
}

// Definindo a interface para o modelo de Pessoa (Person)
interface Role {
    role: "locatario" | "locador" | "fiador" | "fornecedor" | "devedor";
    contractId?: string;
}

interface PersonType extends Document {
    name: string;
    cpf: string;
    rg: string;
    issuingAuthority: string;
    rgIssuingState: string;
    address: Address;
    email?: string;
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "Legally Separated" | "Stable Union";
    nationality: string;
    roles: Role[]; // Array de papéis associados a contratos diferentes
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    phones?: Phone[];
}

export { PersonType };

// Esquema de endereço e telefone
const AddressSchema = new Schema<Address>({
    street: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
});

const PhoneSchema = new Schema<Phone>({
    type: { type: String, enum: ["mobile", "home", "work"], required: true },
    number: { type: String, required: true }
});

// Esquema para o modelo de Person
const schema = new Schema<PersonType>({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    issuingAuthority: { type: String, required: true },
    rgIssuingState: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    email: { type: String, unique: true, required: true },
    maritalStatus: { 
        type: String, 
        enum: ["Single", "Married", "Divorced", "Widowed", "Legally Separated", "Stable Union"], 
        required: true 
    },
    nationality: { type: String, required: true },
    roles: [
        { 
            role: { type: String, enum: ["locatario", "locador", "fiador", "fornecedora", "devedora"], required: true },
            contractId: { type: String, required: false}, 
           }
    ],
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String, required: true },
    phones: { type: [PhoneSchema], required: false }
}, { timestamps: true });

// Modelo de Person
const modelName = 'Person';

const Person: Model<PersonType> = connection.models[modelName]
    ? connection.models[modelName] as Model<PersonType>
    : model<PersonType>(modelName, schema);

export default Person;
