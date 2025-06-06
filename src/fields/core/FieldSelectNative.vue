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

<script setup lang="ts">
import { toRefs } from 'vue'
import type { FieldPropRefs, FieldProps, SelectNativeField } from '@/resources/types/field/fields'
import {
  useFieldEmits,
  useFieldValidate,
  useFieldAttributes,
  useFormModel
} from '@/composables'

const props = defineProps<FieldProps<SelectNativeField>>()
const emits = defineEmits(useFieldEmits())

const { field, model }: FieldPropRefs<SelectNativeField> = toRefs(props)

const { isRequired, isDisabled, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)
const { validate, errors } = useFieldValidate(model.value, field.value)

const onBlur = () => {
  validate(currentModelValue.value).then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
}

const onFieldValueChanged = (event: Event) => {
  errors.value = []
  emits('onInput', (event.target as HTMLSelectElement).value)
}

defineExpose({ hint, isVisible, errors })
</script>