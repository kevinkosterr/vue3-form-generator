<template>
  <template v-for="option in field.options" :key="option.value">
    <div class="option-wrap field-radio">
      <input
        :id="getFieldId(option.name)"
        type="radio"
        :name="field.name"
        :value="option.value"
        :required="isRequired"
        :checked="currentModelValue === option.value"
        @change="onFieldValueChanged"
      >
      <label :for="getFieldId(option.name)"> {{ option.name }} </label>
    </div>
  </template>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import {
  useFormModel,
  useFieldAttributes,
  useValidation
} from '@/composables'
import type { RadioField, FieldProps, FieldEmits, FieldPropRefs } from '@/resources/types/field/fields'

const props = defineProps<FieldProps<RadioField>>()
const emits = defineEmits<FieldEmits>()

const { field, model }: FieldPropRefs<RadioField> = toRefs(props)
const { isRequired, isVisible, isDisabled, isReadonly, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)

const { errors, validate } = useValidation(
  model.value,
  field.value,
  currentModelValue,
  props.formOptions,
  emits,
  isDisabled.value,
  isRequired.value,
  isReadonly.value
)

const getFieldId = (optionName: string) => `${field.value.name}_${optionName}`

const onFieldValueChanged = (event: Event) => {
  errors.value = []
  emits('onInput', (event.target as HTMLInputElement).value)
  validate()
}

defineExpose({ hint, isVisible })
</script>
