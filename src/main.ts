import "virtual:uno.css";
import { createApp } from "vue";
import App from "@/app/views/index.vue";
import { router } from "@router";
import { i18n } from "@i18n";
import "@style/index";
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#vite-vue");
