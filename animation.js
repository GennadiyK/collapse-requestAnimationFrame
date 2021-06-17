const duration = 200;
let isCollapsed = true;

const el = document.querySelector(".collapse");
const btn = document.querySelector(".btn-collapse");

const btnTextEl = document.createElement("span");
const getBtnText = (с) => (с ? "collapsed" : "expanded");

btnTextEl.innerHTML = getBtnText(isCollapsed);
btn.appendChild(btnTextEl);
toggleClass(btn, "collapsed", isCollapsed);

/**
 * Collapse / expand element on click.
 */
btn.addEventListener("click", (e) => {
  e.preventDefault();
  isCollapsed = toggleCollapsed(isCollapsed);
  btnTextEl.innerHTML = getBtnText(isCollapsed);

  toggleClass(e.target, "collapsed", isCollapsed);
  showHide(e.target, isCollapsed);
});

/**
 * Changing className of the btn.
 * @param {*} element
 * @param {*} className
 * @param {*} с
 */
function toggleClass(element, className, с) {
  if (с) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

/**
 * Toggle collapsed value.
 * @param {*} v
 * @returns
 */
function toggleCollapsed(v) {
  let val = v;
  return (() => (val = !val))();
}

/**
 * Collapse / expand element.
 * @param {*} element
 */
function showHide(element, c) {
  toggleClass(element, "collapsed", c);

  if (c) {
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
function incrementHeight(el, progress) {
  el.style.height = `${progress * el.scrollHeight}px`;
}

/**
 * Decrementing height of the Collapse element.
 *
 * @param {*} el
 * @param {*} progress
 */
function decrementHeight(el, progress) {
  el.style.height = `${el.scrollHeight - progress * el.scrollHeight}px`;
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
      incrementHeight(el, process);
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
      decrementHeight(el, process);
      requestAnimationFrame(animate);
    }
    if (process === 1) {
      el.style.height = "";
      el.style.overflow = "";
    }
  });
}
