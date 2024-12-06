// Flexible 多分辨率适配，待优化
(function flexible(window, document) {
  const fs = 16; // unocss 1rem = 16px
  const PCW = 1920; // PC 设计稿宽度
  const PCG = PCW / fs;
  const PADW = 1200; // PC <= => H5W  中间过渡宽度
  const PADWG = PADW / fs;
  const H5W = 750; // PC -> H5 布局分割断点宽度
  const H5G = H5W / fs;
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
    let fontSize;
    if (W <= H5W) {
      fontSize = W / H5G;
    } else if (W > H5W && W < PADW) {
      fontSize = W / PADWG;
    } else {
      fontSize = W / PCG;
    }
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
