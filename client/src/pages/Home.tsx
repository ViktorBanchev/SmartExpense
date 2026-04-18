import { useState } from "react";
import { useAuthStore } from "../store/authStore"
import TransactionForm from "../components/TransactionForm";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { dateFormatter, isToday } from "../utils/formatter";

interface Transaction {
    _id: string;
    title: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    note?: string;
    createdAt: string;
    icon: string;
}

export default function Home() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore(state => state.logout);
    const [showModal, setShowModal] = useState(false);

    const { data: transactions = [] } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: async () => {
            const response = await api.get('/api/transactions');
            return response.data.transactions;
        }
    });

    const totalIncome = transactions.reduce((acc, curr) =>
        curr.type === 'INCOME' ? acc + curr.amount : acc, 0
    );

    const totalExpense = transactions.reduce((acc, curr) =>
        curr.type === 'EXPENSE' ? acc + curr.amount : acc, 0
    )

    const totalBalance = totalIncome - totalExpense;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <header className="flex justify-between items-center mb-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                        Hello, {user?.fullName} 👋
                    </h1>
                    <p className="text-gray-500 text-xs sm:text-sm truncate">
                        Here are your finances today.
                    </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <button
                        onClick={() => logout()}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm sm:text-base shadow-sm"
                    >
                        Logout
                    </button>

                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md shrink-0">
                        {user?.fullName?.[0].toUpperCase()}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-2">Balance</p>
                    <p className="text-4xl font-extrabold text-gray-900">{totalBalance.toFixed(2)} €</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-2">Income</p>
                    <p className="text-2xl font-bold text-green-600">+ {totalIncome.toFixed(2)} €</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-2">Expenses</p>
                    <p className="text-2xl font-bold text-red-500">- {totalExpense.toFixed(2)} €</p>
                </div>
            </div>

            <div className="mb-10">
                <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm transition-colors flex items-center gap-2">
                    <span className="text-xl">+</span> New transaction
                </button>
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent activity</h2>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {transactions.map(t => (
                        <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                                    {t.icon}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">{t.title}</p>
                                    <p className="text-sm font-semibold text-gray-700">{t.note}</p>
                                    <p className="text-sm text-gray-500">
                                        {isToday(t.createdAt)
                                            ? `Today ${dateFormatter(t.createdAt)}`
                                            : dateFormatter(t.createdAt)
                                        }
                                    </p>
                                </div>
                            </div>
                            {t.type === 'EXPENSE'
                                ? <p className="font-bold text-red-500">- {t.amount} €</p>
                                : <p className="font-bold text-green-600">+ {t.amount} €</p>
                            }

                        </div>
                    ))}

                </div>
            </div>

            {showModal && <TransactionForm onClose={() => setShowModal(false)} />}

        </div>
    )
};
