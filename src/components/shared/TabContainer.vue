<script setup lang="ts">
/**
 * `TabContainer` component
 *
 * A reusable tabs container based on Vuetify (`v-tabs` and `v-tabs-window-item`).
 * This component allows dynamic tabs creation and displays their content via named slots.
 *
 * ### Features:
 * - Dynamically renders tabs from a `tabs` array.
 * - Supports `v-model` for the active tab.
 * - Configurable tab alignment (`top` or `bottom`) and layout type (`normal`, `fixed`, `grow`).
 * - Uses i18n for tab labels.
 * - Content for each tab is rendered via named slots matching `tabId`.
 *
 * @props
 * @prop {Tab[]} tabs - Array of tabs to display. Each `Tab` should have at least:
 *   - `tabId: string`
 *   - `label: string`
 *   - Optional: `icon: string`
 * @prop {string} [modelValue] - The active tab's `tabId`. Defaults to the first tab if not provided.
 * @prop {'top' | 'bottom'} [position='top'] - Position of the tabs within the container.
 * @prop {'normal' | 'fixed' | 'grow'} [type='normal'] - Type of tabs:
 *   - `'normal'`: default Vuetify behavior
 *   - `'fixed'`: fixed width for each tab
 *   - `'grow'`: tabs expand to fill container width
 *
 * @emits
 * @emit {string} update:modelValue - Emitted when the active tab changes.
 *
 * @slots
 * @slot {tabId} - Named slots to render the content of each tab. The slot name must match `item.tabId`.
 *
 * @example
 * ```vue
 * <TabContainer v-model="currentTab" :tabs="tabs" type="grow">
 *   <template #channels>
 *     <p>Channels content goes here</p>
 *   </template>
 *
 *   <template #videos>
 *     <p>Videos content goes here</p>
 *   </template>
 * </TabContainer>
 * ```
 *
 * @remarks
 * - The active tab is synchronized with `v-model`.
 * - `v-tabs` is wrapped in a `v-sheet` with elevation `1` for a subtle card-like appearance.
 * - Make sure the named slots match exactly the `tabId` values.
 */

import {ref, watch} from 'vue'
import type {Tab} from '@/types'
import {useI18n} from 'vue-i18n'

const props = defineProps<{
  tabs: Tab[]
  modelValue?: string
  position?: 'top' | 'bottom'
  type?: 'normal' | 'fixed' | 'grow'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const activeTab = ref(props.modelValue || props.tabs[0]?.tabId || '')
watch(activeTab, val => emit('update:modelValue', val))
watch(() => props.modelValue, val => { if (val) activeTab.value = val })

const {t} = useI18n()
</script>

<template>
  <v-sheet elevation="1" class="tab-container">
    <v-tabs
        v-model="activeTab"
        :items="tabs"
        :align-tabs="position === 'top' ? 'start' : 'end'"
        :fixed-tabs="type === 'fixed'"
        :grow="type === 'grow'"
        position="top"
        class="w-100"
        color="primary"
    >
      <!-- Render each tab -->
      <template #tab="{ item }">
        <v-tab :prepend-icon="item.icon" :text="t(item.label)" :value="item.tabId" />
      </template>

      <!-- Render each tab content -->
      <template #item="{ item }">
        <v-tabs-window-item :value="item.tabId" class="tab-content">
          <slot :name="item.tabId" />
        </v-tabs-window-item>
      </template>
    </v-tabs>
  </v-sheet>
</template>

<style scoped>

</style>