<script setup lang="ts">
/**
 * DrawerSubItem component for rendering a single child route in a navigation drawer.
 *
 * This component is intended to be used inside a `v-list-group` as part of a
 * nested menu. It displays the route's title (translated using `vue-i18n`) and
 * an optional icon. Clicking the item navigates to the route.
 *
 * Props:
 * - `route: RouteRecordRaw` – The Vue Router route object to render.
 * - `parentPath?: string` – Optional path of the parent route, used to construct
 *   the full path for nested routes.
 *
 * Features:
 * - Uses `v-list-item` from Vuetify.
 * - Displays the icon specified in `route.meta.icon` (if any).
 * - Translates the title using the `i18nKey` in `route.meta`.
 * - Automatically prepends `parentPath` to the route path if provided.
 *
 * Example usage:
 * ```vue
 * <v-list-group>
 *   <template #activator="{ props }">
 *     <v-list-item v-bind="props" title="Parent Menu" prepend-icon="mdi-folder" />
 *   </template>
 *   <DrawerSubItem
 *     v-for="child in parentRoute.children"
 *     :key="child.path"
 *     :route="child"
 *     :parent-path="parentRoute.path"
 *   />
 * </v-list-group>
 * ```
 */

import type {RouteRecordRaw} from 'vue-router';
import {useI18n} from 'vue-i18n';

const props = defineProps<{
  route: RouteRecordRaw
  parentPath?: string
}>();

const {t} = useI18n();
</script>

<template>
  <v-list-item
      :title="t(route.meta?.i18nKey ?? String(route.name) ?? '')"
      :to="parentPath ? `${parentPath}/${route.path}` : route.path"
      class="pl-8"
      :prepend-icon="route.meta?.icon"
  />
</template>