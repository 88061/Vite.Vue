/**
 * @useThemes
 * @README 可以获取当前主题模式，切换主题模式, 需要配合 CSS3 Var, 参考 @style/variable
 * @Redevelopment 集成 UI库, 改变主题时，尽可能保持 UI 的 CSS 变量 与 @style/variable 同步，否则可能会样式错乱
 */
const data = {
  value: "",
};

export const setClassList = (
  classs: "dark" | "light" | string,
  local = false,
) => {
  data.value = classs;
  if (local) localStorage.setItem("color-scheme", classs);
  document.documentElement.classList.add(classs);

  if (classs === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.remove("light");
  }
};

export const useThemes = () => ({
  get value(): string {
    return data.value;
  },
  enable: () => {
    setClassList("dark", true);
    data.value = "dark";
  },
  disable: () => {
    setClassList("light", true);
    data.value = "light";
  },
  toggle: () => {
    setClassList(data.value === "light" ? "dark" : "light", true);
  },
});
