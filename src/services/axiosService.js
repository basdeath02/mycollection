import axios from 'axios';
import store from '../store/store.js'

const setDelay = () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
}

const axiosService = axios.create({
    baseURL: process.env.VUE_APP_URL_COLLECTION_API_ENDPOINT + '/api'
});

axiosService.interceptors.request.use((config) => {
    try {
        store.commit("setLoading", { loading: true });
        config.headers['Content-Type'] = 'application/json';
        return Promise.resolve(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

axiosService.interceptors.response.use(async (response) => {
    await setDelay();
    return Promise.resolve(response.data);
}, (error) => {
    return Promise.reject(error);
});

export default axiosService;