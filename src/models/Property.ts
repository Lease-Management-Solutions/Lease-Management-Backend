import { Schema, model, connection, Document, Model, Types } from 'mongoose';

interface Address {
    street: string;
    number: string;
    neighborhood: string;
    additionalData?: string;
    city: string;
    state: string;
    country: string;
}
 
type PropertyTypeEnum =
    | "casa"
    | "apartamento"
    | "apartamento em condominio"
    | "casa comercial"
    | "casa em condominio"
    | "cobertura"
    | "chacara"
    | "edicula"
    | "fazenda"
    | "flat"
    | "galpão"
    | "garagem"
    | "hotel"
    | "kitnet"
    | "loft"
    | "prédio"
    | "ponto comercial"
    | "sala comercial"
    | "sitio"
    | "studio"
    | "terreno"
    | "consultorio";

interface ContractInfo {
    _id: Types.ObjectId; // ID do contrato no MongoDB
    startDate: Date;
    endDate?: Date | null; // Null quando ainda ativo
}

interface OwnerInfo {
    _id: Types.ObjectId; // ID do proprietário no MongoDB (Referência à coleção de pessoas)
    percentage: number;
    startDate: Date;
    endDate?: Date | null; // Null quando ainda é proprietário
}

interface Attachment {
    type: "matricula" | "agua" | "energia" | "iptu"; // Define o tipo do anexo
    filePath: string; // URL ou caminho do arquivo
}

interface PropertyType extends Document {
    address: Address;
    type: PropertyTypeEnum;
    contracts: ContractInfo[];
    owners: OwnerInfo[];
    condominiumId?: Types.ObjectId;
    waterCode?: string;
    energyCode?: string;
    iptuCode?: string;
    registrationNumber?: string;
    attachments: Attachment[];
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}


const AddressSchema = new Schema<Address>({
    street: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    additionalData: { type: String, required: false},
    state: { type: String, required: true },
    country: { type: String, required: true }
});

const ContractSchema = new Schema<ContractInfo>({
    _id: { type: Schema.Types.ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null }
});

const OwnerSchema = new Schema<OwnerInfo>({
    _id: { type: Schema.Types.ObjectId, required: true },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null }
});


interface PropertyType extends Document {
    address: Address;
    type: PropertyTypeEnum;
    contracts: ContractInfo[];
    owners: OwnerInfo[];
    condominiumId?: Types.ObjectId;
    waterCode?: string;
    energyCode?: string;
    iptuCode?: string;
    registrationNumber?: string;
    attachments: Attachment[]; // Agora é um array de objetos identificáveis
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}

const AttachmentSchema = new Schema<Attachment>({
    type: { type: String, enum: ["matricula", "agua", "energia", "iptu"], required: true },
    filePath: { type: String, required: true }
});

const schema = new Schema<PropertyType>(
    {
        address: { type: AddressSchema, required: true },
        type: { 
            type: String, 
            enum: [
                "casa", "apartamento", "apartamento em condominio", "casa comercial", 
                "casa em condominio", "cobertura", "chacara", "edicula", "fazenda", 
                "flat", "galpão", "garagem", "hotel", "kitnet", "loft", "prédio", 
                "ponto comercial", "sala comercial", "sitio", "studio", "terreno", 
                "consultorio"
            ], 
            required: true 
        },
        contracts: { type: [ContractSchema], default: [] },
        owners: { type: [OwnerSchema], default: [] },
        condominiumId: { type: Schema.Types.ObjectId, ref: "Condominium", required: false },
        waterCode: { type: String, required: false },
        energyCode: { type: String, required: false },
        iptuCode: { type: String, required: false },
        registrationNumber: { type: String, required: false },
        attachments: { type: [AttachmentSchema], default: [] }, // Alterado para um array de objetos
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
    },
    { timestamps: true }
);


const modelName = 'Property';

const Property: Model<PropertyType> = connection.models[modelName]
    ? connection.models[modelName] as Model<PropertyType>
    : model<PropertyType>(modelName, schema);

export default Property;
