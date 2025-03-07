import express from 'express'
import * as personController from '../controllers/person.controller';
import { authLogin} from '../middlewares/auth.Login';
import { authRole } from '../middlewares/auth.Role';


const router = express.Router();                                

router.post('/', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), personController.addPerson );      
//router.post('/changePassword',personController.changePassword);                               

router.get('/', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), personController.people);                                         
router.get('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), personController.getPersonById);                                

//router.put('/changePasswordById/:id', authLogin.private, authRole(['SuperUsuario']), personController.changePasswordById);
//router.put('/changeUserStatusbyId/:id', authLogin.private, authRole(['SuperUsuario']), personController.toggleUserStatus);    
router.put('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), personController.updatePersonById);                    

router.delete('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']),personController.deletePersonById);                          



export default router; 