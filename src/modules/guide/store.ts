import { defineStore } from "pinia";
export const useGuideStore = defineStore("guide", {
  state: (): State => ({
    count: 0,
  }),
});

interface State {
  count: number;
}
