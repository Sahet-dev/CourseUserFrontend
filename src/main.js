import { createApp } from 'vue'
import './mainstyle.css'
import router from './router';
import App from './App.vue'
// Supports weights 100-900
import '@fontsource-variable/inter';
import EN from './locale/en.json';
import TM from './locale/tm.json';
import {createI18n} from "vue-i18n";

const preferredLocale = localStorage.getItem('preferredLocale') || 'EN';
const i18n = createI18n({
    locale: 'EN',
    messages: {
        EN: EN,
        TM: TM,
    }
});


createApp(App)
    .use(i18n)
    .use(router)
    .mount('#app')
