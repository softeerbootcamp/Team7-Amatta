import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const notification = (label, classname) => {
  const notificationTpl = `
        <div class='notification-container ${classname}'>
            <p>${label}</p>
        </div>
    `;

  //prettier-ignore
  const renderNotification = () => 
    _.go(
        notificationTpl, 
        $.el, 
        $.append($.qs('#root')));

  const toggleShow = (target) => target.classList.toggle('show');

  const showNotification = () => {
    const notificationDiv = $.qs('.notification-container');
    toggleShow(notificationDiv);
    setTimeout(() => {
      toggleShow(notificationDiv);
    }, 2000);
  };

  //prettier-ignore
  const notificationEvent = async () => {
    _.go(
        renderNotification(), 
        () => showNotification);
  };

  return notificationEvent;
};

export default notification;
