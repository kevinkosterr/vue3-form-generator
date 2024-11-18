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
const { isRequired, isVisible } = useAttributes(model.value, field.value)
const { errors, validate } = useValidate(
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