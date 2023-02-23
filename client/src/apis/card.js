import client from './client';

export const getCardList = async (query = '') => {
  try {
    const response = await client.get(`gifticon/list?keyword=${query}`);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const usedCard = (gifticonId) => {
  parseInt(gifticonId);
  try {
    const response = client.put('gifticon/used', gifticonId);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUsedCard = async () => {
  try {
    const response = await client.get(`gifticon/used`);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteACard = async (gifticonId) => {
  if (typeof gifticonId === 'string') parseInt(gifticonId, 10);

  try {
    const response = await client.delete(`gifticon`, { data: { gifticonId } });

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
