const mainArticle = document.querySelector('.main-card-article');
const cardsSection = document.querySelector('.cards-section');
const oneCardSection = document.querySelectorAll('.one-card-section');
let currentIndex = 0; // 현재 슬라이드 화면 인덱스

// oneCardSection.forEach((inner) => {
//   inner.style.width = `${mainArticle.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
// })

cardsSection.style.width = `${
  mainArticle.clientWidth * oneCardSection.length
}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

console.log(cardsSection.style.width);

export const getInterval = () => {
  return setInterval(() => {
    currentIndex++;
    currentIndex = currentIndex >= oneCardSection.length ? 0 : currentIndex;
    cardsSection.style.marginLeft = `-${
      mainArticle.clientWidth * currentIndex
    }px`;
  }, 2000);
};
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
