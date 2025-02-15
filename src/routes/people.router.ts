import express from 'express'
import { peopleAdd } from '../controllers/people.controller';


const router = express.Router();                                //cria um roteador

router.get('/', (req, res)=> {
    res.json({rota: 'pessoas'});
    
   
});

router.get('/ping', (req, res) => {
    res.json({pong: true});
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.json({id, name: 'nome da pessoa', idade: 20})
});

// Rota para criar um novo usuário
router.post('/', peopleAdd );

export default router;