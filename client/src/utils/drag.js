export default function drag() {
  const cropArea = document.querySelector('.crop-area');
  const resizer = cropArea.querySelector('.resizer');
  const cropSection = document.querySelector('.crop-container');

  let isDragging = false;
  let isResizing = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;
  let initialWidth;

  cropArea.addEventListener('touchstart', dragStart);
  cropArea.addEventListener('touchend', dragEnd);
  cropArea.addEventListener('touchmove', drag);

  resizer.addEventListener('touchstart', startResize);
  resizer.addEventListener('touchend', stopResize);
  resizer.addEventListener('touchmove', resize);

  function dragStart(e) {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;

    if (e.target === cropArea) {
      isDragging = true;
    }
  }

  function dragEnd() {
    isDragging = false;
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;

      const sectionRect = e.currentTarget.parentElement.getBoundingClientRect();
      const cropAreaRect = cropArea.getBoundingClientRect();

      const maxX = sectionRect.width - cropAreaRect.width;
      const maxY = sectionRect.height - cropAreaRect.height;

      xOffset = currentX < 0 ? 0 : currentX > maxX ? maxX : currentX;
      yOffset = currentY < 0 ? 0 : currentY > maxY ? maxY : currentY;

      setTranslate(xOffset, yOffset, cropArea);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }

  function startResize(e) {
    initialWidth = cropArea.clientWidth;
    isResizing = true;
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    e.preventDefault();
  }

  function stopResize() {
    isResizing = false;
  }

  function resize(e) {
    if (isResizing) {
      const cropAreaRect = cropArea.getBoundingClientRect();
      const cropSectionRect = cropSection.getBoundingClientRect();
      const currentX = e.touches[0].clientX - initialX;
      const width = initialWidth + currentX;

      if (e.touches[0].clientX > cropSectionRect.right || width - cropAreaRect.x / 2 < 100) return;

      cropArea.style.width = `${width - cropAreaRect.x / 2}px`;
      cropArea.style.height = `${width - cropAreaRect.x / 2}px`;
    }
  }
}
