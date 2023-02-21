import { SERVER_URL } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const searchCard = () => {
  const SEARCH_ICON_URL = `${SERVER_URL.IMG}icon/search.svg`;

  const searchTemp = `
  <section class='search-card'>
    <div class='search-filter'>
      <div value="all">전체</div>
      <div value="title">상품별</div>
      <div value="author">매장별</div>
    </div>
    <input class='search-card-input' placeholder='검색어를 입력해주세요.'/>
  </section>
`;

  // prettier-ignore
  const appendSearchCard = () => {
    // const target = $.qs('.main-card-article');
    // _.go(
    //   searchTemp,
    //   (fragment) => target.insertAdjacentHTML('beforebegin', searchTemp));
    }

  return appendSearchCard;
};
export default searchCard;
