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
  useModel,
  useAttributes,
  useValidate,
  useFieldProps,
  useFieldEmits
} from '@/composables'

const emits = defineEmits(useFieldEmits())
const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)

const { currentModelValue } = useModel(model.value, field.value)
const { isRequired, isDisabled } = useAttributes(model.value, field.value)
const { errors, validate } = useValidate(
  model.value,
  field.value,
  isDisabled.value,
  isRequired.value,
  false,
  currentModelValue.value
)

const onFieldValueChanged = ({ target }) => {
  errors.value = []
  validate().then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
  emits('onInput', target.checked)
}
</script>