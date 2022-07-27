import axios from 'axios';
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

let instance = axios.create({
    baseURL : `https://${domain}`,
    timeout : 60000,
    headers: { 'Content-Type' : 'application/json;charset=UTF-8'}
});

instance.defaults.transformRequest = function (data: any) {
    return JSON.stringify(data);
};



export default instance;
