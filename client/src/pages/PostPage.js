/* eslint-disable no-unused-expressions */
import SERVER_URL from '@/constants/constant';
import { inputForm, header } from '@/components/common';
import { $, drag } from '@/utils';
import { _ } from '@/utils/customFx';

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
  <main class="post-main">
    <div class="test">
      <div class="test2">
        <img></img>
        <div data-drag></div>
      </div>
    </div>
    <section class="post-info-section">
      <section class="post-upload-section">
        <img class="camera-icon" src="${iconURL}" alt="camera-icon"/>
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

const test = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file[0]);

  reader.onload = () => {
    $.qs('.test').style.display = 'flex';
    $.qs('.test2 > img').src = reader.result;
    $.qs('.test2 > div').addEventListener('touchstart', drag);
  };
};

// prettier-ignore
PostPage.render = () =>
    _.go(
      PostPage.temp,
      $.el,
      $.replace($.qs('#root')),
      header({ color: 'mint', label: 'bb', target: '#root' }));

// prettier-ignore
const navigatePost = () => 
    _.go(
      PostPage.render(),
      $.find('.post-upload-section'),
      $.on('click', () => $.qs('.upload-image').click()),
      $.find('.upload-image'),
      $.on('change', (e) => test(e.target.files)));

export default navigatePost;
