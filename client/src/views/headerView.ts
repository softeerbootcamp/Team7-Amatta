export const homeMain = document.querySelector('.home-main');

export function showHeader() {
  if (homeMain instanceof HTMLElement) {
    homeMain.style.backgroundColor = 'white';

    homeMain.innerHTML = `
        <article class = 'header-article'>
            <img class='small-logo-white' src='./src/assets/logo-white.png' alt='amatta-small-logo'/>
            <section class='header-button-section'>
              <img class="search-button" src = 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/icon/search.svg' alt='search-button' />
              <section class="trigger">
                <span></span>
                <span></span>
                <span></span>
              </section>
            </section>
        </article>
      `;
  }
}
