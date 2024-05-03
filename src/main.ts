import '@splidejs/vue-splide/css';
import "./assets/style.css";
import "@/assets/keyframes.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/aura-dark-noir/theme.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";


const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });
app.directive("ripple", Ripple);
app.mount("#app");
