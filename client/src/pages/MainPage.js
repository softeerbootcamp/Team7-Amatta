import JsBarcode from 'jsbarcode';
import { SERVER_URL } from '@/constants/constant';
import { cardDetail } from '@/components/main';
import { dropdownMenu, header, notification } from '@/components/common';
import { IO, $, slider } from '@/utils';
import { _ } from '@/utils/customFx';
import { navigate } from '@/core/router';
import { getCardList, deleteACard } from '@/apis/card';

const ONE_CARD_ICON_URL = `${SERVER_URL.IMG}icon/image-icon.svg`;
const LIST_ICON_URL = `${SERVER_URL.IMG}icon/list-icon.svg`;
const PLUS_ICON_URL = `${SERVER_URL.IMG}icon/plus.svg`;

let touchStartX = 0;
let touchEndX = 0;
let isSwipping = false;
let cardDatas = [];
let sortOpt = '';

const setCardDatas = (cardData) => (cardDatas = [...cardData]);
const sortOption = { 0: '마감순', 1: '등록순', 2: '금액순' };

const detailTemp = (newCardDatas) => {
  let idx = 0;
  return `
    ${_.go(
      newCardDatas,
      _.map((card) => cardDetail(card)(idx++)),
      _.reduce((a, b) => `${a}${b}`),
    )}
`;
};

// 바코드 생성
const createBarcode = () =>
  cardDatas.forEach((data) =>
    JsBarcode(`[data-barcode="${data.barcode}"]`, data.barcode, {
      format: 'CODE128',
      displayValue: true,
      fontSize: 20,
      width: 2,
      height: 50,
    }),
  );

const MainPage = {};

MainPage.temp = () => `
    <article class='main-card-article'>
      <div class='main-card-container'>
        <div class="main-card-box">
          <div class='main-button-container'>
            <section class='show-card-section'>
              <img class='one-card-button' src='${ONE_CARD_ICON_URL}' alt='square-card-button' />
              <img class='list-card-button' src='${LIST_ICON_URL}' alt='list-card-button' />
            </section>
            <section class='main-dropdown-section'>
              ${dropdownMenu(sortOption)}
            </section>
          </div>
          <section class='cards-section'>
            ${detailTemp(cardDatas)}
          </section>
          <button type="button" id="plus-button">
            <img class='plus-button-image' src='${PLUS_ICON_URL}' alt='plus-button' />
          </button>
        </div>
      </div>
    </article>
  `;

const handleSortClick = ({ target }, dropdownSection) => {
  const clickedText = target.textContent;
  const clickedIndex = Object.values(sortOption).indexOf(clickedText);

  const temp = sortOption[clickedIndex];
  sortOption[clickedIndex] = sortOption[0];
  sortOption[0] = temp;

  dropdownSection.innerHTML = dropdownMenu(sortOption);

  comparison();

  $.on('click', toggleDropdown)($.qs('.main-dropdown-button'));
  dropdownSection.classList.remove('drop');
};

const handleClickSearchIcon = (target) => async (e) => {
  e.preventDefault();
  const inputTarget = $.qs('.search-card-input');

  if (target.classList.contains('searching')) return;
  const newData = await getCardList(inputTarget.value);
  setCardDatas(newData);
  console.log();
  navigateMain(cardDatas);
};

const toggleDropdown = () => {
  const dropdownSection = $.qs('.main-dropdown-section');
  const dropdownImage = $.qs('.main-dropdown-image', dropdownSection);
  const dropDownTarget = $.qs('.dropdown-list');

  dropdownImage.classList.toggle('active');
  dropdownSection.classList.toggle('drop');

  dropDownTarget.addEventListener('click', (e) => handleSortClick(e, dropdownSection));
};

// const makeGrayScale = (target) => target.closest('.one-card-section').classList.add('gray');
const makeGrayScale = (target) => {
  const list = target.closest('.card-lists');
  list.querySelector('.one-card-section').classList.add('gray');
};

const makeUsedState = (targets) =>
  targets.forEach((button) => button.addEventListener('click', (e) => makeGrayScale(e.target)));

const swipeButtonTpl = `
  <section class="card-actions-section">
    <div class="card-used-button">
      사용완료
    </div>
    <div class="card-delete-button">
      삭제하기
    </div>
  </section>
  `;

// prettier-ignore
const renderButton = (target) => 
  _.go(
    swipeButtonTpl, 
    $.el, 
    $.append(target));

const renderButtons = (targets) => {
  if ($.qs('.card-actions-section')) return;
  targets.forEach((list) => renderButton(list));
};

