import { $ } from '@/utils';
import { _ } from '@/utils/customFx';

const notification = (label, classname) => {
  const notificationTpl = `
        <div class='notification-container ${classname}'>
            <p>${label}</p>
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
