export default function drag(e) {
  let initialX = e.touches[0].clientX;
  let initialY = e.touches[0].clientY;
  let currentX;
  let currentY;
  let isResizing = false;

  const element = e.target.closest('[data-drag]');
  const image = document.querySelector('.crop-image');
  const imgSize = element.getBoundingClientRect();
  const bottomRight = imgSize.bottom - initialY < 20 && imgSize.right - initialX < 20;

  let currentWidth = element.offsetWidth;
  let currentHeight = element.offsetHeight;
  // console.log(currentWidth);
  if (bottomRight) isResizing = true;

  const moveHandler = (event) => {
    if (event.targetTouches.length === 1) {
      event.preventDefault();
      event.stopPropagation();
      currentX = event.targetTouches[0].clientX;
      currentY = event.targetTouches[0].clientY;

      // let diffX = currentX - initialX;
      // let diffY = currentY - initialY;
      // let newWidth = currentWidth + diffX;
      // let newHeight = currentHeight + diffY;

      if (isResizing) {
        const diffX = currentX - initialX;
        const diffY = currentY - initialY;
        const newWidth = currentWidth + diffX;
        const newHeight = currentHeight + diffY;
        console.log(newWidth, currentWidth);
        if (
          newWidth >= 50 &&
          newWidth <= image.offsetWidth - element.offsetLeft &&
          newHeight >= 50 &&
          newHeight <= image.offsetHeight - element.offsetTop
        ) {
          // element.style.transform = `scale(${newWidth / currentWidth}, ${newWidth / currentWidth})`;
          element.style.width = `calc(40vw * ${newWidth / currentWidth})`;
          element.style.height = `calc(40vw * ${newWidth / currentWidth})`;
        }
        // currentWidth = newWidth;
        // currentHeight = newHeight;
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
          element.style.left = `${newLeft}px`;
          element.style.top = `${newTop}px`;
          // element.style.transform = `scale(${newWidth / currentWidth}, ${newWidth / currentWidth})`;
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
