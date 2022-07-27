import axios from 'axios';

import loginModule from "../../store/login/loginModule";
let instance = axios.create({
    baseURL : `/apinew`,
    timeout : 60000
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



export default instance;
