import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const slider = () => {
  const mainArticle = $.qs('.main-card-article');
  const cardsSection = $.qs('.cards-section');
  const oneCardSection = $.qsa('.one-card-section');
  // 슬라이크 전체 크기(width 구하기)
  const slide = $.qs('.cards-section');
  cardsSection.style.width = `${mainArticle.clientWidth * oneCardSection.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

  [...oneCardSection].forEach((card) => {
    card.style.width = `${mainArticle.clientWidth}px`;
  });

  let slideWidth = mainArticle.clientWidth;
  console.log(slideWidth);

  // 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
  const slideItems = $.qsa('.one-card-section');
  // 현재 슬라이드 위치가 슬라이드 개수를 넘기지 않게 하기 위한 변수
  const maxSlide = slideItems.length;
  console.log(maxSlide);

  // 버튼 클릭할 때 마다 현재 슬라이드가 어디인지 알려주기 위한 변수
  let currSlide = 1;

  // 페이지네이션 생성
  const pagination = $.qs('.card-pagination');

  const paginationTemp = `<li>•</li>`;
  const activePaginationTemp = `<li class="active">•</li>`;

  //prettier-ignore
  const render = () => 
    _.go(
      paginationTemp, 
      $.el, 
      $.prepend(pagination));

  //prettier-ignore
  const activeRender = () => 
    _.go(
      activePaginationTemp,
      $.el,
      $.prepend(pagination));

  for (let i = 0; i < maxSlide; i++) {
    if (i === maxSlide - 1) activeRender();
    else render();
  }

  const paginationItems = $.qs('.card-pagination > li');

  function nextMove() {
    currSlide++;
    // 마지막 슬라이드 이상으로 넘어가지 않게 하기 위해서
    if (currSlide <= maxSlide) {
      // 슬라이드를 이동시키기 위한 offset 계산
      const offset = slideWidth * (currSlide - 1);
      console.log(offset);
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        console.log(i);
        i.setAttribute('style', `left: ${-offset}px`);
      });
      // 슬라이드 이동 시 현재 활성화된 pagination 변경
      // paginationItems.forEach((i) => i.classList.remove('active'));
      // paginationItems[currSlide - 1].classList.add('active');
    } else {
      currSlide--;
    }
  }
  function prevMove() {
    currSlide--;
    // 1번째 슬라이드 이하로 넘어가지 않게 하기 위해서
    if (currSlide > 0) {
      // 슬라이드를 이동시키기 위한 offset 계산
      const offset = slideWidth * (currSlide - 1);
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        i.setAttribute('style', `left: ${-offset}px`);
      });
      // 슬라이드 이동 시 현재 활성화된 pagination 변경
      // paginationItems.forEach((i) => i.classList.remove('active'));
      // paginationItems[currSlide - 1].classList.add('active');
    } else {
      currSlide++;
    }
  }

  // 브라우저 화면이 조정될 때 마다 slideWidth를 변경하기 위해
  window.addEventListener('resize', () => {
    slideWidth = slide.clientWidth;
  });

  // // 각 페이지네이션 클릭 시 해당 슬라이드로 이동하기
  // for (let i = 0; i < maxSlide; i++) {
  //   // 각 페이지네이션마다 클릭 이벤트 추가하기
  //   paginationItems[i].addEventListener('click', () => {
  //     // 클릭한 페이지네이션에 따라 현재 슬라이드 변경해주기(currSlide는 시작 위치가 1이기 때문에 + 1)
  //     currSlide = i + 1;
  //     // 슬라이드를 이동시키기 위한 offset 계산
  //     const offset = slideWidth * (currSlide - 1);
  //     // 각 슬라이드 아이템의 left에 offset 적용
  //     slideItems.forEach((i) => {
  //       i.setAttribute('style', `left: ${-offset}px`);
  //     });
  //     // 슬라이드 이동 시 현재 활성화된 pagination 변경
  //     paginationItems.forEach((i) => i.classList.remove('active'));
  //     paginationItems[currSlide - 1].classList.add('active');
  //   });
  // }

  // 드래그(스와이프) 이벤트를 위한 변수 초기화
  let startPoint = 0;
  let endPoint = 0;

  // PC 클릭 이벤트 (드래그)
  slide.addEventListener('mousedown', (e) => {
    console.log('mousedown', e.pageX);
    startPoint = e.pageX; // 마우스 드래그 시작 위치 저장
  });

  slide.addEventListener('mouseup', (e) => {
    console.log('mouseup', e.pageX);
    endPoint = e.pageX; // 마우스 드래그 끝 위치 저장
    if (startPoint < endPoint) {
      // 마우스가 오른쪽으로 드래그 된 경우
      console.log('prev move');
      prevMove();
    } else if (startPoint > endPoint) {
      // 마우스가 왼쪽으로 드래그 된 경우
      console.log('next move');
      nextMove();
    }
  });

  // 모바일 터치 이벤트 (스와이프)
  slide.addEventListener('touchstart', (e) => {
    console.log('touchstart', e.touches[0].pageX);
    startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
  });
  slide.addEventListener('touchend', (e) => {
    console.log('touchend', e.changedTouches[0].pageX);
    endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
    if (startPoint < endPoint) {
      // 오른쪽으로 스와이프 된 경우
      console.log('prev move');
      prevMove();
    } else if (startPoint > endPoint) {
      // 왼쪽으로 스와이프 된 경우
      console.log('next move');
      nextMove();
    }
  });
};

export default slider;
//   const mainArticle = document.querySelector('.main-card-article');
//   const cardsSection = document.querySelector('.cards-section');
//   const oneCardSection = document.querySelectorAll('.one-card-section');
//   let currentIndex = 0; // 현재 슬라이드 화면 인덱스

//   // oneCardSection.forEach((inner) => {
//   //   inner.style.width = `${mainArticle.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
//   // })

//   cardsSection.style.width = `${mainArticle.clientWidth * oneCardSection.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

//   const getInterval = setInterval(() => {
//     currentIndex += 1;
//     currentIndex = currentIndex >= oneCardSection.length ? 0 : currentIndex;
//     cardsSection.style.marginLeft = `-${mainArticle.clientWidth * currentIndex}px`;
//   }, 2000);

//   return getInterval;
/*
  버튼에 이벤트 등록하기
*/
// const buttonLeft = document.querySelector('.button-left');
// const buttonRight = document.querySelector('.button-right');

// buttonLeft.addEventListener('click', () => {
//   currentIndex--;
//   currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
//   innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
//   clearInterval(interval); // 기존 동작되던 interval 제거
//   interval = getInterval(); // 새로운 interval 등록
// });

// buttonRight.addEventListener('click', () => {
//   currentIndex++;
//   currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
//   innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
//   clearInterval(interval); // 기존 동작되던 interval 제거
//   interval = getInterval(); // 새로운 interval 등록
// });

/*
  주기적으로 화면 넘기기
*/

// export let interval = getInterval(); // interval 등록
