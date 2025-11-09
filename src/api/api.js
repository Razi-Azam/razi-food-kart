import axios from 'axios'


export const API = 'http://localhost:4000'
export const apiClient = axios.create({ baseURL: API })