import client from './client';

export const fcmToken = (tokens) => {
  const response = client.post('fcm/token', { token: tokens });

  return response.data;
};
