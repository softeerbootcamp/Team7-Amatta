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

let touchStartX = 0;
let touchEndX = 0;
let isSwipping = false;

const cards = [
  {
    image: '../src/assets/starbucks2.jpg',
    shopName: 'TWOSOME PLACE',
    itemName: 'Americano & Tiramisu',
    itemPrice: 11000,
    dateOfUse: '2023-07-07',
  },
  {
    image: '../src/assets/starbucks3.jpeg',
    shopName: 'STARBUCKS',
    itemName: 'Latte',
    itemPrice: 5000,
    dateOfUse: '2023-07-22',
  },
  {
    image: '../src/assets/starbucks2.jpg',
    shopName: 'THE VENTI',
    itemName: 'Vanilla Latte',
    itemPrice: 3500,
    dateOfUse: '2023-09-01',
  },
  {
    image: '../src/assets/starbucks3.jpeg',
    shopName: 'twosome place',
    itemName: 'Americano & Tiramisu',
    itemPrice: 11000,
    dateOfUse: '2023-11-01',
  },
  {
    image: '../src/assets/starbucks2.jpg',
    shopName: 'starbucks',
    itemName: 'Latte',
    itemPrice: 5000,
    dateOfUse: '2023-07-07',
  },
  {
    image: '../src/assets/starbucks3.jpeg',
    shopName: 'THE VENTI',
    itemName: 'Vanilla Latte',
    itemPrice: 3500,
    dateOfUse: '2023-09-01',
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
            <section class='main-dropdown-section hidden'>
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

const toggleDropdown = () => {
  const dropdownSection = $.qs('.main-dropdown-section');
  dropdownSection.classList.toggle('drop');

  const dropdownList = $.qs('.dropdown-list');
  toggleHidden(dropdownList);
};

const toggleHidden = (target) => target.classList.toggle('hidden');
const addHidden = (target) => target.classList.add('hidden');
const removeHidden = (target) => target.classList.remove('hidden');

const changeToDetail = (cardsSection) => cardsSection.classList.remove('list');

const makeGrayScale = (target) => target.closest('.one-card-section').classList.add('gray');

const makeUsedState = (targets) =>
  targets.forEach((button) => button.addEventListener('click', (e) => makeGrayScale(e.target)));

// prettier-ignore
const renderDetail = () =>
  _.go(
    //cards.map((detail) => cardDetail(detail)).join(''),
    detailTemp,
    $.el,
    $.replace($.qs('.cards-section')),
    () => $.find('.cards-section')(),
    changeToDetail,
    () => slider()(),
    () => $.qsa('.mark-used-button'),
    makeUsedState,
    () => $.qs('.main-dropdown-section'),
    addHidden);

const listEvent = (targets) => {
  targets.forEach((card) => {
    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);
  });
};

const handleTouchStart = (e) => (touchStartX = e.touches[0].clientX);

const handleTouchMove = (e) => (touchEndX = e.touches[0].clientX);

const handleTouchEnd = (e) => {
  const touchDeltaX = touchEndX - touchStartX;
  const card = e.currentTarget;
  let isSwippingRight = card.classList.contains('swiped-right');
  let isSwippingLeft = card.classList.contains('swiped-left');

  if (touchDeltaX > 20 && !isSwipping && !isSwippingLeft) {
    isSwipping = true;
    card.classList.add('swiped-right');
  } else if (touchDeltaX < -20 && !isSwipping && !isSwippingRight) {
    isSwipping = true;
    card.classList.add('swiped-left');
  } else if (touchDeltaX < -20 && isSwipping && !isSwippingLeft) {
    card.classList.remove('swiped-right');
    isSwipping = false;
  } else if (touchDeltaX > 20 && isSwipping && !isSwippingRight) {
    card.classList.remove('swiped-left');
    isSwipping = false;
  }
};

const changeToList = (cardsSection) => cardsSection.classList.add('list');

const scrollEvent = (targets) => targets.forEach((target) => target.scrollIntoView(true));

const renderListTpl = () =>
  _.go(cards.map(cardList).join(''), $.el, $.replace($.qs('.cards-section')));

// prettier-ignore
const renderList = () => 
  _.go(
    renderListTpl(),
    () => $.find('.cards-section')(),
    changeToList,
    () => $.qs('.main-dropdown-section'),
    removeHidden,
    () => $.qsa('.one-list-section'),
    listEvent,
    () => $.qsa('.card-delete-button'),
    deleteListEvent,
    () => $.qsa('.card-used-button'),
    usedCardEvent,
    () => $.qs('.price-button'),
    $.on('click', priceComparison),
    () => $.qs('.due-date-button'),
    $.on('click', dateComparison));
// ,
//     () => $.qsa('.one-list-section'),
//     scrollEvent
const findCardIndex = (target) => {
  const cards = [...$.qsa('.one-list-section')];
  const card = target.closest('.one-list-section');
  const idx = cards.findIndex((ele) => ele === card);
  return idx;
};

const deleteCard = (target) => {
  const index = findCardIndex(target);
  target.closest('.one-list-section').remove();
  cards.splice(index, 1);
  console.log(cards);
};

const deleteListEvent = (targets) => {
  targets.forEach((target) => target.addEventListener('click', (e) => deleteCard(e.target)));
};

const usedStateCard = (target) => {
  const index = findCardIndex(target);
  const list = target.closest('.one-list-section');
  list.classList.add('gray');
  list.style.transform = 'translateX(0)';
  target.closest('.card-actions-section').remove();
};

const usedCardEvent = (targets) =>
  targets.forEach((target) => target.addEventListener('click', (e) => usedStateCard(e.target)));

const priceComparison = () => {
  cards.sort(function (comp1, comp2) {
    return comp1.itemPrice - comp2.itemPrice;
  });
  renderListTpl();
};

const dateComparison = () => {
  cards.sort(function (comp1, comp2) {
    return new Date(comp1.dateOfUse) - new Date(comp2.dateOfUse);
  });
  renderListTpl();
};

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
      () => $.qsa('.mark-used-button'),
      makeUsedState,
      () => $.qs('.main-dropdown-button'),
      $.on('click', toggleDropdown),
      () => $.qs('.one-card-button'),
      $.on('click', renderDetail),
      () => $.qs('.list-card-button'),
      $.on('click', renderList),
      () => MainPage.handleClickaddCard());

export default navigateMain;
