import 'vue-router'

/**
 * Vue Router module augmentation.
 *
 * Extends the default `RouteMeta` interface to include a custom `breadcrumb` property,
 * which is used throughout the application to display translated breadcrumb labels.
 *
 * ### Purpose:
 * Allows routes to define a `meta.breadcrumb` key that references a translation key
 * (e.g., `'common.settings'`) for use in breadcrumb navigation components.
 *
 * ### Example:
 * ```ts
 * const routes = [
 *   {
 *     path: '/settings',
 *     name: 'settings',
 *     component: SettingsView,
 *     meta: { breadcrumb: 'common.settings' },
 *   }
 * ]
 * ```
 *
 * This enables you to access it safely in code:
 * ```ts
 * route.meta.breadcrumb // typed as string | undefined
 * ```
 *
 * @module RouteMetaAugmentation
 */
declare module 'vue-router' {
    interface RouteMeta {
        /** i18n translation key for breadcrumb display */
        breadcrumb?: string
    }
}