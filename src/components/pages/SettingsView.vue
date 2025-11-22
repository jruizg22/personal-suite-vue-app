<script setup lang="ts">
import {ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useLocale} from 'vuetify'

const {t, locale} = useI18n({useScope: 'global'})
const {current} = useLocale()

const languages = [
  { label: 'Español (España)', value: 'es-ES' },
  { label: 'English (United States)', value: 'en-US' },
]

const selected = ref(locale.value)

watch(selected, (newLocale) => {
  locale.value = newLocale
  current.value = newLocale
  localStorage.setItem('app-locale', newLocale)
})
</script>

<template>
  <v-container>
    <v-card class="pa-6 max-w-md mx-auto">
      <v-card-text>
        <v-select
            v-model="selected"
            :items="languages"
            item-title="label"
            item-value="value"
            label="Language"
            density="comfortable"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>