const listEvent = (targets) => {
  targets.forEach((card) => {
    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);
  });
};

const handleTouchStart = (e) => (touchStartX = e.touches[0].clientX);

const handleTouchEnd = () => {
  touchStartX = 0;
};

// const handleTouchMove = (e) => (touchEndX = e.touches[0].clientX);

// const handleTouchEnd = (e) => {
const handleTouchMove = (e) => {
  const touchDeltaX = touchEndX - touchStartX;
  const card = e.currentTarget;
  const isSwippingRight = card.classList.contains('swiped-right');
  const isSwippingLeft = card.classList.contains('swiped-left');

  console.log(touchStartX, e.touches[0].clientX);

  if (touchStartX - e.touches[0].clientX > 7 && !isSwipping && !isSwippingRight) {
    isSwipping = true;
    card.classList.add('swiped-left');
  } else if (e.touches[0].clientX - touchStartX > -7 && !isSwipping && !isSwippingLeft) {
    isSwipping = true;
    card.classList.add('swiped-right');
  } else if (e.touches[0].clientX - touchStartX > -7 && isSwipping && !isSwippingRight) {
    card.classList.remove('swiped-left');
    isSwipping = false;
  } else if (touchStartX - e.touches[0].clientX > 7 && isSwipping && !isSwippingLeft) {
    card.classList.remove('swiped-right');
    isSwipping = false;
  }
};

const deleteCard = async (e) => {
  const list = e.target.closest('.card-lists');
  const id = list.querySelector('.card-id').innerText;
  console.log(id);
  await deleteACard(id);
  navigateMain('/card');
};

const deleteCardEvent = (targets) =>
  targets.forEach((button) => button.addEventListener('click', (e) => deleteCard(e)));

const switchLayout = ({ target }) => {
  if (target.className === 'one-card-button') $.qs('.cards-section').classList.remove('list');
  else {
    $.qs('.cards-section').classList.add('list');

    if ($.qs('.cards-section').classList.contains('list')) {
      const cardLists = $.qsa('.card-lists');
      listEvent(cardLists);
      renderButtons(cardLists);

      const usedButtons = $.qsa('.card-used-button');
      console.log(usedButtons);
      makeUsedState(usedButtons);

      const deleteButtons = $.qsa('.card-delete-button');
      deleteCardEvent(deleteButtons);
    }
  }
};

const dateComparison = () =>
  cardDatas.sort((comp1, comp2) => new Date(comp1.expiresAt) - new Date(comp2.expiresAt));

const priceComparison = () => cardDatas.sort((comp1, comp2) => comp1.price - comp2.price);

const registerDateComparison = () => cardDatas.sort((comp1, comp2) => comp2.id - comp1.id);

// prettier-ignore
const comparison = () => {
  const buttonText = $.qs('.main-dropdown-button').innerText;

    buttonText === '금액순' && priceComparison();
    buttonText === '마감순' && dateComparison();
    buttonText === '등록순' && registerDateComparison();
    navigateMain(cardDatas);
};

const findTarget = (child, parent) => () => $.qsa(child, parent);
const eventTrigger = (type, targets, fn) => () =>
  targets.forEach((target) => $.on(type, fn)(target));
const setEvent = (type, fn) => (target) => IO.of(eventTrigger(type, target, fn));

// prettier-ignore
const addEvents = (target) => {
  IO.of(findTarget('.card-lists', target))
    .chain(setEvent('click', handleClickOneCard))
    .run();

  IO.of(findTarget('.search-button', target))
    .chain(setEvent('click', handleClickSearchIcon($.qs('.search-button'))))
    .run();
};

const handleClickOneCard = ({ target }) => {
  if (target.closest('.mark-used-button')) return;

  const cardTarget = target.closest('.card-lists');
  cardTarget.classList.toggle('is-flipped');
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
      MainPage.temp(),
      $.el,
      $.replace($.qs('#root')));

// prettier-ignore
// const navigateMain = async (newData = '') => {
const navigateMain = async (newData) => {
  if(newData === '/card') {
    newData = '';

    setCardDatas(await getCardList(newData));
    dateComparison();
  };

  _.go(
    MainPage.render(),
    slider(),
    () => $.qsa('.mark-used-button'),
    makeUsedState,
    () => $.qs('.main-dropdown-button'),
    $.on('click', toggleDropdown),
    () => $.qs('.one-card-button'),
    $.on('click', switchLayout),
    () => $.qs('.list-card-button'),
    $.on('click', switchLayout),
    () => MainPage.handleClickaddCard());
    
    createBarcode();
    header({color: 'mint'})();
    addEvents(document);
}

export default navigateMain;
