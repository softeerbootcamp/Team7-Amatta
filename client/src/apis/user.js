import axios from 'axios';
import client from './client';

export const getUserInfo = async () => {
  try {
    const response = await caches.match('https://backend.amatta.site/user/mypage');

    if (response) {
      console.log('response from cache:', response);
      return response;
    }

    const fetchResponse = await client.get('user/mypage');
    console.log('response from fetch:', fetchResponse);
    return fetchResponse.data;
  } catch (error) {
    console.error(error);
  }
};

export const changePassword = (data) => {
  try {
    const response = client.put('user/password', data);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
