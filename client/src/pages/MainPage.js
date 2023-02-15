import { SERVER_URL } from '@/constants/constant';
import { cardDetail, cardList } from '@/components/main';
import { dropdownMenu } from '@/components/common';
import { $, slider } from '@/utils';
import { _ } from '@/utils/customFx';
import { navigate } from '@/core/router';

const oneCardIconUrl = `${SERVER_URL.IMG}icon/image-icon.svg`;
const listIconUrl = `${SERVER_URL.IMG}icon/list-icon.svg`;
const dropdownIconUrl = `${SERVER_URL.IMG}icon/angle-down.svg`;
const plusIconUrl = `${SERVER_URL.IMG}icon/plus.svg`;

const cards = [
  {
    image: '../src/assets/starbucks2.jpg',
    shopName: 'TWOSOME PLACE',
    itemName: 'Americano & Tiramisu',
    dateOfUse: '2023.07.07 까지',
  },
  {
    image: '../src/assets/starbucks3.jpeg',
    shopName: 'STARBUCKS',
    itemName: 'Latte',
    dateOfUse: '2023.07.22 까지',
  },
  {
    image: '../src/assets/starbucks2.jpg',
    shopName: 'THE VENTI',
    itemName: 'Vanilla Latte',
    dateOfUse: '2023.09.01 까지',
  },
  {
    image: '../src/assets/starbucks3.jpeg',
    shopName: 'twosome place',
    itemName: 'Americano & Tiramisu',
    dateOfUse: '2023.11.01 까지',
  },
  {
    image: '../src/assets/starbucks2.jpg',
    shopName: 'starbucks',
    itemName: 'Latte',
    dateOfUse: '2023.07.07 까지',
  },
];

const detailTemp = `
  <div class='cards-detail-container'>
    ${cards.map((detail) => cardDetail(detail)).join('')}
  </div>
`;

const MainPage = {};

MainPage.temp = `
    <article class='main-card-article'>
      <div class='main-card-container'>
        <div class="main-card-box">
          <div class='main-button-container'>
            <section class='show-card-section'>
              <img class='one-card-button' src='${oneCardIconUrl}' alt='square-card-button' />
              <img class='list-card-button' src='${listIconUrl}' alt='list-card-button' />
            </section>
            <section class='main-dropdown-section'>
            ${dropdownMenu()}
            </section>
          </div>
          <section class='cards-section'>
            ${detailTemp}
          </section>
          <ul class="card-pagination"></ul>
          <button type="button" id="plus-button">
            <img class='plus-button-image' src='${plusIconUrl}' alt='plus-button' />
          </button>
        </div>
      </div>
    </article>
  `;
//${cards.map((detail) => cardDetail(detail)).join('')}

//const toggleDropdown = () => $.qs('.main-dropdown-section').classList.toggle('drop');
const toggleDropdown = () => {
  const dropdownSection = $.qs('.main-dropdown-section');
  dropdownSection.classList.toggle('drop');

  // const dropdownList = $.qs('.dropdown-list');
  // toggleHidden(dropdownList);
};

const toggleHidden = (target) => target.classList.toggle('hidden');

const changeToDetail = (cardsSection) => cardsSection.classList.remove('list');

// prettier-ignore
const renderDetail = () =>
  _.go(
    //cards.map((detail) => cardDetail(detail)).join(''),
    detailTemp,
    $.el,
    $.replace($.qs('.cards-section')),
    () => $.find('.cards-section')(),
    // () => $.find('.cards-section')(),
    changeToDetail,
    // () => setWidth(),
    () => slider()());

const mainArticle = $.qs('.main-card-article');
const findClient = () => mainArticle.clientWidth;

const setListWidth = (cardsSection) => (cardsSection.style.width = `${findClient()}px`);

const changeToList = (cardsSection) => cardsSection.classList.add('list');

const scrollEvent = (target) => target.scrollIntoView();

// prettier-ignore
const renderList = () => 
  _.go(
    cards.map((detail) => cardList(detail)).join(''), 
    $.el, 
    $.replace($.qs('.cards-section')),
    () => $.find('.cards-section')(),
    _.tap(changeToList));

const navigateToPost = () => navigate('/post');

// prettier-ignore
MainPage.handleClickaddCard = (target) =>
  _.pipe(
    $.find('#plus-button'),
    $.on('click', navigateToPost))(target);

// prettier-ignore
MainPage.render = () =>
    _.go(
      MainPage.temp,
      $.el,
      $.replace($.qs('#root')));

// prettier-ignore
const navigateMain = () => 
    _.go(
      MainPage.render(),
      slider(),
      //() => renderDropdown,
      () => $.qs('.main-dropdown-button'),
      $.on('click', toggleDropdown),
      () => $.qs('.one-card-button'),
      $.on('click', renderDetail),
      () => $.qs('.list-card-button'),
      $.on('click', renderList),
      () => MainPage.handleClickaddCard());

export default navigateMain;
