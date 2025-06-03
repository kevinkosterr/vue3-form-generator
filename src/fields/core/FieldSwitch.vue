<template>
  <label class="field-switch" :for="props.id">
    <input
      :id="props.id"
      type="checkbox"
      :checked="currentModelValue"
      :disabled="isDisabled"
      @change="onFieldValueChanged"
    >
    <span class="slider" />
  </label>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { SwitchField, FieldPropRefs, FieldProps } from '@/resources/types/field/fields.js'
import {
  useFieldEmits,
  useFieldAttributes,
  useFormModel
} from '@/composables'


const props = defineProps<FieldProps<SwitchField>>()
const emits = defineEmits(useFieldEmits())

const { field, model }: FieldPropRefs<SwitchField> = toRefs(props)

const { isDisabled } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)

const onFieldValueChanged = (event: Event) => {
  emits('onInput', (event.target as HTMLInputElement).checked)
}
</script>