import { Router } from 'express';
import userService from '../services/userService';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { config } from '../config';
import { requireAuth } from '../middlewares/authMiddleware';

const userController = Router();

userController.post('/register', async (req, res) => {
    try {
        const validData = registerSchema.parse(req.body);
        const { token, loggedUser } = await userService.register(validData);

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: config.isProduction ? 'none' : 'lax',
            secure: config.isProduction,
            maxAge: 10 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "User registered",
            user: {
                fullName: loggedUser.fullName,
                email: loggedUser.email
            }
        })

    } catch (err: any) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ errors: err.errors });
        }

        res.status(400).json({ message: err.message })
    }
});

userController.post('/login', async (req, res) => {
    try {
        const validData = loginSchema.parse(req.body);
        const { token, loggedUser } = await userService.login(validData);

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: config.isProduction ? 'none' : 'lax',
            secure: config.isProduction,
            maxAge: 10 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "User logged in",
            user: {
                fullName: loggedUser.fullName,
                email: loggedUser.email
            }
        })

    } catch (err: any) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ errors: err.errors });
        }

        res.status(400).json({ message: err.message })
    }
});

userController.post('/logout', requireAuth, (req, res) => {
    res.cookie('auth', '', {
        httpOnly: true,
        maxAge: 1
    });
    res.status(200).json({ message: 'Successfull logout' });
})

export default userController;