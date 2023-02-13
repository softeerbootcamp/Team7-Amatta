import { $ } from '@/utils';
import { _ } from '@/utils/customFx';
const slider = () => {
  //slider.js 리팩토링하려다 실패한 부분 => 2/13 성공!!
  const mainArticle = $.qs('.main-card-article');
  const slide = $.qs('.cards-section');
  const slideWidth = mainArticle.clientWidth;
  const slideItems = $.qsa('.one-card-section');
  const maxSlide = slideItems.length;
  let currentSlide = 1;
  let startPoint = 0;
  let endPoint = 0;
  const setWidth = () => {
    slide.style.width = `${mainArticle.clientWidth * slideItems.length}px`;
    [...slideItems].forEach((card) => {
      card.style.width = `${mainArticle.clientWidth}px`;
    });
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
  // const mouseDownEvent = () => (startPoint = e.pageX);
  // const mouseUpEvent = () => {
  //   endPoint = e.pageX;
  //   if (startPoint < endPoint) {
  //     prevMove();
  //   } else if (startPoint > endPoint) {
  //     nextMove();
  //   }
  // };
  const touchStartEvent = (target) => (startPoint = target.touches[0].pageX);
  const touchEndEvent = (e) => {
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
      [],
      () => setWidth(),
      () => setPagination(),
      $.findAll('.card-pagination > li'),
      changeActive,
      clickPagination,
      () => $.qs('.cards-section'),
      _.tap(
        $.on('touchstart', touchStartEvent)),
      _.tap(
        $.on('touchend', touchEndEvent)));
  return cardSlider;
};
export default slider;
