import axios from 'axios';

const api = axios.create({
    baseURL: 'https://atividadelp3-juandomenick.herokuapp.com/'
});

export default api;