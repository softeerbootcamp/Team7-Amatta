import client from './client';

export const getUserInfo = async () => {
  const response = await client.get(`user/mypage`);

  return response.data;
};

export const changePassword = (data) => {
  try {
    const response = client.put('user/password', data);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
