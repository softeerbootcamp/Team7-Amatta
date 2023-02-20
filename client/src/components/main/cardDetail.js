import { SERVER_URL } from '@/constants/constant.js';

const cardDetail = (props) => (idx) => {
  const { image, thumbnail, brandName, itemName, expiresAt, price, barcode } = props;
  const DOTS_ICON_URL = `${SERVER_URL.IMG}icon/dots.svg`;

  const cardDetailTemplate = `
    <article class='card-lists' data-idx="${idx}">
      <section class='one-card-section'>
        <img class='card-image' src=${thumbnail} alt='card-image' />
        <section class='card-info'>
          <div class='card-text'>
            <img class='more-dots-button' src='${DOTS_ICON_URL}' alt='more-dots-button' />
            <div class='date-of-use'>${expiresAt} </div>
            <div class='shop-name'> ${brandName} </div>
            <div class='item-name'> ${itemName} </div>
            <div class='item-price'> ${price.toLocaleString('ko-KR')} WON</div>
          </div>
          <div class='card-button'>
            <button type="button" class='mark-used-button' name='mark-used-button'>사용 완료</button>
          </div>
        </section>
      </section>
      <section class='one-card-section-back'>
        <img class='card-image' src=${image} alt='card-image' />
        <img class='card-barcode' data-barcode="${barcode}" alt='card-image' />
      </section>
    </article>
    `;

  return cardDetailTemplate;
};

export default cardDetail;
