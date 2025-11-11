import 'vue-router';
import type {MdiIcon} from '@/types';

/**
 * Vue Router module augmentation.
 *
 * Extends the default `RouteMeta` interface to include additional properties
 * used throughout the application for navigation and display purposes.
 *
 * ### Properties:
 * - `i18nKey` – Optional string key for translations (via `vue-i18n`) to display
 *   route titles or breadcrumbs.
 * - `icon` – Optional `MdiIcon` representing a Material Design Icon associated
 *   with the route (used in navigation drawers or menus).
 * - `showInDrawer` – Optional boolean indicating if the route should be visible
 *   in the navigation drawer (default `true` if undefined).
 * - `order` – Optional number indicating the display order of the route in lists
 *   or menus.
 *
 * ### Purpose:
 * Allows routes to provide metadata for:
 * - Breadcrumb generation
 * - Drawer or menu display with icons
 * - Ordering and visibility control
 *
 * ### Example usage:
 * ```ts
 * import type { RouteRecordRaw } from 'vue-router'
 *
 * const routes: RouteRecordRaw[] = [
 *   {
 *     path: '/settings',
 *     name: 'settings',
 *     component: SettingsView,
 *     meta: {
 *       i18nKey: 'common.settings',
 *       icon: 'mdi-cog' as MdiIcon,
 *       showInDrawer: true,
 *       order: 2
 *     }
 *   }
 * ]
 * ```
 *
 * This ensures type safety and IDE autocompletion for route metadata.
 *
 * @module RouteMetaAugmentation
 */
declare module 'vue-router' {
    interface RouteMeta {
        /** i18n translation key */
        i18nKey?: string;
        /** Material Design Icon associated with the route */
        icon?: MdiIcon;
        /** Whether the route should be shown in the navigation drawer */
        showInDrawer?: boolean;
        /** Optional ordering number for display in menus or lists */
        order?: number;
    }
}