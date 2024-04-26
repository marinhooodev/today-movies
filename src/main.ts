import './assets/style.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-dark-green/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.mount('#app')
