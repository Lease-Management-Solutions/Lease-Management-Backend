import { Request, Response } from "express";
import Garantee, { GuaranteeTypeEnum } from "../models/Garantee";
import mongoose from "mongoose";
import Contract from "../models/Contract";

export const addGuarantee = async (req: Request, res: Response) => {
    try {
      const {
        type,
        startDate,
        endDate,
        fiadores,
        caucao,
        rentalInsurance,
        contractId
      } = req.body;
  
      // Valida o tipo de garantia
      if (!Object.values(GuaranteeTypeEnum).includes(type)) {
        console.error('Tipo de garantia inválido:', type);
        res.status(400).json({ message: "Tipo de garantia inválido." });
        return;
      }
      console.log('Requisição recebida no /guarantee:', req.body);
      // Validação por tipo
      switch (type) {
        case GuaranteeTypeEnum.Fiador:
          if (!fiadores || !Array.isArray(fiadores) || fiadores.length === 0) {
            res.status(400).json({ message: "É necessário informar pelo menos um fiador." });
            return;
          }
          break;
  
        case GuaranteeTypeEnum.Caucao:
          if (!caucao || typeof caucao.totalValue !== 'number' || !caucao.depositAccount) {
            res.status(400).json({ message: "Dados de caução inválidos." });
            return;
          }
          break;
  
        case GuaranteeTypeEnum.SeguroFianca:
          if (!rentalInsurance || typeof rentalInsurance.installmentValue !== 'number') {
            res.status(400).json({ message: "Dados de seguro fiança inválidos." });
            return;
          }
          break;
  
        case GuaranteeTypeEnum.SemGarantia:
          // Sem validação adicional
          break;
      }
  
      let validatedContractId = undefined;
  
      // Só valida se o contractId for informado
      if (contractId) {
        if (!mongoose.Types.ObjectId.isValid(contractId)) {
          res.status(400).json({ message: "ID de contrato inválido." });
          return;
        }
  
        const existingContract = await Contract.findById(contractId);
        if (!existingContract) {
          res.status(404).json({ message: "Contrato não encontrado." });
          return;
        }
  
        validatedContractId = contractId;
      }
  
      const newGarantee = new Garantee({
        type,
        startDate,
        endDate: endDate ?? null,
        fiadores: fiadores ?? [],
        caucao: caucao ?? undefined,
        rentalInsurance: rentalInsurance ?? undefined,
        contractId: validatedContractId,
      });
  
      const savedGuarantee = await newGarantee.save();
      res.status(201).json({ message: "Garantia adicionada com sucesso!", garantee: savedGuarantee });
  
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Erro ao adicionar garantia", error });
    }
  };
  

export const getAllGuarantees = async (req: Request, res: Response) => {


}

export const getGuaranteeById = async (req: Request, res: Response) => {


}

export const updateGuaranteeById = async (req: Request, res: Response) => {


}

export const deleteGuaranteeById = async (req: Request, res: Response) => {


}

export const addDepositToCaucao = async (req: Request, res: Response) => {


}

export const removeDepositFromCaucao = async (req: Request, res: Response) => {


}