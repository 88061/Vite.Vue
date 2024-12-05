import { setClassList } from "@hooks";

/**
 * @根据系统进行主题切换
 * @key color-scheme auto | light | dark
 */
(() => {
  const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
  themeMedia.onchange = (e) => {
    const scheme = localStorage.getItem("color-scheme");
    if (scheme === "auto") {
      if (e.matches) {
        setClassList("light");
      } else {
        setClassList("dark");
      }
    }
  };
  const scheme = localStorage.getItem("color-scheme");

  if (scheme && scheme !== "auto") {
    setClassList(scheme);
  } else {
    localStorage.setItem("color-scheme", "auto");
    if (themeMedia.matches) {
      setClassList("light");
    } else {
      setClassList("dark");
    }
  }
})();
