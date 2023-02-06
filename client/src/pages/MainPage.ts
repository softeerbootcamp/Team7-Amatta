import Header from '@/components/common/header';
import { SERVER_URL } from '@/constants/constant';
import { generateElement } from '@/utils';

const MainPage = () => {
  const oneCardIconUrl = `${SERVER_URL.IMG}icon/image.svg`;
  const listIconUrl = `${SERVER_URL.IMG}icon/list.svg`;
  const dropdownIconUrl = `${SERVER_URL.IMG}icon/angle-down.svg`;
  const moreIconUrl = `${SERVER_URL.IMG}icon/dots.svg`;
  const plusIconUrl = `${SERVER_URL.IMG}icon/plus.svg`;

  const mainCardTemplate = generateElement(`
    ${Header}
    <article class = 'main-card-article'>
      <div class='main-button-container'>
        <section class = 'show-card-section'>
          <img class='one-card-button' src = '${oneCardIconUrl}' alt='square-card-button' />
          <img class='list-card-button' src = '${listIconUrl}' alt='list-card-button' />
        </section>
        <section class='main-dropdown-section'>
          <button class='main-dropdown-button'>
          최신순
          <img class='main-dropdown-image' src = '${dropdownIconUrl}' alt='dropdown-image' />
          </button>
        </section>
      </div>
      <section class='one-card-section'>
        <img class='card-image' src='../src/assets/gifticonSample.jpeg' alt='card-image' />
        <section class='card-text'>
          <div class='shop-name'> Twosome Place </div>
          <div class='item-name'> Americano + Tiramisu </div>
          <div class='date-of-use'> 2023.07.07 </div>
        </section>
        <img class='more-icon' src='${moreIconUrl}' alt='more-dots-icon' />
        <input type="submit" class='mark-used-button' name='mark-used-button' value='사용 완료' />
      </section>
      <button type="button" id="plus-button">
        <img class='plus-button-image' src='${plusIconUrl}' alt='plus-button' />
      </button>
    </article>
  `);

  return mainCardTemplate;
};

export default MainPage;
