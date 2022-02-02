const Axios = require('axios');

Axios.defaults.baseURL = 'http://127.0.0.1:4000';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.timeout = 5000;

export const POST = async (url, data) => {
    return await Axios.post(url, data);
};