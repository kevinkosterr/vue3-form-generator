<template>
  <div class="field-color-wrapper">
    <input
      v-if="props.field.withInput"
      v-maska="maskOptions"
      class="field-color-input"
      type="text"
      :value="currentModelValue"
      placeholder="#ffffff"
      :required="isRequired"
      :readonly="isReadonly"
      :disabled="isDisabled"
      @input="onFieldValueChanged"
      @blur="onBlur"
    >
    <input
      :id="props.id"
      class="field-color"
      type="color"
      :name="props.field.name"
      :value="currentModelValue"
      :required="isRequired"
      :readonly="isReadonly"
      :disabled="isDisabled"
      @input="onFieldValueChanged"
      @blur="onBlur"
    >
  </div>
</template>

<script setup lang="ts">
import validators from '@/validators'
import { toRefs, onBeforeMount } from 'vue'
import {
  useFormModel,
  useFieldAttributes,
  useValidation
} from '@/composables'
import { vMaska } from 'maska/vue'
import type { ColorField, FieldEmits, FieldPropRefs, FieldProps } from '@/resources/types/field/fields'
import type { MaskOptions } from 'maska'

const emits = defineEmits<FieldEmits>()
const props = defineProps<FieldProps<ColorField>>()

const maskOptions: Readonly<MaskOptions> = {
  mask: '!#HHHHHH',
  tokens: {
    H: {
      pattern: /[A-Fa-f0-9]/
    }
  }
}

const { field, model }: FieldPropRefs<ColorField> = toRefs(props)

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isVisible, isDisabled, isReadonly, hint } = useFieldAttributes(model.value, field.value)
const { errors, onChanged, onBlur } = useValidation(
  model.value,
  field.value,
  currentModelValue,
  props.formOptions,
  emits,
  isDisabled.value,
  isRequired.value,
  isReadonly.value
)

const onFieldValueChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  errors.value = []
  // Ensure a change doesn't emit twice; we need this because both inputs might trigger this function at once.
  if (target.value !== currentModelValue.value) {
    emits('onInput', target.value)
    onChanged()
  }
}

onBeforeMount(() => {
  // Only add validators when the extra text input is enabled.
  if (field.value.withInput) {
    const fieldValidators = []
    if (Array.isArray(field.value.validator)) {
      fieldValidators.push(...field.value.validator)
    } else if (field.value.validator !== undefined) {
      fieldValidators.push(field.value.validator)
    }
    // Keep in mind that the native color picker only supports 6-digit hex codes,
    // so even though a value might technically be valid, it won't display the right color on the color picker input.
    fieldValidators.push(validators.hexColorValue)
    field.value.validator = fieldValidators
  }
})

defineExpose({ isVisible, errors, hint })
</script>