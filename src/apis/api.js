import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
api.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error.response?.data || "Something went wrong");
    }
);

export default api;
