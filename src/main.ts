import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import {i18n} from "./plugins";
import {vuetify} from "./plugins";

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.use(i18n)
app.mount('#app')