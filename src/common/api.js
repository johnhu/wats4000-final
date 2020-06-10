// Base API Configuration

import axios from 'axios';
//Checks for http action
export const API = axios.create({
    baseURL: '//http://www.omdbapi.com/'
});

API.interceptors.request.use(function (config) {

    config.params.APPID = 'b72bc356';
    config.params.units = 'imperial';

    return config;
}, function (error) {
    return Promise.reject(error);
});