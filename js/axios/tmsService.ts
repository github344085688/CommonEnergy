import axios from 'axios';
import qs from 'qs';
import loginModule from "../../store/login/loginModule";
let host = window.location.hostname;
let domain;

if (host == "localhost" || host == "clientdev.freightapp.com") {
    domain = "dev.freightapp.com";
}
else if (host == "clientstage.freightapp.com" || host == "shipstage.unisco.com") {
    domain = "staging.freightapp.com";
}
else if (host == "client.freightapp.com" || host == "ship.unisco.com" || host == "demo.unisco.com") {
    domain = "tms.freightapp.com";
}

axios.defaults.transformRequest = function (data: any) {
    const UserToken = localStorage.getItem("UserToken");
    const UserID = localStorage.getItem("UserID");
    let parseData = qs.parse(data);
    let requestData = qs.stringify({
        UserID: UserID,
        UserToken: UserToken,
        ...parseData
    });

    return requestData;
};


let instance = axios.create({
    baseURL : `https://${domain}`,
    timeout: 10000,
    headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
});

export default instance;
