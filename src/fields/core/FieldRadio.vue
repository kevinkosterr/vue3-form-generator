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
  useFieldEmits,
  useFormModel,
  useFieldAttributes
} from '@/composables'
import type { RadioField, FieldProps, FieldPropRefs } from '@/resources/types/field/fields'

const props = defineProps<FieldProps<RadioField>>()
const emits = defineEmits(useFieldEmits())

const { field, model }: FieldPropRefs<RadioField> = toRefs(props)
const { isRequired, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)

const getFieldId = (optionName: string) => `${field.value.name}_${optionName}`

const onFieldValueChanged = (event: Event) => {
  emits('onInput', (event.target as HTMLInputElement).value)
}

defineExpose({ hint, isVisible })
</script>
