import SERVER_URL from '@/constants/constant';

const header = () => {
  const logoUrl = `${SERVER_URL.IMG}logo/logo-white.png`;
  const iconUrl = `${SERVER_URL.IMG}icon/search.svg`;

  const headerTemplate = `
    <article class = 'header-article'>
        <img class='small-logo-white' src='${logoUrl}' alt='amatta-small-logo'/>
        <section class='header-button-section'>
          <img class="search-button" src = '${iconUrl}' alt='search-button' />
          <section class="trigger">
            <span></span>
            <span></span>
            <span></span>
          </section>
        </section>
    </article>
  `;

  return headerTemplate;
};

export default header;
