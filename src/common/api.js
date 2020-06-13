// Base API Configuration

import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://www.omdbapi.com/?apikey=b72bc356'
});

API.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});