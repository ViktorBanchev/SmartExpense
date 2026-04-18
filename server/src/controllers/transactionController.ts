import { Request, Router } from "express";
import { z } from 'zod';
import { createTransaction, deleteTransaction, getTransactions } from "../services/transactionService";
import { createTransactionSchema } from "../schemas/transaction.schema";
import { AuthRequest, requireAuth } from "../middlewares/authMiddleware";

const transactionController = Router();

transactionController.get('/', requireAuth, async (req: AuthRequest, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const transactions = await getTransactions(userId);
        res.status(200).json({
            message: 'Transactions retrieved',
            transactions: transactions
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

transactionController.post('/', requireAuth, async (req: AuthRequest, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const validData = createTransactionSchema.parse(req.body);
        const newTransaction = await createTransaction(validData, userId);
        res.status(201).json({
            message: 'Transaction created',
            transaction: newTransaction
        })
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ errors: error.errors })
        }

        res.status(500).json({ message: 'Server error' })
    }
});

transactionController.delete('/:transactionId', requireAuth, async (req, res) => {
    try {
        const transactionId = req.params.transactionId as string;
        await deleteTransaction(transactionId);
        res.status(200).json({ message: 'Transaction deleted.' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

export default transactionController;