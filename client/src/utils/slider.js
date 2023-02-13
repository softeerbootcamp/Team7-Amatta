import { $ } from '@/utils';
import { _ } from '@/utils/customFx';
const slider = () => {
  //slider.js 리팩토링하려다 실패한 부분 => 2/13 완료!!
  const mainArticle = $.qs('.main-card-article');
  const slide = $.qs('.cards-section');
  const slideWidth = mainArticle.clientWidth;
  const slideItems = $.qsa('.one-card-section');
  const maxSlide = slideItems.length;

  let currentSlide = 1;
  let startPoint = 0;
  let endPoint = 0;

  const setWidth = (slideWidth) => (slide.style.width = `${slideWidth * slideItems.length}px`);

  //prettier-ignore
  // const addActiveClass = (template, element) =>
  //   _.go(
  //     template,
  //     $.el,
  //     $.prepend(element));
  // const setPagination = () => {
  //   const pagination = $.qs('.card-pagination');
  //   const paginationTemp = `<li>•</li>`;
  //   const activePaginationTemp = `<li class="active">•</li>`;
  //   for (let i = 0; i < maxSlide; i++) {
  //     if (i === maxSlide - 1) addActiveClass(activePaginationTemp, pagination);
  //     else addActiveClass(paginationTemp, pagination);
  //   }
  // };

  const setOffset = () => {
    const offset = slideWidth * 0.95 - 20;
    const newOffset = offset * (currentSlide - 1);

    slide.style.transform = `translateX(-${newOffset}px)`;
  };

  const nextMove = () => {
    currentSlide++;
    if (currentSlide <= maxSlide) {
      setOffset();
    } else {
      currentSlide--;
    }
  };

  const prevMove = () => {
    currentSlide--;
    if (currentSlide > 0) {
      setOffset();
    } else {
      currentSlide++;
    }
  };

  // const clickPagination = (targets) => {
  //   for (let i = 0; i < maxSlide; i++) {
  //     targets[i].addEventListener('click', () => {
  //       currentSlide = i + 1;
  //       setOffset();
  //     });
  //   }
  // };

  const touchStartEvent = (target) => (startPoint = target.touches[0].pageX);
  const touchEndEvent = (e) => {
    endPoint = e.changedTouches[0].pageX;

    if (Math.abs(endPoint - startPoint) < 10) return;

    if (startPoint < endPoint) {
      prevMove();
    } else if (startPoint > endPoint) {
      nextMove();
    }
  };

  // prettier-ignore
  const cardSlider = () =>
    _.go(
      [],
      () => setWidth(slideWidth),
      // () => setPagination(),
      // $.findAll('.card-pagination > li'),
      // changeActive,
      // clickPagination,
      () => $.qs('.cards-section'),
      _.tap(
        $.on('touchstart', touchStartEvent)),
      _.tap(
        $.on('touchend', touchEndEvent)));
  return cardSlider;
};

export default slider;
