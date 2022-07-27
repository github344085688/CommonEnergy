import axios from 'axios';
import qs from 'qs';
// var baseURL = process.env.NODE_ENV === 'production' ? 'https://client.freightapp.com/':'https://clientdev.freightapp.com/';

let host = window.location.hostname;

if (host === "localhost" || host === "shipdev.unisco.com") {
    host = "clientdev.freightapp.com";
} else if (host == "shipstage.unisco.com") {
    host = "clientstage.freightapp.com";
} else if (host === "ship.unisco.com" || host == "demo.unisco.com") {
    host = "client.freightapp.com";
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
    baseURL: `https://${host}`,
    timeout: 10000,
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
});


export default instance;
