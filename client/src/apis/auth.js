import client from './client';

export const regiseterUser = async (data) => {
  const response = await client.post('user/join', data);

  return response.data;
};

export const verificateEmail = async (data) => {
  const response = await client.post('user/join/exist/email', data);

  return response.data;
};

export const loginU = async (data) => {
  const response = await client.post('user/login', data);

  return response.data;
};
