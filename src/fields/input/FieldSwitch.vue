<template>
  <label class="field-switch" :for="formFieldId">
    <input
      :id="formFieldId"
      type="checkbox"
      :checked="currentModelValue"
      :disabled="isDisabled"
      @change="onFieldValueChanged"
    >
    <span class="slider" />
  </label>
</template>

<script setup>
import { toRefs } from 'vue'

import {
  useFieldEmits,
  useFieldAttributes,
  useFieldProps,
  useFormModel
} from '@/composables'


const props = defineProps(useFieldProps())
const emits = defineEmits(useFieldEmits())

const { field, model } = toRefs(props)

const { isDisabled } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)

const onFieldValueChanged = ({ target }) => {
  emits('onInput', target.checked)
}
</script>