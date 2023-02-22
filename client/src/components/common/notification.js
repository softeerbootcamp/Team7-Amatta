import { SERVER_URL } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const notification = (label, classname, isSuccess) => {
  const CIRCLE_CHECK_URL = `${SERVER_URL.IMG}icon/circle-check.svg`;
  const CIRCLE_X_URL = `${SERVER_URL.IMG}icon/circle-xmark.svg`;

  const CircleCheckTpl = `<img class="circle-check-icon" src='${CIRCLE_CHECK_URL}' alt='circle-check-icon' />`;
  const CircleXTpl = `<img class="circle-x-icon" src='${CIRCLE_X_URL}' alt='circle-x-icon' />`;

  const notificationTpl = `
        <div class='notification-container ${classname}'>
            <p>${isSuccess ? CircleCheckTpl : CircleXTpl} &nbsp; ${label} </p>
        </div>
    `;

  // prettier-ignore
  const renderNotification = () => 
    _.go(
        notificationTpl, 
        $.el,
        $.append($.qs('#root')));

  const showNotification = () => {
    const notificationDiv = $.qs('.notification-container');
    setTimeout(() => {
      notificationDiv.classList.add('show');
    }, 50);
    setTimeout(() => {
      notificationDiv.classList.remove('show');
    }, 2000);
  };

  // prettier-ignore
  const notificationEvent = ()  => 
    _.go(
        renderNotification(),
        () => showNotification(),
        );

  return notificationEvent;
};

export default notification;
