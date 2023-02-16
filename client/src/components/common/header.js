import { SERVER_URL } from '@/constants/constant';
import { navigate } from '@/core/router';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const header = (props) => {
  const { color, label } = props;
  const mintLogoUrl = `${SERVER_URL.IMG}logo/logo-mint.png`;
  const whiteLogoUrl = `${SERVER_URL.IMG}logo/logo-white.png`;
  const leftArrowIconUrl = `${SERVER_URL.IMG}icon/arrow-left.svg`;
  const searchIconUrl = `${SERVER_URL.IMG}icon/search.svg`;

  const mintTemp = `
    <img class='small-logo-white' src='${whiteLogoUrl}' alt='amatta-small-logo'/>
    <section class='header-button-section'>
      <img class="search-button" src = '${searchIconUrl}' alt='search-button' />
      <section class="trigger">
        <span></span>
        <span></span>
        <span></span>
      </section>
    </section>
  `;

  const whiteTemp = `
    <section class="white-header-section">
      <img class="back-button" src="${leftArrowIconUrl}" alt="back-button" />
      <section class="logo-section">
        ${
          label
            ? `${label}`
            : `<img class="small-logo-mint" src="${mintLogoUrl}" alt="small-logo-mint" />`
        }
      </section>
    </section>
  `;

  const headerTemp = `
      <header class = 'header-main'>
        ${color === 'mint' ? mintTemp : whiteTemp}
      </header>
    `;

  const handleEvent = (fragment) => {
    _.go(
      fragment,
      $.find('.small-logo-white'),
      $.on('click', () => navigate('/')),
    );
  };

  // prettier-ignore
  const appendHeader = () =>
    _.go(
      headerTemp,
      $.el,
      (fragment) => $.prepend(fragment, $.qs('#root')),
      handleEvent);

  return appendHeader;
};

export default header;
