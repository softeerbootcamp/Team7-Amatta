import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const slider = () => {
  const parent = document.querySelector('.cards-section');

  if (parent.classList.contains('list')) {
    parent.style.transform = 'translateX(0px)';
    return;
  }

  const children = parent.querySelectorAll('.card-lists');
  const childrenCount = children.length;
  const parentWidth = parent.offsetWidth;
  const spaceBetweenChildren = 35;

  children.forEach((child, index) => {
    const left = index * (parentWidth + spaceBetweenChildren);
    left !== 0 && (child.style.left = `calc(${left}px)`);
  });

  let startX = 0;
  let cardIdx = 0;
  let leftMargin = 0;
  let rightMargin = 0;

  const touchStartEvent = (e) => {
    startX = e.touches[0].pageX;
    cardIdx = parseInt(e.target.closest('.card-lists').dataset.idx, 10) + 1;
    leftMargin = (parentWidth + spaceBetweenChildren) * cardIdx;
    rightMargin = (parentWidth + spaceBetweenChildren) * (cardIdx - 2);
  };

  const touchEndEvent = () => {
    startX = 0;
    cardIdx = 0;
    leftMargin = 0;
    rightMargin = 0;
  };

  const touchMoveEvent = (e) => {
    if (childrenCount !== cardIdx && startX - e.touches[0].clientX > 7)
      parent.style.transform = `translateX(-${leftMargin}px)`;
    e.touches[0].clientX - startX > -7 &&
      (parent.style.transform = `translateX(-${rightMargin}px)`);
  };

  // prettier-ignore
  const cardSlider = () => 
    _.go(
      $.qs('.cards-section'),
      _.tap($.on('touchstart', touchStartEvent)),
      _.tap($.on('touchmove', touchMoveEvent)),
      _.tap($.on('touchend', touchEndEvent)));

  return cardSlider;
};

export default slider;
