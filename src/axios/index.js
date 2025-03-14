import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'https://course-server.sahet-dev.com/api',
    baseURL: 'http://127.0.0.1:8000/api',
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
