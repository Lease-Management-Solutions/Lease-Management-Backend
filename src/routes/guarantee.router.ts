import express from 'express'
import * as guaranteeController from '../controllers/guarantee.controller';
import { authLogin } from '../middlewares/auth.Login';
import { authRole } from '../middlewares/auth.Role';

const router = express.Router(); 

// Criar uma nova garantia para um contrato
router.post('/', authLogin.private, authRole(['Administrativo', 'Financeiro', 'SuperUsuario']), guaranteeController.addGuarantee);

// Buscar todas as garantias (com filtros se desejar, ex: por contratoId)
router.get('/', authLogin.private, authRole(['Administrativo', 'Financeiro', 'SuperUsuario']), guaranteeController.getAllGuarantees);

// Buscar uma garantia específica (por id)
router.get('/:id', authLogin.private, authRole(['Administrativo', 'Financeiro', 'SuperUsuario']), guaranteeController.getGuaranteeById);

// Atualizar uma garantia existente (editar tipo, datas, fiadores, etc.)
router.put('/:id', authLogin.private, authRole(['Administrativo', 'Financeiro', 'SuperUsuario']), guaranteeController.updateGuaranteeById);

// Excluir uma garantia (caso o contrato não vá mais ter nenhuma)
router.delete('/:id', authLogin.private, authRole(['Administrativo', 'Financeiro', 'SuperUsuario']), guaranteeController.deleteGuaranteeById);


// Adicionar um novo depósito em uma garantia tipo Caucao
router.post('/:id/deposit', authLogin.private, authRole(['Administrativo', 'Financeiro', 'SuperUsuario']), guaranteeController.addDepositToCaucao);

// Remover um depósito específico
router.delete('/:id/deposit/:depositId', authLogin.private, authRole(['Administrativo', 'Financeiro', 'SuperUsuario']), guaranteeController.removeDepositFromCaucao);


export default router;