//slider.js 리팩토링하려다 실패한 부분
const mainArticle = $.qs('.main-card-article');
const slide = $.qs('.cards-section');
const slideWidth = mainArticle.clientWidth;
const slideItems = $.qsa('.one-card-section');
const maxSlide = slideItems.length;
let currentSlide = 1;
let startPoint = 0;
let endPoint = 0;

const setWidth = (target, cards, oneCards) => {
  cards.style.width = `${target.clientWidth * oneCards.length}px`;

  [...oneCards].forEach((card) => {
    card.style.width = `${target.clientWidth}px`;
  });

  console.log(1);
};

//prettier-ignore
const addActiveClass = (template, element) => 
    _.go(
      template, 
      $.el, 
      $.prepend(element));

const setPagination = () => {
  const pagination = $.qs('.card-pagination');
  const paginationTemp = `<li>•</li>`;
  const activePaginationTemp = `<li class="active">•</li>`;

  for (let i = 0; i < maxSlide; i++) {
    if (i === maxSlide - 1) addActiveClass(activePaginationTemp, pagination);
    else addActiveClass(paginationTemp, pagination);
  }
};

const paginationItems = $.qsa('.card-pagination > li');

const changeActive = (targets) => {
  targets.forEach((target) => target.classList.remove('active'));
  targets[currentSlide - 1].classList.add('active');

  return targets;
};

const setOffset = (targets) => {
  const offset = slideWidth * (currentSlide - 1);
  targets.forEach((target) => {
    target.setAttribute('style', `left: ${-offset}px`);
  });
};

const setSlideAttribute = () => {
  setOffset(slideItems);
  //changeActive(paginationItems);
};

const nextMove = () => {
  currentSlide++;

  if (currentSlide <= maxSlide) {
    setSlideAttribute();
  } else {
    currentSlide--;
  }
};

const prevMove = () => {
  currentSlide--;

  if (currentSlide > 0) {
    setSlideAttribute();
  } else {
    currentSlide++;
  }
};

const clickPagination = (targets) => {
  for (let i = 0; i < maxSlide; i++) {
    targets[i].addEventListener('click', () => {
      currentSlide = i + 1;
      setSlideAttribute();
    });
  }
};

const mouseDownEvent = (target) => {
  startPoint = e.pageX;
};

const mouseUpEvent = (target) => {
  endPoint = e.pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
};

const touchStartEvent = (target) => {
  startPoint = target.touches[0].pageX;
};

const touchEndEvent = (target) => {
  endPoint = e.changedTouches[0].pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
};

// prettier-ignore
const cardSlider = () =>
    _.go(
      setWidth,
      setPagination,
      $.qsa('.card-pagination > li'),
      console.log,
      changeActive,
      clickPagination,
      $.find('.cards-section'),
      $.on('mousedown', (e) => mouseDownEvent(e)),
      $.on('mouseup', (e) => mouseUpEvent(e)),
      $.find('.cards-section'),
      $.on('touchstart', (e) => touchStartEvent(e)),
      $.on('touchend', (e) => touchEndEvent(e)),
    )

return cardSlider;
