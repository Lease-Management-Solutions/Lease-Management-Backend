import { Request, Response } from "express";
import Contract from '../models/Contract';

export const addContract = async (req: Request, res: Response) => {
    try {
        const {
            id_imovel,
            leaseType,
            tenants,
            guarantees,
            contractStartDate,
            contractDuration,
            contractEndDate,
            initialRentValue,
            rentDueDay,
            keyDeliveryDate,
            adjustmentPeriod,
            adjustmentIndex,
            rentAdjustments,
            firstRentAtStart,
            penaltyExemption,
            lateFeeRate,
            penaltyRate,
            adminFee,
            guaranteedTransfer,
            fireInsurance,
            firstRentCommission
        } = req.body;

        // Cria um novo contrato
        const newContract = new Contract({
            id_imovel,
            leaseType,
            tenants: tenants ?? [],
            guarantees: guarantees ?? [],
            contractStartDate,
            contractDuration,
            contractEndDate,
            initialRentValue,
            rentDueDay,
            keyDeliveryDate,
            adjustmentPeriod,
            adjustmentIndex,
            rentAdjustments: rentAdjustments ?? [],
            firstRentAtStart,
            penaltyExemption,
            lateFeeRate,
            penaltyRate,
            adminFee,
            guaranteedTransfer,
            fireInsurance,
            firstRentCommission
        });

        await newContract.save();
        res.status(201).json({ message: "Contrato cadastrado com sucesso!", contract: newContract });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar o contrato", error });
    }
};

export const updateContractById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            id_imovel,
            leaseType,
            tenants,
            guarantees,
            contractStartDate,
            contractDuration,
            contractEndDate,
            initialRentValue,
            rentDueDay,
            keyDeliveryDate,
            adjustmentPeriod,
            adjustmentIndex,
            rentAdjustments,
            firstRentAtStart,
            penaltyExemption,
            lateFeeRate,
            penaltyRate,
            adminFee,
            guaranteedTransfer,
            fireInsurance,
            firstRentCommission
        } = req.body;

        const contract = await Contract.findById(id);

        if (!contract) {
            res.status(404).json({ message: "Contrato não encontrado" });
            return;
        }

        contract.id_imovel = id_imovel ?? contract.id_imovel;
        contract.leaseType = leaseType ?? contract.leaseType;
        contract.tenants = tenants ?? contract.tenants;
        contract.guarantees = guarantees ?? contract.guarantees;
        contract.contractStartDate = contractStartDate ?? contract.contractStartDate;
        contract.contractDuration = contractDuration ?? contract.contractDuration;
        contract.contractEndDate = contractEndDate ?? contract.contractEndDate;
        contract.initialRentValue = initialRentValue ?? contract.initialRentValue;
        contract.rentDueDay = rentDueDay ?? contract.rentDueDay;
        contract.keyDeliveryDate = keyDeliveryDate ?? contract.keyDeliveryDate;
        contract.adjustmentPeriod = adjustmentPeriod ?? contract.adjustmentPeriod;
        contract.adjustmentIndex = adjustmentIndex ?? contract.adjustmentIndex;
        contract.rentAdjustments = rentAdjustments ?? contract.rentAdjustments;
        contract.firstRentAtStart = firstRentAtStart ?? contract.firstRentAtStart;
        contract.penaltyExemption = penaltyExemption ?? contract.penaltyExemption;
        contract.lateFeeRate = lateFeeRate ?? contract.lateFeeRate;
        contract.penaltyRate = penaltyRate ?? contract.penaltyRate;
        contract.adminFee = adminFee ?? contract.adminFee;
        contract.guaranteedTransfer = guaranteedTransfer ?? contract.guaranteedTransfer;
        contract.fireInsurance = fireInsurance ?? contract.fireInsurance;
        contract.firstRentCommission = firstRentCommission ?? contract.firstRentCommission;

        await contract.save();

        res.status(200).json({ message: "Contrato atualizado com sucesso!", contract });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar o contrato", error });
    }
};

export const contracties = async (req: Request, res: Response) => {
    try {
        const contractList = await Contract.find();

        res.status(200).json({ message: "Lista de contratos!", contracts: contractList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao recuperar contratos", error });
    }
};

export const getContractById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const contract = await Contract.findById(id);

        if (!contract) {
            res.status(404).json({ message: "Contrato não encontrado" });
            return;
        }

        res.status(200).json({ message: "Contrato encontrado", contract });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar o contrato", error });
    }
};

export const deleteContractById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const contract = await Contract.findByIdAndDelete(id);

        if (!contract) {
            res.status(404).json({ message: "Contrato não encontrado" });
            return;
        }

        res.status(200).json({ message: "Contrato excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir o contrato", error });
    }
};
