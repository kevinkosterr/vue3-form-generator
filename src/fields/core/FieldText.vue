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
import { useFormModel, useFieldAttributes, useFieldValidate, useFieldProps, useFieldEmits } from '@/composables/index.ts'

const emits = defineEmits(useFieldEmits())
const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isDisabled, hint } = useFieldAttributes(model.value, field.value)
const { errors, validate } = useFieldValidate(
  model.value,
  field.value,
  isDisabled.value,
  isRequired.value,
  false
)

const onBlur = () => {
  validate(currentModelValue.value).then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
}

const onFieldValueChanged = ({ target }) => {
  errors.value = []
  emits('onInput', target.value)
}

defineExpose({ errors, hint })
</script>