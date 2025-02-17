import express from 'express'
import { addUser, users, getUserById } from '../controllers/user.controller';


const router = express.Router();                                //cria um roteador

router.get('/', users);
router.get('/:id', getUserById);



router.post('/', addUser );

export default router;