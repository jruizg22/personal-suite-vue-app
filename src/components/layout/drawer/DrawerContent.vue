<script setup lang="ts">
/**
 * DrawerContent component for the application's navigation drawer.
 *
 * This component renders the main list of navigation items using the routes
 * provided by the `useDrawerRoutes` composable.
 *
 * Features:
 * - Uses `DrawerItem` to render top-level routes.
 * - Automatically handles routes with children, rendering collapsible submenus
 *   via `DrawerItem` → `DrawerSubItem`.
 * - Scrollable list that fills the vertical space of the drawer.
 * - Route titles are automatically translated using `vue-i18n` and the
 *   `meta.i18nKey` property from each route.
 * - Icons are displayed using the `meta.icon` property for each route.
 *
 * Example usage:
 * ```vue
 * <v-navigation-drawer app>
 *   <DrawerContent />
 * </v-navigation-drawer>
 * ```
 *
 * Notes:
 * - Only routes with `meta.showInDrawer !== false` are included.
 * - The drawer supports an arbitrary number of nested routes via `children`.
 * - The last route, typically "Settings", can be rendered separately in a
 *   footer if desired.
 */

import {useDrawerRoutes} from '@/composables';
import {DrawerItem} from '@/components/layout';

const {drawerRoutes} = useDrawerRoutes();
</script>

<template>
  <v-list density="comfortable" class="pa-0" style="flex: 1 1 auto; overflow-y: auto;">
    <DrawerItem
        v-for="route in drawerRoutes"
        :key="route.path"
        :route="route"
    />
  </v-list>
</template>

<style scoped>

</style>