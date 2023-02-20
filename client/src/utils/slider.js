import { $ } from '@/utils';
import { _ } from '@/utils/customFx';
const slider = () => {
  //slider.js 리팩토링하려다 실패한 부분 => 2/13 완료!!
  const mainArticle = $.qs('.main-card-article');
  const slide = $.qs('.cards-detail-container');

  const slideWidth = mainArticle.clientWidth;
  const slideItems = $.qsa('.one-card-section');
  const maxSlide = slideItems.length;

  let currentSlide = 1;
  let startPoint = 0;
  let endPoint = 0;

  const setWidth = (slideWidth) => (slide.style.width = `${slideWidth * slideItems.length}px`);

  const parent = document.querySelector('.cards-section');
  const children = parent.querySelectorAll('.card-lists');
  const childCount = children.length;
  const parentWidth = parent.offsetWidth;

  const childWidth = children[0].offsetWidth;
  const spaceBetweenChildren = (parentWidth - childCount * childWidth) / (childCount - 1);

  children.forEach((child, index) => {
    const left = index * (childWidth + spaceBetweenChildren);
    left !== 0 && (child.style.left = `calc(${left}px + 2.5rem)`);
  });

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
  let startX = 0;
  const touchStartEvent = ({ touches }) => (startX = touches[0].pageX);
  const touchEndEvent = () => (startX = 0);

  const touchMoveEvent = ({ touches }) => {
    const left = childWidth + spaceBetweenChildren;
    startX - touches[0].clientX > 7 &&
      (parent.style.transform = `translateX(calc(-${left}px - 2.5rem))`);
  };

  // const left = index * (childWidth + spaceBetweenChildren);

  // prettier-ignore
  const cardSlider = () => 
  // _.go(
  //   $.qs('.cards-section'),
  //   console.log,
  // )
  _.go(
    // setWidth(slideWidth),
    $.qs('.cards-section'),
    _.tap($.on('touchstart', touchStartEvent)),
    _.tap($.on('touchmove', touchMoveEvent)),
    _.tap($.on('touchend', touchEndEvent)),
  );

  return cardSlider;
};

export default slider;
