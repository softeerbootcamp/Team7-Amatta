import axios from 'axios';

const baseURL = '';

const client = axios.create({
  baseURL,
});

export default { client };
