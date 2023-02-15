import { SERVER_URL, INPUT } from '@/constants/constant';
import { inputForm, header } from '@/components/common';
import { sendImage, sendImageInfo } from '@/apis/post';
import { IO, $, drag } from '@/utils';

import { _, L } from '@/utils/customFx';

const POST_INPUT_TYPE = ['menu', 'shop', 'price'];
const PostPage = {};
const iconURL = `${SERVER_URL.IMG}icon/camera.svg`;

PostPage.temp = `
  <main class="post-main">
    <div class="test">
      <div class="test2">
        <img class='asd2'></img>
        <div data-drag class='asd'></div>
      </div>
    </div>
    <section class="post-info-section">
      <section class="post-upload-section">
        <img class="camera-icon" src="${iconURL}" alt="camera-icon"/>
        <input class="upload-image" type="file" accept="image/*" />
        <canvas class="canvas"></canvas>
      </section>
      <section class="input-info-section">
      </section>
    </section>
    <section class="post-button">
      <button class="submit">완료</button>
      <button class="cancel">취소</button>
    </section>
    <button class="submit1">aaaaa</button>
  </main>
`;

const test = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file[0]);

  reader.onload = async () => {
    // const [imageType, base64URL] = reader.result.split(';base64,');
    // const imageData = { gifticonBase64: base64URL, format: imageType.replace('data:image/', '') };
    // const response = await sendImage(imageData);
    // const a = [];

    // const tt = () =>
    //   _.go(
    //     response.images,
    //     ([a]) => a,
    //     (q) => q.fields,
    //     _.map((text) => a.push(text.inferText)),
    //   );

    // tt();

    // sendImageInfo({ texts: a });

    $.qs('.test').style.display = 'flex';
    $.qs('.test2 > img').src = reader.result;
    $.qs('.test2 > div').addEventListener('touchstart', drag);
  };
  // console.log(file);
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
      console.log(resizedImage);
      // sendImageToServer(resizedImage);
    });

    image.src = reader.result;
  });

  reader.readAsDataURL(file);
};

// const test2 = (event) => {
//   switch (event.target.id) {
//     case 'target1':
//       alert(1);
//       break;
//     case 'target2':
//       alert(2);
//       break;
//   }
// };

// prettier-ignore
PostPage.resizeImg = () => 
  _.go(
    $.qs('.submit1'),
    $.on('click', resizeImg1));

const makeFragment = (html) =>
  IO.of(() => ({
    fragment: $.el(html),
    originalHtml: html,
  }));

// prettier-ignore
PostPage.appendComponent = (fragment) =>
  new IO(() =>
    _.go(
      INPUT,
      _.filter((input) => POST_INPUT_TYPE.includes(input.type)),
      _.map((input) => inputForm({ ...input, target: fragment })()),
      ([f]) => f));

// prettier-ignore
PostPage.renderTemplate = () =>
  _.go(
    makeFragment(PostPage.temp)
      .chain((result) => PostPage.appendComponent(result.fragment))
      .run());

// prettier-ignore
PostPage.render = () =>
  _.go(
    PostPage.renderTemplate(),
    $.replace($.qs('#root')));

// prettier-ignore
PostPage.addEvent = () =>
  _.go(

  );

// prettier-ignore
const navigatePost = () => 
  _.go(
    PostPage.render(),
    $.find('.post-upload-section'),
    $.on('click', () => $.qs('.upload-image').click()),
    $.find('.upload-image'),
    $.on('change', (e) => test(e.target.files)),
    () => PostPage.resizeImg());

export default navigatePost;

const inputImage = document.querySelector('.upload-image');
const canvas = document.querySelector('.canvas');
const imageContainer = document.querySelector('.post-upload-section');
