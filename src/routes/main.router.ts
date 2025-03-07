import express from 'express'
import userRouter from './user.router'
import routerAccess from './access.router'
import authRouter from './auth.router'
import personRouter from './person.router'
import propertyRouter from './property.router'

const router = express.Router();                            //cria um roteador

router.use('/access', routerAccess);                        // /access/ acessa a rota de acessos
router.use('/users', userRouter);                           // /users/ acessa a rota sobre usuarios do sistema
router.use('/auth', authRouter);                            // /auth/ acessa a rota de login
router.use('/person', personRouter);                        // /person/ acessa a rota de pessoas do sistema
router.use('/property', propertyRouter);                    // /property/ acessa a rota de imóveis do sistema
                                                            
router.get('/', (req, res)=> {
    res.json({rota: 'main'});
});

router.get('/ping', (req, res) => {
    res.json({pong: true});
});


export default router;