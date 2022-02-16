const Axios = require('axios');

Axios.defaults.baseURL = 'http://127.0.0.1:4000';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.get['Content-Type'] = 'application/json';
Axios.defaults.headers.post['Authorization'] = 'Bearer ' + sessionStorage.token;
Axios.defaults.headers.get['Authorization'] = 'Bearer ' + sessionStorage.token;
Axios.defaults.headers.delete['Authorization'] = 'Bearer ' + sessionStorage.token;
Axios.defaults.timeout = 5000;

export const POST = async (url, data) => {
    return await Axios.post(url, data);
};

export const GET = async (url) => {
    return await Axios.get(url);
}

export const DELETE = async (url) => {
    return await Axios.delete(url);
}