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

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { onClickOutside as vOnClickOutside } from '@/directives/onClickOutside'
import { ref, toRefs, computed, type ComputedRef, type Ref } from 'vue'
import type { FieldProps, FieldPropRefs, SelectField } from '@/resources/types/field/fields'
import {
  useFieldAttributes,
  useFieldEmits,
  useFormModel
} from '@/composables'
import { FieldOption } from '@/resources/types/fieldAttributes'

const props = defineProps<FieldProps<SelectField>>()
const emits = defineEmits(useFieldEmits())
const { controlLeft, metaLeft } = useMagicKeys()

const isOpened: Ref<boolean> = ref(false)
const { field, model }: FieldPropRefs<SelectField> = toRefs(props)
const { hint } = useFieldAttributes(model.value, field.value)

/** Names of the selected values */
const selectedNames: ComputedRef<string[]> = computed(() => {
  if (!currentModelValue.value) return []

  const findOptionName = (value: string) => field.value.options.find(o => o.value === value)?.name ?? false

  if (Array.isArray(currentModelValue.value) && field.value.multiple) {
    return currentModelValue.value.map(findOptionName).filter(o => o !== false)
  } else {
    const optionName = findOptionName(currentModelValue.value)
    return optionName ? [ optionName ] : []
  }
})

/** Whether the field has a value */
const hasValue: ComputedRef<boolean> = computed(() => field.value.multiple ? currentModelValue.value.length : currentModelValue.value)
/** Whether the user is pressing a modifier key (CMD or left CTRL) */
const isPressingModifierKey: ComputedRef<boolean> = computed(() => metaLeft.value || controlLeft.value)

const { currentModelValue } = useFormModel(model.value, field.value)

/** Toggles the isOpened state when the input is clicked. */
const onClickInput = () => isOpened.value = !isOpened.value
/** Unselect all items. */
const resetSelection = () => emits('onInput', field.value.multiple ? [] : '')

/** Determine whether the user currently selects an option */
function isSelected (option: FieldOption) {
  if (!field.value.multiple) return currentModelValue.value === option.value
  return currentModelValue.value?.includes(option.value) ?? false
}

function handleClickOutside (event: Event) {
  if (
    (!field.value.multiple && !isPressingModifierKey.value) ||
      !(event.target as HTMLElement).id.startsWith(props.id + 'vfg-select')
  ) {
    isOpened.value = false
  }
}

function selectOption (option: FieldOption) {
  const optionSelected = isSelected(option)

  if (!field.value.multiple) {
    emits('onInput', optionSelected ? '' : option.value)
  } else {
    let selectedValues = [ ...currentModelValue.value ]

    if (optionSelected) {
      selectedValues = selectedValues.filter(o => o !== option.value)
    } else {
      selectedValues.push(option.value)
    }

    emits('onInput', selectedValues)
    if (metaLeft.value || controlLeft.value) return
  }
  isOpened.value = false
}

defineExpose({ hint })
</script>