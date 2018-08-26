import Vue from 'vue';
import store from '../store';
import router from '../router';
import {
    Message
} from 'iview';

Vue.axios.defaults.baseURL = 'http://localhost:3000';

Vue.axios.interceptors.request.use(
    config => {
        const token = store.state.token;
        token && (config.headers.Authorization = 'Bearer ' + token);
        return config;
    },
    error => {
        return Promise.reject(error);
    });

Vue.axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response) {
            Message.error(error.response.statusText);
            switch (error.response.status) {
                case 401:
                    store.dispatch("logout");
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                case 403:
                    store.dispatch("logout");
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                default:
            }
            return Promise.reject(error.response);
        } else {
            Message.error("Network Error");
        }
    });

export default function (options) {
    return Vue.axios(options);
}