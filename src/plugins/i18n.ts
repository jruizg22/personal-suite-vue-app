import {createI18n} from 'vue-i18n'
import {messages} from "@/locales";

export const i18n = createI18n({
    legacy: false,
    locale: 'es_ES',
    fallbackLocale: 'en_US',
    messages,
})