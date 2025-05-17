<template>
  <textarea
    :id="id"
    :style="field.resizable ? '' : 'resize: none;'"
    class="field-textarea"
    :name="field.name"
    :required="isRequired"
    :readonly="isReadonly"
    :disabled="isDisabled"
    :maxlength="field.maxLength"
    :placeholder="field.placeholder"
    :value="currentModelValue"
    @input="onFieldValueChanged"
    @blur="onBlur"
  />
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

const { isRequired, isDisabled, isReadonly, hint } = useFieldAttributes(model.value, field.value)
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

const onFieldValueChanged = (event) => {
  errors.value = []
  emits('onInput', event.target.value)
}

defineExpose({ hint, errors })
</script>