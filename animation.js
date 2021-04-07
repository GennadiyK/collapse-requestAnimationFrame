const duration = 200;
let collapsed = true;
let height = null;

const el = document.querySelector(".collapse");
const btn = document.querySelector(".btn-collapse");
const btnText = document.createElement('span')

const getBtnText = () => (collapsed ? "collapsed" : "expanded");

(function init() {
  height = collapsed ? 0 : el.scrollHeight;
  btnText.innerHTML = getBtnText();
  btn.appendChild(btnText)
  toggleClass('collapsed')
  el.style.height = `${height}px`;
  el.style.overflow = collapsed ? "" : "initial";
})();

btn.addEventListener("click", () => {
  toggleCollapsed(collapsed);
  showHide();
});

function toggleClass(className) {
  if(collapsed) {
    btn.classList.add(className)
  } else {
    btn.classList.remove(className)
  }
}

function toggleCollapsed() {
  return (collapsed = !collapsed);
}

function showHide() {
  btnText.innerHTML = getBtnText();
  btn.classList.toggle('collapsed')

  if (collapsed) {
    slideUp();
  } else {
    slideDown();
  }
}

function incrHeigh(el, progress) {
  height = progress * el.scrollHeight;
  el.style.height = `${height}px`;
}

function decrHeight(el, progress) { 
  height = el.scrollHeight - progress * el.scrollHeight;
  el.style.height = `${height}px`;
  el.style.overflow = "hidden";
}

function slideDown() {
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    const runtime = time - start;
    const relativeProgress = runtime / duration;
    const process = Math.min(relativeProgress, 1);
 
    if (process < 1) {
      incrHeigh(el, process);
      requestAnimationFrame(animate);
    }

    if (process === 1) {
      el.style.height = "auto";
      el.style.overflow = "initial";
    }
  });
}

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
