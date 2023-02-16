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
      <li class="due-date-button">마감순</li>
      <li class="price-button">금액순</li>
    </ul>
  `;

  return dropdownTemp;
};

export default dropdownMenu;
