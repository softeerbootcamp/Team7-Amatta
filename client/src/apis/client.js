import axios from 'axios';
import { SERVER_URL } from '@/constants/constant';
import { navigate } from '@/core/router';
import { notification } from '@/components/common';

const baseURL = SERVER_URL.API;

const client = axios.create({
  baseURL,
});

client.defaults.withCredentials = true;

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          navigate('/');
          notification('로그인이 필요합니다.', 'login')();
          return new Promise(() => {});
        case 400:
          notification(`${error.response.data}`, 'login')();
          return new Promise(() => {});
        default:
          return Promise.reject(error);
      }
    } else if (error.code === 'ERR_NETWORK') {
      notification('올바르지 않은 이미지 형식입니다.', 'login')();
    }
    return Promise.reject(error);
  },
);

export default client;
