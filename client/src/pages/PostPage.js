import { SERVER_URL, INPUT } from '@/constants/constant';
import { inputForm, header } from '@/components/common';
import { sendImage, sendImageInfo } from '@/apis/post';
import { IO, $, drag, CalendarControl } from '@/utils';

import { _, L } from '@/utils/customFx';

const POST_INPUT_TYPE = ['menu', 'shop', 'price', 'expirationDate'];
const CAMERA_ICON_URL = `${SERVER_URL.IMG}icon/camera.svg`;
const ARROW_RIGHT_ICON_URL = `${SERVER_URL.IMG}icon/arrow-right.svg`;
const X_ICON_URL = `${SERVER_URL.IMG}icon/x.svg`;
const $root = $.qs('#root');
const PostPage = {};

const gifticonData = {
  itemName: '',
  brandName: '',
  price: '0',
  expiresAt: '',
  barcode: '',
};

PostPage.tpl = `
  <main class="post-main">
    <section class="crop-section">
      <div class="crop-container">
        <img class='crop-image'></img>
        <div data-drag class='crop-area' style='width: 40vw; height:40vw;'>
          <div class="resizer" style="width: 15px; height: 15px; background-color: black; position: absolute; bottom: 0; right: 0; cursor: se-resize"></div>
        </div>
      </div>
    </section>
    <section class="post-info-section">
      <section class="post-upload-section">
        <img class="camera-icon" src="${CAMERA_ICON_URL}" alt="camera-icon"/>
        <input class="upload-image" type="file" accept="image/*" />
      </section>
      <section class="input-section">
        <div class="calendar"></div>
      </section>
    </section>
    <section class="post-button">
      <button class="submit">완료</button>
      <button class="cancel">취소</button>
    </section>
  </main>
`;

const createImage = (src, target) => {
  const newImage = document.createElement('img');
  newImage.src = src;
  newImage.classList.add('x-button');
  newImage.style.position = 'absolute';
  newImage.style.right = '1.5rem';
  newImage.style.height = '1.75rem';
  newImage.style.top = '1.5rem';

  target.appendChild(newImage);
};

const setGifticonData = (gifticonData, type, newData) => {
  const newGifticonData = { ...gifticonData };
  newGifticonData[type] = newData;

  return newGifticonData;
};

const changeHeader = (color) => {
  document.querySelector('header').remove();

  if (color === 'white') {
    header({ color, label: '이미지 등록', path: '/post' })();

    const headerMain = document.querySelector('.white-header-section');
    headerMain.querySelector('.left-arrow-button').src = X_ICON_URL;
    createImage(ARROW_RIGHT_ICON_URL, headerMain);
  } else header({ color })();
};

const appendCalendar = () => {
  const target = $.qs('#date-input');
  target.addEventListener('click', visibleCalendar);
  target.style.backgroundPosition = 'right+0.75rem center';
};

const visibleCalendar = () => {
  const target = $.qs('.calendar');
  target.classList.toggle('active');
};

const resetInput = () => {
  const input = $.qs('.upload-image');
  input.value = '';
};

const uploadImg = (file) => {
  const reader = new FileReader();

  reader.readAsDataURL(file[0]);
  resetInput();

  reader.onload = async () => {
    changeHeader('white');
    // const [imageType, base64URL] = reader.result.split(';base64,');
    // const imageData = { gifticonBase64: base64URL, format: imageType.replace('data:image/', '') };
    // const response = await sendImage(imageData);
    // const temp = [];

    // _.go(
    //   response.images,
    //   ([res]) => res.fields,
    //   _.map((text) => temp.push(text.inferText)),
    // );

    // const { itemName, brandName, expiresAt, barcode } = sendImageInfo({ texts: temp });
    // console.log(itemName, brandName, expiresAt, barcode);
    // setGifticonData(gifticonData, 'itemName', itemName);
    // setGifticonData(gifticonData, 'brandName', brandName);
    // setGifticonData(gifticonData, 'expiresAt', expiresAt);
    // setGifticonData(gifticonData, 'barcode', barcode);

    // $.qs('#menu-input').value = itemName;
    // $.qs('#shop-input').value = brandName;
    // $.qs('#price-input').value = 0;
    // $.qs('#date-input').value = expiresAt;

    $.qs('#menu-input').value = '아메리카노';
    $.qs('#shop-input').value = 'STARBUKS';
    $.qs('#price-input').value = 0;
    $.qs('#date-input').value = '1996-11-01';

    $.qs('.crop-section').style.display = 'flex';
    $.qs('.crop-image').src = reader.result;

    drag(changeHeader);
  };

  return file;
};

const addInputForm = (fragment) => (input) => inputForm({ ...input, target: fragment })();
const postInputs = ({ type }) => POST_INPUT_TYPE.includes(type);

const findTarget = (child, parent) => () => $.qs(child, parent);

const handleClickUploadBtn = () => $.qs('.upload-image').click();
const handleSubmitImg = ({ target }) => uploadImg(target.files);

const eventTrigger = (type, target, fn) => () => $.on(type, fn)(target);
const setEvent = (type, fn) => (target) => IO.of(eventTrigger(type, target, fn));

const makeFragment = (html) => IO.of(() => $.el(html));

// prettier-ignore
const appendInputForm = (fragment) => 
  IO.of(() =>
    _.go(
      INPUT,
      _.filter(postInputs),
      _.map(addInputForm(fragment)),
      _.flatOne));

// prettier-ignore
PostPage.render = (template) =>
  _.go(
    makeFragment(template)
      .chain(appendInputForm)
      .run(),
    $.replace($root));

// prettier-ignore
PostPage.addEvents = (target) => {
  IO.of(findTarget('.post-upload-section', target))
    .chain(setEvent('click', handleClickUploadBtn))
    .run();

  IO.of(findTarget('.upload-image', target))
    .chain(setEvent('input', handleSubmitImg))
    .run();
};

// prettier-ignore
const initiatePostPage = () => {
  _.go(
    PostPage.tpl,
    PostPage.render,
    PostPage.addEvents);

  _.go(
    CalendarControl(),
    () => appendCalendar());

  header({color: 'mint'})()
}

export default initiatePostPage;
