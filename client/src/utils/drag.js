// export default function drag(event) {
//   const elementToDrag = event.target.closest('[data-drag]');

//   const startX = event.touches[0].clientX;
//   const startY = event.touches[0].clientY;

//   const origX = elementToDrag.offsetLeft;
//   const origY = elementToDrag.offsetTop;

//   const deltaX = startX - origX;
//   const deltaY = startY - origY;

//   function moveHandler(e) {
//     elementToDrag.style.left = `${e.touches[0].clientX - deltaX}px`;
//     elementToDrag.style.top = `${e.touches[0].clientY - deltaY}px`;

//     e.stopPropagation();
//   }

//   function upHandler(e) {
//     elementToDrag.removeEventListener('touchend', upHandler, true);
//     elementToDrag.removeEventListener('touchmove', moveHandler, true);

//     e.stopPropagation();
//   }

//   elementToDrag.addEventListener('touchmove', moveHandler, true);
//   elementToDrag.addEventListener('touchend', upHandler, true);

//   event.stopPropagation();
//   event.preventDefault();
// }

export default function drag(e) {
  let initialX = e.touches[0].clientX;
  let initialY = e.touches[0].clientY;
  let currentX;
  let currentY;
  let isResizing = false;

  const element = e.target.closest('[data-drag]');
  const image = document.querySelector('.asd2');

  const bottomRight =
    element.getBoundingClientRect().bottom - initialY < 20 &&
    element.getBoundingClientRect().right - initialX < 20;
  if (bottomRight) {
    isResizing = true;
  }

  const moveHandler = (event) => {
    if (event.targetTouches.length === 1) {
      event.preventDefault();
      event.stopPropagation();
      currentX = event.targetTouches[0].clientX;
      currentY = event.targetTouches[0].clientY;

      if (isResizing) {
        const diffX = currentX - initialX;
        const diffY = currentY - initialY;
        const currentWidth = element.offsetWidth;
        const currentHeight = element.offsetHeight;
        const newWidth = currentWidth + diffX;
        const newHeight = currentHeight + diffY;

        if (
          newWidth >= 50 &&
          newWidth <= image.offsetWidth - element.offsetLeft &&
          newHeight >= 50 &&
          newHeight <= image.offsetHeight - element.offsetTop
        ) {
          // element.style.left = `${diffX}px`;
          console.log(newWidth / currentWidth, newWidth / currentWidth);
          element.style.transform = `scale(${newWidth / currentWidth}, ${newWidth / currentWidth})`;
        }
        // initialX = currentX;
        // initialY = currentY;
      } else {
        const diffX = currentX - initialX;
        const diffY = currentY - initialY;
        const currentLeft = element.offsetLeft;
        const currentTop = element.offsetTop;
        const newLeft = currentLeft + diffX;
        const newTop = currentTop + diffY;

        if (
          newLeft >= 0 &&
          newLeft + element.offsetWidth <= image.offsetWidth &&
          newTop >= 0 &&
          newTop + element.offsetHeight <= image.offsetHeight
        ) {
          console.log(currentY, initialX);

          element.style.left = `${newLeft}px`;
          element.style.top = `${newTop}px`;
          element.style.transform = `scale(${element.offsetWidth / element.offsetWidth}, ${
            element.offsetHeight / element.offsetHeight
          })`;
        }
        initialX = currentX;
        initialY = currentY;
      }
    }
  };

  element.addEventListener('touchmove', moveHandler);

  element.addEventListener('touchend', () => {
    isResizing = false;
    element.removeEventListener('touchmove', moveHandler);
  });
}
