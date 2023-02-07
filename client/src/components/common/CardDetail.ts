import { SERVER_URL } from '@/constants/constant';

interface CardProps {
  image: string;
  shopName: string;
  itemName: string;
  dateOfUse: string;
}

const CardDetail = (props: CardProps) => {
  const { image, shopName, itemName, dateOfUse, required } = props;

  const moreIconUrl = `${SERVER_URL.IMG}icon/dots.svg`;

  const cardDetailTemplate = `
    <section class='one-card-section'>
      <img class='card-image' src="${image}" alt='card-image' />
      <section class='card-text'>
        <div class='shop-name'> ${shopName} </div>
        <div class='item-name'> ${itemName} </div>
        <div class='date-of-use'> ${dateOfUse} </div>
      </section>
      <img class='more-icon' src='${moreIconUrl}' alt='more-dots-icon' />
      <input type="submit" class='mark-used-button' name='mark-used-button' value='사용 완료' />
    </section>
    `;

  return cardDetailTemplate;
};

export default CardDetail;
