import client from './client';

export const sendImage = async (imageData) => {
  try {
    const response = await client.post('/gifticon/text', imageData);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendImageInfo = async (imageInfo) => {
  try {
    const response = await client.post('/gifticon/map', imageInfo);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const submitImage = async (imageData) => {
  try {
    const response = await client.post('/gifticon', imageData);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
