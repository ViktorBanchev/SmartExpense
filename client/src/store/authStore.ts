import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api";


interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; email: string; fullName: string } | null;
    login: (userData: { id: string, email: string, fullName: string }) => void;
    logout: () => void;
    clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,

            login: (userData) => set({ isAuthenticated: true, user: userData }),
            logout: async () => {
                try {
                    await api.post('/api/users/logout');
                } catch (error) {
                    console.error("Error on logout:", error);
                } finally {
                    set({ isAuthenticated: false, user: null });
                }
            },
            clearSession: () => set({ isAuthenticated: false, user: null })
        }),
{
    name: 'auth-storage'
}
    )
)