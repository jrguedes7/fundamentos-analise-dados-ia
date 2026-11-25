/* Motion Retro-Tech: typewriter respeitando reduced-motion. */
(function () {
  'use strict';
  let timer = null;
  function stop() {
    if (timer !== null) {
      cancelAnimationFrame(timer);
      timer = null;
    }
  }
  function typewriter(el, text) {
    stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }
    const node = document.createTextNode('');
    const cursor = document.createElement('span');
    cursor.className = 'blinking-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    el.replaceChildren(node, cursor);
    let start;
    function frame(now) {
      start ??= now;
      const visible = Math.min(text.length, 1 + Math.floor((now - start) / 8));
      node.data = text.slice(0, visible);
      timer = visible < text.length ? requestAnimationFrame(frame) : null;
      if (timer === null) cursor.remove();
    }
    timer = requestAnimationFrame(frame);
  }
  window.CourseAnimation = { stop, typewriter };
})();
