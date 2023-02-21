import { SERVER_URL } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const dropdownMenu = (sortOption) => {
  const dropdownIconUrl = `${SERVER_URL.IMG}icon/angle-down.svg`;

  const dropdownTemp = `  
      <button class='main-dropdown-button'>
        ${sortOption[0]}
        <img class='main-dropdown-image' src='${dropdownIconUrl}' alt='dropdown-image' />
      </button>
      <ul class="dropdown-list">
        <li class="sort-button">${sortOption[1]}</li>
        <li class="sort-button">${sortOption[2]}</li>
      </ul>
    `;

  return dropdownTemp;
};

export default dropdownMenu;
