import SERVER_URL from '@/constants/constant';
import { header, cardDetail } from '@/components/common';
import { $ } from '@/utils/index';
import { _ } from '@/utils/customFx';
import { slider } from '@/utils';

const oneCardIconUrl = `${SERVER_URL.IMG}icon/image.svg`;
const listIconUrl = `${SERVER_URL.IMG}icon/list.svg`;
const dropdownIconUrl = `${SERVER_URL.IMG}icon/angle-down.svg`;
const plusIconUrl = `${SERVER_URL.IMG}icon/plus.svg`;

const cards = [
  {
    image: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/icon/gifticonSample.jpeg',
    shopName: 'twosome place',
    itemName: 'Americano & Tiramisu',
    dateOfUse: '2023.07.07 까지',
  },
  {
    image: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/icon/gifticonSample.jpeg',
    shopName: 'starbucks',
    itemName: 'Latte',
    dateOfUse: '2023.07.07 까지',
  },
  {
    image: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/icon/gifticonSample.jpeg',
    shopName: 'The venti',
    itemName: 'Vanilla Latte',
    dateOfUse: '2023.07.07 까지',
  },
];
const MainPage = {};

MainPage.temp = `
    ${header}
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
      <section class='cards-section'>
        ${cards.map((detail) => cardDetail(detail)).join('')}
      </section>
      <button type="button" id="plus-button">
        <img class='plus-button-image' src='${plusIconUrl}' alt='plus-button' />
      </button>
    </article>
  `;

// prettier-ignore
MainPage.render = () =>
    _.go(
      MainPage.temp,
      $.el,
      $.replace($.qs('#root')));

// prettier-ignore
const navigateMain = () => 
    _.go(
      MainPage.render,
      slider);

export default navigateMain;
