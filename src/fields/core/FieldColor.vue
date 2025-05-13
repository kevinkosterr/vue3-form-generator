<template>
  <div class="field-color-wrapper">
    <input
      v-if="props.field.withInput"
      v-maska="maskOptions"
      class="field-color-input"
      type="text"
      :value="currentModelValue"
      placeholder="#ffffff"
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
      @input="onFieldValueChanged"
      @blur="onBlur"
    >
  </div>
</template>

<script setup>
import validators from '@/validators'
import { toRefs, onBeforeMount } from 'vue'
import {
  useFormModel,
  useFieldAttributes,
  useFieldValidate,
  useFieldProps,
  useFieldEmits
} from '@/composables/index.ts'
import { vMaska } from 'maska/vue'

const emits = defineEmits(useFieldEmits())
const props = defineProps(useFieldProps())

const maskOptions = {
  mask: '!#HHHHHH',
  tokens: {
    H: {
      pattern: /[A-Fa-f0-9]/
    }
  }
}

const { field, model } = toRefs(props)

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isVisible } = useFieldAttributes(model.value, field.value)
const { errors, validate } = useFieldValidate(
  model.value,
  field.value,
  false,
  isRequired.value,
  false,
  currentModelValue.value
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
  // Ensure a change doesn't emit twice, we need this because both inputs might trigger this function at once.
  if (target.value !== currentModelValue.value) {
    emits('onInput', target.value)
  }
}

onBeforeMount(() => {
  if (field.value.withInput) {
    const fieldValidators = []
    if (Array.isArray(field.value.validator)) {
      fieldValidators.push(...field.value.validator)
    } else if (field.value.validator !== undefined) {
      fieldValidators.push(field.value.validator)
    }
    // Keep in mind that the native color picker only supports 6 digit hex codes,
    // so even though a value might technically be valid, it won't display the right color on the color picker input.
    fieldValidators.push(validators.hexColorValue)
    field.value.validator = fieldValidators
  }
})

defineExpose({ isVisible, errors })
</script>