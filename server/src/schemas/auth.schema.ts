import { z } from 'zod';

export const registerSchema = z.object({
    email: z.email('Invalid email!'),
    password: z.string().min(6, 'Password should be at least 6 symbols!'),
    firstName: z.string(),
    lastName: z.string()
});

export const loginSchema = z.object({
    email: z.email('Invalid email!'),
    password: z.string().min(6, 'Password should be at least 6 symbols!'),

})

export type RegisterUserInput = z.infer<typeof registerSchema>;
export type LoginUserInput = z.infer<typeof loginSchema>;