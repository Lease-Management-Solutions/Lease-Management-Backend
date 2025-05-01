import { Schema, model, connection, Document, Model, Types } from 'mongoose';

export enum GuaranteeTypeEnum {
    Caucao = "Caucao",
    SeguroFianca = "SeguroFianca",
    Fiador = "Fiador",
    SemGarantia = "SemGarantia",
  }
  
  interface DepositDetail {
    date: Date;
    fileAttachment: string;
    partialValue: number;
    depositAccount: string;
  }
  interface Caucao {    
    depositAccount?: string;
    totalValue?: number;
    deposits?: DepositDetail[];
  }

  interface RentalInsurance {
    installmentValue?: number; //valor da parcela
    installmentQty?: number; //quantidade de parcelas
    policyNumber?: string; // numero da apolice
  }

export interface GaranteeType extends Document {
    type: GuaranteeTypeEnum;
    startDate: Date;
    endDate?: Date | null;
    fiadores?: Types.ObjectId[];
    caucao?: Caucao;
    rentalInsurance?: RentalInsurance;
    contractId?: Types.ObjectId;
}

const depositDetailSchema = new Schema<DepositDetail>({
    date: { type: Date, required: true },
    fileAttachment: { type: String, required: true },
    partialValue: { type: Number, required: true },
    depositAccount: { type: String, required: true },
});

const caucaoSchema = new Schema<Caucao>({
    depositAccount: { type: String, required: false },
    totalValue: { type: Number, required: false },
    deposits: { type: [depositDetailSchema], default: [] },
});

const rentalInsuranceSchema = new Schema<RentalInsurance>({
    installmentValue: { type: Number, required: false },
    installmentQty: { type: Number, required: false },
    policyNumber: { type: String, required: false },
});
''
const schema = new Schema<GaranteeType>({
    type: { type: String, enum: Object.values(GuaranteeTypeEnum), required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    fiadores: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    caucao: { type: caucaoSchema },
    rentalInsurance: { type: rentalInsuranceSchema, required: false },
    contractId: { type: Schema.Types.ObjectId, ref: 'Contract' },
}, { timestamps: true });


const modelName = 'Garantee';

const Garantee: Model<GaranteeType> = connection.models[modelName]
    ? connection.models[modelName] as Model<GaranteeType>
    : model<GaranteeType>(modelName, schema);

export default Garantee;