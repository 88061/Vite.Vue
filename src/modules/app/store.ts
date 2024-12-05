import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: (): State => ({
    count: 0,
  }),
});

interface State {
  count: number;
}
