import { Transaction } from "../models/Transaction";
import { CreateTransactionInput } from "../schemas/transaction.schema";


async function createTransaction(data: CreateTransactionInput, userId: string) {
    const transaction = await Transaction.create({ userId, ...data });
    return transaction;
}

async function deleteTransaction(transactionId: string) {
    return await Transaction.deleteOne({_id: transactionId});
}

export {
    createTransaction,
    deleteTransaction
}