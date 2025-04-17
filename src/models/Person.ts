import { Schema, model, connection, Document, Model } from 'mongoose';

interface Address {
    street: string;
    number: string;
    additionalData?: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
}

interface Phone {
    type: "mobile" | "home" | "work";
    number: string;
    startDate: Date;
    endDate?: Date | null; 
  }
  
  interface Email {
    type: "personal" | "work";
    email: string;
    startDate: Date;
    endDate?: Date | null; 
  }
  
  interface Contact {
    phones?: Phone[]; 
    emails?: Email[]; 
  }


interface Role {
    role: "locatario" | "locador" | "fiador" | "fornecedor" | "devedor";
    contractId?: string;
}

export interface PersonType extends Document {
    name: string;
    cpf: string;
    rg: string;
    issuingAuthority: string;
    rgIssuingState: string;
    address: Address;
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "Legally Separated" | "Stable Union";
    nationality: string;
    roles: Role[]; 
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    contact?: Contact[];
}


const AddressSchema = new Schema<Address>({
    street: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    additionalData: {type:String, required: false},
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
});

const PhoneSchema = new Schema<Phone>({
    type: { type: String, enum: ["mobile", "home", "work"], required: false },
    number: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false }, // Opcional
  });


const EmailSchema = new Schema<Email>({
    type: { type: String, enum: ["personal", "work"], required: false },
    email: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false }, // Opcional
  });
  

const ContactSchema = new Schema<Contact>({
    phones: { type: [PhoneSchema], required: false }, // Array de Phone
    emails: { type: [EmailSchema], required: false }, // Array de Email
  });


const schema = new Schema<PersonType>({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    issuingAuthority: { type: String, required: true },
    rgIssuingState: { type: String, required: true },
    address: { type: AddressSchema, required: true },
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
    contact: { type: [ContactSchema], required: false }
}, { timestamps: true });

const modelName = 'Person';

const Person: Model<PersonType> = connection.models[modelName]
    ? connection.models[modelName] as Model<PersonType>
    : model<PersonType>(modelName, schema);

export default Person;
