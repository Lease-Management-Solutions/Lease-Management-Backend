import { Schema, model, connection, Document, Model, Types } from 'mongoose';

enum LeaseTypeEnum {
  Residencial = "Residencial",
  NaoResidencial = "Nao residencial",
  Comercial = "Comercial",
  Industrial = "Industrial",
  Temporada = "Temporada",
  Mista = "Mista",
  ArrendamentoRural = "Arrendamento Rural",
  ParceriaRural = "Parceria Rural",
}

enum AdjustmentPeriodEnum {
  "12 meses" = "12 meses",
  "24 meses" = "24 meses",
  "36 meses" = "36 meses",
  "48 meses" = "48 meses",
  "sem reajuste" = "sem reajuste"
}

enum AdjustmentIndexEnum {
  IGPM = "IGPM",
  INPC = "INPC",
  IPCA = "IPCA"
}

enum GuaranteeTypeEnum {
  Caucao = "Caução",
  SeguroFianca = "Seguro fiança",
  Fiador = "Fiador",
  SemGarantia = "Sem garantia"
}

interface TenantInfo {
  id_locatario: Types.ObjectId; // Referência ao locatário
  startDate: Date;
  endDate?: Date | null; // Null se ainda for locatário
  percentage: number;
}

interface GuaranteeInfo {
  id_garantia: Types.ObjectId;
  type: GuaranteeTypeEnum;
  startDate: Date;
  endDate?: Date | null;
}

interface RentAdjustment {
  startDate: Date;
  endDate?: Date | null;
  adjustmentValue: number;
  adjustedRent: number;
}

interface InsuranceInfo {
  id: Types.ObjectId; // Referência ao seguro incêndio
  startDate: Date;
  endDate?: Date | null;
}

interface ContracType extends Document {
  id_imovel: Types.ObjectId; // Referência ao imóvel
  leaseType: LeaseTypeEnum; // Tipo de locação
  tenants: TenantInfo[];
  guarantees: GuaranteeInfo[];
  contractStartDate: Date;
  contractDuration: number; // Em meses
  contractEndDate: Date;
  initialRentValue: number;
  rentDueDay: number; // Dia de vencimento do aluguel
  keyDeliveryDate: Date;
  adjustmentPeriod: AdjustmentPeriodEnum; // Período de reajuste
  adjustmentIndex: AdjustmentIndexEnum; // Índice de reajuste
  rentAdjustments: RentAdjustment[];
  firstRentAtStart: boolean; // Se o 1º aluguel é no início
  penaltyExemption: { isExempt: boolean, exemptionPeriodInMonths: number };
  lateFeeRate: number;
  penaltyRate: number;
  adminFee: number;
  guaranteedTransfer: { isGuaranteed: boolean, guaranteePeriodInMonths: number };
  fireInsurance: InsuranceInfo;
  firstRentCommission: number; // Comissão sobre o 1º aluguel
}

export { ContracType };

const TenantSchema = new Schema<TenantInfo>({
  id_locatario: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
  percentage: { type: Number, required: true, min: 0, max: 100 },
});

const GuaranteeSchema = new Schema<GuaranteeInfo>({
  id_garantia: { type: Schema.Types.ObjectId, ref: 'Guarantee', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
});

const RentAdjustmentSchema = new Schema<RentAdjustment>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
  adjustmentValue: { type: Number, required: true },
  adjustedRent: { type: Number, required: true },
});

const InsuranceInfoSchema = new Schema<InsuranceInfo>({
  id: { type: Schema.Types.ObjectId, ref: 'Insurance', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
});

const schema = new Schema<ContracType>({
  id_imovel: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  leaseType: { type: String, enum: Object.values(LeaseTypeEnum), required: true },
  tenants: { type: [TenantSchema], required: true },
  guarantees: { type: [GuaranteeSchema], required: true },
  contractStartDate: { type: Date, required: true },
  contractDuration: { type: Number, required: true }, // Em meses
  contractEndDate: { type: Date, required: true },
  initialRentValue: { type: Number, required: true },
  rentDueDay: { type: Number, required: true },
  keyDeliveryDate: { type: Date, required: true },
  adjustmentPeriod: { type: String, enum: Object.values(AdjustmentPeriodEnum), required: true },
  adjustmentIndex: { type: String, enum: Object.values(AdjustmentIndexEnum), required: true },
  rentAdjustments: { type: [RentAdjustmentSchema], required: false },
  firstRentAtStart: { type: Boolean, required: true },
  penaltyExemption: { type: { isExempt: Boolean, exemptionPeriodInMonths: Number }, required: true },
  lateFeeRate: { type: Number, required: true },
  penaltyRate: { type: Number, required: true },
  adminFee: { type: Number, required: true },
  guaranteedTransfer: { type: { isGuaranteed: Boolean, guaranteePeriodInMonths: Number }, required: true },
  fireInsurance: { type: InsuranceInfoSchema, required: false },
  firstRentCommission: { type: Number, required: true },
}, { timestamps: true });


const modelName = 'Contract';

const Contract: Model<ContracType> = connection.models[modelName] 
    ? connection.models[modelName] as Model<ContracType>
    : model<ContracType>(modelName, schema);


export default Contract;
