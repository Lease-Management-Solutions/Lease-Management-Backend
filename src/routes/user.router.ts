import express, { RequestHandler } from 'express'
import * as userController from '../controllers/user.controller';
import { authLogin} from '../middlewares/auth.Login';
import { authRole } from '../middlewares/auth.Role';


const router = express.Router();                                

router.post('/', authLogin.private, authRole(['SuperUsuario']), userController.addUser );      
router.post('/changePassword', userController.changePassword as RequestHandler);                               

router.get('/', authLogin.private,authRole(['SuperUsuario']), userController.users);                                         
router.get('/:id', authLogin.private, userController.getUserById);                                

router.put('/:id', authLogin.private, userController.updateUserById);                             

router.delete('/:id', authLogin.private, userController.deleteUserById);                          



export default router;