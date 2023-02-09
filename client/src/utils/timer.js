const timer = (time, target, callbackFn) => {
  let min = '';
  let sec = '';

  const timerDiv = document.createElement('div');
  timerDiv.classList.add('timer');
  document.querySelector(target).appendChild(timerDiv);

  const start = setInterval(() => {
    min = parseInt(time / 60, 10);
    sec = time % 60;

    document.querySelector('.timer').innerHTML = `${min}분${sec}초`;
    time--;

    if (time < 0) {
      clearInterval(start);
      document.querySelector('.timer').innerHTML = '시간초과';

      return callbackFn();
    }
  }, 1000);

  return start;
};

export default timer;
