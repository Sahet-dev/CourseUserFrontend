// i18n.js
import { createI18n } from 'vue-i18n';
import en from './locale/en.json';
import tm from './locale/tm.json';

const i18n = createI18n({

    locale: localStorage.getItem('language') || 'tm',
    fallbackLocale: 'en',
    messages: { en, tm }

});

export default i18n;
