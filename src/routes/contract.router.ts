import express from 'express'
import * as contractController from '../controllers/contract.controller';
import { authLogin} from '../middlewares/auth.Login';
import { authRole } from '../middlewares/auth.Role';


const router = express.Router();                                

router.post('/', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), contractController.addContract );      
//router.post('/changePassword',personController.changePassword);                               

router.get('/', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), contractController.contracties);                                         
router.get('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), contractController.getContractById);                                

//router.put('/changePasswordById/:id', authLogin.private, authRole(['SuperUsuario']), personController.changePasswordById);
//router.put('/changeUserStatusbyId/:id', authLogin.private, authRole(['SuperUsuario']), personController.toggleUserStatus);    
router.put('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), contractController.updateContractById);                    

router.delete('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']),contractController.deleteContractById);                          



export default router; 