import client from './client';

export const getUserInfo = async () => {
  try {
    const response = await client.get('user/mypage');
    return response.data;
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
