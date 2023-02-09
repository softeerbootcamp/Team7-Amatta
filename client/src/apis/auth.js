import client from './client';

export const regiseterUser = async (data) => {
  const response = await client.post('user/join', data);

  return response;
};

export const login = async () => {};
