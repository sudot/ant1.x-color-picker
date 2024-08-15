let isDragging = false;

export default function (ele, options) {
  const moveFun = function (event) {
    options?.drag?.(event);
  };

  const upFun = function (event) {
    document.removeEventListener('mousemove', moveFun);
    document.removeEventListener('mouseup', upFun);
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    options?.end?.(event);
  };

  ele.addEventListener('mousedown', function (event) {
    if (isDragging) return;
    document.onselectstart = () => false;
    document.ondragstart = () => false;
    document.addEventListener('mousemove', moveFun);
    document.addEventListener('mouseup', upFun);

    isDragging = true;

    options?.start?.(event);
  });
}
