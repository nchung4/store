import axios from "axios";

const backendUrl = 'https://shop.cyberlearn.vn'
export const api = axios.create({ baseURL: `${backendUrl}/api` });

