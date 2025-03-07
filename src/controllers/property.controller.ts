import { Request, Response } from "express";

import Property from '../models/property'


export const addProperty = async (req: Request, res: Response) => {
    try {
        const {
            address,
            type,
            contracts,
            owners,
            condominiumId,
            waterCode,
            energyCode,
            iptuCode,
            registrationNumber,
            attachments,
            createdBy
        } = req.body;

        // Verifica se já existe um imóvel com o mesmo número de registro
        if (registrationNumber) {
            const existingProperty = await Property.findOne({ registrationNumber });
            if (existingProperty) {
                res.status(400).json({ message: "Número de registro já cadastrado para outro imóvel." });
                return;
            }
        }

        // Cria um novo imóvel
        const newProperty = new Property({
            address,
            type,
            contracts: contracts ?? [],
            owners: owners ?? [],
            condominiumId,
            waterCode,
            energyCode,
            iptuCode,
            registrationNumber,
            attachments: attachments ?? [],
            createdBy,
            updatedBy: createdBy
        });

        await newProperty.save();
        res.status(201).json({ message: "Imóvel cadastrado com sucesso!", property: newProperty });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar o imóvel", error });
    }
};



export const updatePropertyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            address,
            type,
            contracts,
            owners,
            condominiumId,
            waterCode,
            energyCode,
            iptuCode,
            registrationNumber,
            attachments,
            updatedBy
        } = req.body;

        const property = await Property.findById(id);

        if (!property) {
            res.status(404).json({ message: "Imóvel não encontrado" });
            return;
        }

        property.address = address ?? property.address;
        property.type = type ?? property.type;
        property.contracts = contracts ?? property.contracts;
        property.owners = owners ?? property.owners;
        property.condominiumId = condominiumId ?? property.condominiumId;
        property.waterCode = waterCode ?? property.waterCode;
        property.energyCode = energyCode ?? property.energyCode;
        property.iptuCode = iptuCode ?? property.iptuCode;
        property.registrationNumber = registrationNumber ?? property.registrationNumber;
        property.attachments = attachments ?? property.attachments;
        property.updatedBy = updatedBy ?? property.createdAt;

        await property.save(); 

        res.status(200).json({ message: "Imóvel atualizado com sucesso!", property });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar o imóvel", error });
    }
};
  

export const properties = async (req: Request, res: Response) => {
    try {
        const propoertyList = await Property.find();

        res.status(200).json({ message: "Lista de imóveis!", properties: propoertyList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao recuperar imóveis", error });
    }
};

export const getPropertyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const property = await Property.findById(id);

        if (!property) {
            res.status(404).json({ message: "Imóvel não encontrado" });
            return;
        }

        res.status(200).json({ message: "Imóvel encontrado", property });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar a imóvel", error });
    }
};


export const deletePropertyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const property = await Property.findByIdAndDelete(id);

        if (!property) {
            res.status(404).json({ message: "Imóvel não encontrado" });
            return;
        }

        res.status(200).json({ message: "Imóvel excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir o imóvel", error });
    }
};



