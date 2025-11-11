<script setup lang="ts">
/**
 * LoadingSpinner component
 *
 * Displays a Vuetify `v-progress-circular` spinner centered both
 * vertically and horizontally in the viewport.
 *
 * Usage:
 * ```vue
 * <LoadingSpinner />
 * ```
 *
 * Features:
 * - Uses a `v-container` with CSS flexbox to center the spinner.
 * - `height: 100vh` ensures the container occupies the full viewport height,
 *   so the spinner is always vertically centered regardless of content.
 * - The spinner itself uses `v-progress-circular` with `indeterminate` mode.
 *
 * Notes:
 * - This spinner is suitable for full-page loading states.
 * - If you want it to center only within a parent container (not full viewport),
 *   consider using `height: 100%` on the container and ensuring parent heights
 *   are set appropriately.
 */
</script>

<template>
  <v-container class="spinner-container" fluid>
    <v-progress-circular
        color="primary"
        indeterminate
        size="64"
    ></v-progress-circular>
  </v-container>
</template>

<style scoped>
/* Flex container that centers its content both vertically and horizontally */
.spinner-container {
  display: flex;            /* Enables flexbox layout */
  justify-content: center;  /* Horizontal centering */
  align-items: center;      /* Vertical centering */
  height: 100vh;            /* Occupies the full viewport height */
}
</style>