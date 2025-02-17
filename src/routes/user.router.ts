import express from 'express'
import { addUser, users } from '../controllers/user.controller';


const router = express.Router();                                //cria um roteador

router.get('/', users);

router.get('/ping', (req, res) => {
    res.json({pong: true});
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.json({id, name: 'nome da pessoa', idade: 20})
});

// Rota para criar um novo usuário
router.post('/', addUser );

export default router;