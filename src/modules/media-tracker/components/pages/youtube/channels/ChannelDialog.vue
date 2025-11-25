<script setup lang="ts">
/**
 * ChannelDialog.vue
 *
 * @component
 * A reusable dialog component for creating, editing, and viewing `YTChannel`
 * entities within the Media Tracker application. The component supports full
 * CRUD workflows and integrates with the global YouTube channel store.
 *
 * ## Props
 *
 * @prop {YTChannel | null} modelValue
 * The channel object being edited, created, or viewed.
 * When `null`, the dialog is considered closed.
 * A non-null value triggers the dialog to open and populates the form.
 *
 * @prop {'View' | 'Edit' | 'Create'} mode
 * Defines the behavior and UI state of the dialog:
 * - `'View'`: All inputs become read-only
 * - `'Edit'`: Allows modifying an existing channel
 * - `'Create'`: Initializes a blank channel for creation
 *
 * ## Events
 *
 * @event update:modelValue
 * Emitted when the dialog is closed or cleared.
 * Signature: `(value: YTChannel | null) => void`.
 *
 * @event saved
 * Emitted after a successful create or update operation.
 * Provides the API response returned from the store.
 * Signature: `(response: ApiResponse<YTChannel>) => void`.
 *
 * ## Internal Behavior
 *
 * - Uses a local `internalDialog` ref to control Vuetify’s `<v-dialog>` without
 *   mutating the external v-model directly.
 *
 * - When `props.modelValue` changes:
 *   - If non-null → dialog opens and the form is populated.
 *   - If null → dialog closes.
 *
 * - The form is built using standard Vuetify components (`v-text-field`,
 *   `v-textarea`, etc.).
 *
 * - Validation rules ensure that required fields (`id`, `name`) are provided.
 *
 * - The `saveChannel()` method:
 *   - Normalizes empty values using `normalizeEmptyFields`
 *   - Calls `channelStore.create()` or `channelStore.update()`
 *   - Emits `saved` with the API response
 *
 * - The dialog title is computed dynamically based on the form mode.
 *
 * - When in `'View'` mode, all fields become read-only and the Save button is hidden.
 *
 * ## Computed Properties
 *
 * @computed dialogTitle
 * Dynamically resolves the translated title depending on `mode`.
 *
 * @computed isReadonly
 * Returns `true` when the dialog is in `'View'` mode.
 *
 * @computed isFormValid
 * Validates required fields to enable or disable the Save button.
 *
 * ## Methods
 *
 * @method saveChannel
 * Persists the form data via the channel store. Emits `saved` upon success.
 *
 * @method onSubmit
 * Wrapper for `saveChannel`. Prevents saving when validation fails.
 *
 * @method cancel
 * Closes the dialog and resets `modelValue` to `null`.
 *
 * ## Usage Example
 *
 * ```vue
 * <ChannelDialog
 *   v-model="selectedChannel"
 *   :mode="formMode"
 *   @saved="handleSave"
 * />
 * ```
 *
 * ## Notes
 *
 * - Fully responsive: switches to fullscreen mode on mobile using `useIsDesktop`.
 * - Automatically converts empty strings to null for backend consistency.
 * - Integrates directly with the YouTube channel store.
 */

import {computed, ref, watch} from 'vue'
import type {YTChannel} from '@media-tracker/models'
import {useYTChannelStore} from '@media-tracker/stores'
import {useI18n} from 'vue-i18n'
import {commonKeys, mediaTrackerKeys} from '@/i18n'
import {useIsDesktop} from '@/composables'
import {normalizeEmptyFields} from '@/utils'
import type {ApiResponse, FormProps} from '@/types'

const props = defineProps<FormProps<YTChannel>>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: YTChannel | null): void
  (e: 'saved', value: ApiResponse<YTChannel>): void
}>()

const {t} = useI18n()
const channelStore = useYTChannelStore()

const internalDialog = ref(false)
const loading = ref(false)
const isDesktop = useIsDesktop()

