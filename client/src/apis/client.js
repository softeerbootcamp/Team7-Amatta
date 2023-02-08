import axios from 'axios';
import SERVER_URL from '@/constants/constant';

const baseURL = SERVER_URL.API;

const client = axios.create({
  baseURL,
});

export default client;
