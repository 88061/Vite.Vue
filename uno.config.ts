import { defineConfig, presetUno, transformerVariantGroup } from "unocss";
export default defineConfig({
  theme: {
    colors: {
      primary: "var(--primary-color)",
    },
    breakpoints: /** default (min-width: 639.9px), if you want max -> lt-sm */ {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
  presets: [
    presetUno() /** ml-2 -> margin-left:0.5rem ml--4 -> margin-left:-1rem # 1 = 4px = 0.25rem # 1rem = 16px */,
  ],
  transformers: [
    transformerVariantGroup() /** hover:(bg-gray-400 font-medium) font-(light mono) */,
  ],
  content: {
    pipeline: {
      include: [/\.([jt]s?|vue)($|\?)/],
    },
  },
});
