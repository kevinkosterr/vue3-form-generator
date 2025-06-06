<template>
  <input
    :id="props.id"
    type="checkbox"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :value="currentModelValue"
    :checked="currentModelValue"
    @change="onFieldValueChanged"
  >
  <label v-if="field.label" style="margin-left: .4em" :for="props.id"> {{ field.label }}</label>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { CheckboxField, FieldPropRefs, FieldProps } from '@/resources/types/field/fields'
import {
  useFormModel,
  useFieldAttributes,
  useFieldValidate,
  useFieldEmits
} from '@/composables'

const emits = defineEmits(useFieldEmits())
const props = defineProps<FieldProps<CheckboxField>>()

const { field, model }: FieldPropRefs<CheckboxField> = toRefs(props)

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isDisabled, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { errors, validate } = useFieldValidate(
  model.value,
  field.value,
  isDisabled.value,
  isRequired.value,
  false
)

const onFieldValueChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
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

defineExpose({ hint, noLabel: true, errors, isVisible })
</script>
