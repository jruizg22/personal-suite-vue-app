<script setup lang="ts">
/**
 * Main layout wrapper component for the application content.
 *
 * This component renders:
 * - `Toolbar`: the top application bar, always visible.
 * - `Drawer`: the navigation drawer (responsive).
 * - `StickyBar`: an optional sticky component (e.g., tabs, filters, search fields) that stays fixed under the toolbar.
 * - `v-main`: contains the routed page content, scrollable vertically, with height limited to the viewport minus toolbars.
 *
 * Layout Behavior:
 * - The layout uses a flex-column `v-main` with `height: 100vh` to ensure the content is limited to the visible viewport.
 * - The `StickyBar` is placed at the top of `v-main` and uses `position: sticky` under the toolbar.
 * - The `v-container` inside `v-main` fills the remaining space (`flex-grow-1`) and is scrollable (`overflow-auto`), so only the content area scrolls.
 * - The drawer offset and responsive layout are handled by the layout store (`useLayoutStore`), ensuring the sticky bar aligns correctly next to the drawer.
 * - Horizontal scroll is prevented by setting `overflow-x: hidden` on `html`, `body`, and `#app`.
 *
 * Example: layout with a loading spinner in the scrollable content area:
 * ```vue
 * <v-main class="d-flex flex-column" style="height: 100vh;">
 *   <StickyBar/>
 *   <v-container fluid class="pa-0 ma-0 flex-grow-1 overflow-auto">
 *     <v-progress-circular color="primary" indeterminate size="64"/>
 *   </v-container>
 * </v-main>
 * ```
 * - `flex-grow-1` ensures the container fills all space below `StickyBar`.
 * - `overflow-auto` makes only the content scrollable, leaving the sticky bar fixed.
 *
 * Notes:
 * - Any component assigned to `StickyBar` can include tabs, search fields, filters, or other controls.
 * - Avoid setting fixed heights on `StickyBar` if it contains multiple rows; it will grow dynamically.
 * - Ensure internal content (e.g., `v-row`, `v-col`) is responsive (`cols="12"` in mobile) to prevent unwanted horizontal scroll.
 */

import {Toolbar, Drawer, StickyBar} from '@/components/layout';
</script>

<template>
  <!-- Toolbar at the top -->
  <Toolbar />

  <!-- Navigation drawer on the side -->
  <Drawer />

  <!-- Main content area -->
  <v-main class="d-flex flex-column" style="height: 100vh;">
    <!-- Optional sticky bar (tabs, filters, search fields) -->
    <StickyBar/>
    <!-- Scrollable content area -->
    <v-container fluid class="pa-0 ma-0 full-height flex-grow-1 overflow-auto" style="height: 100vh">
      <router-view/>
    </v-container>
  </v-main>
</template>

<style scoped>
/* Ensures the container and main content fill the available height */
.full-height {
  height: 100%;
}
/* Ensures that the height propagates from the root of the document and disable horizontal scroll */
html, body, #app {
  height: 100%;
  overflow-x: hidden; /* prevent horizontal scroll */
}
</style>