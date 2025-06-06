<template>
  <label class="field-switch" :for="props.id">
    <input
      :id="props.id"
      type="checkbox"
      :checked="currentModelValue"
      :disabled="isDisabled"
      @change="onFieldValueChanged"
    >
    <span class="slider" />
  </label>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { SwitchField, FieldPropRefs, FieldProps } from '@/resources/types/field/fields.js'
import {
  useFieldEmits,
  useFieldAttributes,
  useFieldValidate,
  useFormModel
} from '@/composables'


const props = defineProps<FieldProps<SwitchField>>()
const emits = defineEmits(useFieldEmits())

const { field, model }: FieldPropRefs<SwitchField> = toRefs(props)

const { isDisabled, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)
const { errors, validate } = useFieldValidate(model.value, field.value)

const onFieldValueChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('onInput', target.checked)
  validate(target.checked).then(validationErrors => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
}

defineExpose({ isVisible, hint, errors })
</script>
