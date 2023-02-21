import { $ } from '@/utils';
import { _ } from '@/utils/customFx';
import { usedCard } from '@/apis/card';
import { header } from '@/components/common';
import { cardDetail } from '@/components/main';

let cardDatas = [];
const setCardDatas = (cardData) => (cardDatas = [...cardData]);

const detailTemp = (newCardDatas) => {
  let idx = 0;

  return `
    ${_.go(
      newCardDatas,
      _.map((card) => cardDetail(card)(idx++)),
      _.reduce((a, b) => `${a}${b}`),
    )}
`;
};

const UsedCardPage = {};

UsedCardPage.temp = () => `
    <article class='main-card-article'>
      <div class='main-card-container'>
        <div class="main-card-box">
          <section class='cards-section list'>
            ${detailTemp(cardDatas)}
          </section>
        </div>
      </div>
    </article>
`;

// prettier-ignore
UsedCardPage.render = () => 
  _.go(
    UsedCardPage.temp(), 
    $.el, 
    $.replace($.qs('#root')));

const navigateUsed = async () => {
  ///////여기추가
  setCardDatas(await usedCard());

  UsedCardPage.render();
  header({ color: 'mint' })();
};

export default navigateUsed;
