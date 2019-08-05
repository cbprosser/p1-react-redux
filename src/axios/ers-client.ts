import axios from 'axios';
import { environment } from '../environment';

export const ersClient = axios.create({
    baseURL: environment.context,
    withCredentials: true,
    headers: {
        'authorization': 'Bearer ' + localStorage.tk,
    }
});

export const ersClientLogin = axios.create({
    baseURL: environment.context,
    withCredentials: true
});
