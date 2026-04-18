import { User } from "../models/User";
import { LoginUserInput, RegisterUserInput } from "../schemas/auth.schema";
import jwt from 'jsonwebtoken';
import bcypt from 'bcrypt';
import { config } from "../config";

async function register(userData: RegisterUserInput) {
    const user = await User.create(userData);
    const payload = {
        id: user.id,
        email: user.email
    }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '2h' });
    return {
        token,
        loggedUser: {
            email: user.email,
            fullName: `${user.firstName} ${user.lastName}`
        }
    };
}

async function login({ email, password }: LoginUserInput) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found!");
    }

    if (!await bcypt.compare(password, user.password)) {
        throw new Error("Incorrect email or password!")
    }

    const payload = {
        id: user.id,
        email: user.email
    }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '2h' });
    return {
        token,
        loggedUser: {
            email: user.email,
            fullName: `${user.firstName} ${user.lastName}`
        }
    };
}

export default {
    register,
    login
}