import { Router } from 'express';
import userService from '../services/userService';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const userController = Router();

userController.get('/', (req, res) => {
    res.send('users')
});

userController.post('/register', async (req, res) => {
    try {
        const validData = registerSchema.parse(req.body);
        const token = await userService.register(validData);

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "User registered"
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
        const token = await userService.login(validData);

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "User logged in"
        })

    } catch (err: any) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ errors: err.errors });
        }

        res.status(400).json({ message: err.message })
    }
});

export default userController;