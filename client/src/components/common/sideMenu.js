import { SERVER_URL } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const sideMenu = () => {
  const MINT_LOGO_URL = `${SERVER_URL.IMG}logo/logo-mint.png`;

  const sideMenuTpl = `
    <section class='menu-section'>
      <section class='outside-side-menu-section'></section>
      <section class='side-menu-section'>
        <section class="container">
          <ul class='menu-button'>
            <li class='mypage-button'>마이페이지</li>
            <li class='usedList-button'>사용 내역</li>
            <li class='logout-button'>로그아웃</li>
          </ul>
        </section>
        <img class='small-logo-mint' src='${MINT_LOGO_URL}' alt='amatta-small-logo'/>
        </section>  
      </section>
    `;

  // const toggleActive = (target) => target.classList.toggle('active');

  // prettier-ignore
  // const renderSideMenu = () =>
  //   _.go(
  //     sideMenuTpl,
  //     $.el,
  //     $.append($.qs('.header-main'))
  //   );

  // return renderSideMenu;
  return sideMenuTpl;
};

export default sideMenu;
