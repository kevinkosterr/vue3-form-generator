<template>
  <textarea
    :id="props.id"
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

<script setup lang="ts">
import { toRefs } from 'vue'
import type { FieldProps, FieldEmits, FieldPropRefs, TextAreaField } from '@/resources/types/field/fields'
import {
  useValidation,
  useFieldAttributes,
  useFormModel
} from '@/composables'


const props = defineProps<FieldProps<TextAreaField>>()
const emits = defineEmits<FieldEmits>()

const { field, model }: FieldPropRefs<TextAreaField> = toRefs(props)

const { isRequired, isDisabled, isReadonly, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)
const { onChanged, errors, onBlur } = useValidation(
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
  errors.value = []
  emits('onInput', (event.target as HTMLTextAreaElement).value)
  onChanged()
}

defineExpose({ hint, errors, isVisible })
</script>
