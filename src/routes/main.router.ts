import express from 'express'
import userRouter from './user.router'
import routerAccess from './access.router'

const router = express.Router();                            //cria um roteador

router.use('/access', routerAccess);                        // /access/ acessa a rota de acessos
router.use('/users', userRouter);                        // /people/ acessa a rota sobre pessoas
                                                            
router.get('/', (req, res)=> {
    res.json({rota: 'main'});
});

router.get('/ping', (req, res) => {
    res.json({pong: true});
});


export default router;