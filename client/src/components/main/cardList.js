import { SERVER_URL } from '@/constants/constant.js';

const cardList = (props) => {
  const { image, shopName, itemName, dateOfUse, itemPrice, required } = props;

  const moreIconUrl = `${SERVER_URL.IMG}icon/dots.svg`;

  const dDaySeconds = new Date(dateOfUse) - new Date();
  const dDay = Math.floor(dDaySeconds / (1000 * 60 * 60 * 24));

  const cardListTemplate = `
    <section class='one-list-section'>
      <section class='list-card-content'>
        <img class='card-list-image' src="${image}" alt='card-list-image' />
        <section class='card-list-text'>
          <img class='more-dots-button' src='${moreIconUrl}' alt='more-dots-button' />
          <div class='list-d-day'> D-${dDay} </div>
          <div class='list-shop-name'> ${shopName} </div>
          <div class='list-item-name'> ${itemName} </div>
          <div class='list-date-of-use'> ${dateOfUse} </div>
        </section>
      </section>
      <section class="card-actions-section">
        <div class="card-used-button">
          사용완료
        </div>
        <div class="card-delete-button">
          삭제하기
        </div>
      </section>
    </section>
    `;

  return cardListTemplate;
};

export default cardList;
