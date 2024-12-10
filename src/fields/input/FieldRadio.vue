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

<script setup>
import { toRefs } from 'vue'
import {
  useFieldEmits,
  useFieldProps,
  useFormModel,
  useFieldAttributes
} from '@/composables'

const props = defineProps(useFieldProps())
const emits = defineEmits(useFieldEmits())

const { field, model } = toRefs(props)
const { isRequired } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)

const getFieldId = (optionName) => `${field.value.name}_${optionName}`

const onFieldValueChanged = ({ target }) => {
  emits('onInput', target.value)
}
</script>