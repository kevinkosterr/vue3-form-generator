<template>
  <select
    :id="id"
    :name="field.name"
    :value="currentModelValue"
    :required="isRequired"
    :disabled="isDisabled"
    @change="onFieldValueChanged"
  >
    <option disabled value="">
      {{ field.placeholder ?? 'Select a ' + field.name }}
    </option>
    <option v-for="option in field.options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { FieldPropRefs, FieldProps, SelectNativeField } from '@/resources/types/field/fields'
import {
  useFieldAttributes,
  useFormModel,
  useValidation
} from '@/composables'

const props = defineProps<FieldProps<SelectNativeField>>()
const emits = defineEmits(useFieldEmits())

const { field, model }: FieldPropRefs<SelectNativeField> = toRefs(props)

const { isRequired, isDisabled, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)
const { validate, errors } = useValidation(
  model.value,
  field.value,
  currentModelValue,
  props.formOptions,
  emits,
  isDisabled.value,
  isRequired.value,
  false
)

const onFieldValueChanged = (event: Event) => {
  errors.value = []
  emits('onInput', (event.target as HTMLSelectElement).value)
  validate()
}

defineExpose({ hint, isVisible, errors })
</script>