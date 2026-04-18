import { z } from 'zod';

export const createTransactionSchema = z.object({
    amount: z.number().positive('Amount should be positive!'),
    type: z.enum(['INCOME', 'EXPENSE'], 'Type can be only income or expense!'),
    title: z.string(),
    note: z.string().optional(),
    icon: z.string()
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;