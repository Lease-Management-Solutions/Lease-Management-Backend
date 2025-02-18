import express from 'express'
import * as userController from '../controllers/user.controller';
import { authLogin} from '../middlewares/auth.Login';


const router = express.Router();                                

router.post('/', authLogin.private, userController.addUser );                                     

router.get('/', authLogin.private, userController.users);                                         
router.get('/:id', authLogin.private, userController.getUserById);                                

router.put('/:id', authLogin.private, userController.updateUserById);                             

router.delete('/:id', authLogin.private, userController.deleteUserById);                          



export default router;