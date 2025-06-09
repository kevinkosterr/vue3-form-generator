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
import type { FieldProps, FieldPropRefs, TextAreaField } from '@/resources/types/field/fields'
import {
  useFieldEmits,
  useFieldValidate,
  useFieldAttributes,
  useFormModel
} from '@/composables'


const props = defineProps<FieldProps<TextAreaField>>()
const emits = defineEmits(useFieldEmits())

const { field, model }: FieldPropRefs<TextAreaField> = toRefs(props)

const { isRequired, isDisabled, isReadonly, isVisible, hint } = useFieldAttributes(model.value, field.value)
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

const onFieldValueChanged = (event: Event) => {
  errors.value = []
  emits('onInput', (event.target as HTMLTextAreaElement).value)
}

defineExpose({ hint, errors, isVisible })
</script>
