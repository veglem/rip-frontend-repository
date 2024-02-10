import axios from 'axios';

export const api = axios.create(
    {
        baseURL: `http://localhost:2022/api`,
        withCredentials: true,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
);