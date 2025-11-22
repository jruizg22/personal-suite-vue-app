/**
 * i18n messages object for the application.
 *
 * This file imports the common translation JSON files for each locale
 * and organizes them under locale codes.
 *
 * Structure:
 * - Each locale key (e.g., 'en-US', 'es-ES') contains several namespaces:
 *    - `$vuetify`: internal Vuetify translations (can include overrides)
 *    - `common`: general application UI strings
 *    - `mediaTracker`: module-specific translations for Media Tracker
 *
 * Note on Vuetify:
 * - To override internal Vuetify text (e.g., "Sort by" in tables),
 *   redefine the corresponding section in `$vuetify` using the official structure.
 *   Example in Spanish:
 *   ```
 *   $vuetify: {
 *     ...es,
 *     dataTable: {
 *       sortBy: commonEsEs.sorting.sort_by,
 *       ariaLabel: {
 *         sortDescending: commonEsEs.sorting.sort_descending,
 *         sortAscending: commonEsEs.sorting.sort_ascending
 *       }
 *     }
 *   }
 *   ```
 *
 * Typical usage with vue-i18n:
 * ```ts
 * import { createI18n } from 'vue-i18n'
 * import { messages, datetimeFormats } from './i18n'
 *
 * const i18n = createI18n({
 *   legacy: false,
 *   locale: 'en-US',
 *   fallbackLocale: 'es-ES',
 *   messages,
 *   datetimeFormats
 * })
 * ```
 *
 * Example usage inside a component:
 * ```ts
 * import { useI18n } from 'vue-i18n'
 * const { t, d } = useI18n()
 *
 * console.log(t('common.start')) // "Start"
 * console.log(t('common.sorting.sort_by')) // "Sort by"
 * d(new Date(), 'long') // formats date according to current locale
 * ```
 *
 * datetimeFormats:
 * - Defines date/time formats for each locale.
 * - Available formats: 'short', 'medium', 'long', 'full'
 */

import commonEnUs from './locales/en_US.json'
import commonEsEs from './locales/es_ES.json'

import mediaTrackerEnUs from '@media-tracker/i18n/locales/en_US.json'
import mediaTrackerEsEs from '@media-tracker/i18n/locales/es_ES.json'
import {en, es} from 'vuetify/locale'

/**
 * i18n messages object for the application.
 *
 * Contains the translations for all supported i18n, organized by namespace.
 *
 * @example
 * import { messages } from './i18n'
 * console.log(messages.en_US.common.start) // "Start"
 */
export const messages = {
    /** English (United States) translations */
    'en-US': {
        $vuetify: en,
        /** Common namespace containing general UI strings */
        common: commonEnUs,
        /** Media Tracker namespace */
        mediaTracker: mediaTrackerEnUs,
    },
    /** Spanish (Spain) translations */
    'es-ES': {
        $vuetify: {
            ...es,
            // Override internal Vuetify texts, e.g., "Sort by" in tables
            dataTable: {
                sortBy: commonEsEs.sorting.sort_by,
                ariaLabel: {
                    sortDescending: commonEsEs.sorting.sort_descending,
                    sortAscending: commonEsEs.sorting.sort_ascending
                }
            }
        },
        /** Common namespace containing general UI strings */
        common: commonEsEs,
        /** Media Tracker namespace */
        mediaTracker: mediaTrackerEsEs,
    },
} as const


/**
 * datetimeFormats:
 * Defines date and time formats for each locale.
 * Used with vue-i18n for consistent date formatting.
 */
export const datetimeFormats = {
    'en-US': {
        short: {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        },
        medium: {
            year: "numeric",
            month: "short",
            day: "2-digit"
        },
        long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },
        full: {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    },
    'es-ES': {
        short: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        },
        medium: {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        },
        long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    }
} as const

// Export typed keys for use in code
export {commonKeys} from './i18nKeys.ts'
export {mediaTrackerKeys} from '@media-tracker/i18n'