<script setup lang="ts">
/**
 * DrawerItem component for rendering a top-level route in the navigation drawer.
 *
 * This component handles both:
 * - Routes with children → renders a `v-list-group` containing `DrawerSubItem`s.
 * - Routes without children → renders a single `v-list-item`.
 *
 * Props:
 * - `route: RouteRecordRaw` – The Vue Router route object to render.
 *
 * Features:
 * - Uses `v-list-group` from Vuetify to handle collapsible submenus.
 * - Displays the icon specified in `route.meta.icon` (if any) for both parent and children.
 * - Translates the title using the `i18nKey` in `route.meta`.
 * - Automatically renders child routes as `DrawerSubItem`s if `route.children` exists.
 *
 * Example usage:
 * ```vue
 * <v-list>
 *   <DrawerItem v-for="route in drawerRoutes" :key="route.path" :route="route" />
 * </v-list>
 * ```
 *
 * Notes:
 * - If `route.children` is empty or undefined, it behaves as a normal clickable item.
 * - Child items are rendered using `DrawerSubItem` and inherit the parent path for nested navigation.
 */

import type {RouteRecordRaw} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {DrawerSubItem} from '@/components/layout';

const props = defineProps<{
  route: RouteRecordRaw
}>();

const {t} = useI18n();
</script>

<template>
  <!-- Group with subitems -->
  <v-list-group v-if="route.children?.length" no-action>
    <template #activator="{ props: activatorProps }">
      <v-list-item
          v-bind="activatorProps"
          :prepend-icon="route.meta?.icon"
          :title="t(route.meta?.i18nKey ?? String(route.name) ?? '')"
      />
    </template>

    <DrawerSubItem
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :parent-path="route.path"
    />
  </v-list-group>

  <!-- Simple item -->
  <v-list-item
      v-else
      :title="t(route.meta?.i18nKey ?? String(route.name) ?? '')"
      :to="route.path"
      :prepend-icon="route.meta?.icon"
  />
</template>