import SERVER_URL from '@/constants/constant';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const header = (props) => {
  const { color, label, target } = props;
  const logoUrl = `${SERVER_URL.IMG}logo/logo-white.png`;
  const iconUrl = `${SERVER_URL.IMG}icon/search.svg`;

  const headerTemp = `
      <header class = 'header-main'>
          <img class='small-logo-white' src='${logoUrl}' alt='amatta-small-logo'/>
          <section class='header-button-section'>
            <img class="search-button" src = '${iconUrl}' alt='search-button' />
            <section class="trigger">
              <span></span>
              <span></span>
              <span></span>
            </section>
          </section>
      </header>
    `;

  // prettier-ignore
  const render = () =>
    _.go(
      headerTemp,
      $.el,
      $.prepend($.qs(`${target}`)));

  // prettier-ignore
  const appendHeader = () => 
    _.go(
      render());

  return appendHeader;
};

export default header;
