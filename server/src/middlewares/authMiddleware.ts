import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../config";

export interface AuthRequest extends Request {
    user?: { id: string };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ message: 'Access denied! You are not logged in!' })
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid session. Try again later.' })
    }
}