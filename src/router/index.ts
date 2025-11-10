import {createRouter, createWebHistory, type Router} from 'vue-router'
import {HomeView, SettingsView} from '@/components/pages'

/**
 * Vue Router instance for the application.
 *
 * This router is configured with:
 * - `createWebHistory`: uses HTML5 history mode for clean URLs.
 * - `routes`: defines the main routes of the application.
 *
 * Each route includes:
 * - `path`: the URL path.
 * - `name`: the unique route name.
 * - `component`: the Vue component to render.
 * - `meta.breadcrumb`: the i18n key for the breadcrumb label.
 *   This allows breadcrumbs to be dynamically translated using `vue-i18n`.
 *
 * Example usage with Vue application:
 * ```ts
 * import { createApp } from 'vue'
 * import App from '@/App.vue'
 * import router from '@/router'
 *
 * const app = createApp(App)
 * app.use(router)
 * app.mount('#app')
 * ```
 *
 * Integration with breadcrumbs and i18n:
 * - Use a composable (e.g., `useBreadcrumbs`) to read `route.matched` and
 *   translate `meta.breadcrumb` keys via `useI18n()`.
 * - This enables dynamic, translated breadcrumbs in the Toolbar.
 */
const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {breadcrumb: 'common.start'}
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: {breadcrumb: 'common.settings'}
        }
    ],
})

export default router