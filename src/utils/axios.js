import axios from 'axios';
import router from '../router/index'
import store from '../store/index'
import Vue from 'vue'

const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 30000
});
localStorage.setItem('baseUrl','http://47.101.206.36:9000')
const token = localStorage.getItem('token')
service.interceptors.request.use(
    config => {
        if (token) {
            config.headers['Authorization'] = token
        }
        if (config.method == 'post') {
            config.headers['Content-type'] = 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.data.code == 401) {
            Vue.prototype.$message.error('登录过期，请先登录')
            store.commit("User/LOGOUT")
            router.replace({path:'/'})
        } else
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
