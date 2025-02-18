import {Request, Response, NextFunction} from 'express';
import JWT, { JwtPayload }  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authLogin = {
    private: (req: Request, res: Response, next: NextFunction) => {

        let success = false;

        if(req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');
                if(authType === 'Bearer') {
                    try{
                        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
                       
                       
                        // proposta do chat ----------------------
                        if (typeof decoded !== 'string' && decoded !== null) {
                            const { id, role } = decoded as JwtPayload & { id: string, role: string };
                            console.log(id, role);
                        }
                        // fim da proposta do chat-----------------
                        success = true;
                    }catch(err) {
                        
                    }
                    
                }

        }


        if (success) {
            next();
        } else {
            res.status(403);
            res.json({ error: 'Unauthorized' });
        }
    }
}