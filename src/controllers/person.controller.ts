import { Request, Response } from "express";
import User from '../models/User'
import Person from '../models/Person'
import JWT from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from "dotenv";


dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");


export const addPerson = async (req: Request, res: Response) => {
    try {
        const {
            name, cpf, rg, issuingAuthority, rgIssuingState, address, email, maritalStatus, 
            nationality, roles, createdAt, createdBy, updatedAt, updatedBy, phones
        } = req.body;

        console.log(req.body);  // Verifique os valores que estão sendo passados

        // Verifica se o CPF já existe
        const existingPerson = await Person.findOne({ cpf });
        if (existingPerson) {
            res.status(400).json({ message: "CPF já cadastrado." });
            return;
        }

        // Cria a pessoa
        const newPerson = new Person({
            name,
            cpf,
            rg,
            issuingAuthority,
            rgIssuingState,
            address,
            email,
            maritalStatus,
            nationality,
            roles,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy,
            phones
        });

        await newPerson.save();
        res.status(201).json({ message: "Pessoa cadastrada com sucesso!", person: newPerson });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar a pessoa", error });
    }
};


export const updatePersonById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            name,
            cpf,
            rg,
            issuingAuthority,
            rgIssuingState,
            address,
            email,
            maritalStatus,
            nationality,
            roles,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy,
            phones
        } = req.body;

        const person = await Person.findById(id);

        if (!person) {
            res.status(404).json({ message: "Pessoa não encontrada" });
            return;
        }

         // Verifica se o email já está sendo usado por outra pessoa
         if (email && email !== person.email) {
            const emailExists = await Person.findOne({ email });
            if (emailExists) {
                res.status(400).json({ message: "Este e-mail já está em uso." });
                return;
            }
        }
        
        person.name = name ?? person.name;
        person.cpf = cpf ?? person.cpf;
        person.rg = rg ?? person.rg;
        person.issuingAuthority = issuingAuthority ?? person.issuingAuthority;
        person.rgIssuingState = rgIssuingState ?? person.rgIssuingState;
        person.address = address ?? person.address;
        person.email = email ?? person.email;
        person.maritalStatus = maritalStatus ?? person.maritalStatus;
        person.nationality = nationality ?? person.nationality;
        person.roles = roles ?? person.roles;
        person.createdAt = createdAt ?? person.createdAt;
        person.createdBy = createdBy ?? person.createdBy;
        person.updatedAt = updatedAt ?? person.updatedAt;
        person.updatedBy = updatedBy ?? person.updatedBy;
        person.phones = phones ?? person.phones;

        await person.save();

        res.status(200).json({ message: "Pessoa atualizada com sucesso!", person });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar a pessoa", error });
    }
};
  

export const people = async (req: Request, res: Response) => {
    try {
        const peopleList = await Person.find();

        res.status(200).json({ message: "Lista de pessoas!", people: peopleList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao recuperar pessoas", error });
    }
};

export const getPersonById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const person = await Person.findById(id);

        if (!person) {
            res.status(404).json({ message: "Pessoa não encontrada" });
            return;
        }

        res.status(200).json({ message: "Pessoa encontrada", person });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar a pessoa", error });
    }
};


export const deletePersonById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const person = await Person.findByIdAndDelete(id);

        if (!person) {
            res.status(404).json({ message: "Pessoa não encontrada" });
            return;
        }

        res.status(200).json({ message: "Pessoa excluída com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir a pessoa", error });
    }
};



