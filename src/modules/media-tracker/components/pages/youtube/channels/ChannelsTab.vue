/**
* @file ChannelsTab.vue
* @description
* View component responsible for displaying and managing YouTube channels
* within the Media Tracker application.
*
* This tab provides:
* - A search bar for filtering channels
* - A virtual data table with columns for name, description, URL, and creation date
* - Actions for viewing, editing, deleting, and creating channels
* - Integration with ChannelDialog for form-based CRUD operations
*
* The component uses Vuetify's VDataTableVirtual for performance, especially
* useful when handling large datasets.
*
* Additional Notes:
* - The list of channels is fetched immediately on component initialization.
* - Dialog mode (View / Edit / Create) is controlled through `formMode`.
* - Clicking on a row action dynamically updates `selectedChannel` and opens the dialog.
*/

<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useYTChannelStore} from '@media-tracker/stores'
import {commonKeys, mediaTrackerKeys} from '@/i18n'
import type {YTChannel} from '@media-tracker/models'
import type {DataTableHeader} from 'vuetify'
import {ActionsColumn, DateColumn, TextColumn, UrlColumn} from '@/components/shared/tables/columns'
import '@/styles/tables.css'
import {ChannelDialog} from '@media-tracker/components/pages/youtube/channels'
import type {ApiResponse, FormMode} from '@/types'
import {ApiSuccessStatusCodes} from '@/constants'
import {ConfirmDialog, SnackbarGeneral} from '@/components/shared'

/**
 * Store initialization.
 * Immediately loads all channels when the tab is rendered.
 */
const channelsStore = useYTChannelStore()
channelsStore.getAll()

/**
 * Search input bound to the data table search.
 */
const search = ref<string>('')

/**
 * Internationalization helper.
 */
const {t} = useI18n()

/**
 * Table header metadata for the channels table.
 * This is a static list, but the localized labels are generated dynamically.
 *
 * Additional column notes:
 * - Description and URL columns have width limits to prevent layout overflow.
 * - Actions column is fixed to the right side and non-sortable.
 */
const tableHeaders: DataTableHeader[] = [
  { title: t(commonKeys.name), key: 'name' },
  { title: t(commonKeys.description), key: 'description', maxWidth: '250px', sortable: false },
  { title: t(commonKeys.url), key: 'url', maxWidth: '250px', sortable: false },
  { title: t(mediaTrackerKeys.youTube.channels.createdAt), key: 'createdAt', minWidth: '210px' },
  { title: t(commonKeys.actions), key: 'actions', align: 'center', fixed: 'end', sortable: false },
]

/**
 * Currently selected channel for dialog interactions.
 * When selecting a row or creating a new channel, this value updates,
 * which triggers ChannelDialog to open.
 */
const selectedChannel = ref<YTChannel | null>(null)

/**
 * Current form mode controlling ChannelDialog behavior:
 * 'View' | 'Edit' | 'Create'
 */
const formMode = ref<FormMode>('View')

const showSnackbar = ref<boolean>(false)
const snackbarMessage = ref<string>('')
const snackbarColor = ref<string>('success')

/**
 * Dialog controls and props
 */
const showConfirm = ref<boolean>(false)
const confirmDialogMessage = ref<string>('')
const channelPendingDeletion = ref<YTChannel | null>(null)

/**
 * Opens dialog to view channel details.
 *
 * @param channel - The channel to display
 */
function onView(channel: YTChannel): void {
  selectedChannel.value = channel
  formMode.value = 'View'
}

/**
 * Initializes a new channel object for channel creation mode.
 * Default date uses ISO 8601, matching backend expectations.
 */
function onCreate(): void {
  selectedChannel.value = {
    id: '',
    name: '',
    description: '',
    url: '',
    createdAt: new Date().toISOString()
  }
  formMode.value = 'Create'
}

/**
 * Opens dialog for editing an existing channel.
 *
 * @param channel - The channel to edit
 */
function onEdit(channel: YTChannel): void {
  selectedChannel.value = channel
  formMode.value = 'Edit'
}

