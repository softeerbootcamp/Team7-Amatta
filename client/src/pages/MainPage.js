import { SERVER_URL } from '@/constants/constant';
import { cardDetail, cardList } from '@/components/main';
import { dropdownMenu, header } from '@/components/common';
import { IO, $, slider } from '@/utils';
import { _ } from '@/utils/customFx';
import { navigate } from '@/core/router';
import { getCardList } from '@/apis/card';

const ONE_CARD_ICON_URL = `${SERVER_URL.IMG}icon/image-icon.svg`;
const LIST_ICON_URL = `${SERVER_URL.IMG}icon/list-icon.svg`;
const PLUS_ICON_URL = `${SERVER_URL.IMG}icon/plus.svg`;

let touchStartX = 0;
let touchEndX = 0;
let idx = 0;
let isSwipping = false;
let cardDatas = [];

const setCardDatas = (cardData) => (cardDatas = [...cardData]);

const detailTemp = () => `
    ${_.go(
      cardDatas,
      _.map((card) => cardDetail(card)(idx++)),
      _.reduce((a, b) => `${a}${b}`),
    )}
`;

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
            <section class='main-dropdown-section hidden'>
            ${dropdownMenu()}
            </section>
          </div>
          <section class='cards-section'>
            ${detailTemp()}
          </section>
          <button type="button" id="plus-button">
            <img class='plus-button-image' src='${PLUS_ICON_URL}' alt='plus-button' />
          </button>
        </div>
      </div>
    </article>
  `;

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
    detailTemp(),
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
  const isSwippingRight = card.classList.contains('swiped-right');
  const isSwippingLeft = card.classList.contains('swiped-left');

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

const switchLayout = () => document.querySelector('.cards-section').classList.toggle('list');

const changeToList = (cardsSection) => cardsSection.classList.add('list');

const renderListTpl = () =>
  _.go(cardDatas.map(cardList).join(''), $.el, $.replace($.qs('.cards-section')));

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

const findCardIndex = (target) => {
  const cards = [...$.qsa('.one-list-section')];
  const card = target.closest('.one-list-section');
  const idx = cards.findIndex((ele) => ele === card);
  return idx;
};

const deleteCard = (target) => {
  const index = findCardIndex(target);
  target.closest('.one-list-section').remove();
  cardDatas.splice(index, 1);
};

const deleteListEvent = (targets) => {
  targets.forEach((target) => target.addEventListener('click', (e) => deleteCard(e.target)));
};

const usedStateCard = (target) => {
  const list = target.closest('.one-list-section');
  list.classList.add('gray');
  list.style.transform = 'translateX(0)';
  target.closest('.card-actions-section').remove();
};

const usedCardEvent = (targets) =>
  targets.forEach((target) => target.addEventListener('click', (e) => usedStateCard(e.target)));

const priceComparison = () => {
  cardDatas.sort((comp1, comp2) => comp1.itemPrice - comp2.itemPrice);
  renderListTpl();
};

const dateComparison = () => {
  cardDatas.sort((comp1, comp2) => new Date(comp1.dateOfUse) - new Date(comp2.dateOfUse));
  renderListTpl();
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

  IO.of(findTarget('.one-list-section', target))
    .chain(setEvent('click', handleClickListCard))
    .run();
};

const handleClickOneCard = ({ target }) => {
  if (target.closest('.mark-used-button')) return;

  const cardTarget = target.closest('.card-lists');
  cardTarget.classList.toggle('is-flipped');
};
const handleClickListCard = () => {
  console.log(2);
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
const navigateMain = async () => {
  setCardDatas(await getCardList());

  _.go(
    MainPage.render(),
    addEvents,
    slider(),
    () => $.qsa('.mark-used-button'),
    makeUsedState,
    () => $.qs('.main-dropdown-button'),
    $.on('click', toggleDropdown),
    () => $.qs('.one-card-button'),
    $.on('click', switchLayout),
    // $.on('click', renderDetail),
    () => $.qs('.list-card-button'),
    $.on('click', switchLayout),
    // $.on('click', renderList),
    () => MainPage.handleClickaddCard());

  header({color: 'mint'})();
}

export default navigateMain;
// one - list - section;
// one - card - section;
