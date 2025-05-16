<template>
  <select
    :id="id"
    :name="field.name"
    :value="currentModelValue"
    :required="isRequired"
    :disabled="isDisabled"
    @change="onFieldValueChanged"
    @blur="onBlur"
  >
    <option disabled value="">
      {{ field.placeholder ?? 'Select a ' + field.name }}
    </option>
    <option v-for="option in field.options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup>
import { toRefs } from 'vue'

import {
  useFieldEmits,
  useFieldValidate,
  useFieldAttributes,
  useFieldProps,
  useFormModel
} from '@/composables/index.ts'

const props = defineProps(useFieldProps())
const emits = defineEmits(useFieldEmits())

const { field, model } = toRefs(props)

const { isRequired, isDisabled, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)
const { validate } = useFieldValidate(model.value, field.value)

const onBlur = () => {
  validate().then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
}

const onFieldValueChanged = (event) => {
  emits('onInput', event.target.value)
}

defineExpose({ hint })
</script>