/**
 * Callback triggered after saving a channel.
 * This implementation logs to console but can easily be
 * expanded to show notifications or refresh data.
 *
 * @param response - The channel returned from the save operation
 */
function onSaved(response: ApiResponse<YTChannel>): void {
  if (formMode.value === 'Create') {
    if (response.status === ApiSuccessStatusCodes.CREATED) {
      snackbarMessage.value = t(mediaTrackerKeys.youTube.channels.feedback.new)
      showSnackbar.value = true
    } else {
      console.log('Error creating channel, code: ', response.status)
    }
  } else {
    if (response.status === ApiSuccessStatusCodes.SUCCESS) {
      snackbarMessage.value = t(mediaTrackerKeys.youTube.channels.feedback.edit)
      showSnackbar.value = true
    } else {
      console.log('Error editing channel, code: ', response.status)
    }
  }
}

/**
 * Calls the confirm dialog to ask the user if they really want to delete it.
 *
 * @param channel - Channel to delete
 */
function onDelete(channel: YTChannel): void {
  channelPendingDeletion.value = channel
  confirmDialogMessage.value = t(mediaTrackerKeys.youTube.channels.dialogs.deleteDialog.message, {channel: channel.name})
  showConfirm.value = true
}

/**
 * Function to actually make the DELETE request to the backend.
 */
async function deleteChannel() {
  if (!channelPendingDeletion.value) return

  let response = await channelsStore.remove(channelPendingDeletion.value.id)

  if (response.status === ApiSuccessStatusCodes.DELETED) {
    snackbarMessage.value = t(mediaTrackerKeys.youTube.channels.feedback.delete)
    showSnackbar.value = true
  } else {
    console.log('Error deleting channel, code: ', response.status)
  }

  // close dialog
  showConfirm.value = false

  // clean state
  channelPendingDeletion.value = null
  confirmDialogMessage.value = ''
}
</script>

<template>
  <v-card flat class="table-card">
    <v-card-title class="pa-0 d-flex align-center justify-space-between">
      <!-- Search Field -->
      <v-text-field
          v-model="search"
          :label="t(commonKeys.search)"
          clearable
          hide-details
          dense
      />

      <v-divider vertical class="me-1"/>

      <!-- "New" button -->
      <v-btn color="primary" @click="onCreate" icon="mdi-plus" v-tooltip:bottom="t(commonKeys.new)" class="mr-1"/>
    </v-card-title>

    <v-divider />

    <!-- Virtual table -->
    <v-data-table-virtual
        :headers="tableHeaders"
        :items="channelsStore.channels"
        :search="search"
        fixed-header
        hover
        mobile-breakpoint="md"
        class="overflow-auto"
    >
      <!-- Name -->
      <template #item.name="{ item }">
        <TextColumn :value="item.name"/>
      </template>

      <!-- Description -->
      <template #item.description="{ item }">
        <TextColumn v-if="item.description" :value="item.description" />
      </template>

      <!-- URL -->
      <template #item.url="{ item }">
        <UrlColumn v-if="item.url" :url="item.url" />
      </template>

      <!-- Creation date -->
      <template #item.createdAt="{ item }">
        <DateColumn v-if="item.createdAt" :date="item.createdAt" :date-type="'long'" />
      </template>

      <!-- Sticky actions -->
      <template #item.actions="{ item }">
        <ActionsColumn
            :item="item"
            :on-view="onView"
            :on-edit="onEdit"
            :on-delete="onDelete"
        />
      </template>
    </v-data-table-virtual>
  </v-card>
  <ChannelDialog
      v-model="selectedChannel!"
      :mode="formMode"
      dialog-title="View / Edit Channel"
      @saved="onSaved"
  />
  <ConfirmDialog
      v-model="showConfirm"
      :title="t(mediaTrackerKeys.youTube.channels.dialogs.deleteDialog.title)"
      :message="confirmDialogMessage"
      :confirm-button="{color: 'error'}"
      @confirm="deleteChannel"
  />
  <SnackbarGeneral
      v-model="showSnackbar"
      :label="snackbarMessage"
      :color="snackbarColor"
  />
</template>

<style scoped>

</style>