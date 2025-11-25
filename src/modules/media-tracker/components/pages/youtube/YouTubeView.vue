<script setup lang="ts">
/**
 * The main view component for the YouTube module inside the Media Tracker.
 *
 * This component initializes the YouTube tab system, integrates it with the
 * global sticky bar UI, and ensures the correct active tab is restored or set.
 *
 * ## Responsibilities
 * - Load the list of YouTube tabs (`YouTubeTabs`) and determine the active one.
 * - Register a sticky `TabContainer` so the tab bar remains fixed while scrolling.
 * - Synchronize the sticky bar's selected tab with the shared `useActiveTab()` composable.
 * - Clear the sticky bar and reset the tab state when unmounted.
 *
 * ## Lifecycle Behavior
 * - **onMounted:**
 *   Registers a sticky bar with `TabContainer`, passing the list of tabs and
 *   wiring `v-model` through `"onUpdate:modelValue"`.
 *
 * - **onUnmounted:**
 *   Clears the sticky bar and resets the active tab to an empty string.
 *
 * ## Template
 * The template only renders `<TabContent>`, delegating all tab rendering logic
 * to the shared component system.
 *
 * ```html
 * <TabContent :tabs="tabs" :activeTab="activeTab" />
 * ```
 *
 * ## Related Modules
 * - `YouTubeTabs` — Defines the available YouTube section tabs.
 * - `useStickyBarStore` — Controls all "sticky" elements in the UI layout.
 * - `TabContainer` — Component used to display the tab bar.
 * - `TabContent` — Renders the active tab's content.
 * - `useActiveTab` — Shared state composable for keeping track of the active tab globally.
 */

import {onMounted, onUnmounted} from 'vue'
import {YouTubeTabs as tabs} from '@media-tracker/components/pages/youtube'
import {useStickyBarStore} from '@/stores'
import {TabContainer, TabContent} from '@/components/shared'
import {useActiveTab} from '@/composables'

const sticky = useStickyBarStore()
const {activeTab, setActiveTab} = useActiveTab()

if (!activeTab.value) activeTab.value = tabs[0]!.tabId

onMounted(() => {
  void sticky.add(TabContainer, {
    tabs: tabs,
    modelValue: activeTab.value,
    "onUpdate:modelValue": (val: string) => activeTab.value = val
  }, true)
})

onUnmounted(() => {
  sticky.clear()
  setActiveTab('')
})
</script>

<template>
  <TabContent :tabs="tabs" :activeTab="activeTab"/>
</template>

<style scoped>

</style>