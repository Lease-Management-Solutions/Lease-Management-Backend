import express from 'express'

const router = express.Router();                                //cria um roteador

router.get('/', (req, res)=> {
    res.json({rota: 'acesso'});
});

router.get('/ping', (req, res) => {
    res.json({pong: true});
});


export default router;