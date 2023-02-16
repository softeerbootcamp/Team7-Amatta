import { SERVER_URL } from '@/constants/constant.js';

const cardDetail = (props) => {
  const { image, shopName, itemName, dateOfUse, itemPrice, required } = props;

  const cardDetailTemplate = `
    <section class='one-card-section'>
      <img class='card-image' src="${image}" alt='card-image' />
      <section class='card-info'>
        <div class='card-text'>
          <div class='date-of-use'>${dateOfUse} </div>
          <div class='shop-name'> ${shopName} </div>
          <div class='item-name'> ${itemName} </div>
          <div class='item-price'> ${itemPrice.toLocaleString('ko-KR')} WON</div>
        </div>
        <div class='card-button'>
          <button type="button" class='mark-used-button' name='mark-used-button'>사용 완료</button>
        </div>
      </section>
    </section>
    `;

  return cardDetailTemplate;
};

export default cardDetail;
