<template>
  <input
    :id="id"
    type="checkbox"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :value="currentModelValue"
    :checked="currentModelValue"
    @change="onFieldValueChanged"
  >
  <label v-if="field.label" style="margin-left: .4em" :for="id"> {{ field.label }}</label>
</template>

<script setup>
import { toRefs } from 'vue'
import {
  useFormModel,
  useFieldAttributes,
  useFieldValidate,
  useFieldProps,
  useFieldEmits
} from '@/composables/index.ts'

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

const onFieldValueChanged = ({ target }) => {
  errors.value = []
  validate(currentModelValue.value).then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
  emits('onInput', target.checked)
}

defineExpose({ hint })
</script>