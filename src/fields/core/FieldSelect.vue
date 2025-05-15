<template>
  <div class="vfg-select">
    <span
      :id="props.id + 'vfg-select-label'"
      v-on-click-outside="handleClickOutside"
      class="vfg-select-label"
      :class="{'text-muted': !selectedNames.length}"
      @click.prevent="onClickInput"
    >
      <template v-if="selectedNames.length">
        <span>
          <template v-for="(selectedName, index) in selectedNames" :key="selectedName">
            <template v-if="index !== 0">, </template>{{ selectedName }}
          </template>
        </span>
      </template>
      <template v-else>{{ field.placeholder || 'Select an option' }}</template>
      <span class="vfg-fi vfg-fi-right">
        <!-- X-Mark Icon from https://heroicons.com -->
        <span v-if="hasValue" @click.prevent="resetSelection">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </span>
        <!-- ChevronDown from https://heroicons.com -->
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </span>
    </span>
    <div v-if="isOpened" :id="props.id + 'vfg-select-list-container'" class="vfg-select-list-container">
      <div :id="props.id + 'vfg-select-list'" class="vfg-select-list">
        <div
          v-for="option in field.options"
          :id="props.id + 'vfg-select-option-' + option.value"
          :key="option.value"
          class="vfg-select-option"
          :class="{'selected': isSelected(option)}"
          @click.prevent="selectOption(option)"
        >
          {{ option.name }}
          <span v-if="isSelected(option)" class="vfg-fi vfg-fi-right">
            <!-- X-Mark Icon from https://heroicons.com -->
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMagicKeys } from '@vueuse/core'
import { onClickOutside as vOnClickOutside } from '@/directives/onClickOutside.ts'
import { ref, toRefs, computed } from 'vue'
import {
  useFieldEmits,
  useFieldProps,
  useFormModel
} from '@/composables/index.ts'

const props = defineProps(useFieldProps())
const emits = defineEmits(useFieldEmits())
const { controlLeft, metaLeft } = useMagicKeys()

const isOpened = ref(false)
const { field, model } = toRefs(props)

/** Names of the selected values */
const selectedNames = computed(() => {
  if (!currentModelValue.value) return []
  if (Array.isArray(currentModelValue.value) && field.value.multiple) {
    return currentModelValue.value.map(val => field.value.options.find(o => o.value === val)?.name)
  } else {
    return [ field.value.options.find(o => o.value === currentModelValue.value).name ]
  }
})

/** Whether the field has a value */
const hasValue = computed(() => field.value.multiple ? currentModelValue.value.length : currentModelValue.value)
const isPressingModifierKey = computed(() => metaLeft.value || controlLeft.value)

const { currentModelValue } = useFormModel(model.value, field.value)

function onClickInput () {
  if (isOpened.value) {
    isOpened.value = false
    return
  }
  isOpened.value = true
}

function resetSelection () {
  emits('onInput', field.value.multiple ? [] : '')
}

function isSelected (option) {
  return currentModelValue.value?.includes(option.value) ?? false
}

function handleClickOutside (event) {
  if (
    (!field.value.multiple && !isPressingModifierKey.value) ||
      !event.target.id.startsWith(props.id + 'vfg-select')
  ) {
    isOpened.value = false
  }
}

function selectOption (option) {
  if (!field.value.multiple) {
    const isSelected = currentModelValue.value === option.value
    emits('onInput', isSelected ? '' : option.value)
  } else {
    let selectedValues = [ ...currentModelValue.value ]
    const isSelected = selectedValues.includes(option.value)

    if (isSelected) {
      selectedValues = selectedValues.filter(o => o !== option.value)
    } else {
      selectedValues.push(option.value)
    }

    emits('onInput', selectedValues)
    if (metaLeft.value || controlLeft.value) return
  }
  isOpened.value = false
}
</script>