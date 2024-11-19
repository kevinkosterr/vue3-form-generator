<template>
  <input
    :id="id"
    class="field-input"
    type="text"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :placeholder="field.placeholder"
    :autocomplete="field.autocomplete || 'off'"
    :value="currentModelValue"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>

<script setup>
import { toRefs } from 'vue'
import { useFormModel, useFieldAttributes, useFieldValidate, useFieldProps, useFieldEmits } from '@/composables'

const emits = defineEmits(useFieldEmits())
const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)

const { currentModelValue } = useFormModel(model, field)
const { isRequired, isDisabled } = useFieldAttributes(model, field)
const { errors, validate } = useFieldValidate(
  model,
  field,
  isDisabled.value,
  isRequired.value,
  false,
  currentModelValue
)

const onBlur = () => {
  validate().then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field
    )
  })
}

const onFieldValueChanged = ({ target }) => {
  errors.value = []
  emits('onInput', target.value)
}
</script>