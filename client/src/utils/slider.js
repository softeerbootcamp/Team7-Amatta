import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const slider = () => {
  const mainArticle = $.qs('.main-card-article');
  const slide = $.qs('.cards-section');
  const slideWidth = mainArticle.clientWidth;
  const slideItems = $.qsa('.one-card-section');
  const maxSlide = slideItems.length;
  let currentSlide = 1;
  let startPoint = 0;
  let endPoint = 0;

  slide.style.width = `${mainArticle.clientWidth * slideItems.length}px`;

  [...slideItems].forEach((card) => {
    card.style.width = `${mainArticle.clientWidth}px`;
  });

  let currSlide = 1;

  const pagination = $.qs('.card-pagination');

  const paginationTemp = `<li>•</li>`;
  const activePaginationTemp = `<li class="active">•</li>`;

  //prettier-ignore
  const setUnactive = () =>
    _.go(
      paginationTemp,
      $.el,
      $.prepend(pagination));

  //prettier-ignore
  const setActive = () =>
    _.go(
      activePaginationTemp,
      $.el,
      $.prepend(pagination));

  for (let i = 0; i < maxSlide; i++) {
    if (i === maxSlide - 1) setActive();
    else setUnactive();
  }

  const paginationItems = $.qsa('.card-pagination > li');

  const nextMove = () => {
    currSlide++;

    if (currSlide <= maxSlide) {
      const offset = slideWidth * (currSlide - 1);
      slideItems.forEach((i) => {
        i.setAttribute('style', `left: ${-offset}px`);
      });
      paginationItems.forEach((i) => i.classList.remove('active'));
      paginationItems[currSlide - 1].classList.add('active');
    } else {
      currSlide--;
    }
  };
  const prevMove = () => {
    currSlide--;

    if (currSlide > 0) {
      const offset = slideWidth * (currSlide - 1);
      slideItems.forEach((i) => {
        i.setAttribute('style', `left: ${-offset}px`);
      });

      paginationItems.forEach((i) => i.classList.remove('active'));
      paginationItems[currSlide - 1].classList.add('active');
    } else {
      currSlide++;
    }
  };

  // window.addEventListener('resize', () => {
  //   slideWidth = slide.clientWidth;
  // });

  for (let i = 0; i < maxSlide; i++) {
    paginationItems[i].addEventListener('click', () => {
      currSlide = i + 1;

      const offset = slideWidth * (currSlide - 1);

      slideItems.forEach((i) => {
        i.setAttribute('style', `left: ${-offset}px`);
      });
      paginationItems.forEach((i) => i.classList.remove('active'));
      paginationItems[currSlide - 1].classList.add('active');
    });
  }

  slide.addEventListener('mousedown', (e) => {
    startPoint = e.pageX;
  });

  slide.addEventListener('mouseup', (e) => {
    endPoint = e.pageX;
    if (startPoint < endPoint) {
      prevMove();
    } else if (startPoint > endPoint) {
      nextMove();
    }
  });

  slide.addEventListener('touchstart', (e) => {
    startPoint = e.touches[0].pageX;
  });
  slide.addEventListener('touchend', (e) => {
    endPoint = e.changedTouches[0].pageX;
    if (startPoint < endPoint) {
      prevMove();
    } else if (startPoint > endPoint) {
      nextMove();
    }
  });
};

export default slider;
