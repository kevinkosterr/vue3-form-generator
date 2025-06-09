<template>
  <input
    :id="props.id"
    type="number"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :placeholder="field.placeholder"
    :value="currentModelValue"
    :max="field.max || undefined"
    :min="field.min || undefined"
    :step="field.step || 1"
    inputmode="numeric"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { NumberField, FieldProps, FieldPropRefs } from '@/resources/types/field/fields'
import {
  useFormModel,
  useFieldAttributes,
  useFieldValidate,
  useFieldEmits
} from '@/composables'

const props = defineProps<FieldProps<NumberField>>()
const emits = defineEmits(useFieldEmits())

const { field, model }: FieldPropRefs<NumberField> = toRefs(props)

const { isDisabled, isRequired, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)
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

const onFieldValueChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  errors.value = []
  const step = field.value.step ?? 1
  const isDecimalStep = step.toString().split('.')[1]
  if (!isDecimalStep) return emits('onInput', parseInt(target.value))
  emits('onInput', parseFloat(target.value))
}

defineExpose({ hint, errors, isVisible })
</script>
