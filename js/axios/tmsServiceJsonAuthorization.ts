import axios from 'axios';

import qs from 'qs';
let instance = axios.create({
    baseURL : `/apinew`,
    timeout : 60000,
    headers: { 'Content-Type' : 'application/json;charset=UTF-8'}
});

instance.interceptors.request.use(config => {
    let UserToken = localStorage.getItem("UserToken");
    let UserID =  localStorage.getItem("UserID");
    let authToken = window.btoa( UserID + ':' + UserToken);
    config.headers['Authorization'] = authToken;
    return config;
}, error => {
    Promise.reject(error);
});

instance.defaults.transformRequest = function (data: any) {
    return JSON.stringify(data);
};



export default instance;
