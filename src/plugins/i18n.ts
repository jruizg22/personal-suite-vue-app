import {createI18n} from 'vue-i18n'
import {datetimeFormats, messages} from '@/i18n'

/**
 * Vue I18n instance for the application.
 *
 * This instance is configured with:
 * - `legacy: false` to enable Composition API (`useI18n`) usage.
 * - `locale`: the default locale of the app (`es-ES`).
 * - `fallbackLocale`: the locale used if a translation is missing (`en-US`).
 * - `messages`: the translation messages imported from `i18n/index.ts`.
 * - `datetimeFormats`: the datetime formats imported from `i18n/index.ts`.
 *
 * Usage in components with Composition API:
 * ```ts
 * import { useI18n } from 'vue-i18n'
 * const { t } = useI18n()
 * console.log(t('common.start')) // Translated string
 * ```
 */
export const i18n = createI18n({
    legacy: false,
    locale: 'es-ES',
    fallbackLocale: 'en-US',
    messages,
    datetimeFormats
})