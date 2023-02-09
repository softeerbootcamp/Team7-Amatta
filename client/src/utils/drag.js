export default function drag(event) {
  const elementToDrag = event.target.closest('[data-drag]');

  const startX = event.touches[0].clientX;
  const startY = event.touches[0].clientY;

  const origX = elementToDrag.offsetLeft;
  const origY = elementToDrag.offsetTop;

  const deltaX = startX - origX;
  const deltaY = startY - origY;

  function moveHandler(e) {
    elementToDrag.style.left = `${e.touches[0].clientX - deltaX}px`;
    elementToDrag.style.top = `${e.touches[0].clientY - deltaY}px`;

    e.stopPropagation();
  }

  function upHandler(e) {
    elementToDrag.removeEventListener('touchend', upHandler, true);
    elementToDrag.removeEventListener('touchmove', moveHandler, true);

    e.stopPropagation();
  }

  elementToDrag.addEventListener('touchmove', moveHandler, true);
  elementToDrag.addEventListener('touchend', upHandler, true);

  event.stopPropagation();
  event.preventDefault();
}
