// Flexible 多分辨率适配，待优化
(function flexible(window, document) {
  const fs = 16; // unocss 1rem = 16px
  const DesignWidth = 750; // 设计稿宽度
  const Grid = DesignWidth / fs;
  const DOM = document.documentElement;
  const BODY = document.body;

  // adjust body font size
  function setBodyFontSize() {
    if (BODY) {
      BODY.style.fontSize = fs + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / copies
  function setRemUnit() {
    const W = DOM.clientWidth;
    const fontSize = W / Grid;
    BODY.style.fontSize = fontSize + "px";
    DOM.style.fontSize = fontSize + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });
})(window, document);
