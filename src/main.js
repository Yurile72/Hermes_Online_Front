// Components
import App from "./App.vue";
import store from "@/store";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);
app.use(store);
app.mount("#app");
