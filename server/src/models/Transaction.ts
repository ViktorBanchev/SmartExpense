import { Schema, model, Types } from "mongoose"

export interface ITransaction {
    userId: Types.ObjectId,
    amount: number,
    type: 'INCOME' | 'EXPENSE',
    category: string,
    note?: string,
    date: Date,
}

const transactionSchema = new Schema<ITransaction>({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
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
    category: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

export const Transaction = model<ITransaction>('Transaction', transactionSchema);