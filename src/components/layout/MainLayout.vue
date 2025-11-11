<script setup lang="ts">
/**
 * Main layout wrapper component for the application content.
 *
 * This component renders:
 * - `Toolbar`: the top app bar.
 * - `Drawer`: the navigation drawer.
 * - `v-main` containing the routed page content inside a fluid container.
 *
 * Notes on layout behavior:
 * - `v-main` and its inner `v-container` are set to 100% height (`full-height`).
 *   This ensures that the container fills all the available space between the
 *   Toolbar and Drawer.
 * - The CSS on `html`, `body`, and `#app` also sets height to 100% so that the
 *   full-height styling propagates correctly through the DOM.
 * - This setup allows any child content, including loading spinners, to use
 *   flexbox centering or other height-based styling relative to the full main area.
 *
 * Example: centering a loading spinner inside the routed content:
 * ```vue
 * <v-main class="full-height">
 *   <v-container fluid class="pa-0 ma-0 full-height d-flex align-center justify-center">
 *     <v-progress-circular color="primary" indeterminate size="64"/>
 *   </v-container>
 * </v-main>
 * ```
 * This uses Vuetify flexbox utilities (`d-flex`, `align-center`, `justify-center`)
 * to center the spinner both vertically and horizontally.
 */

import {Toolbar, Drawer} from '@/components/layout'
</script>

<template>
  <!-- Toolbar at the top -->
  <Toolbar />

  <!-- Navigation drawer on the side -->
  <Drawer />

  <!-- Main content area -->
  <v-main class="full-height">
    <v-container fluid class="pa-0 ma-0 full-height">
      <router-view/>
    </v-container>
  </v-main>
</template>

<style scoped>
/* Ensures the container and main content fill the available height */
.full-height {
  height: 100%;
}
/* Ensures that the height propagates from the root of the document */
html, body, #app {
  height: 100%;
}
</style>