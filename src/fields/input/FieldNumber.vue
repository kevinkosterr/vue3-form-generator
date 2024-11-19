<template>
  <input
    :id="id"
    type="number"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :placeholder="field.placeholder"
    :value="currentModelValue"
    :max="field.max || undefined"
    :min="field.min || undefined"
    :step="field.step || 1"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>

<script setup>
import { toRefs } from 'vue'
import {
  useModel,
  useAttributes,
  useValidate,
  useFieldEmits,
  useFieldProps
} from '@/composables'

const props = defineProps(useFieldProps())
const emits = defineEmits(useFieldEmits())

const { field, model } = toRefs(props)

const { isDisabled, isRequired } = useAttributes(model.value, field.value)
const { currentModelValue } = useModel(model.value, field.value)
const { errors, validate } = useValidate(
  model.value,
  field.value,
  isDisabled.value,
  isRequired.value,
  false,
  currentModelValue.value
)

const onBlur = () => {
  validate().then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
}

const onFieldValueChanged = ({ target }) => {
  errors.value = []
  const step = field.value.step ?? 1
  const isDecimalStep = step.toString().split('.')[1]
  if (!isDecimalStep) return emits('onInput', parseInt(target.value))
  emits('onInput', parseFloat(target.value))
}
</script>