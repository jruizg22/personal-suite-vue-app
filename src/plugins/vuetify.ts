/**
 * Vuetify instance configuration for the application.
 *
 * This file sets up the Vuetify plugin with:
 * 1. Icon sets (Material Design Icons)
 * 2. Locale support integrated with vue-i18n
 * 3. Fallback locale for translations
 *
 * Key points:
 * - `icons`: sets the default icon set and aliases for Vuetify components.
 * - `locale`: synchronizes Vuetify's internal locale with the vue-i18n instance.
 *   Custom messages are passed from `i18n.global.messages.value`.
 *
 * Usage:
 * ```ts
 * import { vuetify } from '@/plugins/vuetify'
 * import { createApp } from 'vue'
 * import App from '@/App.vue'
 *
 * const app = createApp(App)
 * app.use(vuetify)
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * Notes:
 * - `locale`: sets the current language for Vuetify components.
 *   Typically bound to `i18n.global.locale.value` to keep both libraries in sync.
 * - `fallback`: defines the default locale Vuetify will use if a translation is missing.
 * - `messages`: contains the Vuetify-specific translations extracted from your i18n messages.
 */

import {createVuetify} from "vuetify/framework";
import {aliases, mdi} from "vuetify/iconsets/mdi";
import 'vuetify/styles/main.css';
import '@mdi/font/css/materialdesignicons.css';
import {i18n} from '@/plugins/i18n.ts'

// Extract Vuetify messages from the vue-i18n instance
const vuetifyMessages = {
    'en-US': i18n.global.messages.value['en-US'].$vuetify,
    'es-ES': i18n.global.messages.value['es-ES'].$vuetify,
}

/**
 * Vuetify instance
 *
 * Configures:
 * - Icons (default to Material Design Icons)
 * - Locale (current language + fallback)
 * - Custom Vuetify messages extracted from vue-i18n
 */
export const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi', // Default icon set used by Vuetify components
        aliases,           // Custom aliases for icons
        sets: { mdi },     // Icon sets available
    },
    locale: {
        locale: i18n.global.locale.value, // Current active locale
        fallback: 'en-US',                // Fallback locale if a translation is missing
        messages: vuetifyMessages         // Vuetify-specific translations
    },
})