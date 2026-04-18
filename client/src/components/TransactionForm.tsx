import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import api from "../api";
import { CATEGORY_ICONS, VALID_ICONS } from "../constants/transactions.constants";
import { useState } from "react";

const transactionSchema = z.object({
    title: z.string(),
    amount: z.number().positive('Amount should be positive'),
    type: z.enum(['INCOME', 'EXPENSE']),
    note: z.string().optional(),
    icon: z.enum(VALID_ICONS, 'Select valid icon'),
})

type TransactionFormInputs = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
    onClose: () => void;
}

export default function TransactionForm({ onClose }: TransactionFormProps) {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TransactionFormInputs>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type: 'EXPENSE',
            icon: '💰'
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const selectedIcon = watch('icon');
    const [isIconOpen, setIsIconOpen] = useState(false);

    const addMutation = useMutation({
        mutationFn: async (data: TransactionFormInputs) => {
            const response = await api.post('/api/transactions', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            onClose();
        }
    })

    const onSubmit = (data: TransactionFormInputs) => {
        addMutation.mutate(data);
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">New transaction</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Transaction type
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="cursor-pointer">
                                <input type="radio" value="EXPENSE" {...register('type')} className="peer sr-only" />
                                <div className="text-center py-2 px-4 rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-600 hover:bg-gray-50 transition-colors font-medium">
                                    Expense
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" value="INCOME" {...register('type')} className="peer sr-only" />
                                <div className="text-center py-2 px-4 rounded-lg border border-gray-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-600 hover:bg-gray-50 transition-colors font-medium">
                                    Income
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            {...register('title')}
                            placeholder="Food..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon
                        </label>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsIconOpen(!isIconOpen)}
                                className="w-14 h-14 bg-gray-50 border border-gray-200 rounded-xl text-3xl flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                            >
                                {selectedIcon}
                            </button>

                            {isIconOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsIconOpen(false)}
                                    ></div>

                                    <div className="absolute top-16 left-0 z-20 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 animate-in fade-in zoom-in-95 duration-200">
                                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2 ml-1">Избери категория</p>
                                        <div className="flex flex-wrap gap-2">
                                            {CATEGORY_ICONS.map(({ icon, label }) => (
                                                <button
                                                    key={icon}
                                                    type="button"
                                                    title={label}
                                                    onClick={() => {
                                                        setValue('icon', icon);
                                                        setIsIconOpen(false);
                                                    }}
                                                    className={`
                                                        "w-10 h-10 rounded-xl text-2xl flex items-center justify-center transition-all",
                                                        ${selectedIcon === icon
                                                            ? "bg-blue-100 border-blue-500 scale-110"
                                                            : "hover:bg-gray-100 bg-transparent"}
                                                    `}
                                                >
                                                    {icon}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Note
                        </label>
                        <input
                            type="text"
                            {...register('note')}
                            placeholder="e.g. Shopping in Lidl"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount (€)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('amount', { valueAsNumber: true })}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                        />
                        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={addMutation.isPending}
                            className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                        >
                            {addMutation.isPending ? 'Saving...' : 'Add'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
};
