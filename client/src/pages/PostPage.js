import SERVER_URL from '@/constants/constant';
import { inputForm, headerTemplate } from '@/components/common';
import { _ } from '@/utils/customFx';
import { $ } from '@/utils';

const PostPage = {};
const iconURL = `${SERVER_URL.IMG}icon/camera.svg`;
const inputs = [
  {
    type: 'text',
    name: 'menu-input',
    label: '상품 이름',
    required: true,
  },
  {
    type: 'text',
    name: 'shop-input',
    label: '가게 이름',
    required: true,
  },
  {
    type: 'text',
    name: 'price-input',
    label: '상품 가격',
    required: true,
  },
];

PostPage.temp = `
  ${headerTemplate}
  <main class="post-main">
    <section class="post-info-section">
      <section class="post-upload-section">
        <img src="${iconURL}" alt="camera-icon"/>
        <input class="upload-image" type="file" accept="image/*" />
      </section>
      <section class="input-info-section">
        ${_.strMap((input) => inputForm(input), inputs)}
      </section>
    </section>
    <section class="post-button">
      <button class="submit">완료</button>
      <button class="cancel">취소</button>
    </section>
  </main>
`;

// prettier-ignore
PostPage.render = () =>
    _.go(
      PostPage.temp,
      $.el,
      $.replace($.qs('#root')));

// prettier-ignore
const navigatePost = () => 
    _.go(
      PostPage.render(),
      $.find('.post-upload-section'),
      $.on('click', () => $.qs('.upload-image').click()));

export default navigatePost;
