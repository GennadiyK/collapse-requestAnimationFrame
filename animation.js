const duration = 200;
let collapsed = true;
let height = null;

const el = document.querySelector(".collapse");
const btn = document.querySelector(".btn-collapse");
const btnText = document.createElement('span')

/**
 * Getting text for btn according collapsed value.
 * 
 * @returns collapsed or expanded
 */
const getBtnText = () => (collapsed ? "collapsed" : "expanded");

/**
 * Init state of the Collapse element.
 */
(function init() {
  height = collapsed ? 0 : el.scrollHeight;
  btnText.innerHTML = getBtnText();
  btn.appendChild(btnText)
  toggleClass('collapsed')
  el.style.height = `${height}px`;
  el.style.overflow = collapsed ? "" : "initial";
})();

/**
 * Collapse / expand element on click.
 */
btn.addEventListener("click", () => {
  toggleCollapsed(collapsed);
  showHide();
});

/**
 * Changing className of the btn.
 * 
 * @param {*} className 
 */
function toggleClass(className) {
  if(collapsed) {
    btn.classList.add(className)
  } else {
    btn.classList.remove(className)
  }
}

/**
 * Toggle collapsed value.
 * 
 * @returns collapsed
 */
function toggleCollapsed() {
  return (collapsed = !collapsed);
}

/**
 * Collapse / expand element.
 */
function showHide() {
  btnText.innerHTML = getBtnText();
  btn.classList.toggle('collapsed')

  if (collapsed) {
    slideUp();
  } else {
    slideDown();
  }
}

/**
 * Increasing height of the Collapse element.
 * 
 * @param {*} el 
 * @param {*} progress 
 */
function incrHeight(el, progress) {
  height = progress * el.scrollHeight;
  el.style.height = `${height}px`;
}

/**
 * Decrementing height of the Collapse element.
 * 
 * @param {*} el 
 * @param {*} progress 
 */
function decrHeight(el, progress) { 
  height = el.scrollHeight - progress * el.scrollHeight;
  el.style.height = `${height}px`;
  el.style.overflow = "hidden";
}

/**
 * Expanding Collapse element.
 */
function slideDown() {
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    const runtime = time - start;
    const relativeProgress = runtime / duration;
    const process = Math.min(relativeProgress, 1);
 
    if (process < 1) {
      incrHeight(el, process);
      requestAnimationFrame(animate);
    }

    if (process === 1) {
      el.style.height = "auto";
      el.style.overflow = "initial";
    }
  });
}

/**
 * Collapsing element.
 */
function slideUp() {
  const start = performance.now();
  requestAnimationFrame(function animate(time) {
    const runtime = time - start;
    const relativeProgress = runtime / duration;
    const process = Math.min(relativeProgress, 1);
    if (process < 1) {
      decrHeight(el, process);
      requestAnimationFrame(animate);
    }
    if (process === 1) {
      el.style.height = "";
      el.style.overflow = "";
    }
  });
}
