import { Request, Response, NextFunction } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';

export const authRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload & { role: string };

            if (!allowedRoles.includes(decoded.role)) {
                res.status(403).json({ error: 'Access denied' });
                return;
            }

            next();
        } catch (err) {
            res.status(403).json({ error: 'Invalid token' });
            return;
        }
    };
};
