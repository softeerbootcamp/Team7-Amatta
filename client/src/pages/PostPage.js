import { SERVER_URL, INPUT } from '@/constants/constant';
import { inputForm, header } from '@/components/common';
import { sendImage, sendImageInfo } from '@/apis/post';
import { IO, $, drag, CalendarControl } from '@/utils';

import { _, L } from '@/utils/customFx';

const POST_INPUT_TYPE = ['menu', 'shop', 'price', 'expirationDate'];
const $root = $.qs('#root');
const cameraIconURL = `${SERVER_URL.IMG}icon/camera.svg`;
const PostPage = {};

const inputImage = $.qs('.upload-image');
const canvas = $.qs('.canvas');
const imageContainer = $.qs('.post-upload-section');

PostPage.tpl = `
  <main class="post-main">
    <section class="crop-section">
      <div class="crop-container">
        <img class='crop-image'></img>
        <div data-drag class='crop-box' style='width: 40vw; height:40vw;'></div>
      </div>
    </section>
    <section class="post-info-section">
      <section class="post-upload-section">
        <img class="camera-icon" src="${cameraIconURL}" alt="camera-icon"/>
        <input class="upload-image" type="file" accept="image/*" />
        <!-- <canvas class="canvas"></canvas> -->
      </section>
      <section class="input-info-section">
        <div class="calendar"></div>
      </section>
    </section>
    <section class="post-button">
      <button class="submit">완료</button>
      <button class="cancel">취소</button>
    </section>
    <button class="submit1">aaaaa</button>
  </main>
`;

const appendCalendar = () => {
  const target = $.qs('#date-input');
  target.addEventListener('click', visibleCalendar);
  target.style.backgroundPosition = 'right+0.75rem center';
};

const visibleCalendar = () => {
  const target = $.qs('.calendar');
  target.classList.toggle('active');
};

const uploadImg = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file[0]);

  reader.onload = async () => {
    // const [imageType, base64URL] = reader.result.split(';base64,');
    // const imageData = { gifticonBase64: base64URL, format: imageType.replace('data:image/', '') };
    // const response = await sendImage(imageData);
    // const temp = [];

    // _.go(
    //   response.images,
    //   ([res]) => res.fields,
    //   _.map((text) => temp.push(text.inferText)),
    // );

    // sendImageInfo({ texts: temp });

    $.qs('.crop-section').style.display = 'flex';
    $.qs('.crop-image').src = reader.result;
    $.qs('.crop-box').addEventListener('touchstart', drag);
  };

  return file;
};

const resizeImg1 = () => {
  const file = inputImage.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const image = new Image();

    image.addEventListener('load', () => {
      canvas.width = 300;
      canvas.height = 300;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, 300, 300);

      const resizedImage = canvas.toDataURL('image/jpeg');
      const img = document.createElement('img');
      img.src = resizedImage;
      imageContainer.appendChild(img);
      // sendImageToServer(resizedImage);
    });

    image.src = reader.result;
  });

  reader.readAsDataURL(file);
};

// prettier-ignore
PostPage.resizeImg = () =>
  _.go(
    $.qs('.submit1'),
    $.on('click', resizeImg1));

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
      () => appendCalendar(),
      () => PostPage.resizeImg());
}

export default initiatePostPage;
