import express from 'express'
import { addUser, users, getUserById, deleteUserById, updateUserById } from '../controllers/user.controller';


const router = express.Router();                                

router.post('/', addUser );                                     

router.get('/', users);                                         
router.get('/:id', getUserById);                                

router.put('/:id', updateUserById);                             

router.delete('/:id', deleteUserById);                          



export default router;