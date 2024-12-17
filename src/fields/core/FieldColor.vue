<template>
  <input
    :id="props.id"
    class="field-color"
    type="color"
    :name="props.field.name"
    :value="currentModelValue"
    :required="isRequired"
    @change="onFieldValueChanged"
    @blur="onBlur"
  >
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
  emits('onInput', target.value)
}

defineExpose({ isVisible })
</script>