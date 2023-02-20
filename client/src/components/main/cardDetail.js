const cardDetail = (props) => (idx) => {
  const { image, thumbnail, brandName, itemName, expiresAt, price } = props;

  const cardDetailTemplate = `
    <article class='card-lists' data-idx="${idx}">
      <section class='one-card-section'>
        <img class='card-image' src=${thumbnail} alt='card-image' />
        <section class='card-info'>
          <div class='card-text'>
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
      </section>
    </article>
    `;

  return cardDetailTemplate;
};

export default cardDetail;