const form = ref<YTChannel>({
  id: "",
  name: "",
  description: "",
  url: "",
  createdAt: ""
})

const idRules = [
  (v: string) => !!v || t(commonKeys.formFieldValidations.required)
]
const nameRules = [
  (v: string) => !!v || t(commonKeys.formFieldValidations.required)
]

// computed example to enable/disable save (lightweight)
const isFormValid = computed(() => {
  if (!form.value) return false
  return (
      idRules.every(r => r(form.value.id) === true) &&
      nameRules.every(r => r(form.value.name) === true)
  )
})

// Watch prop changes
watch(() => props.modelValue, (val) => {
  if (val) {
    form.value = {...val}
    internalDialog.value = true
  } else {
    internalDialog.value = false
  }
})

// Save handler
async function saveChannel() {
  if (!form.value) return
  loading.value = true

  try {
    // Convert empty strings to null
    const payload = normalizeEmptyFields(form.value)

    let response: ApiResponse<YTChannel>
    if (props.mode === 'Edit') {
      response = await channelStore.update(payload.id, payload)
    } else {
      response = await channelStore.create(payload)
    }

    emit('saved', response)
    internalDialog.value = false
  } finally {
    loading.value = false
  }
}

async function onSubmit() {
  if (!isFormValid.value) return
  await saveChannel()
}

// Cancel handler
function cancel() {
  internalDialog.value = false
  emit('update:modelValue', null)
}

// Computed for the dialog title
const dialogTitle = computed<string>(() => {
  switch (props.mode) {
    case 'View':
      return t(mediaTrackerKeys.youTube.channels.dialogs.viewDialog.title)
    case 'Create':
      return t(mediaTrackerKeys.youTube.channels.dialogs.newDialog.title)
    case 'Edit':
      return t(mediaTrackerKeys.youTube.channels.dialogs.editDialog.title)
    default:
      return 'View/Create/Edit Channel'
  }
})

// Computed to check if the dialog is readonly
const isReadonly = computed<boolean>(() => props.mode === 'View')
</script>

<template>
  <v-dialog v-model="internalDialog" width="700px" transition="dialog-bottom-transition" :fullscreen="!isDesktop" persistent>
    <v-card :title="dialogTitle">
      <v-divider />

      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-container fluid class="ma-0 pa-0">
            <v-row dense>
              <!-- URL takes two columns -->
              <v-col cols="12">
                <v-text-field
                    v-model="form.url"
                    prepend-inner-icon="mdi-link"
                    :label="t(commonKeys.url)"
                    type="url"
                    :readonly="isReadonly"
                    variant="outlined"
                />
              </v-col>

              <!-- Left column with id, name y createdAt -->
              <v-col cols="12" md="6" class="pr-3">
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                        v-model="form.id"
                        prepend-inner-icon="mdi-identifier"
                        :label="t(commonKeys.id)"
                        :rules="idRules"
                        required
                        :readonly="isReadonly"
                        variant="outlined"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                        v-model="form.name"
                        prepend-inner-icon="mdi-format-letter-case"
                        :label="t(commonKeys.name)"
                        :rules="nameRules"
                        required
                        :readonly="isReadonly"
                        variant="outlined"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                        v-model="form.createdAt"
                        prepend-inner-icon="mdi-calendar"
                        :label="t(mediaTrackerKeys.youTube.channels.createdAt)"
                        type="date"
                        :readonly="isReadonly"
                        variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-col>

              <!-- Right column with the description, taking all the height -->
              <v-col cols="12" md="6" class="pl-3">
                <v-textarea
                    v-model="form.description"
                    prepend-inner-icon="mdi-file-document"
                    :label="t(commonKeys.description)"
                    rows="8"
                    style="height: 100%"
                    :readonly="isReadonly"
                    variant="outlined"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">{{ t(commonKeys.cancel) }}</v-btn>
        <v-btn
            :loading="loading"
            type="submit"
            color="primary"
            v-if="!isReadonly"
            :disabled="!isFormValid"
            @click="onSubmit"
        >
          {{ t(commonKeys.save) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>