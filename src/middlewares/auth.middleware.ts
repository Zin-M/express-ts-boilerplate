import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const accessTokenSecret = process.env.JWT_SECRET as string;

// Extend the Request interface to include the `user` property
interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.sendStatus(401);
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = user;
        next();
    });
}
