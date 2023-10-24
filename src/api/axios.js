import axios from 'axios';
import { apiUrl } from '../config/server';

const server = axios.create({
  baseURL: apiUrl,
});

export default server;
