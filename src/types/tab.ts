import type {MdiIcon} from '@/types';

/**
 * Interface representing a single tab in a Tabs component.
 *
 * Each tab has a unique identifier, a label (as an i18n key), and an optional icon.
 *
 * ### Properties
 * @property {string} tabId - Unique identifier for the tab. Used as the `v-model` value and `key` in lists.
 * @property {string} label - i18n key for the tab label. The Tabs component will translate this using `vue-i18n`.
 * @property {MdiIcon} [icon] - Optional icon to display before the tab label. Must be one of the allowed Material Design Icons (`MdiIcon` type).
 *
 * ### Example
 * ```ts
 * const tabs: Tab[] = [
 *   { tabId: 'media', label: 'mediaTracker.media', icon: 'mdi-movie' },
 *   { tabId: 'youtube', label: 'mediaTracker.youtube', icon: 'mdi-youtube' }
 * ];
 * ```
 */
export interface Tab {
    /** Unique identifier for the tab. Used as the `v-model` value and `key` in lists. */
    tabId: string;
    /** i18n key for the tab label. The Tabs component will translate this using `vue-i18n`. */
    label: string;
    /** Optional icon to display before the tab label. Must be one of the allowed Material Design Icons (`MdiIcon` type). */
    icon?: MdiIcon;
}