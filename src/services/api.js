import axios from 'axios';

const baseURL =
    import.meta.env.VITE_API_URL || 'https://backend-k0en.onrender.com';

const api = axios.create({ baseURL: `${baseURL}/api` });

// Attach JWT from localStorage on every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('md_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Normalise error messages + auto-logout on 401
api.interceptors.response.use(
    (res) => res,
    (error) => {
        const message =
            error.response ? .data ? .message || error.message || 'حدث خطأ غير متوقع';
        if (error.response ? .status === 401 && localStorage.getItem('md_token')) {
            localStorage.removeItem('md_token');
            localStorage.removeItem('md_user');
            // soft redirect
            if (window.location.pathname.startsWith('/community')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(new Error(message));
    }
);

export default api;