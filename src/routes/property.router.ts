import express from 'express'
import * as propertyController from '../controllers/property.controller';
import { authLogin} from '../middlewares/auth.Login';
import { authRole } from '../middlewares/auth.Role';


const router = express.Router();                                

router.post('/', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), propertyController.addProperty );      
//router.post('/changePassword',personController.changePassword);                               

router.get('/', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), propertyController.properties);                                         
router.get('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), propertyController.getPropertyById);                                

//router.put('/changePasswordById/:id', authLogin.private, authRole(['SuperUsuario']), personController.changePasswordById);
//router.put('/changeUserStatusbyId/:id', authLogin.private, authRole(['SuperUsuario']), personController.toggleUserStatus);    
router.put('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']), propertyController.updatePropertyById);                    

router.delete('/:id', authLogin.private, authRole(['Administrativo','Financeiro','SuperUsuario']),propertyController.deletePropertyById);                          



export default router; 