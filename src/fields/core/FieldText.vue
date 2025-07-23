<template>
  <input
    :id="props.id"
    class="field-input"
    type="text"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :readonly="isReadonly"
    :placeholder="field.placeholder"
    :autocomplete="autoCompleteState"
    :value="currentModelValue"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>

<script setup lang="ts">
import { toRefs, computed, type ComputedRef } from 'vue'
import type { FieldPropRefs, FieldProps, TextField } from '@/resources/types/field/fields'
import { useFormModel, useFieldAttributes, useFieldValidate, useFieldEmits } from '@/composables'
import { useFormModel, useFieldAttributes, useValidation } from '@/composables'

const emits = defineEmits(useFieldEmits())
const props = defineProps<FieldProps<TextField>>()

const { field, model }: FieldPropRefs<TextField> = toRefs(props)

const autoCompleteState: ComputedRef<string> = computed(() => field.value.autocomplete ? 'on' : 'off')

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isDisabled, isReadonly, isVisible, hint } = useFieldAttributes(model.value, field.value)

const { errors, onChanged, onBlur } = useValidation(
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
  emits('onInput', (event.target as HTMLInputElement).value)
  onChanged()
}

defineExpose({ errors, hint, isVisible })
</script>