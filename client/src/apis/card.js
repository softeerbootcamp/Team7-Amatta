import client from './client';

export const getCardList = async (data) => {
  const response = await client.get(`gifticon/test`);

  return response.data;
};
