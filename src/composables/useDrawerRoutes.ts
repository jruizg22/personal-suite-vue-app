import {computed} from 'vue';
import {routes as allRoutes} from '@/constants';

/**
 * Composable to get all routes to display in the Drawer.
 *
 * - Filters routes by `meta.showInDrawer !== false`.
 * - Sorts routes by `meta.order`.
 * - Keeps track of children routes for submenus.
 */
export function useDrawerRoutes() {
    const drawerRoutes = computed(() =>
        allRoutes
            .filter(r =>
                r.meta?.showInDrawer !== false &&
                r.name !== 'settings'
            )
            .sort((a, b) => (a.meta?.order ?? 0) - (b.meta?.order ?? 0))
    );

    return { drawerRoutes }
}
