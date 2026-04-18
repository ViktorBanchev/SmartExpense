import axios from "axios"
import { useAuthStore } from "./store/authStore"

const api = axios.create({
    baseURL: 'http://localhost:5050',
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => {
        return response
    },

    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().clearSession();
        }

        return Promise.reject(error);
    }
)

export default api;