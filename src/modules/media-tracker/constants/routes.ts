import type {RouteRecordRaw} from 'vue-router'

/**
 * Media Tracker Routes
 *
 * Defines the route configuration for the Media Tracker module in the application.
 * Each route uses Vue Router's RouteRecordRaw structure.
 *
 * Features:
 * - Lazy-loads components for improved performance.
 * - Supports nested routes for module organization.
 * - Includes metadata for i18n and icons.
 *
 * Route structure:
 * - `path`      : The URL path for the route.
 * - `name`      : The route name used for programmatic navigation.
 * - `component` : Component to render for the route (lazy-loaded with dynamic import).
 * - `children`  : Nested routes for subpages.
 * - `meta`      : Optional metadata for the route:
 *     - `i18nKey` : Translation key for the route title, used in navigation menus.
 *     - `icon`    : Material Design Icon (MDI) name for menu display.
 *
 * Example usage:
 * ```ts
 * import { createRouter, createWebHistory } from 'vue-router'
 * import { routes as mediaTrackerRoutes } from './routes'
 *
 * const router = createRouter({
 *   history: createWebHistory(),
 *   routes: [
 *     ...mediaTrackerRoutes,
 *     // other app routes
 *   ],
 * })
 * ```
 *
 * Defined routes:
 * 1. `/media-tracker` (parent route)
 *    - `meta.i18nKey` : 'mediaTracker.mediaTracker'
 *    - `meta.icon`    : 'mdi-play-circle'
 *    - Children:
 *      a. `/media-tracker/media`
 *         - Component: MediaView.vue
 *         - `meta.i18nKey` : 'mediaTracker.media'
 *         - `meta.icon`    : 'mdi-movie-open'
 *      b. `/media-tracker/youtube`
 *         - Component: YouTubeView.vue
 *         - `meta.i18nKey` : 'mediaTracker.youTube.youTube'
 *         - `meta.icon`    : 'mdi-youtube'
 */
export const routes: RouteRecordRaw[] = [
    {
        path: '/media-tracker',
        name: 'media-tracker',
        meta: {
            i18nKey: 'mediaTracker.mediaTracker',
            icon: "mdi-play-circle",
        },
        children: [
            {
                path: 'media',
                name: 'media-tracker-media',
                component: () => import('@media-tracker/components/pages/media/MediaView.vue'),
                meta: {
                    i18nKey: 'mediaTracker.media',
                    icon: 'mdi-movie-open'
                },
            },
            {
                path: 'youtube',
                name: 'media-tracker-youtube',
                component: () => import('@media-tracker/components/pages/youtube/YouTubeView.vue'),
                meta: {
                    i18nKey: 'mediaTracker.youTube.youTube',
                    icon: 'mdi-youtube'
                },
            },
        ],
    },
] as const