import { SERVER_URL } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const dropdownMenu = () => {
  const dropdownIconUrl = `${SERVER_URL.IMG}icon/angle-down.svg`;
  const sortOption = { 1: '등록순', 2: '마감순', 3: '금액순' };

  const dropdownTemp = `  
    <button class='main-dropdown-button'>
      ${sortOption[1]}
      <img class='main-dropdown-image' src='${dropdownIconUrl}' alt='dropdown-image' />
    </button>
    <ul class="dropdown-list">
      <li class="due-date-button">${sortOption[2]}</li>
      <li class="price-button">${sortOption[3]}</li>
    </ul>
  `;

  return dropdownTemp;
};

export default dropdownMenu;
