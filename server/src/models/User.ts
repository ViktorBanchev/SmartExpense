import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', async function() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
})

export const User = model<IUser>('User', userSchema);