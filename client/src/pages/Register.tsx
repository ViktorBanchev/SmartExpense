import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import api from "../api";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router";

const registerSchema = z.object({
    email: z.email('Please enter valid email'),
    password: z.string().min(6, 'Password should be at lest 6 symbols long'),
    firstName: z.string(),
    lastName: z.string(),
});

type LoginFormInputs = z.infer<typeof registerSchema>;

export default function Register() {
    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(registerSchema)
    });

    const loginMutation = useMutation({
        mutationFn: async (data: LoginFormInputs) => {
            const response = await api.post('/api/users/register', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.user);
        },
    })

    const onSubmit = (data: LoginFormInputs) => {
        loginMutation.mutate(data)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-md">
                        💰
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome to SmartExpense</h2>
                    <p className="text-gray-500 text-sm mt-1">Register to continue</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First name
                        </label>
                        <input
                            type="text"
                            {...register('firstName')}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                                }`}
                            placeholder="John"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last name
                        </label>
                        <input
                            type="text"
                            {...register('lastName')}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                                }`}
                            placeholder="Doe"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                                }`}
                            placeholder="john@test.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                                }`}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {loginMutation.isError && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-100">
                            {/* @ts-expect-error - Axios error is complex */}
                            {loginMutation.error?.response?.data?.message || 'Error! Try again later'}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {loginMutation.isPending ? (
                            <span className="animate-pulse">Registering...</span>
                        ) : (
                            'Register'
                        )}
                    </button>
                    <div className="text-gray-500">Already have account? <Link to='/login' className="font-medium underline">Login here</Link></div>
                </form>

            </div>
        </div>
    );
};
