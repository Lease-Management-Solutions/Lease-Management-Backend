import express from 'express'
import * as userController from '../controllers/user.controller';
import { authLogin} from '../middlewares/auth.Login';
import { authRole } from '../middlewares/auth.Role';


const router = express.Router();                                

router.post('/', authLogin.private, authRole(['SuperUsuario']), userController.addUser );      
router.post('/changePassword', authRole(['SuperUsuario']),userController.changePassword);                               

router.get('/', authLogin.private,authRole(['SuperUsuario']), userController.users);                                         
router.get('/:id', authLogin.private, authRole(['SuperUsuario']),userController.getUserById);                                

router.put('/changePasswordById:id', authLogin.private, authRole(['SuperUsuario']),userController.changePasswordById);
router.put('/changeUserStatusbyId:id', authLogin.private, authRole(['SuperUsuario']),userController.toggleUserStatus);                    

router.delete('/:id', authLogin.private, authRole(['SuperUsuario']),userController.deleteUserById);                          



export default router;