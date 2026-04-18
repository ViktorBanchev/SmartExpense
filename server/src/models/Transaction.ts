import { Schema, model, Types } from "mongoose"

export interface ITransaction {
    userId: Types.ObjectId,
    amount: number,
    title: string,
    type: 'INCOME' | 'EXPENSE',
    category: string,
    note?: string,
    date: Date,
    icon: string
}

const transactionSchema = new Schema<ITransaction>({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount can not be negative.']
    },
    type: {
        type: String,
        enum: ['INCOME', 'EXPENSE'],
        required: true
    },
    note: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    icon: {
        type: String,
        required: true,
        default: '💰',
    }
}, { timestamps: true });

export const Transaction = model<ITransaction>('Transaction', transactionSchema);