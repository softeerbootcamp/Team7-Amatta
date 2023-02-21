import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const logout = (label, classname) => {
  const logoutTpl = `
  <div class='outside-modal-container outside-${classname}'>
    <section class='modal-section-wrapper ${classname}-wrapper'>
      <section class='modal-section  ${classname}'>
      <div class='modal-text-container'>
      <h4 class='modal-text'>${label}</h4>
      <h5 class='modal-do-text'> 하시겠습니까? </h5>
      </div>
      <section class='modal-button-section'>
        <button type='button' class='modal-button'>확인</button>
        <button type='button' class='cancel-button'>취소</button>
      </section>
      </section>
    </section>
  </div>
  `;

  // prettier-ignore
  const renderLogoutModal = () => 
    _.go(
      logoutTpl, 
      $.el, 
      $.replace($.qs('.main-card-box')));

  return renderLogoutModal;
};

export default logout;
