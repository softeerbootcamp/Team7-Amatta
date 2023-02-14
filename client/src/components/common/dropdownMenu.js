import { SERVER_URL } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const dropdownMenu = () => {
  const dropdownIconUrl = `${SERVER_URL.IMG}icon/angle-down.svg`;

  const dropdownTemp = `   
    <button class='main-dropdown-button'>
      등록순
      <img class='main-dropdown-image' src='${dropdownIconUrl}' alt='dropdown-image' />
    </button>
    <ul class="dropdown-list">
      <li><a href="#">마감순</a></li>
      <li><a href="#">금액순</a></li>
    </ul>
  `;

  // const dropdownSection = $.qs('.main-dropdown-section');
  // // document.querySelector('.dropdown-btn').addEventListener('click', function() {
  // // document.querySelector('.dropdown').classList.toggle('active');
  // const toggleDropdown = () => dropdownSection.classList.toggle('drop');

  // //prettier-ignore
  // const render = () =>
  //   _.go(
  //     dropdownTemp,
  //     $.el,
  //     $.prepend($.qs('.dropdown-section')));

  // // prettier-ignore
  // const dropDown = () =>
  //   _.go(
  //     render(),
  //     () => $.qs('.main-dropdown-button'),
  //     $.on('click', toggleDropdown)
  //   );
  return dropdownTemp;
};

export default dropdownMenu;
