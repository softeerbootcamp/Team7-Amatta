import { SERVER_URL } from '@/constants/constant';
import { navigate } from '@/core/router';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';
import { sideMenu, modal } from '@/components/common';

const header = (props) => {
  const { color, label, path } = props;
  const MINT_LOGO_URL = `${SERVER_URL.IMG}logo/logo-mint.png`;
  const WHITE_LOGO_URL = `${SERVER_URL.IMG}logo/logo-white.png`;
  const LEFT_ARROW_URL = `${SERVER_URL.IMG}icon/left-arrow.svg`;
  const SEARCH_ICON_URL = `${SERVER_URL.IMG}icon/search.svg`;

  const mintTemp = `
    <img class='small-logo-white' src='${WHITE_LOGO_URL}' alt='amatta-small-logo'/>
    <section class='header-button-section'>
      <img class="search-button" src = '${SEARCH_ICON_URL}' alt='search-button' />
      <section class="trigger">
        <span></span>
        <span></span>
        <span></span>
      </section>
    </section>
  `;

  const whiteTemp = `
    <section class="white-header-section">
      <img class="left-arrow-button" src="${LEFT_ARROW_URL}" alt="back-button" />
        ${
          label
            ? `<h4 class="header-label">${label}</h4>`
            : `<img class="small-logo-mint" src="${MINT_LOGO_URL}" alt="small-logo-mint" />`
        }
    </section>
  `;

  const headerTemp = `
      <header class = 'header-main ${color}'>
        ${color === 'mint' ? mintTemp : whiteTemp}
      </header>
    `;

  const logoutEvent = (target) => {
    toggleActive(target);
  };

  const openMenuEvent = () => {
    const trigger = $.qs('.trigger');
    const menuTarget = $.qs('.menu-section');

    toggleActive(trigger);
    toggleActive(menuTarget);

    const logoutButton = $.qs('.logout-button');
    logoutButton.addEventListener('click', toggleActive());
  };

  const toggleActive = (target) => target.classList.toggle('active');

  const navigatePath = (fragment, target, path) =>
    _.go(
      fragment,
      $.find(target),
      $.on('click', () => navigate(path)),
    );

  const handleEvent = (fragment) => {
    if (!label) return navigatePath(fragment, '.small-logo-white', '/card');
    return navigatePath(fragment, '.left-arrow-button', path);
  };

  // prettier-ignore
  const appendHeader = () =>
    _.go(
      headerTemp,
      $.el,
      (fragment) => $.prepend(fragment, $.qs('#root')),
      handleEvent,
      () => sideMenu()(),
      () => $.qs('.trigger'),
      $.on('click', openMenuEvent),
      () => modal("로그아웃", "logout")());

  return appendHeader;
};

export default header;
