import express from 'express'
import { login } from '../controllers/auth.controller';
import {checkMustChangePassword} from '../middlewares/authCheckLogin'


const router = express.Router();                                

router.post('/', checkMustChangePassword, login );                                     




export default router;