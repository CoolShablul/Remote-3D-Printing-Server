import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt.util';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = validateToken(token || '');
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
